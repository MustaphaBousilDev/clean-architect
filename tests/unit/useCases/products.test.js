const {
    Product
}=require('../../../src/entities')

const Chance=require('chance')

const chance=new Chance()

const {
    v4:uuidv4
}=require('uuid')


const {
    product:{
        addProductUseCase
    }
}=require('../../../src/useCases')


describe('Product use cases',()=>{
    const mockProductRepo={
        add:jest.fn(async product=> ({
            ...product,
            id:uuidv4()
        }))
    }
    const dependancies={
        productsRepository:mockProductRepo
    }
    describe('add product use case',()=>{
        test('new product should be added',async ()=>{
            //create a product 
            const testProduct=new Product({
                name:chance.name(),
                description:chance.sentence(),
                images:[uuidv4(),uuidv4()],
                price:chance.natural(),
                color:chance.color(),
                meta:{
                    comment:'the best product for this year'
                }
            })

            //call save product 
            const saveProduct=await addProductUseCase(dependancies).execute(testProduct)

            //check the result
            expect(saveProduct).toBeDefined()
            expect(saveProduct.id).toBeDefined()
            expect(saveProduct.name).toBe(testProduct.name)
            expect(saveProduct.description).toBe(testProduct.description)
            expect(saveProduct.images).toEqual(testProduct.images)
            expect(saveProduct.price).toBe(testProduct.price)
            expect(saveProduct.color).toBe(testProduct.color)
            expect(saveProduct.meta).toEqual(testProduct.meta)

            //check the call
            const expectedUserData=mockProductRepo.add.mock.calls[0][0]
            expect(expectedUserData).toEqual(testProduct)
        })
    })
})