const { Response} =require('../../frameworks/common')
const {getProductByIdUseCase} =require('../../useCases/products')
module.exports=async (req,res) =>{
    console.log('fuck of')
   
        
        try{
            console.log('totototo')
            
            const {id}=req.params
            console.log('tototototeeee')
            const useCaseInstance = getProductByIdUseCase();

            console.log('before')
            // Call the execute method on the use case instance
            const getProductId = await useCaseInstance.execute({ id });
            console.log('after')
            
            res.json(new Response({
                status:true,
                content:getProductId
            }))
            //next()
        }catch(err){
            console.log(err)
        }
    
}