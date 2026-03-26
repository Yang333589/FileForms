const express = require('express');
const router = express.Router();
  
router.route('/').get((req, res)=>{
    res.send('User List');
}).post((req, res) => {
    const {firstName, lastName, gender, age} = req.body;
    const isNameValid = firstName !=="" && lastName !=="";
    const isGenderValid = gender === "male" || gender === "female";
    const isAgeValid = age !== "";
    if(isNameValid && isGenderValid && isAgeValid){ 
        console.log(`Adding user: ${firstName} ${lastName} Gender: ${gender} Age: ${age}`);
        users.push({firstName:firstName, lastName:lastName, gender:gender, age:age});
        console.log(users);
        res.render('users/list', {users});
    }
    else{
        console.log("Error adding user!");
        res.send("Something is invalid. Please try again.", {users})
    }
}); 

router.get('/list', (req, res) =>{
    res.render('users/list', {users});
});

router.get('/new', (req, res)=>{ // /users/new
    res.render("users/new", {firstName:"Test", lastName: "Test", gender: "male", age: "21"});
});

/*router.get('/:id', (req, res) =>{
    res.send(`Getting User Data: ${req.params.id}`);
});*/

router.route('/:id').get((req, res)=>{
    const user = req.user;
    console.log(req.user);
    console.log("Getting user data");
    res.render('users/display', {user});
}).delete((req, res)=>{
    res.send(`Deleting User data for id: ${req.params.id}`);
}).put((req, res)=>{
    res.send(`Updating User data for id: ${req.params.id}`);
});

const users = [{firstName: "Charles", lastName: "Carlos", gender: "male", age: "21"}, {firstName: "Sammy", lastName: "Hino", gender: "female", age: "19"}];
router.param("id", (req, res, next, id) => {
    console.log(id);
    req.user = users[id];
    console.log("Access attempt by user: ", id)
    next();
});

module.exports = router;