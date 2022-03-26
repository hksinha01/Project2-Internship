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
          let college = await collegeModel.findOne({name:intern.collegeName,isDeleted:false})
          if(!college){
             res.status(400).send({status : false, msg:"No Such college is Present,Please check collegeId"})}
          
            let internData= {
              name : intern.name,
              email:intern.email,
              mobile:intern.mobile,
              collegeId:college._id
            }
              if(!isValid(internData.name))
              return res.status(400).send({status: false,msg:"Enter Valid name"})
           
              if (!isValid(internData.email)) {

                return res.status(400).send({ status: false, message: "email is required" })
                     }

            if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(internData.email.trim()))) {

                return res.status(400).send({ status: false, message: 'Email should be a valid email address' })
            }
            let duplicateEmail=await internModel.findOne({email : internData.email});
                if(duplicateEmail)
                 {
                  return res.status(400).send({status:false, msg: "Email is already in use"})
                      }
              
              if (!isValid(internData.mobile)) {
                return res.status(400).send({ status: false, message: "mobile number is required" })
            }

            if (!(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(internData.mobile))) {

                return res.status(400).send({ status: false, message: `Mobile Number is not valid` })
            }
            let duplicateMobile=await internModel.findOne({mobile :internData.mobile});
                if(duplicateMobile)
                 {
                  return res.status(400).send({status:false, msg: "Mobile is already in use"})
                      }
        
              // let collegeId = req.body.collegeId
              // let college = await collegeModel.findById(collegeId)
              // if(!college){
              //    res.status(400).send({status : false, msg:"No Such college is Present,Please check collegeId"})}
              
              let internCreated = await internModel.create(internData)
              res.status(201).send({ status: true, data: internCreated })
         }
    }
    catch (error) {
         console.log(error)
         res.status(500).send({ status: false, msg: error.message })
    }

  };
  module.exports.intern=intern