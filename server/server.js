import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();const app=express();const port=process.env.PORT||5000;
app.use(cors({origin:process.env.FRONTEND_URL||"*"}));app.use(express.json());
const schema=new mongoose.Schema({village:{type:String,required:true,trim:true,maxlength:80},date:{type:String,required:true},startTime:{type:String,required:true},endTime:{type:String,required:true},location:{type:String,required:true,trim:true,maxlength:150},landmark:{type:String,trim:true,maxlength:150},youthName:{type:String,trim:true,maxlength:80},contact:{type:String,trim:true,maxlength:20},expiresAt:{type:Date,required:true,index:{expires:0}}},{timestamps:true});
const Event=mongoose.model("Event",schema);
const dt=(d,t)=>new Date(`${d}T${t}:00`);
app.get("/api/health",(q,s)=>s.json({ok:true}));
app.get("/api/events",async(q,s)=>{try{s.json(await Event.find({expiresAt:{$gt:new Date()}}).sort({date:1,startTime:1}).lean())}catch{s.status(500).json({message:"Could not load events."})}});
app.post("/api/events",async(q,s)=>{try{let {village,date,startTime,endTime,location,landmark="",youthName="",contact=""}=q.body;if(!village||!date||!startTime||!endTime||!location)return s.status(400).json({message:"Please fill all required fields."});let a=dt(date,startTime),b=dt(date,endTime);if(Number.isNaN(a.getTime())||Number.isNaN(b.getTime()))return s.status(400).json({message:"Invalid date or time."});if(b<=a)return s.status(400).json({message:"End time must be after start time."});if(b<=new Date())return s.status(400).json({message:"The event must end in the future."});s.status(201).json(await Event.create({village,date,startTime,endTime,location,landmark,youthName,contact,expiresAt:b}))}catch{s.status(500).json({message:"Could not add event."})}});
mongoose.connect(process.env.MONGODB_URI).then(()=>app.listen(port,()=>console.log(`Server running on ${port}`))).catch(e=>{console.error(e.message);process.exit(1)});