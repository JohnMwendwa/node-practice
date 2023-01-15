const formidable = require("formidable");
const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/fileupload") {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      const oldpath = files.filetoupload.filepath;
      const newpath = `./files/${files.filetoupload.originalFilename}`;

      fs.rename(oldpath, newpath, (err) => {
        if (err) throw err;

        res.write("File uploaded");
        res.end();
      });
    });
  } else {
    //create the form for uploading files
    res.writeHead(200, { "Content-Type": "text/html" });

    res.write(`<form action="fileupload" method="POST" enctype="multipart/form-data" style="display:flex;min-height:95vh;flex-direction:column;justify-content:center;align-items:center;background-color:#ddd;color:white;">
        <div >
        <input type="file" name="filetoupload" /> 
        <br />
        <button type="submit" style="display;block;margin-top:10px;background-color:green;color:white;padding:5px 20px; border-radius:3px;border:none;">Submit</button>
        </div>
        </form>`);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
