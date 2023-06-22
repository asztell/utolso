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
  console.log("name", name);
  const responseData = data.filter((item) =>
    item.name.toLowerCase().startsWith(name.toLowerCase())
  );
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  });
  res.write(JSON.stringify(responseData));
  //   res.write(JSON.stringify(data));
  res.end();
}

function controller(req, res) {
  //   console.log("req", req);
  let body = [];
  req
    .on("data", (chunk) => {
      console.log("chunk", chunk);
      body = JSON.parse(chunk.toString());
      console.log("body", body);
    })
    .on("end", () => {
      console.log("req.url", req.url);
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
    // .. Here you can create your data response in a JSON format
    // console.log("req", req);
    // Object.keys(req).forEach((key) => {
    //   console.log("key", key);
    // });
    // let body = [];
    // req.on("data", (chunk) => {
    //   console.log("chunk", chunk);
    //   body = chunk;
    //   console.log("body", JSON.parse(body.toString()));
    // });
    // console.log("req.url", req.url);
    // console.log("body", body);
    // console.log("req.body", req.body);
    // res.writeHead(200, {
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers":
    //     "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin",
    // });
    // //   res.write(JSON.stringify(responseData));
    // res.write(JSON.stringify(data));
    // res.end();
    controller(req, res);
    // res.write("Response goes in here..."); // Write out the default response
    // res.end(); //end the response
  })
  .listen(PORT);

console.log(`[Server running on ${HOST}:${PORT}]`);
