const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'EmployeeManagement'
});

connection.connect(err => {
  if (err) {
    console.error('❌ Database Connection Failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL Database Successfully!');
});

module.exports = connection;
