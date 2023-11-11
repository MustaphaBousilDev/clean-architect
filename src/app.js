const express=require('express')
const app=express()
const PORT=process.env.PORT || 3000

module.exports={
    start:()=>{
        app.listen(PORT,()=>{
            console.log(`Succeess FUcking running under port ${PORT}`)
        })
    }
}