const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema( {
    name:{
        type:String,
        required:true
    },
   email:{ type  : String,
           required:true,
           unique:true,
           //match:/.\@.\..*/
   },
       mobile:{
           type:Number,
           required:true,
           unique:true,
          // match:([0-9]{10}$)|(^[7-9][0-9]{9}$)
       } ,
    collegeId: {
        type: ObjectId,
        required:true,
        ref: "College"
    }, 
    isDeleted: {
        type:Boolean, 
        default: false }

},{timestamps:true});
module.exports = mongoose.model("Intern", internSchema)