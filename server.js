const express = require("express");
const app = express();

var users = [];

app.get('/',function(req,res) {
    console.log("Main URL Hit! ");
    if(users.length == 0)
    {
        res.status(200).send("No Student Found");    
    }
    else
    {
        var result = `<h3>All Users List</h3><ul>`;
        for (let index = 0; index < users.length; index++) {
            result += "<li>"+ users[index].name +" , "+ users[index].email +"</li>"
        }
        result += "</ul>";
        res.status(200).send(result);    
    }
});

app.get('/user/:idd', function (req,res){
    var user = req.params.idd;
    if(userFound(user))
    {
        var user = `
        <h3>ID: ${users[user-1].id}</h3>
        <h4>Name: ${users[user-1].name}</h4>
        <h4>Email: ${users[user-1].email}</h4>`; 
        res.status(200).send(user);
    }
    else
    {
        res.status(404).send("User not found!");    
    }
});

app.post('/add/:name/:email', function (req,res) {
    console.log("URL Hit");
    var name = req.params.name;
    var email = req.params.email;
    if(name == "" || email == "")
    {
        res.status(204).send("Data not Found or incomplete!");
    }
    else
    {
        var id = 1;
        var user = {
            id : users.length == 0 ? id : users[users.length - 1].id + 1,
            name : name,
            email : email
        };
        users.push(user);
        res.status(201).send("New User Added with id = " + user.id + ", Total Users: " + users.length);
        console.log(users);
    }
});

app.put('/updatename/:idd/:name', function (req,res) {
    
    var user = req.params.idd;
    var name = req.params.name;
    if(userFound(user))
    {
        users[user - 1].name = name;
        res.status(200).send("User Updated, New Name: "+ name);
    }
    else
    {
        res.status(404).send("User not found!");    
    }
    console.log(req.params.idd == 0 ? "No User Found" : users[user-1]);
});

app.put('/updateemail/:idd/:email', function (req,res) {
    
    var user = req.params.idd;
    var name = req.params.email;
    if(userFound(user))
    {
        users[user - 1].email = name;
        res.status(200).send("User Updated, New Email: "+ name);
    }
    else
    {
        res.status(404).send("User not found!");    
    }
    console.log(req.params.idd == 0 ? "No User Found" : users[user-1]);
});

app.delete('/delete/:idd', function (req,res) {
    var user = req.params.idd;
    var userPos = users.findIndex(obj => obj.id == user);
    if(userPos != -1)
    {
        users.splice(userPos,1);
        res.status(200).send("User Deleted, Total Users: "+users.length);
    }
    else
    {
        res.status(404).send("User not found!");    
    }
    console.log(req.params.idd == 0 ? "No User Found" : users[user-1]);
});

function userFound(id)
{
    var unique = false;
    users.forEach(function ( entry )
    {
        if ( entry.id == id )
        {
            unique = true;
        }
    });
    return unique;
}

var server = app.listen(8000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Project app running at http://%s:%s",host,port);
});