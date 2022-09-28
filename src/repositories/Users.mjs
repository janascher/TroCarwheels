export default class Users {

    #db

    constructor (_db) {
        this.#db = _db;
    }

    async getData(_db) {
        try {
            const query = `--sql
                                SELECT 
                                        a.id, 
                                        a.name,
                                        a.email,
                                        a.nick,
                                        a.birth_date,
                                        a.address,
                                        a.num,
                                        a.complement,
                                        a.district,
                                        a.city,
                                        a.state,
                                        a.zip,
                                        a.phone
                                    FROM users a 
                                    WHERE a.active=1 `
            
            const res = await _db.query(query)
            return res.rows;
        }
        catch(err) {
            throw new Error(err.message);
        }
    }

    async getDataById(_db, _id) {
        try {
            const query = {
                  text: `--sql
                            SELECT 
                                    a.id, 
                                    a.name,
                                    a.email,
                                    a.nick,
                                    a.birth_date,
                                    a.address,
                                    a.num,
                                    a.complement,
                                    a.district,
                                    a.city,
                                    a.state,
                                    a.zip,
                                    a.phone
                                FROM users a 
                            WHERE a.active=1 AND a.id = $1 `,
                  values: [ _id ]
                };
            const res = await _db.query(query)
            return res.rows;
        }
        catch(err) {
            throw new Error(err.message);
        }
    }    

    async getDataByNick(_db, _nick) {
        try {
            const query = {
                  text: `--sql
                            SELECT 
                                    id, 
                                    name,
                                    email,
                                    nick,
                                    birth_date,
                                    address,
                                    num,
                                    complement,
                                    district,
                                    city,
                                    state,
                                    zip,
                                    phone
                                FROM users 
                            WHERE active=1 AND  nick = $1  `,
                  values: [ _nick ]
                };
            const res = await _db.query(query)
            return res.rows;
        }
        catch(err) {
            throw new Error(err.message);
        }
    }     
    
    async addData(_db,_params) {
        try {
            const query = {
                  text: `--sql
                        INSERT INTO users
                                (   name,
                                    email,
                                    nick,
                                    password,
                                    birth_date,
                                    address,
                                    num,
                                    complement,
                                    district,
                                    city,
                                    state,
                                    zip,
                                    phone )
                            VALUES ( $1, $2, $3, $4, TO_DATE($5,'DD-MM-YYYY'), $6, $7, $8, $9, $10, $11, $12, $13 ) RETURNING id
                    `,
                  values: [ _params.name, 
                            _params.email, 
                            _params.nick,
                            _params.password_hashed,
                            _params.birth_date,
                            _params.address,
                            _params.num,
                            _params.complement,
                            _params.district,
                            _params.city,
                            _params.state,
                            _params.zip,
                            _params.phone]
                };
            const res = await _db.query(query)
            return res.rows;
        }
        catch(err) {
            throw new Error(err.message);
        }
    } 

    async updData(_db, _params, _id) {
        try {
            const query = {
                  text: `--sql
                        UPDATE users SET
                                        name=$1,
                                        email=$2,
                                        nick=$3,
                                        birth_date=TO_DATE($4,'DD-MM-YYYY'),
                                        address=$5,
                                        num=$6,
                                        complement=$7,
                                        district=$8,
                                        city=$9,
                                        state=$10,
                                        zip=$11,
                                        phone=$12 
                            WHERE id = $13 RETURNING id
                    `,
                    values: [ _params.name, 
                            _params.email, 
                            _params.nick,
                            _params.birth_date,
                            _params.address,
                            _params.num,
                            _params.complement,
                            _params.district,
                            _params.city,
                            _params.state,
                            _params.zip,
                            _params.phone,
                            _id]
            };

            const res = await _db.query(query)
            return res;
        }
        catch(err) {
            throw new Error(err.message);
        }
    } 

    async delData(_db, _id) {
        try {
            const query = {
                  text: `--sql
                        UPDATE users SET
                                active = 0,
                                deleted_at = now()
                        WHERE id = $1  RETURNING id
                    `,
                  values: [ _id ]
                };
            const res = await _db.query(query)
            return res;
        }
        catch(err) {
            throw new Error(err.message);
        }
    } 

    async ReactivateData(_db, _id) {
        try {
            const query = {
                  text: `--sql
                        UPDATE users SET
                                active = 1,
                                updated_at = now(),
                                deleted_at = null
                        WHERE id = $1  RETURNING id
                    `,
                  values: [ _id ]
                };
            const res = await _db.query(query)
            return res;
        }
        catch(err) {
            throw new Error(err.message);
        }
    } 

    async updPwd(_db, _pwd, _id) {
        try {
            const query = {
                  text: `--sql
                        UPDATE users SET
                                password = $1,
                                updated_at = now()
                        WHERE id = $2 RETURNING id
                    `,
                  values: [ _pwd, _id]
                };
            const res = await _db.query(query)
            return res;
        }
        catch(err) {
            throw new Error(err.message);
        }
    } 

    async loginUser(_db, _email) {
        try {
            const query = {
                        text: `--sql
                            SELECT 
                                    a.id, 
                                    a.name,
                                    a.nick,
                                    a.email,
                                    a.password,
                                    a.birth_date
                                FROM users a 
                                WHERE a.active=1 AND a.email=$1 `,
                        values: [ _email ]
            };    
            const res = await _db.query(query)
            return res;
        }
        catch(err) {
            throw new Error(err.message);
        }
    }    
}

