import { Request, Response } from "express";
import UsersModel, { IUsers } from "../models/Users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UsersModel({
      email: req.body.email,
      fullName: req.body.fullName,
      telegram_id: req.body.telegram_id,
      avatarUrl: req.body.avatarUrl,
      permission: req.body.permission,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const userData = user.toObject();

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Register failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user: IUsers | null = await UsersModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Login failed",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const userData = user.toJSON();
    delete userData.passwordHash;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Login failed",
    });
  }
};
