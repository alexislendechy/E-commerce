const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products with associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get a single product by its `id` value with associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId, {
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Update a product by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.update(req.body, {
      where: { id: productId },
    });
    if (updatedProduct[0] === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // Handle product tags
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: productId },
      });

      const currentTagIds = productTags.map((productTag) => productTag.tag_id);
      const newTagIds = req.body.tagIds;

      const tagsToAdd = newTagIds.filter((tagId) => !currentTagIds.includes(tagId));
      const tagsToRemove = currentTagIds.filter((tagId) => !newTagIds.includes(tagId));

      // Remove tags
      await ProductTag.destroy({
        where: {
          product_id: productId,
          tag_id: tagsToRemove,
        },
      });

      // Add new tags
      const productTagIdArr = tagsToAdd.map((tag_id) => {
        return {
          product_id: productId,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.destroy({
      where: { id: productId },
    });
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
