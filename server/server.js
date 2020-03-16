//引用express模块
const express = require("express");
//引入文件路由
const fileRouter = require("./router/fileRouter");

//express实例化
const app = express();

//使用文件路由
app.use("/file", fileRouter);

app.listen(3000, () => {
  console.log("server start");
});
