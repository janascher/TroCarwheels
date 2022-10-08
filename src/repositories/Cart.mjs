export default class Cart {

    #db

    constructor (_db) {
        this.#db = _db;
    }

    async getData(_db) {
        try {
            const query = `--sql
                            SELECT 
                                    a.id, 
                                    c.nick,
                                    b.model,
                                    b.color,
                                    d.description as brand,
                                    a.status,
                                    b.model,
                                    b.color,
                                    b.description,
                                    b.link,
                                    b.brand_id,
                                    a.user_id,
                                    a.miniature_id,
                                    b.img_checked,
                                    a.created_at
                                FROM cart a
                                    left join miniatures b on a.miniature_id = b.id  
                                    left join users c on a.user_id = c.id  
                                    left join brand d on b.brand_id = d.id and d.deleted = false
                                WHERE a.status!=9 and b.status!=9 and c.active=1 `
            
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
                                    c.nick,
                                    b.model,
                                    b.color,
                                    d.description as brand,
                                    a.status,
                                    b.model,
                                    b.color,
                                    b.description,
                                    b.link,
                                    b.brand_id,
                                    a.user_id,
                                    a.miniature_id,
                                    b.img_checked,
                                    a.created_at
                                FROM cart a
                                    left join miniatures b on a.miniature_id = b.id  
                                    left join users c on a.user_id = c.id  
                                    left join brand d on b.brand_id = d.id and d.deleted = false
                                WHERE a.id = $1 and a.status!=9 and b.status!=9 and c.active=1 `,
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
                                    c.nick,
                                    b.model,
                                    b.color,
                                    d.description as brand,
                                    a.status,
                                    b.model,
                                    b.color,
                                    b.description,
                                    b.link,
                                    b.brand_id,
                                    a.user_id,
                                    a.miniature_id,
                                    b.img_checked,
                                    a.created_at
                                FROM cart a
                                    left join miniatures b on a.miniature_id = b.id  
                                    left join users c on a.user_id = c.id  
                                    left join brand d on b.brand_id = d.id and d.deleted = false
                                    WHERE a.user_id = $1 and a.status!=9 and b.status!=9 and c.active=1 `,
                        values: [ _id ]
                };
            const res = await _db.query(query)
            return res.rows;
        }
        catch(err) {
            throw new Error(err.message);
        }
    }     

    async addData(_db, _params) {
        try {
            const query = {
                  text: `--sql
                        INSERT INTO cart
                                (   user_id,
                                    miniature_id,
                                    status)
                            VALUES ( $1, $2, 0 ) RETURNING id
                    `,
                  values: [ _params.user_id, 
                            _params.miniature_id 
                          ]
                };
            const res = await _db.query(query)
            return res.rows;
        }
        catch(err) {
            console.log(`erro add`)
            throw new Error(err.message);
        }
    } 

    async updStatus(_db, _status, _id) {
        try {
            const query = {
                  text: `--sql
                        UPDATE cart SET
                                        status=$1,
                                        updated_at=now()
                            WHERE id = $2 RETURNING id
                    `,
                    values: [ _status, 
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
                        UPDATE cart SET
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

    async getOffersId(_db, _id) {
        try {
            const query = {
                        text: `--sql
                            SELECT 
                                    a.cart_id,                                     
                                    c.nick,
                                    b.model,
                                    b.color,
                                    d.description as brand,
                                    a.status,
                                    b.model,
                                    b.color,
                                    b.description,
                                    b.link,
                                    b.brand_id,
                                    a.user_id,
                                    a.miniature_id,
                                    b.img_checked,
                                    a.created_at
                                FROM cart_offers a
                                    left join miniatures b on a.miniature_id = b.id  
                                    left join users c on a.user_id = c.id  
                                    left join brand d on b.brand_id = d.id and d.deleted = false
                                WHERE a.cart_id = $1 and a.status!=9 and b.status!=9 and c.active=1 `,
                        values: [ _id ]
                };
            const res = await _db.query(query)
            return res.rows;
        }
        catch(err) {
            throw new Error(err.message);
        }
    } 

    async addCartOffer(_db, _id, _user_id, _params) {
        try {
            const query = {
                  text: `--sql
                        INSERT INTO cart_offers
                                (   cart_id,
                                    user_id,
                                    miniature_id,
                                    status)
                            VALUES ( $1, $2, $3, 0 ) RETURNING cart_id
                    `,
                  values: [ _id,
                            _user_id, 
                            _params.miniature_id 
                          ]
                };
            const res = await _db.query(query)
            return res.rows;
        }
        catch(err) {
            console.log(`erro add`)
            throw new Error(err.message);
        }
    } 

    async updCartOfferStatus(_db, _status, _id, _user_id, _miniature_id ) {
        try {
            const query = {
                  text: `--sql
                        UPDATE cart_offers SET
                                        status=$1,
                                        updated_at=now()
                            WHERE cart_id = $2 and 
                                  user_id = $3 and
                                  miniature_id = $4 RETURNING cart_id
                    `,
                    values: [ _status, 
                              _id,
                              _user_id,
                              _miniature_id
                            ]
            };

            const res = await _db.query(query)
            return res;
        }
        catch(err) {
            throw new Error(err.message);
        }
    } 

    async delCartOffer(_db, _id, _user_id, _miniature_id ) {
        try {
            const query = {
                  text: `--sql
                        UPDATE cart_offers SET
                                        status=$1,
                                        deleted_at=now()
                            WHERE cart_id = $2 and 
                                  user_id = $3 and
                                  miniature_id = $4 RETURNING cart_id
                    `,
                    values: [ 9, 
                              _id,
                              _user_id,
                              _miniature_id
                            ]
            };

            const res = await _db.query(query)
            return res;
        }
        catch(err) {
            throw new Error(err.message);
        }
    } 

}