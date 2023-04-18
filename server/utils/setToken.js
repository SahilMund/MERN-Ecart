// create token and saving that in cookies
const setTokenInCookie = (user, statusCode, res , msg) => {
    const token = user.getJwtToken();
  
    // Options for cookies
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      Secure: true,
    };
  
    return res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
      message : msg
    });
  };
  
  module.exports = setTokenInCookie;
  