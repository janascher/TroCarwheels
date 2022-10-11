
import { exchangesServ } from "../../services/index.mjs";

export default class ExchangesCtrl {

    constructor () {
    }
 
    async getExchanges(req, res) {
        try {    
            const resultado = await exchangesServ.getExchanges();
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

    async getExchangeById(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id}`});
            return ;
        }

        try {    
            const resultado = await exchangesServ.getExchangeById(id);
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

    async getExchangeByUserId(req, res) {
        const search = req.query.search;
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id}`});
            return ;
        }

        try {    
            const resultado = await exchangesServ.getExchangeByUserId(id, search);
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

    async addExchange(req, res) {
        const params = req.body; 

        if(!params) 
        {
            res.status(400).json({message:"Bad request: No info to add!"});
            return;
        }            
        if (typeof params.cart_id !== "string"){
            res.status(400).json({message:`Bad request: invalid cart id: ${params.cart_id}`});
            return; 
        }
        if (typeof params.user_id1 !== "string"){
            res.status(400).json({message:`Bad request: invalid user id1: ${params.user_id1}`});
            return; 
        }
        if (typeof params.miniature_id1 !== "string"){
            res.status(400).json({message:`Bad request: invalid miniature id1: ${params.miniature_id1}`});
            return; 
        }
        if (typeof params.user_id2 !== "string"){
            res.status(400).json({message:`Bad request: invalid user id2: ${params.user_id2}`});
            return; 
        }
        if (typeof params.miniature_id2 !== "string"){
            res.status(400).json({message:`Bad request: invalid miniature id2: ${params.miniature_id2}`});
            return; 
        }

        if (isNaN(parseFloat(params.cart_id))){
            res.status(400).json({message:`Bad request: invalid cart id: ${params.cart_id}`});
            return; 
        }
        if (parseFloat(params.cart_id)<=0){
            res.status(400).json({message:`Bad request: invalid cart id: ${params.cart_id}`});
            return; 
        }

        if (isNaN(parseFloat(params.miniature_id1))){
            res.status(400).json({message:`Bad request: invalid miniature id1: ${params.miniature_id1}`});
            return; 
        }
        if (parseFloat(params.miniature_id1)<=0){
            res.status(400).json({message:`Bad request: invalid miniature id1: ${params.miniature_id1}`});
            return; 
        }
        if (isNaN(parseFloat(params.user_id1))){
            res.status(400).json({message:`Bad request: invalid user id1: ${params.user_id1}`});
            return; 
        }
        if (parseFloat(params.user_id1)<=0){
            res.status(400).json({message:`Bad request: invalid user id1: ${params.user_id1}`});
            return; 
        }


        if (isNaN(parseFloat(params.miniature_id2))){
            res.status(400).json({message:`Bad request: invalid miniature id2: ${params.miniature_id2}`});
            return; 
        }
        if (parseFloat(params.miniature_id2)<=0){
            res.status(400).json({message:`Bad request: invalid miniature id2: ${params.miniature_id2}`});
            return; 
        }
        if (isNaN(parseFloat(params.user_id2))){
            res.status(400).json({message:`Bad request: invalid user id2: ${params.user_id2}`});
            return; 
        }
        if (parseFloat(params.user_id1)<=0){
            res.status(400).json({message:`Bad request: invalid user id2: ${params.user_id2}`});
            return; 
        }


        try {   
            const resultado = await exchangesServ.initExchange(params);
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
    
    async updExchangeStatus(req, res) {
    
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

            const resultado = await exchangesServ.updStatus(id, status);
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

    async delExchange(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id}`});
            return ;
        }

        try {   
            const resultado = await exchangesServ.delExchange(id);
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

    async closeExchange(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for id ${req.params.id}`});
            return ;
        }


        try {   
            const resultado = await exchangesServ.finishExchange(id);
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

    async getExchangeLog(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)){
            res.status(400).json({err: `Invalid value for exchange id ${req.params.id}`});
            return ;
        }

        try {   
            const resultado = await exchangesServ.getExchangeLog(id);
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

    async addExchangeLog(req, res) {
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
        if (typeof params.user_id !== "string"){
            res.status(400).json({message:`Bad request: invalid user id: ${params.user_id}`});
            return; 
        }
        if (typeof params.event !== "string"){
            res.status(400).json({message:`Bad request: invalid event: ${params.event}`});
            return; 
        }
        if (typeof params.rating !== "string"){
            res.status(400).json({message:`Bad request: invalid rating: ${params.rating}`});
            return; 
        }
        if (typeof params.text !== "string"){
            res.status(400).json({message:`Bad request: invalid text: ${params.text}`});
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


        if (isNaN(parseFloat(params.event))){
            res.status(400).json({message:`Bad request: invalid event: ${params.event}`});
            return; 
        }
        if (parseFloat(params.event)<=0){
            res.status(400).json({message:`Bad request: invalid event: ${params.event}`});
            return; 
        }
        if (isNaN(parseFloat(params.rating))){
            res.status(400).json({message:`Bad request: invalid rating: ${params.rating}`});
            return; 
        }
        if (parseFloat(params.rating)<0){
            res.status(400).json({message:`Bad request: invalid rating: ${params.rating}`});
            return; 
        }


        try {   
            const resultado = await exchangesServ.addExchangeLog(id, params);
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
