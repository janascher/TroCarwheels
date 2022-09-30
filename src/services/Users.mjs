import { repositories } from './index.mjs';
import bcrypt from 'bcrypt';

export default class UsersServ {
    #db    
    constructor (_db){
        this.#db = _db;
    }

    async getUsers(){
        try {
            const data = await repositories.users.getData(this.#db);
            return {data: data, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message};
        }  
    }

    async getUsersById(_id){
        try {
            const data = await repositories.users.getDataById(this.#db, _id);
            return {data: data, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async getUsersByNick(_nick){
        try {
            const data = await repositories.users.getDataByNick(this.#db, _nick);
            return {data: data, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async addUsers(_params){       
        const params = _params;
        try {
            params.password_hashed = await this.hashPassword(params.password);
            params.active = 1;
            const data = await repositories.users.addData(this.#db, params);
            const user_id = data[0].id;
            return {data: user_id, err: null, errCode: null};
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async updUsers(_params, _id){       
        const params = _params;

        try {
            const data = await repositories.users.updData(this.#db, params, _id);
            if (data.rowCount>0){
                return {data: [], err: null, errCode: null};
            }else{
                return {data: [], err: 'No users have been updated.', errCode: 400};
            }    
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async delUser(_id){       
        try {
            const data = await repositories.users.delData(this.#db, _id);
            if (data.rowCount>0){
                return {data: [], err: null, errCode: null};
            }else{
                return {data: [], err: 'No users have been deactivated.', errCode: 400};
            }
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }
    
    async loginUser(_email, _pwd){       
        try {
            const data = await repositories.users.loginUser(this.#db, _email);
            if (data.rowCount===1){
                const hash = data.rows[0].password;
                const matchHash = await this.comparePassword(_pwd, hash);
                if (matchHash===true){
                    const userData = {
                                        user_id: data.rows[0].id,
                                        email: data.rows[0].email,
                                        nick: data.rows[0].nick,
                                        name: data.rows[0].name
                    }  
                    return {data: userData, err: null, errCode: null};                   
                } else{
                    return {data: [], err: 'Login/Password does not match', errCode: 401};
                }
            }else{
                return {data: [], err: 'Login/Password does not match', errCode: 401};
            }
        }    
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
        finally{
        } 
    }

    async reactivateUser(_id){       
        try {
            const data = await repositories.users.reacivateData(this.#db, _id);
            if (data.rowCount>0){
                return {data: [], err: null, errCode: null};
            }else {
                return {data: [], err: 'No users have been reactivated.', errCode: 400};
            }
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async updUserPwd(_id, _pwd){       
        try {
            const pwd_hashed = await this.hashPassword(_pwd);

            const data = await repositories.users.updPwd(this.#db, pwd_hashed, _id);
            if (data.rowCount>0){
                return {data: [], err: null, errCode: null};
            }else {
                return {data: [], err: 'No password user has been updated.', errCode: 400};
            }
        }
        catch(err){
            return {data: [], err: err.message, errCode: 500};
        } 
    }

    async hashPassword(plaintextPassword) {
        const hash = await bcrypt.hash(plaintextPassword, 10);
        return hash;
    }    

    async comparePassword(plaintextPassword, hash) {
        const result = await bcrypt.compare(plaintextPassword, hash);
        return result;
    }    
}

