import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authenticateToken(req, res, next) {     
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
