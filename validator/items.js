const { body, validationResult } = require('express-validator');
var MSG = require('../configs/notifies');
var handleresult = require('../configs/handleResult');
var util = require('util');

const option = {
    LengthName: { min: 10, max: 1000 },
    LengthSDT: { max: 10, min: 10 }
}

const Rules = () => {
    return [
        body('name').isLength(option.LengthName)
            .withMessage(util.format(MSG.MSG_LENGTH, 'name', option.LengthName.min, option.LengthName.max)),
        body('phone').isLength(option.LengthSDT).withMessage(util.format(MSG.MSG_SDT, option.LengthSDT.min)),
        body('email').isEmail().withMessage(MSG.MSG_EMAIL)]
}

const validate = (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    return  handleresult.showResult(res, 400, false, { errors: errors.array() });
}

module.exports={
    Rules,validate
}