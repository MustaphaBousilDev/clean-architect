const {Order} =require('../../entities')

module.exports=dependencies=>{
    const {
        ordersRepository
    }=dependencies

    if(!ordersRepository){
        throw new Error('productsRepository should be in dependencies')
    }

    const execute=({
        order
    })=>{
        return ordersRepository.update(order)
    }

    return {
        execute
    }
}