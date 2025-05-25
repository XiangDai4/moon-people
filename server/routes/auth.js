// server/routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;