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
        addProductUseCase,
        getProductByIdUseCase
    }
}=require('../../../src/useCases')


describe('Product use cases',()=>{
    const mockProductRepo={
        add:jest.fn(async product=> ({
            ...product,
            id:uuidv4()
        })),
        getById:jest.fn(async id=>({
            id,
            name:chance.name(),
            description:chance.sentence(),
            images:[uuidv4(),uuidv4()],
            price:chance.natural(),
            color:chance.color(),
            meta:{
                comment:'the best product of the the marchy'
            }
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

        test('get product by id useCase',async ()=>{
            //create a fake id and call get by id use case
            const fakeId=uuidv4()
            const returnedProduct=await getProductByIdUseCase(dependancies).execute({
                id:fakeId
            })
            //check that the data returned as expected 
            expect(returnedProduct).toBeDefined()
            expect(returnedProduct.id).toBeDefined()
            expect(returnedProduct.name).toBeDefined()
            expect(returnedProduct.description).toBeDefined()
            expect(returnedProduct.images).toBeDefined()
            expect(returnedProduct.price).toBeDefined()
            expect(returnedProduct.color).toBeDefined()
            expect(returnedProduct.meta).toBeDefined()
            //check the mock call
            const expectedId=mockProductRepo.getById.mock.calls[0][0]
            expect(expectedId).toBe(fakeId)
        })
    })
})