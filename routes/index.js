const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const postRoutes = require('./post-routes.js')

router.use('/', homeRoutes);
router.use('/post', postRoutes)
router.use('/api', apiRoutes);

module.exports = router;
