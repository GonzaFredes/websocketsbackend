const {Router} = require('express')
const productscontrollerBD = require('../controller/products.controllerBD')

const router = Router();

router.get('/', productscontrollerBD.getProduct)
router.post('/', productscontrollerBD.addProduct)
router.get('/:pid', productscontrollerBD.getProductByID)
router.delete('/:pid', productscontrollerBD.deleteByID)
router.put('/:pid', productscontrollerBD.updateByID)

module.exports = router;