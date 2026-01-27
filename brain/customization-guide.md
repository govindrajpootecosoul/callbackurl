# Customization Guide

## Adding Custom Processing Logic

Edit `routes/callback.js` and modify the `processCallback` function to add your custom logic.

### Example: Add Database Storage
```javascript
async function processCallback(callbackData) {
  // Save to database
  await db.callbacks.create({
    event: callbackData.body?.event,
    data: callbackData.body,
    timestamp: callbackData.timestamp
  });
  
  return { saved: true };
}
```

### Example: Add Authentication
Add middleware to verify API keys or signatures:
```javascript
router.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
```

### Example: Add Event-Specific Handlers
Extend the switch statement in `processCallback` to handle specific events:
```javascript
switch (callbackData.body.event) {
  case 'user.created':
    await handleUserCreated(callbackData.body.data);
    break;
  case 'order.completed':
    await handleOrderCompleted(callbackData.body.data);
    break;
}
```

