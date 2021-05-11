require('dotenv').config()
const cors=require('cors')
const express=require('express');
const mongoose=require('mongoose');
//import router
const userRoutes=require('./routes/users')
const productRoutes=require('./routes/product')
// const morgan=require("morgan");
const bodyParser=require('body-parser');
// const cookieParser=require('cookie-parser')
const app=express();

const connect = mongoose.connect("mongodb+srv://prerna:Prerna123@cluster0.jokxx.mongodb.net/vaivas?retryWrites=true&w=majority",
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// app.use(morgan('dev'));
app.use(bodyParser.json())
// app.use(cookieParser());
app.use(cors())

//routes midlleware
app.use('/api',userRoutes);
// app.use('/api',userRoutes1);
// app.use('/api',productRoutes);
// app.use('/api',slotRoutes);

const port=process.env.PORT || 8000


app.listen(port,()=>
{
	console.log(port);
})