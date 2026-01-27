# API Endpoints Documentation

## Health Check
- **Method**: GET
- **Path**: `/health`
- **Description**: Returns server health status
- **Response**: 
  ```json
  {
    "status": "ok",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "service": "callback-url-api"
  }
  ```

## Callback Endpoint
- **Method**: POST
- **Path**: `/api/callback`
- **Description**: Receives and processes callback data
- **Request Body**: JSON object with callback data
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Callback received successfully",
    "receivedAt": "2024-01-01T12:00:00.000Z",
    "data": {
      "eventType": "payment.success",
      "source": "user-agent",
      "hasData": true,
      "dataSize": 150
    }
  }
  ```

## Callback Info
- **Method**: GET
- **Path**: `/api/callback`
- **Description**: Returns information about the callback endpoint
- **Response**: Endpoint documentation and usage examples

