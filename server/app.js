/**
 * The Server Can be configured and created here...
 *
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data = require("./data");
const http = require("http");
const HOST = "localhost";
const PORT = 3035;

/**
 * Start the Node Server Here...
 *
 * The http.createServer() method creates a new server that listens at the specified port.
 * The requestListener function (function (req, res)) is executed each time the server gets a request.
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */

function getProducts(name = "", res) {
  //   console.log("name", name);
  const responseData = data.filter((item) =>
    item.name.toLowerCase().startsWith(name.toLowerCase())
  );
  //   res.writeHead(500, {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Headers": "*",
  //   });
  //   res.write(new Error("Something went wrong"));
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  });
  res.write(JSON.stringify(responseData));
  //   res.write(JSON.stringify(new Error("Something went wrong")));
  res.end();
}

function controller(req, res) {
  let body = [];
  req
    // .on("error", (err) => {
    //   return err;
    // })
    .on("data", (chunk) => {
      body = JSON.parse(chunk.toString());
    })
    .on("end", () => {
      //   console.log("req.url", req.url);
      console.log("body", body);
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
