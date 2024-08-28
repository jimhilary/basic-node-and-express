let express = require('express');
let app = express();
let bodyparser=require("body-parser");

app.use(bodyparser.urlencoded({extended:false}));//this is for parsing the body of the request
app.use(bodyparser.json());
console.log("Hello my friend");
require('dotenv').config()




//logger middleware
app.use((req,res,next)=>{
    //create ur variable
   const logMessage=req.method + " " + req.path + " - " + req.ip;
    console.log(logMessage); //pass the control to the next middleware function
    next(); 
});

// Normal usage
app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
    
});


app.get("/json",function(req,res){
    const message= process.env.MESSAGE_STYLE== "uppercase"?"HELLO JSON":"Hello json";
        res.json({message:message});
});



//chain middlewar
app.get('/now', (req,res,next)=>{
   
    req.time= new Date().toString();
    next();
     },function(req,res){
        res.send({time:req.time});
    });


//Get Route Parameter Input from the Client

app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
      echo: word
    });
  });



//Get Query Parameter Input from the Client

 app.get("/name", function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`
  });
});

//Get Data from POST Requests

   app.post( "/name",  function(req, res){

    const string=req.body.first+" "+req.body.last;
    res.json({name: string});
  
   });





























 module.exports = app;
