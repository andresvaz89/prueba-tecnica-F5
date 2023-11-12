const router = require('express').Router();
const Image = require('../models/Image.model');

router.post('/api/images', async (req, res) => {
  console.log('Solicitud POST a /api/images recibida');
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
