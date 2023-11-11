const {usersRepository}=require('../../../src/frameworks/repositories/inMemory')
const Chance=require('chance')
const  {cloneDeep}=require('lodash')
const chance=new Chance()
const {
    User,
    constants:{
        userConstants:{
            genders
        }
    }
}=require('../../../src/entities')


describe('Users repository',()=>{
    test('New user should be added and returned',async ()=>{
        const testUser=new User({
            name:chance.name(),
            lastName:chance.last(),
            gender:genders.FEMALE,
            meta:{hair:{
                color:'red'
            }}
        })

        const addedUser=await usersRepository.add(testUser)

        expect(addedUser).toBeDefined()
        expect(addedUser.id).toBeDefined()
        expect(addedUser.name).toBe(testUser.name)
        expect(addedUser.lastName).toBe(testUser.lastName)
        expect(addedUser.gender).toBe(testUser.gender)
        expect(addedUser.meta).toBe(testUser.meta)

        const returnedUser=await usersRepository.getById(addedUser.id)
        expect(returnedUser).toEqual(addedUser)
    })

    test('New user should be updated',async ()=>{
        const testUser=new User({
            name:chance.name(),
            lastName:chance.last(),
            gender:genders.FEMALE,
            meta:{hair:{
                color:'red'
            }}
        })
        const addedUder=await usersRepository.add(testUser)
        expect(addedUder).toBeDefined()

        //updated User 
        const clonedUser=cloneDeep({
            ...addedUder,
            name:chance.name(),
            gender:genders.MALE
        })

        const updatedUser=await usersRepository.update(clonedUser)
        expect(updatedUser).toEqual(clonedUser)
    })

    test('New user should be deleted',async ()=>{
        //init two users 
        const userWillBeDeleted=new User({
            name:chance.name(),
            lastName:chance.last(),
            gender:genders.FEMALE,
            meta:{
                hair:{
                    color:'red'
                }
            }
        })
        const shouldStayUser=new User({
            name:chance.name(),
            lastName:chance.last(),
            gender:genders.FEMALE,
            meta:{
                hair:{
                    color:'yellow'
                }
            }
        })

        //add two users 
        const [userWillBeAddedDeleted, shouldStayAddUser]=await Promise.all(
            [usersRepository.add(userWillBeDeleted),usersRepository.add(shouldStayUser)]
        )
        expect(userWillBeAddedDeleted).toBeDefined()
        expect(shouldStayAddUser).toBeDefined()
        //delete one user 
        const deleteUser=await usersRepository.delete(userWillBeAddedDeleted)
        expect(deleteUser).toEqual(userWillBeAddedDeleted)

        //try to get the deleted user (should be undefined)
        const shouldBeUndefinedUser=await usersRepository.getById(deleteUser.id)
        expect(shouldBeUndefinedUser).toBeUndefined()

        //check that the second user defined (not deleted)
        const shouldBeDefinedUser=await usersRepository.getById(shouldStayAddUser.id)
        expect(shouldBeDefinedUser).toBeDefined()
    })
})