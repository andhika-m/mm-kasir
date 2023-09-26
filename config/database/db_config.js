const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./System/db/mmkasir.db')

module.exports = db
