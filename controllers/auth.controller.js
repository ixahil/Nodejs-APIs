import AsyncHandler from "../middleware/asyncHandler.js";
import { User } from "../models/user.model.js";
import { OTP } from "../models/otp.model.js";
import AppResponse from "../utils/AppResponse.js";
import { AppError } from "../utils/AppError.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const cookieOptions = {
  expires: new Date(Date.now + 900000), // 15Min
  maxAge: 900000, // 15M
  httpOnly: true,
};

const register = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['Auth']
  /*
      #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new user.',
            schema: { $ref: '#/definitions/RegisterRequest' }
        } /*
  /* #swagger.responses[200] = {
            description: 'Register User',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser)
    throw new AppError(400, "User already exists, please login!");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    isEmailVerified: false, // initially false
  });

  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  let otpResult = await OTP.findOne({ otp });

  while (otpResult) {
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
    });

    otpResult = await OTP.findOne({ otp });
  }

  const otpBody = await OTP.create({ user: user.id, otp });

  const { _id, password: userPassword, ...resUser } = user._doc;

  const response = new AppResponse(
    201,
    resUser,
    "OTP has sent on your email please verify"
  );

  return res.status(201).json(response);
});

const verify = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['Auth']
  /*
      #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new user.',
            schema: { otp: 1234, email:"example@example.com" }
        } /*
  /* #swagger.responses[200] = {
            description: 'Verify OTP',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const { otp, email } = req.body;

  const user = await User.findOne({ email }).select("-password");

  if (!user) {
    throw new AppError(400, "Invalid credentials!");
  }

  if (user.isEmailVerified) {
    throw new AppError(400, "Email is already verified!");
  }

  const otpResult = await OTP.findOneAndDelete({ otp, user: user.id });

  if (!otpResult) {
    throw new AppError(400, "Invalid OTP!");
  }

  user.isEmailVerified = true;
  await user.save();

  res
    .status(200)
    .json(new AppResponse(200, user, "Email verified successfully!"));
});

const resendVerification = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['Auth']
  /*
      #swagger.parameters['body'] = {
            in: 'body',
            description: 'Resend Verification.',
            schema: { email:"example@example.com" }
        } /*
  /* #swagger.responses[200] = {
            description: 'Resend Verification Email',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new AppError(400, "Email is not registered!");

  await OTP.findOneAndDelete({ user: user._id });

  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  let existingOTP = await OTP.findOne({ otp });

  while (existingOTP) {
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    existingOTP = await OTP.findOne({ otp });
  }

  const otpBody = await OTP.create({ otp, user: user.id });

  res.status(200).json(new AppResponse(200, null, "OTP sent to your mail"));
});

const login = AsyncHandler(async (req, res) => {
  // #swagger.tags = ['Auth']
  /*
      #swagger.parameters['body'] = {
            in: 'body',
            description: 'Resend Verification.',
            schema: { $ref: '#/definitions/RegisterRequest' }
        } /*
  /* #swagger.responses[200] = {
            description: 'Login User',
            schema: { $ref: '#/definitions/SuccessResponse' }
    } */

  /* #swagger.responses[400] = {
          description: 'Bad Request.',
          schema: { $ref: '#/definitions/ErrorResponse' }
  } */

  const { email, password } = req.body;

  if (!email || !password) throw new AppError(400, "Invalid Credentials");

  const user = await User.findOne({ email });

  if (!user) throw new AppError(400, "Invalid Credentials");

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) throw new AppError(400, "Invalid Credentials");

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  const { _id, password: userPassword, ...resUser } = user._doc;

  res
    .status(200)
    .cookie("AccessToken", token, cookieOptions)
    .json(new AppResponse(200, { ...resUser, AccessToken: token }));
});

const authController = {
  register,
  verify,
  login,
  resendVerification,
};

export default authController;
