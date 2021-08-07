const router = require('express').Router();
const { Post, User} = require('../models/randomname');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"]}],
      order: [
        ['createdAt', 'DESC']
      ]
    });

    const posts = postData.map((blogPost) => blogPost.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
