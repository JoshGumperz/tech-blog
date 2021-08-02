const router = require('express').Router();
const { Post, User} = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const postData = await Category.findAll({
      include: [{ model: User.username }],
    });

    const posts = postData.map((Post) =>
      Post.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const paintingData = await Post.findByPk(req.params.id);

    const post = paintingData.get({ plain: true });

    res.render('post', { post, loggedIn: req.session.loggedIn });
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
    user_id: req.body.userId
  });
  res.status(200).json(postData)
} catch (err) {
  res.status(400).json(err);
}
});

router.put('/:id', async (req, res) => {
  try {
    const dish = await Post.update(
    {
      title: req.body.title,
      text: req.body.text,
      user_id: req.body.userId
    },
    {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(dish);
  } catch (err) {
      res.status(500).json(err);
    };
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No Post found with that id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
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
