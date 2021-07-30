const router = require('express').Router();
const mongoose = require('mongoose');
const Todo = require('../models/todoModel');

router.post('/', async (req, res) =>{
    try {
        const {name, todotitle, status, category} = req.body;
        const newtodo = new Todo({name, todotitle, status, category});
        const savetodo = await newtodo.save();
        res.status(200).json(savetodo)

    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
})

router.patch('/', async (req, res) => {
    const {name, status, todotitle, category} = req.body;
    const userExist = await Todo.findOne({name:name})
    if(userExist) {
        const key = userExist._id;
        const updateuser = new Todo({status, category});
        Todo.findByIdAndUpdate(key, {status: req.body.status, todotitle: req.body.todotitle, category: req.body.category}).then(() => {
            res.status(200).json({message: "Todo updated.."})
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const data = await Todo.findById(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
  });

router.get("/", async (req, res, next) => {
    try {
        const data = await Todo.find();
        // console.log(data);
        const filters = req.query;
        const filteredCategory = data.filter(category => {
            let isValid = true;
            for (key in filters) {
                console.log(key, category[key], filters[key]);
                isValid = isValid && category[key] == filters[key];
            }
            return isValid;
        })
        res.send(filteredCategory);
    } catch (err) {
        res.json.status(500).json(err);
        console.log(err);
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Todo with id: ${id}`);
  
    await Todo.findByIdAndRemove(id);
  
    res.json({ message: "Todo deleted successfully." });
  });



module.exports = router;