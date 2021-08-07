const router = require('express').Router();
const { Post, User} = require('../models');
const withAuth = require('../utils/auth');

// /post/

router.get('/', async (req, res) => {
  try {
    res.render('new-post', { loggedIn: req.session.loggedIn });
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// /post/editform/:id
router.get('/editform/:id', async (req, res) => {
  try {
    res.render('edit-post', { 
      loggedIn: req.session.loggedIn,
      postId: req.params.id
    });
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// /post/userposts
router.get('/userposts', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        { model: User, attributes: ["username"]}
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    });
    console.log(postData)

    const posts = postData.map((blogPost) => blogPost.get({ plain: true }));
    console.log(posts)

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/:id', async (req, res) => {
  try {
    let isOwner = true
    const checkOwner = await Post.findByPk(req.params.id) 
    if(checkOwner.user_id !== req.session.user_id) {
      isOwner = false;
    }
    console.log(isOwner)
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"]}]
    });

    // res.json(postData)
    const post = postData.get(({ plain: true }));

    res.render('post', { 
      post, loggedIn: req.session.loggedIn, isOwner 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try { 
    const postData = await Post.create({
    title: req.body.title,
    text: req.body.text,
    user_id: req.session.user_id
    });
    res.status(200).json(postData); 
  } catch (err) { 
  res.status(500).json(err);
  }
});
// /post/:id
router.put('/:id', withAuth, async (req, res) => {
  try {
    // let isOwner = true
    // const checkOwner = Post.findByPk(req.params.id) 
    // if(checkOwner.user_id !== req.session.user_id){
    //   isOwner = false
    //   return res.status(200).json({ message: "This post does not belong to you!" });
    // }
    const postData = await Post.update(
    {
      title: req.body.title,
      text: req.body.text,
      user_id: req.session.user_id
    },
    {
      where: {
        id: req.params.id,
      },
    });
    if (postData[0] === 0) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
      res.status(500).json(err);
    };
});
// /post/:id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    console.log(req.params.id)
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
module.exports = router;