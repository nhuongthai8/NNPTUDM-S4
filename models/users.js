var schema = require('../schemas/users');

module.exports={
    getAllItem:async ()=>{
        return await schema.find({}).exec();
    },
    getItemById:async (id)=>{
        return await schema.findById(id).exec();
    },
    addAnItem: async (item)=>{
        return (new schema(item)).save();
    },
    editAnItem: async (params)=>{// params.id params.update
        return await schema.findByIdAndUpdate(params.id,params.update,{new:true});
    },
    deleteAnItem:async(id)=>{
        return await schema.findByIdAndDelete(id);
    }
}