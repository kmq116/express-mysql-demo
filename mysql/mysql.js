// 连接数据库
const mysql = require("mysql");

const config = {
  host: "localhost",
  user: "root",
  password: "linux0.1",
  database: "mydb",
};
const client = mysql.createConnection(config);

// sql语句
function sqlQuery(sql, callback) {
  client.query(sql, (err, result) => {
    if (err) {
      return console.log("错误");
    }
    callback(result);
  });
}

module.exports = sqlQuery;
