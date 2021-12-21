const express = require('express');

const router = express.Router();

const categoriesRoutes = require('./categories');
const testimonialsRoutes = require('./testimonials');
const organizationRoutes = require('./organizations');
const membersRoute = require('./members');
////// Remove this comments before pull request
//const commentsRoutes = require('./comments');
const slidesRoute = require('./slides');

router.use('/organizations', organizationRoutes);
router.use('/categories', categoriesRoutes);
router.use('/testimonials', testimonialsRoutes);
router.use('/members', membersRoute);
////// Remove this comments before pull request
//router.use('/comments', commentsRoutes);
router.use('/slides', slidesRoute);

module.exports = router;
