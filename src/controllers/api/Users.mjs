
import { usersServ } from "../../services/index.mjs";
import { usersCtrl } from "./index.mjs";
import url from "url";

export default class UsersCtrl {
    #token
    #jwt

    constructor (_token_secret, _jwt) {
        this.#token = _token_secret;
        this.#jwt = _jwt;
    }

    async getUsers(req, res) {
        try {    
            const resultado = await usersServ.getUsers();
            if (resultado.err !== null){ 
                res.status(500).json(resultado);
            } else{
                res.status(200).json(resultado);
            }     
        }
        catch(err){
            res.status(500).json({message: err.message});
        }   
    }

    async getUsersById(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id}`});
            return ;
        }

        try {   
            const resultado = await usersServ.getUsersById(id);
            if (resultado.err !== null){ 
                res.status(resultado.errCode).json(resultado);
            } else{
                res.status(200).json(resultado);
            }     
        }
        catch(err){
            res.status(500).json({message: err.message});
        }   
    }

    async getUsersByNick(req, res) {
        const nick = req.params.nick;
        console.log(nick)
        try {   
            const resultado = await usersServ.getUsersByNick(nick);
            if (resultado.err !== null){ 
                res.status(resultado.errCode).json(resultado);
            } else{
                res.status(200).json(resultado);
            }     
        }
        catch(err){
            res.status(500).json({message: err.message});
        }   
    }

    async addUser(req, res) {
        try {    
            const params = req.body;
            if(!params) 
            {
                res.status(400).json({message:"Bad request: No info to add!"});
                return;
            }            
            if (typeof params.name !== "string"){
                res.status(400).json({message:`Bad request: invalid user name: ${params.name}`});
                return; 
            }
            if (typeof params.email !== "string"){
                res.status(400).json({message:`Bad request: invalid user email: ${params.email}`});
                return; 
            }
            if (typeof params.nick !== "string"){
                res.status(400).json({message:`Bad request: invalid user nick: ${params.nick}`});
                return; 
            }
            if (typeof params.password !== "string"){
                res.status(400).json({message:`Bad request: invalid user password`});
                return; 
            }
            if (typeof params.birth_date !== "string"){
                res.status(400).json({message:`Bad request: invalid user birthday: ${params.birth_date}`});
                return; 
            }
            if (typeof params.address !== "string"){
                res.status(400).json({message:`Bad request: invalid user address: ${params.address}`});
                return; 
            }
            if (typeof params.num !== "string"){
                res.status(400).json({message:`Bad request: invalid user address num: ${params.num}`});
                return; 
            }
            if (typeof params.complement !== "string"){
                res.status(400).json({message:`Bad request: invalid user address complement: ${params.complement}`});
                return; 
            }
            if (typeof params.city !== "string"){
                res.status(400).json({message:`Bad request: invalid user city: ${params.city}`});
                return; 
            }
            if (typeof params.state !== "string"){
                res.status(400).json({message:`Bad request: invalid user state: ${params.state}`});
                return; 
            }
            if (typeof params.district !== "string"){
                res.status(400).json({message:`Bad request: invalid user district: ${params.district}`});
                return; 
            }
            if (typeof params.zip !== "string"){
                res.status(400).json({message:`Bad request: invalid user zip code: ${params.zip}`});
                return; 
            }
            if (typeof params.phone !== "string"){
                res.status(400).json({message:`Bad request: invalid user phone number: ${params.phone}`});
                return; 
            }

            const resultado = await usersServ.addUsers(params);
            const user_id = resultado.data;
            if (resultado.err !== null){ 
                res.status(resultado.errCode).json(resultado);
            } else{
                const token = usersCtrl.generateAccessToken({ id: user_id });
                res.status(200).json({id: user_id, token: token});
            }     
        }
        catch(err){
            res.status(500).json({message: err.message});
        }   
    }

    async updUser(req, res) {
        try {    
            const params = req.body;
            const id = parseInt(req.params.id);
            if (isNaN(id)){
                res.status(400).json({message:`Bad request: invalid user id: ${req.params.id}`});
                return;
            }  
            if(!params) 
            {
                res.status(400).json({message:"Bad request: No info to add!"});
                return;
            }            
            if (typeof params.name !== "string"){
                res.status(400).json({message:`Bad request: invalid user name: ${params.name}`});
                return; 
            }
            if (typeof params.email !== "string"){
                res.status(400).json({message:`Bad request: invalid user email: ${params.email}`});
                return; 
            }
            if (typeof params.nick !== "string"){
                res.status(400).json({message:`Bad request: invalid user nick: ${params.nick}`});
                return; 
            }
            if (typeof params.birth_date !== "string"){
                res.status(400).json({message:`Bad request: invalid user birthday: ${params.birth_date}`});
                return; 
            }
            if (typeof params.address !== "string"){
                res.status(400).json({message:`Bad request: invalid user address: ${params.address}`});
                return; 
            }
            if (typeof params.num !== "string"){
                res.status(400).json({message:`Bad request: invalid user address num: ${params.num}`});
                return; 
            }
            if (typeof params.complement !== "string"){
                res.status(400).json({message:`Bad request: invalid user address complement: ${params.complement}`});
                return; 
            }
            if (typeof params.city !== "string"){
                res.status(400).json({message:`Bad request: invalid user city: ${params.city}`});
                return; 
            }
            if (typeof params.state !== "string"){
                res.status(400).json({message:`Bad request: invalid user state: ${params.state}`});
                return; 
            }
            if (typeof params.district !== "string"){
                res.status(400).json({message:`Bad request: invalid user district: ${params.district}`});
                return; 
            }
            if (typeof params.zip !== "string"){
                res.status(400).json({message:`Bad request: invalid user zip code: ${params.zip}`});
                return; 
            }
            if (typeof params.phone !== "string"){
                res.status(400).json({message:`Bad request: invalid user phone number: ${params.phone}`});
                return; 
            }

            const resultado = await usersServ.updUsers(params, id);
            if (resultado.err !== null){ 
                res.status(resultado.errCode).json(resultado);
            } else{
                res.status(201).json(resultado);
            }     
        }
        catch(err){
            res.status(500).json({message: err.message});
        }   
    }

    async delUser(req, res) {

        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id}`});
            return ;
        }

        try {   
            const resultado = await usersServ.delUser(id);
            if (resultado.err !== null){ 
                res.status(resultado.errCode).json(resultado);
            } else{
                res.status(200).json(resultado);
            }     
        }
        catch(err){
            res.status(500).json({message: err.message});
        }   
    }

    
    async reactivateUser(req, res) {

        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id}`});
            return ;
        }

        try {   
            const resultado = await usersServ.reactivateUser(id);
            if (resultado.err !== null){ 
                res.status(resultado.errCode).json(resultado);
            } else{
                res.status(200).json(resultado);
            }     
        }
        catch(err){
            res.status(500).json({message: err.message});
        }   
    }

    async updUserPwd(req, res) {

        const params = req.body;
        const user_id = parseInt(req.params.id);
        const pwd = params.pwd;

        if (isNaN(user_id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id}`});
            return ;
        }
        if (typeof params.pwd !== "string"){
            res.status(400).json({message:`Bad request: invalid user password.`});
            return; 
        }

        try {   
            const resultado = await usersServ.updUserPwd(user_id, pwd);
            if (resultado.err !== null){ 
                res.status(resultado.errCode).json(resultado);
            } else{

                const user_id = resultado.data;
                const token = usersCtrl.generateAccessToken({ id: user_id });
                resultado.data.token = token;
                res.status(200).json(resultado);
            }     
        }
        catch(err){
            res.status(500).json({message: err.message});
        }   
    }

    async loginUser(req, res) {

        const params = req.body;
        const email = params.email;
        const pwd = params.pwd;

        try {   
            const resultado = await usersServ.loginUser(email, pwd);
            if (resultado.err !== null){ 
                res.status(resultado.errCode).json(resultado);
            } else{

                const user_id = resultado.data;
                const token = usersCtrl.generateAccessToken({ id: user_id });
                resultado.data.token = token;
                res.status(200).json(resultado.data);
            }     
        }
        catch(err){
            res.status(500).json({message: err.message});
        }   
    }

    generateAccessToken(_user_id) {    
        const user_id = _user_id.id;
        return this.#jwt.sign(_user_id, this.#token, { expiresIn: '1800s' });
    }    

}
