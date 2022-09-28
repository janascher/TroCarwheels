import UsersCtrl from './Users.mjs';
import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";

const usersCtrl = new UsersCtrl(process.env.TOKEN_SECRET, jwt);

export { usersCtrl };