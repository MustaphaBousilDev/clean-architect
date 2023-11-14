const dependanciess=require('../../config/dependencies')
module.exports=dependencies =>{
    const {
        usersRepository
    }=dependanciess
    if(!usersRepository){
        throw new Error('The users repository should be exist in dependancies')
    }
    const execute=({
        id
    })=>{
        return usersRepository.getById(id)
    }
    return { execute }
}