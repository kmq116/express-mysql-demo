const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql/mysql");

//设置跨域访问
router.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") res.sendStatus(200);
  //让options尝试请求快速结束
  else next();
});

router.get("/", (req, res) => {
  const sql = "select * from userinfo";
  sqlQuery(sql, (data) => {
    res.send({
      code: "200",
      message: "查询成功",
      data,
    });
  });
});

router.post("/api/auth/login", function (req, res) {
  const { username, password } = { ...req.body };
  console.log(username);
  console.log(password);
  const sql = `select * from userinfo where username='${username}' and password='${password}'`;
  sqlQuery(sql, (data) => {
    if (data.length > 0)
      return res.send({
        code: "200",
        data: { ...data[0] },
        result: { token: "4291d7da9005377ec9aec4a71ea837f" },
        message: "登录成功",
      });

    res.send({
      code: "500",
      message: "用户不存在",
    });
  });
});

router.post("/api/register", (req, res) => {
  const { username, password } = { ...req.body };
  const sql = `select * from userinfo where username='${username}'`;

  sqlQuery(sql, (data) => {
    console.log(data);
    if (data.length == 0) {
      const sql = `insert into userinfo values('${username}',null,'${password}')`;
      sqlQuery(sql, (data) => {
        res.send({
          code: "200",
          message: "注册成功",
        });
      });
    } else {
      res.send({
        code: "500",
        message: "用户已经存在",
      });
    }
  });
});

router.post("/api/passwordChange", (req, res) => {
  const { username, password, newPassword } = { ...req.body };
  const sql = `select * from userinfo where username='${username}' AND password='${password}' `;
  sqlQuery(sql, (data) => {
    if (data.length != 0) {
      const sql = `update userinfo set password='${newPassword}' where username = '${username}'`;
      sqlQuery(sql, (data) => {
        res.send({
          code: "200",
          message: "修改成功",
        });
      });
    } else {
      res.send({
        code: "500",
        message: "用户名或原密码不正确",
      });
    }
  });
});

module.exports = router;
