const jwt = require("jsonwebtoken");
const path = require("path");

const User = require("../models/User");
const sendMail = require("../config/nodemailer");
const setTokenInCookie = require("../utils/setToken");
const { ErrorHandler } = require("../utils/handleError");

module.exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return res.status(400).json({
        message: "Email already registered, Kindly proceed for Login",
        success: false,
      });
    }

    const { filename } = req.file;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    // Creating activation Token
    const activationToken = await jwt.sign(
      user,
      process.env.ACTIVATION_SECRET,
      {
        expiresIn: "5m",
      }
    );

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    console.log(activationUrl);

    // res.status(201).json({
    //   success: true,
    //   message: `Please check your email:- ${user.email} for activation link`,
    // });

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Registered Successfully !! Please check your email:- ${user.email} for activation link`,
      });
    } catch (err) {
      return res.status(500).json({
        message:
          err.message ||
          "Something went wrong while sending the mail ! Internal Server Error",
        success: false,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Something went wrong ! Internal Server Error",
      success: false,
    });
  }
};

module.exports.userActivation = async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newUser) {
      return ErrorHandler("", "Invalid token", 400, res);
    }
    const { name, email, password, avatar } = newUser;

    user = await User.create({
      name,
      email,
      avatar,
      password,
    });

    setTokenInCookie(
      user,
      201,
      res,
      "Registered Successfully. Proceed for Login"
    );
  } catch (error) {
    return ErrorHandler(error, "Internal Server Error", 500, res);
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password) {
      return ErrorHandler(
        "",
        "Email or Password Should not be empty",
        400,
        res
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return ErrorHandler(
        "",
        "Entered email is not a registered email, Signup to continue",
        404,
        res
      );
    }

    const isPasswordValid = await user.compareEncryptedPassword(password);

    if (!isPasswordValid) {
      return ErrorHandler("", "Invalid Email/Password", 400, res);
    }

    setTokenInCookie(user, 201, res, "Logged In Successfully !!");
  } catch (error) {
    return ErrorHandler(error, error.message, 500, res);
  }
};

// load user
module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    console.log(user);

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// log out user
module.exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
