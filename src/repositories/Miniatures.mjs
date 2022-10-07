export default class Miniatures {

    #db

    constructor (_db) {
        this.#db = _db;
    }

    async getData(_db) {
        try {
            const query = `--sql
                            SELECT 
                                    a.id, 
                                    b.nick,
                                    c.description as brand,
                                    a.status,
                                    a.model,
                                    a.color,
                                    a.description,
                                    a.link,
                                    a.img_checked,
                                    a.brand_id,
                                    a.user_id
                                FROM miniatures a
                                    left join users b on a.user_id = b.id and b.deleted_at is null 
                                    left join brand c on a.brand_id = c.id and c.deleted = false
                                WHERE a.status!=9 `
            
            const res = await _db.query(query)
            return res.rows;
        }
        catch(err) {
            throw new Error(err.message);
        }
    }

    async getBrands(_db) {
        try {
            const query = `--sql
                            SELECT 
                                    a.id, 
                                    a.description as brand
                                FROM brand a
                                WHERE a.deleted=false `
            
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
                                    b.nick,
                                    c.description as brand,
                                    a.status,
                                    a.model,
                                    a.color,
                                    a.description,
                                    a.link,
                                    a.img_checked,
                                    a.brand_id,
                                    a.user_id
                                FROM miniatures a
                                    left join users b on a.user_id = b.id and b.deleted_at is null 
                                    left join brand c on a.brand_id = c.id and c.deleted = false
                                WHERE a.id = $1 `,
                        values: [ _id ]
                };
            const res = await _db.query(query)
            return res.rows;
        }
        catch(err) {
            throw new Error(err.message);
        }
    }     

    async getDataByUserId(_db, _id) {
        try {
            const query = {
                        text: `--sql
                            SELECT 
                                    a.id, 
                                    b.nick,
                                    c.description as brand,
                                    a.status,
                                    a.model,
                                    a.color,
                                    a.description,
                                    a.link,
                                    a.img_checked,
                                    a.brand_id,
                                    a.user_id
                                FROM miniatures a
                                    left join users b on a.user_id = b.id and b.deleted_at is null 
                                    left join brand c on a.brand_id = c.id and c.deleted = false
                                WHERE a.user_id = $1 `,
                        values: [ _id ]
                };
            const res = await _db.query(query)
            return res.rows;
        }
        catch(err) {
            throw new Error(err.message);
        }
    }     

    async getMiniaturesOtherUsers(_db, _id) {
        try {
            const query = {
                        text: `--sql
                            SELECT 
                                    a.id, 
                                    b.nick,
                                    c.description as brand,
                                    a.status,
                                    a.model,
                                    a.color,
                                    a.description,
                                    a.link,
                                    a.img_checked,
                                    a.brand_id,
                                    a.user_id
                                FROM miniatures a
                                    left join users b on a.user_id = b.id and b.deleted_at is null 
                                    left join brand c on a.brand_id = c.id and c.deleted = false
                                WHERE a.user_id != $1 and a.status=20 `,
                        values: [ _id ]
                };
            const res = await _db.query(query)
            return res.rows;
        }
        catch(err) {
            throw new Error(err.message);
        }
    }     


    async addData(_db, _params, _user_id) {
        try {
            const query = {
                  text: `--sql
                        INSERT INTO miniatures
                                (   user_id,
                                    brand_id,
                                    status,
                                    model,
                                    color,
                                    description,
                                    link,
                                    img_checked)
                            VALUES ( $1, $2, 0, $3, $4, $5, $6, 10 ) RETURNING id
                    `,
                  values: [ _user_id, 
                            _params.brand_id, 
                            _params.model,
                            _params.color,
                            _params.description,
                            " "]
                };
            const res = await _db.query(query)
            return res.rows;
        }
        catch(err) {
            console.log(`erro add`)
            throw new Error(err.message);
        }
    } 

    async updData(_db, _params, _id) {
        try {
            const query = {
                  text: `--sql
                        UPDATE miniatures SET
                                        brand_id=$1,
                                        model=$2,
                                        color=$3,
                                        description=$4,
                                        updated_at=now() 
                            WHERE id = $5 RETURNING id
                    `,
                    values: [ _params.brand_id, 
                            _params.model, 
                            _params.color,
                            _params.description,
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
                        UPDATE miniatures SET
                                status = 9,
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

    async imgCheck(_db, _id, _check) {
        try {
            const query = {
                  text: `--sql
                        UPDATE miniatures SET
                                img_checked = $1,                                
                                updated_at = now()
                        WHERE id = $2  RETURNING id
                    `,
                  values: [ _check, _id ]
                };
            const res = await _db.query(query)
            return res;
        }
        catch(err) {
            throw new Error(err.message);
        }
    } 

    async updUserId(_db, _id, _user_id) {
        try {
            const query = {
                  text: `--sql
                        UPDATE miniatures SET
                                user_id = $1,                                
                                updated_at = now()
                        WHERE id = $2  RETURNING id
                    `,
                  values: [ _user_id, _id ]
                };
            const res = await _db.query(query)
            return res;
        }
        catch(err) {
            throw new Error(err.message);
        }
    } 

    async updStatus(_db, _id, _status) {
        try {
            const query = {
                  text: `--sql
                        UPDATE miniatures SET
                                status = $1,                                
                                updated_at = now()
                        WHERE id = $2  RETURNING id
                    `,
                  values: [ _status, _id ]
                };
            const res = await _db.query(query)
            return res;
        }
        catch(err) {
            throw new Error(err.message);
        }
    } 

    async updImage(_db, _path, _id) {
        try {
            const query = {
                  text: `--sql
                        UPDATE miniatures SET
                                link = $1,
                                img_checked=0,
                                updated_at = now()
                        WHERE id = $2 RETURNING id
                    `,
                  values: [ _path, _id]
                };
            const res = await _db.query(query)
            return res;
        }
        catch(err) {
            throw new Error(err.message);
        }
    } 
  
}

