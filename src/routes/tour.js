const express = require('express');
const router = express.Router();

const tourController = require('../app/controllers/TourController');

router.get('/create', tourController.create);
router.get('/:id/edit', tourController.edit);
router.post('/selectall', tourController.selectAll);

router.put('/:id', tourController.update);
router.delete('/:id', tourController.delete);
router.get('/:slug', tourController.show);
router.post('/store', tourController.store);

module.exports = router;
