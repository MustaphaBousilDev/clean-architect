module.exports=dependencies =>{
    const {
        productsRepository
    }=dependencies
    if(!productsRepository){
        throw new Error('The users repository should be exist in dependancies')
    }
    const execute=({
        user
    })=>{
        return productsRepository.update(user)
    }
    return { execute }
}