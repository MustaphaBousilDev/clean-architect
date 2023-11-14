module.exports=dependencies =>{
    const {
        productsRepository
    }=dependencies
    if(!usersRepository){
        throw new Error('The users repository should be exist in dependancies')
    }
    const execute=({
        id
    })=>{
        return productsRepository.getById(id)
    }
    return { execute }
}