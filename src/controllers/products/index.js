const addProductController=require('./addProduct.controller')
const deleteProductController=require('./deleteProduct.controller')
const updateProductController=require('./updateProduct.controller')
const getProductByIdController=require('./getProductById.controller')


module.exports=dependencies=>{
    return {
        addProductController,
        deleteProductController,
        updateProductController,
        getProductByIdController
    }
}