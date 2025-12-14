const Joi = require('joi')

const pgService = require('../../services/pgService')
const userService = require('../../services/userService')
const Errors = require('./errorCodes')

exports.validateCreate = async (req, res, next) => {
    try {
        const schema = Joi.object({
            name: Joi.string().trim().required(),
            description: Joi.string().trim().allow(""),

            address: Joi.object({
                addressLine1: Joi.string().trim().required(),
                addressLine2: Joi.string().trim().optional().allow(null).allow(""),
                city: Joi.string().trim().required(),
                state: Joi.string().trim().required(),
                pincode: Joi.string()
                    .pattern(/^[1-9][0-9]{5}$/)
                    .required()
                    .messages({
                        "string.pattern.base": "Pincode must be a valid 6-digit number"
                    })
            }).required(),

            ownerName: Joi.string().trim().required(),

            ownerNo: Joi.string()
                .pattern(/^[6-9]\d{9}$/)
                .required()
                .messages({
                    "string.pattern.base": "Owner number must be a valid 10-digit mobile number"
                }),

            managerId: Joi.string()
                .required()
                .allow("")
                .pattern(/^[0-9a-fA-F]{24}$/)
                .messages({
                    "string.pattern.base": "managerId must be a valid ObjectId"
                }),

            roomDetails: Joi.object()
                .pattern(
                    Joi.string().pattern(/^\d+$/), // numeric string keys
                    Joi.number().integer().positive().required() // values like 10, 12
                )
                .required()
        });

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
        let payload = req.body

        const existingPg = await pgService.findOne({ name: payload.name })
        if (existingPg) throw Errors.ED001

        const pg = await pgService.create(payload)
        const manager = await userService.update(payload.managerId, { assignedPG: pg._id, activePg: true })
        res.status(200).send({
            message: "PG Created Successfully!",
            data: pg
        })

    } catch (error) {
        if (error.errorCode) {
            res.status(400).send({
                errorCode: error.errorCode,
                message: error.errorText
            })
        }

        else {
            console.error(`Error in creating PG: `, error);
            res.status(500).json({ message: 'create PG error', error: error.message });
        }
    }
}