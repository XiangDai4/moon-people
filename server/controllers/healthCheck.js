// Health check controller
exports.checkHealth = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is working correctly',
    timestamp: new Date()
  });
};
