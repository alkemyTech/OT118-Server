const express = require('express');

const router = express.Router();

const categoriesRoutes = require('./categories');
const testimonialsRoutes = require('./testimonials');
const organizationRoutes = require('./organizations');
const membersRoute = require('./members');
const commentsRoutes = require('./comments');
const slidesRoute = require('./slides');
const newsRoute = require('./news');
const authRoute = require('./auth');

router.use('/organizations', organizationRoutes);
router.use('/categories', categoriesRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/members', membersRoute);
router.use('/comments', commentsRoutes);
router.use('/slides', slidesRoute);
router.use('/news', newsRoute);
router.use('/auth', authRoute);

module.exports = router;
