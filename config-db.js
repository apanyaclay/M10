const mysql2 = require('mysql2');
const conn = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_db'
});

conn.connect((err) => {
    if(err) {
        console.log("Error connecting to Db");
        console.error(err)
        return;
    } else{
        console.log("Database is Connected...")
    }
});

module.exports = conn