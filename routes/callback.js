const express = require('express');
const router = express.Router();

/**
 * POST /api/callback
 * Main callback endpoint that receives callback data
 */
router.post('/', async (req, res) => {
  try {
    const callbackData = {
      headers: req.headers,
      body: req.body,
      query: req.query,
      timestamp: new Date().toISOString(),
      method: req.method,
      ip: req.ip || req.connection.remoteAddress
    };

    console.log('📥 Callback received:', JSON.stringify(callbackData, null, 2));

    // Process callback data here
    // You can add custom logic based on your requirements
    const processedData = await processCallback(callbackData);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Callback received successfully',
      receivedAt: callbackData.timestamp,
      data: processedData
    });
  } catch (error) {
    console.error('❌ Error processing callback:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/callback
 * Get callback endpoint (for testing or verification)
 */
router.get('/', (req, res) => {
  res.json({
    message: 'Callback URL endpoint',
    method: 'GET',
    instructions: 'Use POST method to send callback data',
    example: {
      method: 'POST',
      url: '/api/callback',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        event: 'example_event',
        data: {}
      }
    }
  });
});

/**
 * Process callback data
 * Add your custom processing logic here
 */
async function processCallback(callbackData) {
  // Example processing logic
  const processed = {
    eventType: callbackData.body?.event || callbackData.body?.type || 'unknown',
    source: callbackData.headers['user-agent'] || 'unknown',
    hasData: !!callbackData.body,
    dataSize: JSON.stringify(callbackData.body || {}).length
  };

  // Add custom processing based on event type
  if (callbackData.body?.event) {
    switch (callbackData.body.event) {
      case 'payment.success':
        console.log('💳 Payment successful callback processed');
        break;
      case 'payment.failed':
        console.log('❌ Payment failed callback processed');
        break;
      case 'webhook':
        console.log('🔔 Webhook callback processed');
        break;
      default:
        console.log(`📋 Generic callback processed: ${callbackData.body.event}`);
    }
  }

  return processed;
}

module.exports = router;

