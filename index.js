const express = require('express');
const conn = require('./config-db')
const app = express();
const {create, userAdd} = require('./validate')
const cors = require('cors');

app.use(express.json());

app.use(express.urlencoded({extended: false}));
app.use((req, res, next)=>{
    console.log(`Request URL: ${req.url}`)
    console.log(`Request Type: ${req.method}`)
    next()
})

app.use(cors());

app.get('/api/products', (req, res) => {
    let sql = 'SELECT * FROM product';
    conn.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Something broke!")
        } else {
            res.status(200).json({status: 200, error: null, response: result})
        }
    });
});

app.get('/api/products/:id', (req, res) => {
    let sql = `SELECT * FROM product WHERE product_id = ${req.params.id}`;
    conn.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Something broke!")
        } else {
            if (result.length === 0) {
                res.status(404).json({status: 404, error: `Product ID ${req.params.id} tidak ditemukan`})
            } else {
                res.status(200).json({status: 200, error: null, response: result[0]})
            }
        }
    });
});

app.post('/api/products', create, (req, res) => {
    const product = req.products
    let sql = `INSERT INTO product (product_name, product_price) VALUES (?, ?)`;
    conn.query(sql, product, (err, result) => {
        if(err){
            res.status(500).send("Something broke!")
        } else {
            if (result["affectedRows"] === 0) {
                res.status(404).json({status: 404,  error: "Gagal menambahkan product"})
            } else {
                res.status(201).json({status: 201, error: null, response: {id: result.insertId, ...req.body}})
            }
        }
    });
});

app.put('/api/products/:id', create, (req, res) => {
    const product = req.products
    let sql = `UPDATE product SET product_name=?, product_price=? WHERE product_id = ${req.params.id}`;
    conn.query(sql, product, (err, result) => {
        if(err){
            res.status(500).send("Something broke!")
        } else {
            if (result["affectedRows"] === 0) {
                res.status(404).json({status: 404, error: `Product ID ${req.params.id} tidak ditemukan`})
            } else {
                res.status(200).json({status: 200, error: null, response: `Product ID ${req.params.id} berhasil diupdate`})
            }
        }
    });
});

app.delete('/api/products/:id', (req, res) => {
    let sql = `DELETE FROM product WHERE product_id = ${req.params.id}`;
    conn.query(sql, (err, result) => {
        if(err){
            res.status(500).send("Something broke!")
        } else {
            if (result["affectedRows"] === 0) {
                res.status(404).json({status: 404,  error: `Product ID ${req.params.id} tidak ditemukan`})
            } else {
                res.status(200).json({status: 200, error: null, response: `Product ID ${req.params.id} berhasil dihapus`})
            }
        }
    });
});

// app.get('/api/comments', (req, res) => {
//     let sql = 'SELECT * FROM comment';
//     conn.query(sql, (err, result) => {
//         if(err) throw err;
//         res.json({
//             status: 200,
//             error: null,
//             response: result
//         });
//     });
// });

// app.post('/api/comment', (req, res) => {
//     const comment = req.body
//     let sql = `INSERT INTO comment SET ?`;
//     conn.query(sql, comment, (err, result) => {
//         if(err) throw err;
//         res.json({
//             status: 200,
//             error: null,
//             response: result
//         });
//     });
// });

// app.get('/api/comment/:id', (req, res) => {
//     let sql = `SELECT * FROM comment WHERE comment_id = ${req.params.id}`;
//     conn.query(sql, (err, result) => {
//         if(err) throw err;
//         if (result.length > 0) {
//             res.json({
//                 status: 200,
//                 error: null,
//                 response: result
//             });
//         }
//         res.json({
//             status: 401,
//             error: `Comment ID ${req.params.id} tidak ditemukan`
//         })
//     });
// });

// app.get('/api/comment/customer/:id', (req, res) => {
//     let sql = `SELECT * FROM comment WHERE cust_id = ${req.params.id}`;
//     conn.query(sql, (err, result) => {
//         if(err) throw err;
//         if (result.length > 0) {
//             res.json({
//                 status: 200,
//                 error: null,
//                 response: result
//             });
//         }
//         res.json({
//             status: 401,
//             error: `Customer ID ${req.params.id} tidak ditemukan`
//         })    
//     })
// });

// app.delete('/api/comment/:id', (req, res) => {
//     let sql = `DELETE FROM comment WHERE comment_id = ${req.params.id}`;
//     conn.query(sql, (err, result) => {
//         if(err) throw err;
//         if (result.affectedRows > 0) {
//             res.json({
//                 status: 200,
//                 error: null,
//                 message: 'Komentar berhasil dihapus'
//                 });
//         }
//         res.json({
//             status: 401,
//             error: `Comment ID ${req.params.id} tidak ditemukan`
//         });
//     });
// });

app.get('/api/users', (req, res) => {
    let sql = 'SELECT * FROM user';
    conn.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Something broke!")
        } else {
            res.status(200).json({status: 200, error: null, response: result})
        }
    });
});

app.get('/api/users/:id', (req, res) => {
    let sql = `SELECT * FROM user WHERE user_id = ${req.params.id}`;
    conn.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Something broke!")
        } else {
            if (result.length === 0) {
                res.status(404).json({status: 404, error: `User ID ${req.params.id} tidak ditemukan`})
            } else {
                res.status(200).json({status: 200, error: null, response: result[0]})
            }
        }
    });
});

app.post('/api/users', userAdd, (req, res) => {
    const user = req.user
    let sql = `INSERT INTO user SET ?`;
    conn.query(sql, user, (err, result) => {
        if(err){
            console.log(err)
            res.status(500).send("Something broke!")
        } else {
            if (result["affectedRows"] === 0) {
                res.status(404).json({status: 404,  error: "Gagal menambahkan user"})
            } else {
                res.status(201).json({status: 201, error: null, response: {id: result.insertId, ...req.body}})
            }
        }
    });
});

app.put('/api/users/:id', userAdd, (req, res) => {
    const user = req.user
    let sql = `UPDATE user SET ? WHERE user_id = ${req.params.id}`;
    conn.query(sql, user, (err, result) => {
        if(err){
            res.status(500).send("Something broke!")
        } else {
            if (result["affectedRows"] === 0) {
                res.status(404).json({status: 404, error: `User ID ${req.params.id} tidak ditemukan`})
            } else {
                res.status(200).json({status: 200, error: null, response: `User ID ${req.params.id} berhasil diupdate`})
            }
        }
    });
});

app.delete('/api/users/:id', (req, res) => {
    let sql = `DELETE FROM user WHERE user_id = ${req.params.id}`;
    conn.query(sql, (err, result) => {
        if(err){
            res.status(500).send("Something broke!")
        } else {
            if (result["affectedRows"] === 0) {
                res.status(404).json({status: 404,  error: `User ID ${req.params.id} tidak ditemukan`})
            } else {
                res.status(200).json({status: 200, error: null, response: `User ID ${req.params.id} berhasil dihapus`})
            }
        }
    });
});

app.listen(9999, () => {
    console.log(`Server running at http://172.17.5.10:9999/`);
});