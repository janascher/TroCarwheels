import UsersCtrl from './Users.mjs';
import CartCtrl from './Cart.mjs';
import ExchangesCtrl from './Exchanges.mjs';
import MiniaturesCtrl from './Miniatures.mjs';

import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";

const usersCtrl = new UsersCtrl(process.env.TOKEN_SECRET, jwt);
const cartCtrl = new CartCtrl();
const exchangesCtrl = new ExchangesCtrl();
const miniaturesCtrl = new MiniaturesCtrl();

export { usersCtrl, miniaturesCtrl, cartCtrl, exchangesCtrl };