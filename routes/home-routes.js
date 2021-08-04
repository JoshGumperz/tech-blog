const router = require('express').Router();
const { Post, User} = require('../models');

router.get('/', async (req, res) => {
  try {
    const hideBtn = false
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"]}],
    });

    const posts = postData.map((blogPost) => blogPost.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      hideBtn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  const hideBtn = true
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login', {
    hideBtn
  });
});

module.exports = router;
