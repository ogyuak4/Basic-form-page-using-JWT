const jwt=require('jsonwebtoken')

const {UnauthenticatedError}=require('../errors')



const authenticationMiddleware = async (req,res,next)=>{
    const authHeader=req.headers.authorization; //tokendeki header bilgisi
    if(!authHeader || !authHeader.startsWith('Bearer ')){ //tokenin headeri yoksa veya sorunluysa
        throw new UnauthenticatedError('No token provided') 
    }

    const token = authHeader.split(' ')[1]  // Artık tokeni front end'den geri aldık. Uzunca bi string şu anda bu token.
    
    

    try { // bu try catch içerisinde verify ediyoruz
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const{id,username} = decoded
        req.user={id,username}
        next()
        
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }



    
}

module.exports=authenticationMiddleware
