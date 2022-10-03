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

    async addMiniature(_params){       
        const params = _params;
        try {
            const data = await repositories.miniatures.addData(this.#db, params);
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

}

