import { repositories } from './index.mjs';

export default class MiniaturesServ {
    #db    
    constructor (_db){
        this.#db = _db;
    }

    async getMiniatures(){
        try {
            const data = await repositories.miniatures.getData(this.#db);
            return {data: data, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message};
        }  
    }

    async getBrands(){
        try {
            const data = await repositories.miniatures.getBrands(this.#db);
            return {data: data, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message};
        }  
    }

    async getMiniatureById(_id){
        try {
            const data = await repositories.miniatures.getDataById(this.#db, _id);
            return {data: data, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async getMiniatureByUserId(_id){
        try {
            const data = await repositories.miniatures.getDataByUserId(this.#db, _id);
            return {data: data, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async getMiniaturesOtherUsers(_id){
        try {
            const data = await repositories.miniatures.getMiniaturesOtherUsers(this.#db, _id);
            return {data: data, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async addMiniature(_params, _user_id){
        const params = _params;
        try {
            const data = await repositories.miniatures.addData(this.#db, params, _user_id);
            const miniature_id = data[0].id;
            return {data: miniature_id, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async updMiniature(_params, _id){       
        const params = _params;

        try {
            const data = await repositories.miniatures.updData(this.#db, params, _id);
            if (data.rowCount>0){
                return {data: [], err: null, errCode: null};
            }else{
                return {data: [], err: 'No miniatures have been updated.', errCode: 400};
            }    
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async delMiniature(_id){       
        try {
            const data = await repositories.miniatures.delData(this.#db, _id);
            if (data.rowCount>0){
                return {data: [], err: null, errCode: null};
            }else{
                return {data: [], err: 'No miniatures have been deleted.', errCode: 400};
            }
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }
    
    async updImgChecked(_id, _check){       
        try {
            const data = await repositories.miniatures.imgCheck(this.#db, _id, _check);
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

    async updUserId(_id, _user_id){       
        try {
            const data = await repositories.miniatures.updUserId(this.#db, _id, _user_id);
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

    async updStatus(_id, _status){       
        try {
            const data = await repositories.miniatures.updStatus(this.#db, _id, _status);
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
        
    
    async updateImage(_id, _path){       
        try {
            const data = await repositories.miniatures.updImage(this.#db, _path, _id);
            if (data.rowCount>0){
                return {data: [], err: null, errCode: null};
            }else {
                return {data: [], err: 'No image link has been updated.', errCode: 400};
            }
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async makeAvailable(_id, _user_id){
        const client = await this.#db.connect();  
        try {
            const params ={ user_id: _user_id,
                            miniature_id: _id
                         };

            await client.query('BEGIN');
                const status_mini = await repositories.miniatures.getStatusById(client, _id);
                if (status_mini.rows !== 1 ){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error generating Cart. Select Miniature.', errCode: 500};    
                }
                
                if (status_mini.row[0].status > 10 ){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error generating Cart. Carrinho Indisponível para Troca.', errCode: 500};    
                }

                const cart_id = await repositories.cart.addData(client, params);
                if (cart_id === []){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error generating Cart. Adding Cart.', errCode: 500};    
                }

                const dataMini = await repositories.miniatures.updStatus(client, _id, 20);
                if (dataMini.rowcount<=0){
                    await client.query('ROLLBACK');
                    return {data: [], err: 'Error generating Cart. Changing Miniature Status.', errCode: 500};    
                }

            await client.query('COMMIT');
            return {data: cart_id[0].id, err: null, errCode: null};        
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

