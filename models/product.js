const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
	item_name:
	{
		type:String,
		require:true	
	},
	price:
	{
		type:Number,
		require:true
	}	
},
{
	timestamps:true
}
);

module.exports=mongoose.model('Product',userSchema);



