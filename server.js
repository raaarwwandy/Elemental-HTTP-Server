/*jshint esversion: 6 */

const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

const resourceMapping = { 
  '/index.html': './public/index.html',
  '/helium.html': './public/helium.html',
  '/hydrogen.html': './public/hydrogen.html',
  '/styles.css' : './public/css/styles.css'
  };



const sendContent = (res, content) =>{
  res.setHeader('Content-Type', 'text-plain');
  res.write(content);
  res.end();
};

const fileNotFoundErrorHandler = (res) =>{
  res.setstatuscode = 500;
  res.write('server messed up');
  res.end();
};
const server = http.createServer( (req, res) => {

  if(req.url === "/"){
    req.url = "/index.html";
  }
  // console.log("req.url", req.url);
  // console.log("req.method", req.method);
  // console.log('req.headers', req.headers);
  // console.log("req.method", req);


 if(req.method === "GET"){
 if(resourceMapping.hasOwnProperty(req.url) ){
  fs.readFile(resourceMapping[req.url], (err, content) =>{
    if(err) {
      fileNotFoundErrorHandler(res);
      return;
    }
    sendContent(res, content);
  });
 } else{
  res.setstatuscode = 404;
  sendContent(res, 'No stay brah');
  return;
  }
 }


 if(req.method === "POST"){
  if(req.url === resourceMapping.req.url){
    fs.readFile(resourceMapping[req.url]);
  } else{
    fs.writeFile(`${req.url}`, 'data',(err, chunk) =>{
let reqBody = " ";
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    reqBody += chunk;
    let splitChunk = reqBody.split('&');
    console.log(splitChunk);
  });
  req.on('end', () =>{
    // console.log(`what is reqBody: ${reqBody}`);
  });
    });

  
 }
}
  

});



server.listen(PORT, () => {
  console.log("server is listening on port", PORT);
});
