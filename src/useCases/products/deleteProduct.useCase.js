module.exports=dependencies =>{
    const {
        productsRepository
    }=dependencies
    if(!productsRepository){
        throw new Error('The users repository should be exist in dependancies')
    }
    const execute=({
        product
    })=>{
        return productsRepository.delete(product)
    }
    return { execute }
}