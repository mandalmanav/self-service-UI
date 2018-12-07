var express = require('express');
var path = require('path');

var app = express();

if(process.env.NODE_ENV=="production")
{

app.use(express.static(path.join(__dirname,'/build')))
app.get('*',(req,res)=>{

	res.sendFile(path.join(__dirname,'/build/index.html'))
})

}


var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
  console.log("Example app listening at http://%s:%s", host, port)
})