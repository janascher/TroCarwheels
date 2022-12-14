import UsersServ from './Users.mjs';
import MiniaturesServ from './Miniatures.mjs';
import CartServ from './Cart.mjs';
import ExchangesServ from './Exchanges.mjs';
import Repositories from '../repositories/index.mjs';

import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT,
    max: 10,
    idleTimeoutMillis: 300000,
    connectionTimeoutMillis: 2000,
});

const usersServ = new UsersServ(pool);
const miniaturesServ = new MiniaturesServ(pool);
const cartServ = new CartServ(pool);
const exchangesServ = new ExchangesServ(pool);
const repositories = new Repositories(pool);

export { repositories, usersServ, miniaturesServ, cartServ, exchangesServ };

