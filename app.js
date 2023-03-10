const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
     res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
        const fName=req.body.firstName;
        const lname=req.body.lastName;
        const email=req.body.email;

        var data={
            members:[
                {
                    email_address:email,
                    status:"subscribed",
                    merge_fields:{
                        FNAME:fName,
                        LNAME:lname
                    }
                }
            ]
        }

        var jsonData=JSON.stringify(data);

        const url="https://us14.api.mailchimp.com/3.0/lists/186736008e";

        const options={
            method:"POST",
            auth:"suraj:6c29e2c42914f774c7214e692fe054b1-us14"

        }

        const request = https.request(url,options,function(response){

            if(response.statusCode===200){
                res.sendFile(__dirname+"/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html");
            }
            response.on("data",function(data){
                console.log(JSON.parse(data));
            });
        });

        request.write(jsonData);
        request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
});



app.listen(process.env.PORT || 3000,function(){
    console.log("Server Running on port 3000");
});

// 6c29e2c42914f774c7214e692fe054b1-us14


//186736008e