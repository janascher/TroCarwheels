import { Router } from "express";
import dotenv from "dotenv";
import authenticateToken from "./authtenticate.mjs";
import { usersCtrl } from "../controllers/api/index.mjs";

dotenv.config();
const routeUser = Router();

// Users
routeUser.get("/", authenticateToken, usersCtrl.getUsers);
routeUser.get("/nick/:nick", authenticateToken, usersCtrl.getUsersByNick);
routeUser.get("/:id", authenticateToken, usersCtrl.getUsersById);
routeUser.post("/", usersCtrl.addUser);
routeUser.post("/login", usersCtrl.loginUser);
routeUser.put("/pwd/:id", authenticateToken, usersCtrl.updUserPwd);
routeUser.put("/:id", authenticateToken, usersCtrl.updUser);
routeUser.delete("/:id", authenticateToken, usersCtrl.delUser);
routeUser.put("/reactivate/:id", authenticateToken, usersCtrl.reactivateUser);

export { routeUser };  

