const jwt=require('jsonwebtoken')

const {BadRequestError}=require('../errors')




// normalde login ve register farklı şeyler fakat karmaşık olmasın diye burda amaç jwt'yi anlamak olduğundan ikisini birleştirdik. 
const login=async (req,res)=>{
    const {username,password}=req.body
    if(!username || !password){
        throw new BadRequestError('please type email and password!') 
    }

    const id=new Date().getDate //normalde db provide eder id'yi ama bizde db gerek olmadığından elle yazdık

    const token=jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn:'30d'} )  //payload yazdık, secret'i yazdık ki normalde kompleks olmalı,
    //tahmin edemesinler, ama biz kolay olsun diye .env'de kolay bişi yazdık, ve üçüncü olarak options yazdık
    // console.log(token) ile ekrana yazdırırsın tokeni
    res.status(200).json({msg:'user created',token}) //tokeni oluşturduk user'a geri gönderiyoz
}

const dashboard = async (req,res) =>{ 
    
    
    const luckyNumber=Math.floor(Math.random()*100) //0..99 arasında bi sayı alındı
    res.status(200).json({msg:`Hello, ${req.user.username}`, secret: `here is your authorized data, your lucky number is : ${luckyNumber}`})



     
}

module.exports={
    login,dashboard
}