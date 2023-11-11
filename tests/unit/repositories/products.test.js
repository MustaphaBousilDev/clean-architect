const Chance=require('chance')
const { productsRepository } =require("../../../src/frameworks/repositories/inMemory")
const {Product} =require('../../../src/entities')
const  {cloneLodash, cloneDeep} =require('lodash')

const chance=new Chance()

describe('Product repository',()=>{
    test('New Product should be addedd and returned',async ()=>{
        //create a new product
        const testProduct=new Product({
            name:chance.name(),
            description:chance.sentence(),
            images:[
                chance.url(),
                chance.url()
            ],
            price:chance.natural(),
            color:chance.color(),
            meta:{
                deliver:{
                    from:'China'
                }
            }
        })
        const addedProduct=await productsRepository.add(testProduct)
        expect(addedProduct).toBeDefined()
        expect(addedProduct.id).toBeDefined()
        expect(addedProduct.name).toBe(testProduct.name)
        expect(addedProduct.description).toBe(testProduct.description)
        expect(addedProduct.images).toEqual(testProduct.images)
        expect(addedProduct.price).toBe(testProduct.price)
        expect(addedProduct.color).toBe(testProduct.color)
        expect(addedProduct.meta).toEqual(testProduct.meta)

        //get the product
        const returnedProduct=await productsRepository.getById(addedProduct.id)
        expect(returnedProduct).toEqual(addedProduct)
    })
    test('New Product should be deleted',async ()=>{
        //add two products

        const willBeDeletedProduct=new Product({
            name:chance.name(),
            description:chance.sentence(),
            images:[
                chance.url(),
                chance.url()
            ],
            price:chance.natural(),
            color:chance.color(),
            meta:{
                deliver:{
                    from:'China'
                }
            }
        })

        const shouldStayProduct=new Product({
            name:chance.name(),
            description:chance.sentence(),
            images:[
                chance.url(),
                chance.url()
            ],
            price:chance.natural(),
            color:chance.color(),
            meta:{
                deliver:{
                    from:'UK'
                }
            }
        })

        const [willBeDeletedAddedProduct,shouldStayAddedProduct]=await Promise.all(
            [
                productsRepository.add(willBeDeletedProduct),
                productsRepository.add(shouldStayProduct)
            ]
        )
        expect(willBeDeletedAddedProduct).toBeDefined()
        expect(shouldStayAddedProduct).toBeDefined()

        //delete one product 
        const deletedProduct=await productsRepository.delete(willBeDeletedAddedProduct)
        expect(deletedProduct).toEqual(willBeDeletedAddedProduct)

        //try to get the deleted product (it should be undefined)
        const shoundBeUndefinedProduct=await productsRepository.getById(deletedProduct.id)
        expect(shoundBeUndefinedProduct).toBeUndefined()

        //check that the second product defined 
        const shouldBeDefinedProduct=await productsRepository.getById(shouldStayProduct.id)
        expect(shouldBeDefinedProduct).toBeDefined()
    })
    test('New Product should be updated',async ()=>{
        //add a new product
        const testProduct=new Product({
            name:chance.name(),
            description:chance.sentence(),
            images:[
                chance.url(),
                chance.url()
            ],
            price:chance.natural(),
            color:chance.color(),
            meta:{
                deliver:{
                    from:'China'
                }
            }
        })
        const addedProduct=await productsRepository.add(testProduct)
        expect(addedProduct).toBeDefined()
        //clone the product and update
        const clonedProduct=cloneDeep({
            ...addedProduct,
            name:chance.name(),
            price:chance.natural()
        })
        //check the update
        const updatedProduct=await productsRepository.update(clonedProduct)
        expect(updatedProduct).toEqual(clonedProduct)
    })
})