const Joi = require('joi');

const tenantService = require('../../services/tenantService');
const usersService = require('../../services/userService');
const pgService = require('../../services/pgService');

const tenantErrors = require('../auth/errorCodes');
const userErrors = require('../manager/errorCodes');

exports.validateUpdateStatus = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            id: Joi.string().required(),

            status: Joi.string()
                .valid('approved', 'rejected')
                .required(),

            roomType: Joi.string().when('status', {
                is: 'approved',
                then: Joi.required(),
                otherwise: Joi.forbidden()
            }),

            roomNumber: Joi.number().integer().min(1).when('status', {
                is: 'approved',
                then: Joi.required(),
                otherwise: Joi.forbidden()
            }),

            reason: Joi.string().when('status', {
                is: 'rejected',
                then: Joi.required(),
                otherwise: Joi.forbidden()
            })
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

exports.handleUpdateStatus = async (req, res) => {
    try {
        const payload = req.body;

        const [
            manager,
            tenant
        ] = await Promise.all([
            usersService.findOne({ _id: req.user.id }),
            tenantService.findOne({ _id: payload.id })
        ]);

        if (!tenant) { throw tenantErrors.ET002; }
        if (!manager || manager.role !== 'manager') { throw userErrors.EC002; }
        if (tenant.status !== 'pending') { throw tenantErrors.ET004; }

        if (payload.status === 'approved') {
            let tenantData = {
                status: 'approved',
                updatedBy: req.user.id,
                roomType: payload.roomType,
                roomNumber: payload.roomNumber
            }

            await Promise.all([
                tenantService.update({ _id: payload.id }, tenantData),
                pgService.findAndUpdate({ _id: tenant.pgId, [`roomDetails.${payload.roomType}`]: { $gt: 0 } }, {
                    $inc: { [`roomDetails.${payload.roomType}`]: -1 }
                })
            ]);
        }
        else if (payload.status === 'rejected') {
            await tenantService.update({ _id: payload.id }, {
                status: 'rejected',
                reason: payload.reason,
                updatedBy: req.user.id
            });
        }

        res.status(200).json({
            message: `Tenant ${payload.status} successfully`
        });
    } catch (error) {
        if (error.errorCode) {
            res.status(400).send({
                errorCode: error.errorCode,
                message: error.errorText
            })
        } else {
            console.error(`Error during Update Status:`, error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}