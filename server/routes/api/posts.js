const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get posts
router.get('/', async(req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

//create post
router.post('/', async(req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();

})


//delete post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    });

    res.status(200).send();
})



async function loadPostCollection()
{
    const client = await mongodb.MongoClient.connect('mongodb://root:nikita1@ds247058.mlab.com:47058/vue_express', {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts');
}


module.exports = router;