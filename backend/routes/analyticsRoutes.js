const express = require('express');
const router = express.Router();
const { getAnalytics, uploadAndPredict } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', protect, getAnalytics);
router.post('/upload', protect, upload.single('file'), uploadAndPredict);

module.exports = router;
