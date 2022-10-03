import { repositories } from './index.mjs';

export default class cartServ {
    #db    
    constructor (_db){
        this.#db = _db;
    }

    async getCarts(){
        try {
            const data = await repositories.cart.getData(this.#db);
            return {data: data, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message};
        }  
    }

    async getCartById(_id){
        try {
            const data = await repositories.cart.getDataById(this.#db, _id);
            return {data: data, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async getCartByUserId(_id){
        try {
            const data = await repositories.cart.getDataByUserId(this.#db, _id);
            return {data: data, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async addCart(_params){       
        const params = _params;
        try {
            const data = await repositories.cart.addData(this.#db, params);
            const cart_id = data[0].id;
            return {data: cart_id, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async updStatus(_id, _status){       
        try {
            const data = await repositories.cart.updStatus(this.#db, _status, _id);
            if (data.rowCount>0){
                return {data: [], err: null, errCode: null};
            }else {
                return {data: [], err: 'No records have been updated.', errCode: 400};
            }
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }    

    async delCart(_id){       
        try {
            const data = await repositories.cart.delData(this.#db, _id);
            if (data.rowCount>0){
                return {data: [], err: null, errCode: null};
            }else{
                return {data: [], err: 'No cart have been deleted.', errCode: 400};
            }
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }      

    async addCartOffer(_id, _params){       
        const params = _params;
        try {
            const data = await repositories.cart.addCartOffer(this.#db, _id, params);
            const cart_id = data[0].cart_id;
            return {data: [cart_id], err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async getCartOffer(_id){
        try {
            const data = await repositories.cart.getOffersId(this.#db, _id);
            return {data: data, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }
    
    async updCartOfferStatus(_id, _status, _user_id, _miniature_id){       
        try {
            const data = await repositories.cart.updCartOfferStatus(this.#db, _status, _id, _user_id, _miniature_id);
            if (data.rowCount>0){
                return {data: [], err: null, errCode: null};
            }else {
                return {data: [], err: 'No records have been updated.', errCode: 400};
            }
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }  

    async delCartOffer(_id, _user_id, _miniature_id){       
        try {
            const data = await repositories.cart.delCartOffer(this.#db, _id, _user_id, _miniature_id);
            if (data.rowCount>0){
                return {data: [], err: null, errCode: null};
            }else{
                return {data: [], err: 'No cart have been deleted.', errCode: 400};
            }
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }    
}

