var fs = require("fs");
var http = require("http");  
http.createServer( (request, response) => {
	if(request.url == "/") {
		response.writeHead(200, {'Content-Type': 'text/html'});  
		response.end('<h1>Home Page</h1>\n');
	} else if(request.url == "/api/userApi"){
		// fs.readFile()/
		response.writeHead(200, {'Content-Type': 'text/html'});  
		response.end('<h1>User Api</h1>\n');  
	} else {
		response.writeHead(404, { "Content-Type": "text/html" });
		response.end('<h1>Error</h1>\n');
	}
}).listen(8081);  
// Console will print the message  
console.log('This is changed');  
console.log('Server running at http://127.0.0.1:8081/');  


