
import { miniaturesServ } from "../../services/index.mjs";

export default class MiniaturesCtrl {

    constructor () {
    }
 
    async getMiniatures(req, res) {
        try {    
            const resultado = await miniaturesServ.getMiniatures();
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

    async getBrands(req, res) {
        try {    
            const resultado = await miniaturesServ.getBrands();
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

    async getMiniaturesById(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id}`});
            return ;
        }

        try {    
            const resultado = await miniaturesServ.getMiniatureById(id);
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

    async getMiniaturesByUserId(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id}`});
            return ;
        }

        try {    
            const resultado = await miniaturesServ.getMiniatureByUserId(id);
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

    async updateImage(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id}`});
            return ;
        }

        try {   
            const path = req.newName;
            console.log(path)
            const resultado = await miniaturesServ.updateImage(id, path);
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

    async addMiniature(req, res) {
        const params = req.body;
        const user_id = String(req.user.id.user_id);
        if(!params) 
        {
            res.status(400).json({message:"Bad request: No info to add!"});
            return;
        }            
        // if (typeof params.user_id !== "string"){
        //     res.status(400).json({message:`Bad request: invalid user id: ${params.user_id}`});
        //     return; 
        // }
        if (typeof params.brand_id !== "string"){
            res.status(400).json({message:`Bad request: invalid brand id: ${params.brand_id}`});
            return; 
        }
        if (typeof params.model !== "string"){
            res.status(400).json({message:`Bad request: invalid miniature model: ${params.model}`});
            return; 
        }
        if (typeof params.color !== "string"){
            res.status(400).json({message:`Bad request: invalid miniature color ${params.color}`});
            return; 
        }
        if (typeof params.description !== "string"){
            res.status(400).json({message:`Bad request: invalid user birthday: ${params.description}`});
            return; 
        }
        if (isNaN(parseFloat(params.brand_id))){
            res.status(400).json({message:`Bad request: invalid brand id: ${params.brand_id}`});
            return; 
        }
        if (parseFloat(params.brand_id)<=0){
            res.status(400).json({message:`Bad request: invalid brand id: ${params.brand_id}`});
            return; 
        }
        // if (isNaN(parseFloat(params.user_id))){
        //     res.status(400).json({message:`Bad request: invalid user id: ${params.user_id}`});
        //     return; 
        // }
        // if (parseFloat(params.user_id)<=0){
        //     res.status(400).json({message:`Bad request: invalid user id: ${params.user_id}`});
        //     return; 
        // }

        try {   
            const resultado = await miniaturesServ.addMiniature(params, user_id);
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
    
    async updMiniature(req, res) {
        const params = req.body; 
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id}`});
            return ;
        }

        if(!params) 
        {
            res.status(400).json({message:"Bad request: No info to add!"});
            return;
        }            
        if (typeof params.brand_id !== "string"){
            res.status(400).json({message:`Bad request: invalid brand id: ${params.brand_id}`});
            return; 
        }
        if (typeof params.model !== "string"){
            res.status(400).json({message:`Bad request: invalid miniature model: ${params.model}`});
            return; 
        }
        if (typeof params.color !== "string"){
            res.status(400).json({message:`Bad request: invalid miniature color ${params.color}`});
            return; 
        }
        if (typeof params.description !== "string"){
            res.status(400).json({message:`Bad request: invalid user birthday: ${params.description}`});
            return; 
        }
        if (isNaN(parseFloat(params.brand_id))){
            res.status(400).json({message:`Bad request: invalid brand id: ${params.brand_id}`});
            return; 
        }
        if (parseFloat(params.brand_id)<=0){
            res.status(400).json({message:`Bad request: invalid brand id: ${params.brand_id}`});
            return; 
        }

        try {   
            const resultado = await miniaturesServ.updMiniature(params, id);
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

    async delMiniature(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id}`});
            return ;
        }

        try {   
            const resultado = await miniaturesServ.delMiniature(id);
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

    async updMiniatureUserId(req, res) {
 
        try {   
            const id = parseInt(req.params.id);
            if (isNaN(id)){
                res.status(400).json({err: `Invalid value for id ${req.params.id}`});
                return ;
            }
    
            const user_id = parseInt(req.params.user_id);
            if (isNaN(user_id)){
                res.status(400).json({err: `Invalid value for user id ${req.params.user_id}`});
                return ;
            }

            const resultado = await miniaturesServ.updUserId(id, user_id);
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

    async updMiniatureStatus(req, res) {
    
        try {   
            const id = parseInt(req.params.id);
            if (isNaN(id)){
                res.status(400).json({err: `Invalid value for id ${req.params.id}`});
                return ;
            }
    
            const status = parseInt(req.params.status);
            if (isNaN(status)){
                res.status(400).json({err: `Invalid value for status ${req.params.status}`});
                return ;
            }

            const resultado = await miniaturesServ.updStatus(id, status);
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


    async updImgChecked(req, res) {
        try {   
            const id = parseInt(req.params.id);
            if (isNaN(id)){
                res.status(400).json({err: `Invalid value for id ${req.params.id}`});
                return ;
            }
    
            const checked = parseInt(req.params.checked);
            if (isNaN(checked)){
                res.status(400).json({err: `Invalid value for checked ${req.params.checked}`});
                return ;
            }

            const resultado = await miniaturesServ.updImgChecked(id, checked);
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


}