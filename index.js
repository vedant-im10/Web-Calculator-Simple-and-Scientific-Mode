const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const cookie = require('cookie-parser');
console.log(path.join(__dirname + "/"));

app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(express.static(path.join(__dirname + "/")));
app.use(cookie());
app.set('view engine','hbs');

app.get('/Scientific',(req,res)=>{
    
    res.set({
        "Content-Type":"text/html"
    });

    fs.readFile("scientific.html",(err,data)=>{
        res.status(201).send(data)
    })

});

app.get('/Simple',(req,res)=>{
    
    res.set({
        "Content-Type":"text/html"
    });

    fs.readFile("simple.html",(err,data)=>{
        res.status(201).send(data)
    })

});

app.get('/view',(req,res)=>{
    console.log(req.cookies.calc);
    res.render('data',{
        item:req.cookies.calc
    })
});

app.get('/delete',(req,res)=>{
    console.log(req.body);
    res.clearCookie('calc');
    console.log(req.cookies);
    res.redirect("/");
});

app.post('/visit',(req,res)=>{
    console.log(req.body);
    if(req.body.ca==='Simple'){
        res.redirect("/Simple");
    }else{
        res.redirect("/Scientific")
    }
});

app.post("/save",(req,res)=>{

    const save = [];
    
    for(var i=0;i<req.cookies?.calc?.length;i++){
        save.push(req.cookies?.calc[i]);
    }

    save.push(req.body.output);
    console.log(save)
    res.status(201).cookie('calc',save).redirect("/view");

});

app.get('/show',(req,res)=>{
   return res.status(201).json({data:req.cookies.calc});
});


const PORT = 5000 || process.env.PORT;

app.listen(PORT,()=>{
    console.log("Server is Running");
});