const Joi = require("joi");
const userService = require('../../services/userService')
const Errors = require('./errorCodes')

exports.validateUpdate = async (req, res, next) => {
    try {
        const schema = Joi.object({
            name: Joi.string().min(2).max(50).required(),
            email: Joi.string().email().required(),
            aadharNo: Joi.string().length(12).pattern(/^[0-9]{12}$/).required(),
            mobileNo: Joi.string().length(10).pattern(/^[6-9][0-9]{9}$/).required(),
            status: Joi.string().valid("approve", "disapprove").required()
        });

        const { error, value } = schema.validate(req.body, {
            allowUnknown: true,
            stripUnknown: true
        });

        if (error) {
            return res.status(403).send({
                errorCode: "Validation Error",
                error: error.message
            });
        }

        req.body = value; // cleaned body
        next();
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: error.message
        });
    }
};

exports.handleUpdate = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            email,
            mobileNo,
            aadharNo,
            status
        } = req.body;

        const updateData = {
            name,
            email,
            mobileNo,
            aadharNo,
            status
        };

        const user = await userService.update(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!user) throw Errors.EC002;

        res.status(201).send({
            message: "Manager updated successfully!",
            data: user
        });

    } catch (error) {
        if (error.errorCode) {
            res.status(400).send({
                errorCode: error.errorCode,
                message: error.errorText
            });
        } else {
            console.error("Error updating manager:", error);
            res.status(500).json({
                message: "Update manager error",
                error: error.message
            });
        }
    }
};
