const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostColletion();
    res.send(await posts.find({}).toArray());
});


// Add Post 
router.post('/', async (req, res) => {
    const posts = await loadPostColletion();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

// Delete Post
router.delete('/:id',async (req, res) => {
    const posts = await loadPostColletion();
    await posts.deleteOne({_id: new mongodb.ObjectID (req.params.id)})
    res.status(200).send();
});

async function loadPostColletion() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://fame:'+encodeURIComponent('1234')+'@abc123-ihwfe.mongodb.net/test?retryWrites=true', {
        useNewUrlParser: true
    });
    return client.db('vue_express').collection('posts');
}
module.exports = router;