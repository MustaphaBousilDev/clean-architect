const {ordersRepository, productsRepository}=require("../../../src/frameworks/repositories/inMemory")
const Chance=require('chance')
const {Order}=require('../../../src/entities')
const {cloneDeep}=require('lodash')
const chance=new Chance()
const {
    v4:uuidv4
}=require('uuid')

describe('Order repository',()=>{
    test('New Order should be addedd and returned',async ()=>{
        //add a new order 
        const testOrder=new Order({
            userId:uuidv4(),
            productsIds:[uuidv4(),uuidv4()],
            date:new Date(),
            isPayed:true,
            meta:{
                comment:'Deliver ut not me as soon as possible'
            }
        })
        const addOrder=await ordersRepository.add(testOrder)
        //check the order
        expect(addOrder).toBeDefined()
        expect(addOrder.id).toBeDefined()
        expect(addOrder.userId).toBe(testOrder.userId)
        expect(addOrder.productsIds).toEqual(testOrder.productsIds)
        expect(addOrder.date).toEqual(testOrder.date)
        expect(addOrder.isPayed).toBe(testOrder.isPayed)
        expect(addOrder.meta).toEqual(testOrder.meta)

        //get the order and check is the equal
        const returnedOrder=await ordersRepository.getById(addOrder.id)
        expect(returnedOrder).toEqual(addOrder)
    })
    test('New Order should be deleted',async ()=>{
        //add two orders
        const willBeDeletedOrder=new Order({
            userId:uuidv4(),
            productsIds:[uuidv4(),uuidv4()],
            date:new Date(),
            isPayed:true,
            meta:{
                comment:'Deliver is to me as soon as possible'
            }
        })
        const shouldStayOrder=new Order({
            userId:uuidv4(),
            productsIds:[uuidv4(),uuidv4()],
            date:new Date(),
            isPayed:true,
            meta:{
                comment:'Deliver is to me as soon as possible'
            }
        })
        const [willBeDeletedAddedOrder,shouldStayAddedOrder]=await Promise.all(
            [
                ordersRepository.add(willBeDeletedOrder),
                ordersRepository.add(shouldStayOrder)
            ]
        )
        expect(willBeDeletedAddedOrder).toBeDefined()
        expect(shouldStayAddedOrder).toBeDefined()

        //delete one user
        const deletedUser=await ordersRepository.delete(willBeDeletedAddedOrder)
        expect(deletedUser).toEqual(willBeDeletedAddedOrder)

        //try to get delete order and it should be undefined 
        const shouldBeUndefinedOrder=await ordersRepository.getById(willBeDeletedAddedOrder.id)
        expect(shouldBeUndefinedOrder).toBeUndefined()

        //check that just relevant order deleted
        const shouldBeDefinedOrder=await ordersRepository.getById(shouldStayAddedOrder.id)
        expect(shouldBeDefinedOrder).toBeDefined()
        })
    test('New Order should be updated',async ()=>{
        //add a new product
        //add a new order 
        const testOrder=new Order({
            userId:uuidv4(),
            productsIds:[uuidv4(),uuidv4()],
            date:chance.date(),
            isPayed:true,
            meta:{
                comment:'Deliver ut not me as soon as possible'
            }
        })

        const addedOrder=await ordersRepository.add(testOrder)
        expect(addedOrder).toBeDefined()

        //update order (with cloning)
        const clonedOrder=cloneDeep({
            ...addedOrder,
            isPayed:false,
            productsIds:[...testOrder.productsIds,uuidv4()],
        })
        const updatedOrder=await ordersRepository.update(clonedOrder)
        //check the update
        expect(updatedOrder).toEqual(clonedOrder)
    })
})