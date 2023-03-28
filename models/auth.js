var schema = require('../schemas/users');

module.exports={
    Register: async (item)=>{
        let newItem = await new schema(item).save();
        return await newItem.getSignedJWT();
    },
    Login:async (item)=>{
        const {email,password}=item;
        const result = await schema.findByCredentinal(email,password);
        if(result.error){
            return result;
        }
        return result.getSignedJWT();
    }
}