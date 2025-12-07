import { Request, Response } from "express";
import { authServices } from "./auth.service";

// signupUser
const signupUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.signupUser(req.body);
    const user = result.rows[0];
    delete user.password;
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// signinUser
const signinUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authServices.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: "LogIn Successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  signupUser,
  signinUser,
};
