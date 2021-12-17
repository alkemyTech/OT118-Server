const express = require('express');
const slidesController = require('../controllers/slides');
//const authMiddleware = require('../middlewares/auth');
const slideValidator = require("../middlewares/slideValidator")

const router = express.Router();

router.post('/create', slideValidator, slidesController.create)
router.delete('/:id', /*authMiddleware.isAdmin,*/ slidesController.remove);

module.exports = router;
