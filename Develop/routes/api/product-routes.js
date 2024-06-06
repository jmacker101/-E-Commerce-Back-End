const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/product-seeds', (req, res) => {
  product.findAll({
    include: [Category, Tag]
  })
  .then((products) => res.json(products))
  .catch((err) => res.status(500).json(err));


  // const findAll category_id = [1, 5, 4, 3, 2];
  // changed a few things around to see if this worked 
  // const found = product_name.find((Element) => Element > 1);
  // console.log(found)
  // find all products
  // be sure to include its associated Category and Tag data
});

// get one product by the ID
router.get('./product=seeds:id', (req, res) => {
  Product.findByPk(req.params.id, {
    include: [Category, Tag]
  })
    .then((product) => res.json(product))
    .catch((err) => res.status(500).json(err));

  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

// create new product

// need help on this one

router.post('./models/category', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => ({
          product_id: product.id,
          tag_id
        }));
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .catch((err) => res.status(400).json(err));
});

    // did i enter this produc_name wrong as an example
  //   product_name: 'plain T-Shirt'
  //   price: 14.99
  //   stock: 14
  //   tagId: 1
  // };
  /* req.body should look like this...
    {
      product_name: plain T-Shirt
      price: 14.99
      stock: 14
      tagId: 1
    
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        // 
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });

// update product
// do i pull it from the product-seeds? 
router.put('/product-seeds:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        // this line feels weird?
        res.json(product);
      }})
      .catch((err) => res.status(400).json(err));
    
    });

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
          })
        };
          
        
          try{
            // confused on this one still
            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      
          
      return res.json(product);
    
     catch((err) => {
      console.log(err);
      res.status(400).json(err);
    
    });

router.delete('/product-seeds:id', (req, res) => {
  // if i put 
  // delete one product by its `id` value
  Product.destroy({
    where: { id: req.params.id }
    .then(() => res.status(200).json({ message: 'Product deleted' }))
    .catch((err) => res.status(400).json(err));
})
});

module.exports = router;
