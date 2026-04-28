require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const callbackHandler = require('./routes/callback');

const app = express();
const PORT = process.env.PORT || 3480;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'callback-url-api'
  });
});

// Amazon Ads OAuth callback (local development)
// This should match the redirect URI you configure in the Amazon portal for local testing:
//   http://localhost:3480/ads/callback
app.get('/ads/callback', async (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).send('Authorization failed: No code provided.');
  }

  try {
    const tokenResponse = await axios.post('https://api.amazon.com/auth/o2/token', {
      grant_type: 'authorization_code',
      code: code,
      // Local redirect URI for development
      redirect_uri: 'http://localhost:3480/ads/callback',
      // In real usage, put these in environment variables
      client_id: process.env.AMAZON_CLIENT_ID || 'YOUR_CLIENT_ID',
      client_secret: process.env.AMAZON_CLIENT_SECRET || 'YOUR_CLIENT_SECRET'
    });

    const { access_token, refresh_token } = tokenResponse.data;

    // TODO: store tokens securely (DB, secrets manager, etc.)
    console.log('Amazon Access Token:', access_token);
    console.log('Amazon Refresh Token:', refresh_token);

    res.send('Authentication Successful! You can close this window.');
  } catch (error) {
    console.error('Token Exchange Error:', error.response?.data || error.message);
    res.status(500).send('Failed to exchange code for token.');
  }
});

// Callback routes (existing generic callback endpoint)
app.use('/api/callback', callbackHandler);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Callback URL API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      callback: '/api/callback',
      amazonOAuthCallback: '/ads/callback'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Callback URL API server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 Callback endpoint: http://localhost:${PORT}/api/callback`);
  console.log(`📍 Amazon OAuth callback: http://localhost:${PORT}/ads/callback`);
});

module.exports = app;

