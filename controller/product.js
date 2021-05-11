const Product=require('../models/product')

exports.addProduct=async(req,res)=>
{
    // console.log("ADD PRODUCTS");
    const product=new Product(req.body);
    console.log("PFROD",product);
    const saveProduct=await product.save();
    // console.log("SAVE ",saveProduct);
    if(saveProduct)
    {
        res.json({
            success:"Product saved"
        })
    }
    else{
        res.json({
            error:"Product not saved"
        })
    }


}



exports.getProduct=async(req,res)=>
{
   try {
    const getproducts=await Product.find();
    if(getproducts)
    {
        res.json({
            product:getproducts
        })
    }   
    else{
      res.json({
        error:"not found"
      })  
    }
       
   } catch (error) {
       throw error;;
   }
}
