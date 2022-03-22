const express = require('express');
const router = express.Router();
const collegeController=require("../controllers/collegecontroller")
const internController=require("../controllers/internController")

router.post('/colleges',collegeController.createCollege)
router.post('/interns',internController.intern)
router.get('/collegeDetails',collegeController.getCollege)

module.exports=router