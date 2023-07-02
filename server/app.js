import { readFile } from "fs/promises";
import http from "http";
const HOST = "localhost";
const PORT = 3035;

const data = await readFile("./server/data.json", "utf8").then((data) => {
  return JSON.parse(data.toString());
});

const invalidInput = /[^A-Za-z0-9 :;&-]+$/g;

function isValidInput(name) {
  return !name.match(invalidInput);
}

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
};

function getProducts(name = "", res) {
  let responseData;
  console.log("name", name);
  if (isValidInput(name)) {
    responseData = data.filter(
      (item) =>
        // for a more robust search, use:
        item.name.toLowerCase().includes(name.toLowerCase())
      // for testing speed I chose to use startsWith
      // item.name.toLowerCase().startsWith(name.toLowerCase())
    );
    res.writeHead(200, headers);
  } else {
    res.writeHead(400, headers);
    responseData = { error: "Invalid input" };
  }
  console.log("after IF");
  res.write(JSON.stringify(responseData));
  res.end();
}

function controller(req, res) {
  let body = [];
  req
    .on("data", (chunk) => {
      console.log("chunk", chunk);
      console.log("chunk.toString()", chunk.toString());
      body = JSON.parse(chunk.toString());
    })
    .on("end", () => {
      console.log("req.on('end', ...)");
      switch (req.url) {
        case "/products":
          console.log("case /products body", body);
          const { name } = body;
          console.log("case /products name", name);
          if (name !== undefined) return getProducts(name, res);
          res.writeHead(200, headers);
          res.write(JSON.stringify({ error: "Invalid input" }));
          res.end();
        default:
          console.log("default");
          res.writeHead(404, headers);
          res.end();
        // return;
      }
    });
}

http
  .createServer(function (req, res) {
    console.log("http.createServer - req.url", req.url);
    controller(req, res);
  })
  .listen(PORT);

console.log(`[Server running on ${HOST}:${PORT}]`);
