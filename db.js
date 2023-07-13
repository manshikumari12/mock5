const mongoose =require("mongoose")
const dbConnection=mongoose.connect("mongodb+srv://manshisbp:manshi@cluster0.adzd2f3.mongodb.net/mock5?retryWrites=true&w=majority")
// 
module.exports={dbConnection}