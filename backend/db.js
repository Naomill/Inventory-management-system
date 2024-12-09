const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, // ให้ระบบรอการเชื่อมต่อเมื่อ connection เต็ม
    connectionLimit: 10, // จำนวน connection สูงสุดใน pool
    queueLimit: 0 // ไม่มีการจำกัดคิว
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to AWS RDS Database!');
    if (connection) connection.release(); // ปล่อย connection หลังทดสอบ
});

pool.on('connection', (connection) => {
    console.log('Database connection established:', connection.threadId);
});

pool.on('error', (err) => {
    console.error('Database connection error:', err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.');
    } else if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.');
    }
});


module.exports = pool.promise(); // ใช้ promise-based connection