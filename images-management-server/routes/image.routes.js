const router = require('express').Router();
const Image = require('../models/Image.model');
const multer = require('multer');
const upload = multer().single('imagen');

router.post('/', upload, async (req, res) => {
  console.log('Solicitud POST a /api/images recibida');

  if (!req.file) {
    return res
      .status(400)
      .json({ error: 'No se ha proporcionado ningún archivo' });
  }

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

router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const imageId = req.params.id;

  try {
    const deletedImage = await Image.findByIdAndDelete(imageId);

    if (!deletedImage) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json(deletedImage);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.patch('/:id', upload, async (req, res) => {
  const { title } = req.body;

  try {
    let imageData = {};
    if (req.file) {
      imageData = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    const updatedImage = await Image.findByIdAndUpdate(
      req.params.id,
      { title, image: imageData },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    res.json(updatedImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
