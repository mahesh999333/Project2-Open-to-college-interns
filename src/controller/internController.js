const internModel = require('../model/internModel')
const validator = require ('../validator/validator')


const createIntern = async function (req,res){

    try {
    let internData = req.body

    // BODY VALIDATION
    if (!validator.isValidRequestBody(internData)){
        return res.status(400).send({status: false, msg: "Intern details is required !"})
    }

    // NAME VALIDATION
    if (!validator.isValidField(internData.name)){
        return res.status(400).send({status: false, msg: "Name is required"})
    }
    if (!validator.isValidName(internData.name)){
        return res.status(400).send({status: false, msg: "Name is not valid"})
    }

    // EMAIL VALIDATION
    if (!validator.isValidField(internData.email)){
        return res.status(400).send({status: false, msg: "Email is required"})
    }
    if (!validator.isValidEmail(internData.email)){
        return res.status(400).send({status: false, msg: "Enter valid email id"})
    }
    
    
    let emailExist = await internModel.findOne({email: internData.email})
    if (emailExist){
        return res.status(400).send({status: false, msg: "Email is already registered"})
    }

    // MOBILE VALIDATION
    if (!validator.isValidField(internData.mobile)){
        return res.status(400).send({status: false, msg: "Enter mobile number"})
    }
    if (!validator.isValidMobile(internData.mobile)){
        return res.status(400).send({status: false, msg: "Enter valid Mobile Number"})
    }
    let mobileExists = await internModel.findOne({mobile: internData.mobile})
    if (mobileExists){
        return res.status(400).send({status: false, msg: "Mobile has been already registered"})
    }

    // // COLLEGE ID VALIDATION
    // if (!validator.isValidField(internData.collegeId)){
    //     return res.status(400).send({status: false, msg: "Enter college Id"})
    // }
    // if (!validator.isValidObjectId(internData.collegeId)){
    //     return res.status(400).send({status: false, msg: "Collge Id is invalid"})
    // }

    // CREATE INTERN DATA
    let newIntern = await internModel.create(internData);
    let result = {}


    //To add multiple key/value pairs to an object in the same statement, use the Object.assign()
    Object.assign(result,{isDeleted : newIntern.isDeleted,
        name : internData.name, 
        email : internData.email,
        mobile : internData.mobile,
        collegeId : internData.collegeName 
    })
    
    return res.status(201).send({status: true, data: result})
    }
    catch(error){
        res.status(500).send({status: false, msg: error.message})
    }
}

module.exports.createIntern = createIntern
