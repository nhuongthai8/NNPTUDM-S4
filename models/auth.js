var schema = require('../schemas/users');

module.exports={
    Register: async (item)=>{
        let newItem = await new schema(item).save();
        return await newItem.getSignedJWT();
    },
    Login:()=>{
        
    }
}