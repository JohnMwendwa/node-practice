const formidable = require("formidable");
const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    //create the form for uploading files
    res.writeHead(200, { "Content-Type": "text/html" });

    res.write(`<form action="fileupload" method="POST" enctype="multipart/form-data" style="display:flex;min-height:95vh;flex-direction:column;justify-content:center;align-items:center;background-color:#ddd;color:white;">
    <div >
    <input type="file" /> 
    <br />
    <button type="submit" style="display;block;margin-top:10px;background-color:green;color:white;padding:5px 20px; border-radius:3px;border:none;">Submit</button>
    </div>
    </form>`);
    res.end();
  })
  .listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
