const router = require('express').Router();
const { Post, User} = require('../models');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"]}],
    });

    res.json(postData)

    // const posts = postData.map((Post) =>
    //   Post.get({ plain: true })
    // );

    // res.render('homepage', {
    //   posts,
    //   loggedIn: req.session.loggedIn,
    // });
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
