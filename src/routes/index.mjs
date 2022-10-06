import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { multerUpload } from "./upload.mjs";
import { usersCtrl, miniaturesCtrl, cartCtrl, exchangesCtrl } from "../controllers/api/index.mjs";

dotenv.config();
const route = Router();

// Users
route.get("/users", authenticateToken, usersCtrl.getUsers);
route.get("/users/nick/:nick", authenticateToken, usersCtrl.getUsersByNick);
route.get("/users/:id", authenticateToken, usersCtrl.getUsersById);
route.post("/users", usersCtrl.addUser);
route.post("/users/login", usersCtrl.loginUser);
route.put("/users/pwd/:id", authenticateToken, usersCtrl.updUserPwd);
route.put("/users/:id", authenticateToken, usersCtrl.updUser);
route.delete("/users/:id", authenticateToken, usersCtrl.delUser);
route.put("/users/reactivate/:id", authenticateToken, usersCtrl.reactivateUser);

// Miniatures
route.get("/miniatures", authenticateToken, miniaturesCtrl.getMiniatures);
route.get("/miniatures/:id", authenticateToken, miniaturesCtrl.getMiniaturesById);
route.get("/miniatures/user/:id", authenticateToken, miniaturesCtrl.getMiniaturesByUserId);
route.post("/miniatures/upload/:id", authenticateToken, multerUpload.single('file'), (req, res, next) => {
    try {
    }    
    catch (error) {
        console.log(error)
        return res.sendStatus(500).json({status: 'Error uploading file!'});
    }
    next();
},  miniaturesCtrl.updateImage);

route.post("/miniatures", authenticateToken, miniaturesCtrl.addMiniature);
route.put("/miniatures/:id", authenticateToken, miniaturesCtrl.updMiniature);
route.put("/miniatures/user/:id/:user_id", authenticateToken, miniaturesCtrl.updMiniatureUserId);
route.put("/miniatures/status/:id/:status", authenticateToken, miniaturesCtrl.updMiniatureStatus);
route.put("/miniatures/check/:id/:checked", authenticateToken, miniaturesCtrl.updImgChecked);
route.delete("/miniatures/:id", authenticateToken, miniaturesCtrl.delMiniature);
route.get("/brands", authenticateToken, miniaturesCtrl.getBrands);

// Cart 
route.get("/cart", authenticateToken, cartCtrl.getCarts);
route.get("/cart/:id", authenticateToken, cartCtrl.getCartById);
route.get("/cart/user/:id", authenticateToken, cartCtrl.getCartByUserId);
route.post("/cart", authenticateToken, cartCtrl.addCart);
route.put("/cart/status/:id/:status", authenticateToken, cartCtrl.updCartStatus);
route.delete("/cart/:id", authenticateToken, cartCtrl.delCart);

// Cart Offers
route.get("/cart_offer/:cart_id", authenticateToken, cartCtrl.getCartOffer);
route.post("/cart_offer/:cart_id", authenticateToken, cartCtrl.addCartOffer);
route.put("/cart_offer/status/:cart_id/:user_id/:miniature_id/:status", authenticateToken, cartCtrl.updCartOfferStatus);
route.delete("/cart_offer/:cart_id/:user_id/:miniature_id", authenticateToken, cartCtrl.delCartOffer);

// Exchanges
route.get("/exchanges", authenticateToken, exchangesCtrl.getExchanges);
route.get("/exchanges/:id", authenticateToken, exchangesCtrl.getExchangeById);
route.get("/exchanges/user/:id", authenticateToken, exchangesCtrl.getExchangeByUserId);
route.post("/exchanges", authenticateToken, exchangesCtrl.addExchange);
route.put("/exchanges/status/:id/:status", authenticateToken, exchangesCtrl.updExchangeStatus);
route.put("/exchanges/close/:id", authenticateToken, exchangesCtrl.closeExchange);
route.delete("/exchanges/:id", authenticateToken, exchangesCtrl.delExchange);
route.get("/exchanges/log/:id", authenticateToken, exchangesCtrl.getExchangeLog);
route.post("/exchanges/log/:id", authenticateToken, exchangesCtrl.addExchangeLog);


function authenticateToken(req, res, next) {     
    const token = req.cookies['token'];
    if (token) {
        if (token === null) return res.sendStatus(401);   
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {   
            if (err) return res.sendStatus(403);
            req.user = user;      
            next();
        })
    }else{
        return res.sendStatus(401);
    }
}

export { route };  

