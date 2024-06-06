const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/api/categories', async (req, res) => {
  console.log("cody is awesome")
  try{
  const allCategories = await Category.findAll({
    include: [{ model: Product }],
  });
  res.json(allCategories);
} 
catch (err) {
  res.status(500).json(err);

  // find all categories
  // be sure to include its associated Products
}
});

  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/category-seeds:id', async (req, res) => {
    try {
      const categoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product }],
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
  
      res.json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
})


router.post('/category-seeds', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/category-seeds:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/category-seeds:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(400).json(err)
}
});

module.exports = router;
