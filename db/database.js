import mongoose from "mongoose";

const uri = "mongodb+srv://unilog:unilog123@devprojetos.apxzm.mongodb.net/devprojetos?retryWrites=true&w=majority";

mongoose.connect( uri )
mongoose.Promise = global.Promise

export default mongoose
