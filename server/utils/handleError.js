module.exports.ErrorHandler = (err, message, status, res) => {
  let err_status =  status;
  let err_message = err.message || "Internal server Error";

  return res.status(err_status).json({
    success: false,
    error_message: err_message,
    message: message,
  });
};
