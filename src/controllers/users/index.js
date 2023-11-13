const addUserController=require('./addUser.controller')
const deleteUserController=require('./deleteUser.controller')
const updateUserController=require('./updateUser.controller')
const getUserByIdController=require('./getUserById.controller')


module.exports=dependancies=>{
    return {
        addUserController,
        deleteUserController,
        updateUserController,
        getUserByIdController
    }
}