const router = require('express').Router();
const { Post, User} = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"]}],
    });

    // res.json(postData)
    console.log("post data:", postData)
    const posts = postData.map((blogPost) => blogPost.get({ plain: true }));

    console.log("posts:", posts)

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
