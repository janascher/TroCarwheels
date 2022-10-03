import { repositories } from './index.mjs';

export default class ExchangesServ {
    #db    
    constructor (_db){
        this.#db = _db;
    }

    async getExchanges(){
        try {
            const data = await repositories.exchanges.getData(this.#db);
            return {data: data, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message};
        }  
    }

    async getExchangeById(_id){
        try {
            const data = await repositories.exchanges.getDataById(this.#db, _id);
            return {data: data, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async getExchangeByUserId(_id){
        try {
            const data = await repositories.exchanges.getDataByUserId(this.#db, _id);
            return {data: data, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async addExchange(_params){       
        const params = _params;
        try {
            const data = await repositories.exchanges.addData(this.#db, params);
            const exchange_id = data[0].id;
            return {data: exchange_id, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async updStatus(_id, _status){       
        try {
            const data = await repositories.exchanges.updStatus(this.#db, _status, _id);
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

    async delExchange(_id){       
        try {
            const data = await repositories.exchanges.delData(this.#db, _id);
            if (data.rowCount>0){
                return {data: [], err: null, errCode: null};
            }else{
                return {data: [], err: 'No exchange have been deleted.', errCode: 400};
            }
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }      

}

