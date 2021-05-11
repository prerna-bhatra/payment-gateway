const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
	name:
	{
		type:String,
		require:true	
	},
	email:
	{
		type:String,
		require:true,
		unique:32
	},
	password:
	{
		type:String,
		require:true
	},
    role:
    {
        type:Number,
        default:0
    }	
},
{
	timestamps:true
}
);

module.exports=mongoose.model('User',userSchema);



