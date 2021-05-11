const User=require('../models/user')
const jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt');
const bcrypt=require('bcryptjs');
const { use } = require('../routes/users');
const e = require('express');
exports.signup=async(req,res)=>
{
	try {
		console.log("reqbody",req.body);
		const {email,name,password}=req.body;
	const user=new User();
	console.log("PASSWORDCFDDSD",user)
	const salt = await bcrypt.genSalt(10);
	// now we set user password to hashed password
	console.log("PASSWORD",password);
	let hashed_password = await bcrypt.hash(password, salt);
	console.log("HASHED PASSWORD",hashed_password);
	user.name=name;
	user.email=email;
	user.password=hashed_password;
	console.log("USEEEER",user);

	user.save((err,user)=>
	{
		if(err)
		{
			return res.status(400).json({
				err
			})
		}
		 res.json({
			user
		})
	})
	} catch (error) {
		console.log(error);
		
	}
};

exports.signin=async(req,res)=>
{
	console.log("SIGNIN")
	try {
		//find the user on email
	const {email,password}=req.body;
	const loginAdmin=await User.findOne({email:email}, {email: 1 ,password:1,name:1} );
	// console.log("LOGIN ADMIN",loginAdmin);
	if(!loginAdmin)
	{
		res.json({
			error:'EMAIL NOT EXISTS'
		})
	}
	var passwordIsValid = bcrypt.compareSync(password, loginAdmin.password);
	if(!passwordIsValid)
	{
		res.json({
			error:'incorrect password'
		})
	}

	const payLoad={_id:loginAdmin._id,email:loginAdmin.email,name:loginAdmin.name}
	const token=jwt.sign({payLoad:payLoad},process.env.JWT_SECRET,{ expiresIn:"10h" })
    console.log("PAYLOAD",payLoad);
	res.json({
		user_token:token
	})




	} catch (error) {
		throw error;	
	}	
}



exports.isAuth=(req,res,next)=>
{
	let user=req.profile && req.auth && req.profile._id==req.auth._id
	if(!user)
	{
		return res.status(403).json({
			error:"Access Denied"
		})
	}
	next()
}


// exports.isAdmin=(req,res,next)=>
// {
// 	if(req.profile.role===0)
// 	{
// 		return res.status(403).json(
// 		{
// 			error:"Admin resoruces Access Denied"
// 		})
// 	}
		
// 		next();
// }







