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
            const exchange_id = data.rows[0].id;
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

    async getExchangeLog(_exchange_id){       
        try {
            const data = await repositories.exchanges.getExchangeLog(this.#db, _exchange_id);
            return {data: data.rows, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async addExchangeLog(_id, _params){       
        const params = _params;
        try {
            const data = await repositories.exchanges.addExchangeLog(this.#db, _id, params);
            const exchange_id = data.rows[0].id;
            return {data: exchange_id, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async initExchange(_params){
        const client = await this.#db.connect();  
        try {
            const params = _params;
            const cart_id = _params.cart_id;
            const user_id2 = _params.user_id2;
            const miniature_id1 = _params.miniature_id1;
            const miniature_id2 = _params.miniature_id2;

            const logParams = {
                user_id: _params.user_id1,
                event: 10,
                rating: 0,
                text: "Troca iniciada"
            };

            await client.query('BEGIN');
                const exchange_id = await repositories.exchanges.addData(client, params);
                if (exchange_id.rowcount<=0){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error generating exchange. Adding Exchange.', errCode: 500};    
                }

                const dataCart = await repositories.cart.updStatus(client, 1, cart_id);
                if (dataCart.rowcount<=0){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error generating exchange. Changing Cart Status.', errCode: 500};    
                }

                const dataCartOffer = await repositories.cart.updCartOfferStatus(client, 1, cart_id, user_id2, miniature_id2);
                if (dataCartOffer.rowcount<=0){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error generating exchange. Changing Cart Offer Status.', errCode: 500};    
                }

                const dataMini1 = await repositories.miniatures.updStatus(client, miniature_id1, 30);
                if (dataMini1.rowcount<=0){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error generating exchange. Changing Miniature1 Status.', errCode: 500};    
                }

                const dataMini2 = await repositories.miniatures.updStatus(client, miniature_id2, 30);
                if (dataMini2.rowcount<=0){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error generating exchange. Changing Miniature2 Status.', errCode: 500};    
                }

                const dataLog = await repositories.exchanges.addExchangeLog(client, exchange_id.rows[0].id, logParams);
                if (dataLog.rowcount<=0){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error generating exchange. Adding Log.', errCode: 500};    
                }

            await client.query('COMMIT');
            return {data: exchange_id.rows[0].id, err: null, errCode: null};        
        }
        catch(err){
            await client.query('ROLLBACK');
            return {data: [], err: err.message, errCode: 500};
        } 
        finally{
            client.release();
        }        
    }

    async finishExchange(_id){
        const client = await this.#db.connect();  
        try {
            await client.query('BEGIN');
                const data = await repositories.exchanges.getDataById(client, _id);
                if (data===[]){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error closing exchange. Getting Exchange Data.', errCode: 500};    
                }

                const cart_id = data[0].cart_id;
                const user_id1 = data[0].user_id1;
                const user_id2 = data[0].user_id2;
                const miniature_id1 = data[0].miniature_id1;
                const miniature_id2 = data[0].miniature_id2;
    
                const logParams = {
                    user_id: user_id1,
                    event: 80,
                    rating: 0,
                    text: "Troca finalizada"
                };

                const dataCart = await repositories.cart.updStatus(client, 2, cart_id);
                if (dataCart.rowcount<=0){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error closing exchange. Changing Cart Status.', errCode: 500};    
                }

                const dataCartOffer = await repositories.cart.updCartOfferStatus(client, 2, cart_id, user_id2, miniature_id2);
                if (dataCartOffer.rowcount<=0){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error closing exchange. Changing Cart Offer Status.', errCode: 500};    
                }

                const dataMini1 = await repositories.miniatures.updStatus(client, miniature_id1, 10);
                if (dataMini1.rowcount<=0){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error closing exchange. Changing Miniature1 Status.', errCode: 500};    
                }

                const dataUser1 = await repositories.miniatures.updUserId(client, miniature_id1, user_id2);
                if (dataUser1.rowcount<=0){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error closing exchange. Changing Miniature1 User Id.', errCode: 500};    
                }

                const dataMini2 = await repositories.miniatures.updStatus(client, miniature_id2, 10);
                if (dataMini2.rowcount<=0){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error closing exchange. Changing Miniature2 Status.', errCode: 500};    
                }

                const dataUser2 = await repositories.miniatures.updUserId(client, miniature_id2, user_id1);
                if (dataUser2.rowcount<=0){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error closing exchange. Changing Miniature2 User Id.', errCode: 500};    
                }

                const exchangeStatus = await repositories.exchanges.updStatus(client, 2, _id);
                if (exchangeStatus.rowcount<=0){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error closing exchange. Changing Exchange Status.', errCode: 500};    
                }

                const dataLog = await repositories.exchanges.addExchangeLog(client, _id, logParams);
                if (dataLog.rowcount<=0){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error closing exchange. Adding Log.', errCode: 500};    
                }

            await client.query('COMMIT');
            return {data: _id, err: null, errCode: null};        
        }
        catch(err){
            await client.query('ROLLBACK');
            return {data: [], err: err.message, errCode: 500};
        } 
        finally{
            client.release();
        }        
    }


}

