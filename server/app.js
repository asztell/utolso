const data = require("./data");
const http = require("http");
const HOST = "localhost";
const PORT = 3035;

function getProducts(name = "", res) {
  const responseData = data.filter((item) =>
    item.name.toLowerCase().startsWith(name.toLowerCase())
  );
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  });
  res.write(JSON.stringify(responseData));
  res.end();
}

function controller(req, res) {
  let body = [];
  req
    .on("data", (chunk) => {
      body = JSON.parse(chunk.toString());
    })
    .on("end", () => {
      switch (req.url) {
        case "/products":
          return getProducts(body.name, res);
        default:
          return res.end();
      }
    });
}

http
  .createServer(function (req, res) {
    controller(req, res);
  })
  .listen(PORT);

console.log(`[Server running on ${HOST}:${PORT}]`);
