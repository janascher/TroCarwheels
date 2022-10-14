
import { cartServ } from "../../services/index.mjs";

export default class CartCtrl {

    constructor () {
    }
 
    async getCarts(req, res) {
        try {
            const search = req.query.search;
            const resultado = await cartServ.getCarts(search);
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

    async getCartById(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id}`});
            return ;
        }

        try {    
            const resultado = await cartServ.getCartById(id);
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
    async getFindMiniatureId(req, res) {
        const id = parseInt(req.params.id_miniature);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id_miniature}`});
            return ;
        }

        try {    
            const resultado = await cartServ.getFindMiniatureId(id);
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

    async getCartByUserId(req, res) {
        const user_id = String(req.user.id.user_id);
        console.log(user_id)
        const id = parseInt(user_id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${user_id}`});
            return ;
        }

        try {    
            const resultado = await cartServ.getCartByUserId(id);
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

    async getCartByOtherUserId(req, res) {
        const user_id = String(req.user.id.user_id);
        const search = req.query.search;
        console.log(user_id)
        const id = parseInt(user_id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${user_id}`});
            return ;
        }

        try {    
            const resultado = await cartServ.getCartByOtherUserId(id,search);
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

    async addCart(req, res) {
        const params = req.body; 

        if(!params) 
        {
            res.status(400).json({message:"Bad request: No info to add!"});
            return;
        }            
        if (typeof params.user_id !== "string"){
            res.status(400).json({message:`Bad request: invalid user id: ${params.user_id}`});
            return; 
        }
        if (typeof params.miniature_id !== "string"){
            res.status(400).json({message:`Bad request: invalid miniature id: ${params.miniature_id}`});
            return; 
        }
        if (isNaN(parseFloat(params.miniature_id))){
            res.status(400).json({message:`Bad request: invalid miniature id: ${params.miniature_id}`});
            return; 
        }
        if (parseFloat(params.miniature_id)<=0){
            res.status(400).json({message:`Bad request: invalid miniature id: ${params.miniature_id}`});
            return; 
        }
        if (isNaN(parseFloat(params.user_id))){
            res.status(400).json({message:`Bad request: invalid user id: ${params.user_id}`});
            return; 
        }
        if (parseFloat(params.user_id)<=0){
            res.status(400).json({message:`Bad request: invalid user id: ${params.user_id}`});
            return; 
        }

        try {   
            const resultado = await cartServ.addCart(params);
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
    
    async updCartStatus(req, res) {
    
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

            const resultado = await cartServ.updStatus(id, status);
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

    async delCart(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id}`});
            return ;
        }

        try {   
            const resultado = await cartServ.delCart(id);
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

    async getCartOffer(req, res) {
        const id = parseInt(req.params.cart_id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for cart id ${req.params.cart_id}`});
            return ;
        }

        try {    
            const resultado = await cartServ.getCartOffer(id);
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

    async getCartIDOffer(req, res) {
        const id = parseInt(req.params.miniature_id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for cart id ${req.params.miniature_id}`});
            return ;
        }

        try {    
            const resultado = await cartServ.getCartIDOffer(id);
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

    async addCartOffer(req, res) {
        const id = parseInt(req.params.cart_id);
        const user_id = String(req.user.id.user_id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for cart id ${req.params.cart_id}`});
            return ;
        }

        const params = req.body; 

        if(!params) 
        {
            res.status(400).json({message:"Bad request: No info to add!"});
            return;
        }
        if (typeof params.miniature_id !== "string"){
            res.status(400).json({message:`Bad request: invalid miniature id: ${params.miniature_id}`});
            return; 
        }
        if (isNaN(parseFloat(params.miniature_id))){
            res.status(400).json({message:`Bad request: invalid miniature id: ${params.miniature_id}`});
            return; 
        }
        if (parseFloat(params.miniature_id)<=0){
            res.status(400).json({message:`Bad request: invalid miniature id: ${params.miniature_id}`});
            return; 
        }

        try {   
            const resultado = await cartServ.addCartOffer(id, user_id, params);
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

    async updCartOfferStatus(req, res) {
        try {   
            const id = parseInt(req.params.cart_id);
            const user_id = parseInt(req.params.user_id);      
            const miniature_id = parseInt(req.params.miniature_id);      

            if (isNaN(id)){
                res.status(400).json({err: `Invalid value for cart id ${req.params.cart_id}`});
                return ;
            }
            if (isNaN(user_id)){
                res.status(400).json({err: `Invalid value for user_id ${req.params.user_id}`});
                return ;
            }
            if (isNaN(miniature_id)){
                res.status(400).json({err: `Invalid value for miniature_id ${req.params.miniature_id}`});
                return ;
            }       
            const status = parseInt(req.params.status);
            if (isNaN(status)){
                res.status(400).json({err: `Invalid value for status ${req.params.status}`});
                return ;
            }

            const resultado = await cartServ.updCartOfferStatus(id, status, user_id, miniature_id);
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


    async delCartOffer(req, res) {
        const id = parseInt(req.params.cart_id);      
        const user_id = parseInt(req.params.user_id);      
        const miniature_id = parseInt(req.params.miniature_id);      
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for cart id ${req.params.cart_id}`});
            return ;
        }
        if (isNaN(user_id)){
            res.status(400).json({err: `Invalid value for user_id ${req.params.user_id}`});
            return ;
        }
        if (isNaN(miniature_id)){
            res.status(400).json({err: `Invalid value for miniature_id ${req.params.miniature_id}`});
            return ;
        }
        try {   
            const resultado = await cartServ.delCartOffer(id, user_id, miniature_id);
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
