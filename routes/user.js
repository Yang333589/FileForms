const express = require('express');
const router = express.Router();
  
router.get('/', (req, res)=>{
    res.send('User List');
});
router.get('/new', (req, res)=>{ // /users/new
    res.send('User New Form');
});

/*router.get('/:id', (req, res) =>{
    res.send(`Getting User Data: ${req.params.id}`);
});*/

router.route('/:id').get((req, res)=>{
    res.send(`Getting User data for id: ${req.params.id}`);
}).delete((req, res)=>{
    res.send(`Deleting User data for id: ${req.params.id}`);
}).put((req, res)=>{
    res.send(`Updating User data for id: ${req.params.id}`);
});

module.exports = router;