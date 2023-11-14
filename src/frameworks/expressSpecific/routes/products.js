const express=require('express')
const {}=require('../../../config/dependencies')

const {
    productControllers
}=require('../../../controllers')

module.exports=dependencies =>{
    const router=express.Router()
    const {
        addProductController,
        deleteProductController,
        updateProductController,
        getProductByIdController
    }=productControllers(dependencies)

    router.route('/')
        .post(addProductController)
        .delete(deleteProductController)
        .put(updateProductController)

    router.route('/:id')
        .get(getProductByIdController)

    return router
}