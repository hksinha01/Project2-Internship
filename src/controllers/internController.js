const internModel=require("../models/internModel")
const collegeModel=require("../models/collegeModel") 
let validator =require("email-validator");
const {phone} = require('phone');
const isValidRequestBody = (requestBody) => {

    return Object.entries(requestBody).length > 0
  
  }
  const isValid = (value) => {

    if (typeof value === 'undefined' || value === null) return false
  
    if (typeof value === 'string' && value.trim().length === 0) {
  
      return false
    }
    return true
  }

const intern = async function (req, res) {
    try {
         let intern = req.body
         if (!isValidRequestBody(intern)) {
              res.status(400).send({ status: false, msg: "invalid request parameters . Please Provide interns Details" })
         }
         else {
            const { name, email, mobile} = intern;
              if(!isValid(name))
              return res.status(400).send({status: false,msg:"Enter Valid name"})
           
              if (!isValid(email)) {

                return res.status(400).send({ status: false, message: "email is required" })
                     }

            if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {

                return res.status(400).send({ status: false, message: 'Email should be a valid email address' })
            }
            let duplicateEmail=await internModel.findOne({email});
                if(duplicateEmail)
                 {
                  return res.status(400).send({status:false, msg: "Email is already in use"})
                      }
              
              if (!isValid(mobile)) {
                return res.status(400).send({ status: false, message: "mobile number is required" })
            }

            if (!(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(mobile))) {

                return res.status(400).send({ status: false, message: `Mobile Number is not valid` })
            }

        
              let collegeId = req.body.collegeId
              let college = await collegeModel.findById(collegeId)
              if(!college){
                 res.status(400).send({status : false, msg:"No Such college is Present,Please check collegeId"})}
              
              let internCreated = await internModel.create(intern)
              res.status(201).send({ status: true, data: internCreated })
         }
    }
    catch (error) {
         console.log(error)
         res.status(500).send({ status: false, msg: error.message })
    }

  };
  module.exports.intern=intern