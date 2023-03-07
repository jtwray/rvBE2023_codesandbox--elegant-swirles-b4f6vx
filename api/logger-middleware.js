module.exports = (req, res, next) => {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] ${req && req.method ? req.method : req} to ${req && req.originalUrl}`);

  next();
};
