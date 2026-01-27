# Callback URL API - Project Overview

## Purpose
A Node.js Express API designed to receive and process callback URLs/webhooks from external services.

## Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Dependencies**: 
  - express: Web framework
  - dotenv: Environment variable management
  - body-parser: Request body parsing
  - cors: Cross-origin resource sharing

## Key Features
1. RESTful callback endpoint at `/api/callback`
2. Health check endpoint at `/health`
3. Request logging middleware
4. Error handling middleware
5. Support for JSON and URL-encoded bodies
6. CORS enabled

## Architecture
- **server.js**: Main application entry point, sets up Express server and middleware
- **routes/callback.js**: Callback route handler with processing logic

## Default Port
3080 (configurable via PORT environment variable)

