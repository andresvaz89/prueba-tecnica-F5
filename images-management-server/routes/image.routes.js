const router = require('express').Router();
const Image = require('../models/Image.model');

router.post('/images', async (req, res) => {
  const { title } = req.body;

  const imageData = {
    data: req.file.buffer,
    contentType: req.file.mimetype
  };

  try {
    const newImage = await Image.create({ title, image: imageData });
    res.json(newImage);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
