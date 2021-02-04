//Importing Joi Validator Package
const JoiValidator= require('joi');

//Custom Validator function for Register Route
const createProfileValidator= (data)=>{
    const validatorSchema=JoiValidator.object(
        {
            _id:JoiValidator.string().required(),
            name:JoiValidator.string().min(4).max(255).required(),
            dob:JoiValidator.date().required(),
            bio:JoiValidator.string().min(20).max(500).required(),
            gender:JoiValidator.string().required(),
            interestedIn:JoiValidator.string().required(),
            jobTitle:JoiValidator.string(),
            company:JoiValidator.string(),
            school:JoiValidator.string(),
            verified:JoiValidator.boolean(),
            nickName:JoiValidator.string(),
            displayPicture:JoiValidator.string(),
            portfolio:JoiValidator.any(),
            interests:JoiValidator.any(),           
            notifToken:JoiValidator.string(),
            deviceId:JoiValidator.string().required(),
            phone:JoiValidator.string(),
            email:JoiValidator.string(),
            district:JoiValidator.string().required(),
            state:JoiValidator.string().required(),
            latitude:JoiValidator.number().required(),
            longitude:JoiValidator.number().required(),
            authMethod:JoiValidator.string().required(),
            country:JoiValidator.string().required()

        }
    )
    return validatorSchema.validate(data)
}
//Custom Validator function for Update Route
const updateProfileValidator= (data)=>{
    const validatorSchema=JoiValidator.object(
        {
            _id:JoiValidator.string().required(),
            name:JoiValidator.string().min(4).max(255),
            dob:JoiValidator.date(),
            bio:JoiValidator.string().min(20).max(500),
            gender:JoiValidator.string(),
            interestedIn:JoiValidator.string(),
            jobTitle:JoiValidator.string(),
            company:JoiValidator.string(),
            school:JoiValidator.string(),
            verified:JoiValidator.boolean(),
            nickName:JoiValidator.string(),
            displayPicture:JoiValidator.string(),
            interests:JoiValidator.array(),
            portfolio:JoiValidator.array(),
            notifToken:JoiValidator.string(),
            deviceId:JoiValidator.string(),
            phone:JoiValidator.string(),
            email:JoiValidator.string(),
            district:JoiValidator.string(),
            state:JoiValidator.string(),
            latitude:JoiValidator.number().required(),
            longitude:JoiValidator.number().required(),
            authMethod:JoiValidator.string(),
            country:JoiValidator.string()

        }
    )
    return validatorSchema.validate(data)
}
const matchValidator= (data)=>{
    const validatorSchema=JoiValidator.object(
        {
            _id:JoiValidator.string().required(),
            dl:JoiValidator.number().required(),
            al:JoiValidator.number().required(),
            state:JoiValidator.string().required(),
            district:JoiValidator.string().required(),
            gender:JoiValidator.string().required(),
            school:JoiValidator.string().required(),
            interestedIn:JoiValidator.string().required(),
            age:JoiValidator.number().required(),
            verified:JoiValidator.boolean().required(),
            misc:JoiValidator.boolean().required(),
            mylat:JoiValidator.number().required(),
            mylon:JoiValidator.number().required()
        }
    )
    return validatorSchema.validate(data)
}

//Exporting Validator Modules for access in other files
module.exports.createProfileValidator=createProfileValidator;
module.exports.updateProfileValidator=updateProfileValidator;
module.exports.matchValidator=matchValidator;
