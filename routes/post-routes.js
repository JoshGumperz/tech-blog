const router = require('express').Router();
const { Post, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('new-post', { loggedIn: req.session.loggedIn });
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"]}]
    });

    // res.json(postData)
    const post = postData.get(({ plain: true }));

    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', 
withAuth,
 async (req, res) => {
  try { 
    const postData = await Post.create({
    title: req.body.title,
    text: req.body.text,
    user_id: req.session.user_id
  });
  res.status(200).json(postData)
  } catch (err) { 
  res.status(400).json(err);
  }
});

router.put('/:id', 
withAuth, 
async (req, res) => {
  try {
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

router.delete('/:id', withAuth, async (req, res) => {
  try {
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