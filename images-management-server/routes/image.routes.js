const router = require('express').Router();
const Image = require('../models/Image.model');
const multer = require('multer');
const upload = multer().single('imagen'); // Asegúrate de que 'imagen' coincida con el nombre del campo en tu formulario

router.post('/', upload, async (req, res) => {
  console.log('Solicitud POST a /api/images recibida');

  // Aquí deberías poder acceder a req.file
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

// Ruta para obtener una imagen por su ID
router.get('/api/images/:id', async (req, res) => {
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

module.exports = router;
