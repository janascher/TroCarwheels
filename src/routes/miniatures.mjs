import { Router } from "express";
import authenticateToken from "./authtenticate.mjs";
import { miniaturesCtrl } from "../controllers/api/index.mjs";
import { multerUpload } from "./upload.mjs";

const routeMiniature = Router();

// miniatures
routeMiniature.get("/", authenticateToken, miniaturesCtrl.getMiniatures);
routeMiniature.get("/:id", authenticateToken, miniaturesCtrl.getMiniaturesById);
routeMiniature.get("/own/user", authenticateToken, miniaturesCtrl.getMiniaturesByUserId);
routeMiniature.get("/other/users", authenticateToken, miniaturesCtrl.getMiniatureOtherUsers);
routeMiniature.post("/upload/:id", authenticateToken, multerUpload.single('file'), (req, res, next) => {
    try {
    }    
    catch (error) {
        console.log(error)
        return res.sendStatus(500).json({status: 'Error uploading file!'});
    }
    next();
},  miniaturesCtrl.updateImage);

routeMiniature.post("/", authenticateToken, miniaturesCtrl.addMiniature);
routeMiniature.put("/:id", authenticateToken, miniaturesCtrl.updMiniature);
routeMiniature.put("/user/:id/:user_id", authenticateToken, miniaturesCtrl.updMiniatureUserId);
routeMiniature.put("/status/:id/:status", authenticateToken, miniaturesCtrl.updMiniatureStatus); // Cria Cart
routeMiniature.put("/check/:id/:checked", authenticateToken, miniaturesCtrl.updImgChecked);
routeMiniature.delete("/:id", authenticateToken, miniaturesCtrl.delMiniature);
routeMiniature.put("/makeavailable/:id", authenticateToken, miniaturesCtrl.makeAvailable); // Cria Cart

export { routeMiniature };  

