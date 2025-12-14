const Joi = require("joi");

const userService = require('../../services/userService')
const Errors = require('./errorCodes')

exports.validateCreate = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            name: Joi.string()
                .min(2)
                .max(50)
                .required(),

            role: Joi.string()
                .valid('manager', 'admin', 'user')
                .required(),

            email: Joi.string()
                .email()
                .required(),

            password: Joi.string()
                .min(8)
                .max(30)
                .pattern(
                    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])')
                )
                .required()
                .messages({
                    'string.pattern.base':
                        'Password must contain uppercase, lowercase, number, and special character'
                }),

            aadharNo: Joi.string()
                .length(12)
                .pattern(/^[0-9]{12}$/)
                .required(),

            mobileNo: Joi.string()
                .length(10)
                .pattern(/^[6-9][0-9]{9}$/)
                .required()
        })

        const { error } = await schema.validate(req.body)

        if (!error) next()
        else {
            res.status(403).send({
                errorCode: 'Validation Error',
                error: error.message
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 'Error',
            message: error?.message
        })
    }
}

exports.handleCreate = async (req, res) => {
    try {
        const payload = req.body

        const existingUser = await userService.findOne({ email: payload.email, status: 'approve' })
        if (existingUser) { throw Errors.EC001 }

        const user = await userService.create({ ...req.body, status: 'approve' })
        res.status(201).send({
            message: "Manager created Successfully!",
            data: user
        })
    } catch (error) {
        if (error.errorCode) {
            res.status(400).send({
                errorCode: error.errorCode,
                message: error.errorText
            })
        }
        
        else {
            console.error(`Error in creating Manager: `, error);
            res.status(500).json({ message: 'create Manager error', error: error.message });
        }
    }
}