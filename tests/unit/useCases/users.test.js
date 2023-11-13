const {
    user:{
        addUserUseCase,
        getUserByIdUseCase,
        updateUserUseCase
    }
}=require('../../../src/useCases')

const {
    User,
    constants:{
        userConstants:{
            genders
        }
    }
}=require('../../../src/entities')
const Chance=require('chance')
const {v4:uuidv4}=require('uuid')
const { deleteUserUseCase } = require('../../../src/useCases/users')

const chance=new Chance()


describe('User useCases',()=>{
    const mockUserRepo={
        add:jest.fn(async user =>({
            ...user,
            id:uuidv4()
        })),
        getById:jest.fn(async id=>({
            id,
            name:chance.name(),
            lastName:chance.last(),
            gender:genders.NOT_SPECIFIED,
            meta:{}
        })),
        update:jest.fn(async (user)=>user),
        delete:jest.fn(async (user)=>user)
    }
    const dependancies={
        usersRepository:mockUserRepo
    }
    test('add user use case',async ()=>{
        //create the user data
        const testUserData={
            name:chance.name(),
            lastName:chance.last(),
            gender:genders.MALE,
            meta:{
                hair:{
                    color:'red'
                }
            }
        }
        //add a user using useCases
        const addedUser=await addUserUseCase(dependancies).execute(testUserData)

        //check the recieved data
        expect(addedUser).toBeDefined()
        expect(addedUser.id).toBeDefined()
        expect(addedUser.name).toBe(testUserData.name)
        expect(addedUser.lastName).toBe(testUserData.lastName)
        expect(addedUser.gender).toBe(testUserData.gender)
        expect(addedUser.meta).toEqual(testUserData.meta)

        //check that the dependencies called as expected
        const call=mockUserRepo.add.mock.calls[0][0]
        expect(call.id).toBeUndefined()
        expect(call.name).toBe(testUserData.name)
        expect(call.lastName).toBe(testUserData.lastName)
        expect(call.gender).toBe(testUserData.gender)
        expect(call.meta).toEqual(testUserData.meta)

        //
    })
    test('get user usecase by id',async ()=>{
        //generate a fake id 
        const fakeId=uuidv4()
        //call get user by id 
        const userById=await getUserByIdUseCase(dependancies).execute({id:fakeId})
        //check the data
        expect(userById).toBeDefined()
        expect(userById.id).toBe(fakeId)
        expect(userById.name).toBeDefined()
        expect(userById.lastName).toBeDefined()
        expect(userById.gender).toBeDefined()
        expect(userById.meta).toBeDefined()
        //check the mock

        const expectedID=mockUserRepo.getById.mock.calls[0][0]
        expect(expectedID).toBe(fakeId)
    })
    test('update user use case',async ()=>{
        //create user fake data
        const testData={
            id:uuidv4(),
            name:chance.name(),
            lastName:chance.last(),
            gender:genders.FEMALE,
            meta:{
                education:{
                    school:'full'
                }
            }
        }
        //call update a user 
        const updateUser=await updateUserUseCase(dependancies).execute({user:testData})

        //check the result 
        expect(updateUser).toEqual(testData)
        //check the call
        const expectedUser=mockUserRepo.update.mock.calls[0][0]
        expect(expectedUser).toEqual(testData)
    })
    test('delete user use case',async ()=>{
        //create user fake data
        const testData={
            id:uuidv4(),
            name:chance.name(),
            lastName:chance.last(),
            gender:genders.FEMALE,
            meta:{
                education:{
                    school:'full'
                }
            }
        }
        //call delete
        const deletedUser=await deleteUserUseCase(dependancies).execute({
            user:testData
        })
        //check the returned data 
        expect(deletedUser).toEqual(testData)
        //check the call
        const expectedUser=mockUserRepo.delete.mock.calls[0][0]
        expect(expectedUser).toEqual(testData)

    })
})