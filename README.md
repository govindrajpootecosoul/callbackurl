# Callback URL API

A Node.js Express API for handling callback URLs and webhooks.

## Features

- ✅ RESTful callback endpoint
- ✅ Request logging
- ✅ Error handling
- ✅ CORS support
- ✅ JSON and URL-encoded body parsing
- ✅ Health check endpoint

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and timestamp.

### Callback Endpoint
```
POST /api/callback
```
Receives callback data and processes it.

**Request Body Example:**
```json
{
  "event": "payment.success",
  "data": {
    "transaction_id": "12345",
    "amount": 100.00,
    "currency": "USD"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Callback received successfully",
  "receivedAt": "2024-01-01T12:00:00.000Z",
  "data": {
    "eventType": "payment.success",
    "source": "Mozilla/5.0...",
    "hasData": true,
    "dataSize": 150
  }
}
```

### Get Callback Info
```
GET /api/callback
```
Returns information about the callback endpoint.

## Usage Examples

### Using cURL
```bash
curl -X POST http://localhost:3080/api/callback \
  -H "Content-Type: application/json" \
  -d '{
    "event": "payment.success",
    "data": {
      "transaction_id": "12345",
      "amount": 100.00
    }
  }'
```

### Using JavaScript (fetch)
```javascript
fetch('http://localhost:3080/api/callback', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    event: 'payment.success',
    data: {
      transaction_id: '12345',
      amount: 100.00
    }
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Configuration

Edit `.env` file to configure:
- `PORT`: Server port (default: 3080)

## Project Structure

```
callback_url/
├── server.js              # Main server file
├── routes/
│   └── callback.js        # Callback route handler
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Customization

Edit `routes/callback.js` to add your custom callback processing logic in the `processCallback` function.

## License

ISC

