import { readFile } from "fs/promises";
import http from "http";
const HOST = "localhost";
const PORT = 3035;

const data = await readFile("./server/data.json", "utf8").then((data) => {
  return JSON.parse(data.toString());
});

function getProducts(name = "", res) {
  const responseData = data.filter((item) =>
    // for a more robust search, use:
    // item.name.toLowerCase().includes(name.toLowerCase())
    // for testing speed I chose to use startsWith
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
