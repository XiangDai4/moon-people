// server/routes/api.js 
const express = require('express');
const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'API is healthy',
    timestamp: new Date()
  });
});

// Include auth routes
router.use('/auth', require('./auth'));

// Include category routes
router.use('/categories', require('./categories'));

// Include service routes
router.use('/services', require('./services'));

module.exports = router;