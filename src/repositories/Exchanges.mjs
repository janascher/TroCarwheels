export default class Exchanges {

    #db

    constructor (_db) {
        this.#db = _db;
    }

    async getData(_db) {
        try {
            const query = `--sql
                            SELECT 
                                    a.id, 
                                    a.cart_id,
                                    b.nick as nick1,
                                    c.nick as nick2,
                                    d.model as model1,
                                    e.model as model2,
                                    d.color as color1,
                                    e.color as color2,
                                    f.description as brand1,
                                    g.description as brand2,
                                    a.status,
                                    d.description as description1,
                                    e.description as description2,
                                    d.link as link1,
                                    e.link as link2,
                                    d.img_checked as img_checked1,
                                    e.img_checked as img_checked2,
                                    d.brand_id as brand_id1,
                                    e.brand_id as brand_id2,
                                    a.user_id1,
                                    a.user_id2,
                                    a.miniature_id1,
                                    a.miniature_id2,
                                    a.created_at
                                FROM exchanges a
                                    left join users b on a.user_id1 = b.id  
                                    left join users c on a.user_id2 = c.id  
                                    left join miniatures d on a.miniature_id1 = d.id  
                                    left join miniatures e on a.miniature_id2 = e.id  
                                    left join brand f on d.brand_id = f.id and f.deleted = false
                                    left join brand g on e.brand_id = g.id and g.deleted = false
                                WHERE a.status!=9 and b.active=1 and c.active=1 and d.status!=9 and e.status!=9  `
            
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
                                    a.cart_id,
                                    b.nick as nick1,
                                    c.nick as nick2,
                                    d.model as model1,
                                    e.model as model2,
                                    d.color as color1,
                                    e.color as color2,
                                    f.description as brand1,
                                    g.description as brand2,
                                    a.status,
                                    d.description as description1,
                                    e.description as description2,
                                    d.link as link1,
                                    e.link as link2,
                                    d.img_checked as img_checked1,
                                    e.img_checked as img_checked2,
                                    d.brand_id as brand_id1,
                                    e.brand_id as brand_id2,
                                    a.user_id1,
                                    a.user_id2,
                                    a.miniature_id1,
                                    a.miniature_id2,
                                    a.created_at
                                FROM exchanges a
                                    left join users b on a.user_id1 = b.id  
                                    left join users c on a.user_id2 = c.id  
                                    left join miniatures d on a.miniature_id1 = d.id  
                                    left join miniatures e on a.miniature_id2 = e.id  
                                    left join brand f on d.brand_id = f.id and f.deleted = false
                                    left join brand g on e.brand_id = g.id and g.deleted = false
                                WHERE a.id = $1 and a.status!=9 and b.active=1 and c.active=1 and d.status!=9 and e.status!=9  `,
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
                                a.cart_id,
                                b.nick as nick1,
                                c.nick as nick2,
                                d.model as model1,
                                e.model as model2,
                                d.color as color1,
                                e.color as color2,
                                f.description as brand1,
                                g.description as brand2,
                                a.status,
                                d.description as description1,
                                e.description as description2,
                                d.link as link1,
                                e.link as link2,
                                d.img_checked as img_checked1,
                                e.img_checked as img_checked2,
                                d.brand_id as brand_id1,
                                e.brand_id as brand_id2,
                                a.user_id1,
                                a.user_id2,
                                a.miniature_id1,
                                a.miniature_id2,
                                a.created_at
                            FROM exchanges a
                                left join users b on a.user_id1 = b.id  
                                left join users c on a.user_id2 = c.id  
                                left join miniatures d on a.miniature_id1 = d.id  
                                left join miniatures e on a.miniature_id2 = e.id  
                                left join brand f on d.brand_id = f.id and f.deleted = false
                                left join brand g on e.brand_id = g.id and g.deleted = false
                            WHERE (a.user_id1 = $1 or a.userid = $2) and a.status!=9 and b.active=1 and c.active=1 and d.status!=9 and e.status!=9  `,
                    values: [ _id, _id ]
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
                        INSERT INTO exchanges
                                (   cart_id,
                                    user_id1,
                                    user_id2,
                                    miniature_id1,
                                    miniature_id2,
                                    status)
                            VALUES ( $1, $2, $3, $4, $5, 0 ) RETURNING id
                    `,
                  values: [ _params.cart_id, 
                            _params.user_id1, 
                            _params.user_id2, 
                            _params.miniature_id1, 
                            _params.miniature_id2 
                          ]
                };
            const res = await _db.query(query)
            return res;
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
                        UPDATE exchanges SET
                                        status=$1
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
                        UPDATE exchanges SET
                                status = 9
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

    async getExchangeLog(_db, _exchange_id,) {
        try {
            const query = {
                  text: `--sql
                        SELECT 
                                a.id,
                                a.exchange_id,
                                a.user_id,
                                b.nick,
                                a.event,
                                a.rating,
                                a.created_at,
                                a.text
                            FROM exchange_log a
                                LEFT JOIN users b ON a.user_id=b.id
                            WHERE a.exchange_id=$1
                            ORDER BY 1
                    `,
                  values: [ _exchange_id ] 
                };
            const res = await _db.query(query)
            return res;
        }
        catch(err) {
            console.log(`erro add`)
            throw new Error(err.message);
        }
    }     

    async addExchangeLog(_db, _exchange_id, _params) {
        try {
            const query = {
                  text: `--sql
                        INSERT INTO exchange_log
                                (   exchange_id,
                                    user_id,
                                    event,
                                    rating,
                                    text)
                            VALUES ( $1, $2, $3, $4, $5) RETURNING id
                    `,
                  values: [ _exchange_id, 
                            _params.user_id, 
                            _params.event, 
                            _params.rating, 
                            _params.text 
                          ]
                };
            const res = await _db.query(query)
            return res;
        }
        catch(err) {
            console.log(`erro add`)
            throw new Error(err.message);
        }
    } 
}

