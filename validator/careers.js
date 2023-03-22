const { body, validationResult } = require('express-validator');
var MSG = require('../configs/notifies');
var handleresult = require('../configs/handleResult');
var util = require('util');

const option = {
    LengthName: { min: 5, max: 40 },
    LengthTitle: { max: 100, min: 5 }
}

const Rules = () => {
    return [
        body('name').isLength(option.LengthName)
            .withMessage(util.format(MSG.MSG_LENGTH, 'name', option.LengthName.min, option.LengthName.max)),
        body('tilte').isLength(option.LengthName)
        .withMessage(util.format(MSG.MSG_LENGTH, 'title', option.LengthTitle.min, option.LengthTitle.max)),
    ]
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