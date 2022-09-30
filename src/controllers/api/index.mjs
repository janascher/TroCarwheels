import UsersCtrl from './Users.mjs';
import MiniaturesCtrl from './Miniatures.mjs';

import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";

const usersCtrl = new UsersCtrl(process.env.TOKEN_SECRET, jwt);
const miniaturesCtrl = new MiniaturesCtrl();

export { usersCtrl, miniaturesCtrl };