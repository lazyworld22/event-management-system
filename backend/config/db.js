const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "bypifv5zknl0xrkbext4-mysql.services.clever-cloud.com",
  user: "umnixlldi1i0ckhy",
  password: "vWM4iKzYdp8noxmTcsz3",
  database: "bypifv5zknl0xrkbext4",
  port: 3306,
  ssl: { rejectUnauthorized: false } // IMPORTANT for Clever Cloud
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("Connected to Clever Cloud DB");
});

module.exports = db;