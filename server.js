const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Your code here

  let reqPath = req.url.split('/');

  if (reqPath[1] === 'static') {
    let fileType;
    const reqType = req.url.split('.')[1];

    const staticFile = fs.readFileSync('./assets/' + reqPath.slice(2).join('/'));

    if (reqType === 'css') {
      fileType = 'text/CSS'
    }

    if (reqType === 'jpg') {
      fileType  = 'image/jpeg'
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', fileType)
    return res.end(staticFile)
  }
  

  // Load the html file
  const html = fs.readFileSync('./index.html', 'utf-8');

  // Send the Response
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html')
  res.end(html)


});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));