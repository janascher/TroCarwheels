import { Router } from "express";
import authenticateToken from "./authtenticate.mjs";
import { miniaturesCtrl } from "../controllers/api/index.mjs";
const routeBrand = Router();

// Brand
routeBrand.get("/", authenticateToken, miniaturesCtrl.getBrands);

export { routeBrand };  

