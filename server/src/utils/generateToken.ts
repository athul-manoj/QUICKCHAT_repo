import jwt from "jsonwebtoken";
import { Response } from "express";

const generateTokenAndSetCookie = (userId: string, res: Response) => {
  const token = jwt.sign(
    { userId },               // only what we need
    process.env.JWT_SECRET!,
    { expiresIn: "15d" }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
    secure: false
    // no domain for dev
  });
};

export default generateTokenAndSetCookie;