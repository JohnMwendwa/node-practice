const fs = require("fs");
const http = require("http");
const path = require("path");

const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    // define file paths
    const file = path.join(
      __dirname,
      "pages",
      req.url === "/" ? "index.html" : req.url
    );
    const filePath = path.resolve(file);

    // Determine the file extensions
    const extname = path.extname(filePath);

    // Set the default content type
    let contentType = "text/html";

    // Set other content types
    switch (extname) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".img":
        contentType = "image/jpg";
        break;
    }

    // Read the files
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          fs.readFile(
            path.join(__dirname, "pages", "404.html"),
            "utf-8",
            (err, data) => {
              res.writeHead(404, { "Content-Type": contentType });
              console.log(data);
              res.write(data);
              res.end();
            }
          );
        } else {
          res.writeHead(500, { "Content-Type": contentType });
          res.write("<h1>Internal Server Error</h1>");
          res.end();
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.write(data);
        res.end();
      }
    });
  })
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
