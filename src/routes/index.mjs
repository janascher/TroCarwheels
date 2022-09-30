import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { multerUpload } from "./upload.mjs";
import { usersCtrl, miniaturesCtrl } from "../controllers/api/index.mjs";

dotenv.config();
const route = Router();

// Users
route.post("/users", usersCtrl.addUser);
route.get("/users", usersCtrl.getUsers);
route.get("/users/login", usersCtrl.loginUser);
route.get("/users/nick/:nick", usersCtrl.getUsersByNick);
route.get("/users/:id", usersCtrl.getUsersById);
route.post("/users", usersCtrl.addUser);
route.put("/users/pwd/:id", usersCtrl.updUserPwd);
route.put("/users/:id", usersCtrl.updUser);
route.delete("/users/:id", usersCtrl.delUser);
route.put("/users/reactivate/:id", usersCtrl.reactivateUser);
//route.get("/users", authenticateToken, usersCtrl.getUsers);

// Miniatures
route.get("/miniatures", miniaturesCtrl.getMiniatures);
route.get("/miniatures/:id", miniaturesCtrl.getMiniaturesById);
route.get("/miniatures/user/:id", miniaturesCtrl.getMiniaturesByUserId);
route.post("/miniatures/upload/:id", multerUpload.single('file'), (req, res, next) => {
    try {
    }    
    catch (error) {
        return res.sendStatus(500).json({status: 'Error uploading file!'});
    }
    next();
},  miniaturesCtrl.updateImage);

route.post("/miniatures", miniaturesCtrl.addMiniature);
route.put("/miniatures/:id", miniaturesCtrl.updMiniature);
route.put("/miniatures/user/:id/:user_id", miniaturesCtrl.updMiniatureUserId);
route.put("/miniatures/status/:id/:status", miniaturesCtrl.updMiniatureStatus);
route.put("/miniatures/check/:id/:checked", miniaturesCtrl.updImgChecked);
route.delete("/miniatures/:id", miniaturesCtrl.delMiniature);


// Cart 


// Exchange



function authenticateToken(req, res, next) {     
    const authHeader = req.headers['authorization'];
//    const token = authHeader && authHeader.split(' ')[1];
    const token = authHeader;
  
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {   
        if (err) return res.sendStatus(403);
        req.user = user;      
        next();
    })
}


export { route };  

