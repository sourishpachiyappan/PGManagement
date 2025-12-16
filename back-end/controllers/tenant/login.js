const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const tenantService = require('../../services/tenantService')
const Errors = require('../auth/errorCodes')

exports.validateLogin = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
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


exports.handleLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    try {
        const tenantData = await tenantService.findOne({ email })
        if (!tenantData) throw Errors.ET002
        console.log(tenantData)

        if(tenantData.status !== 'approved') { throw Errors.ET003 }

        // Check password
        const isMatch = await bcrypt.compare(password, tenantData.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ name: tenantData.name, email: tenantData.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            message: 'Logged in successfully',
            user: tenantData,
            token,
        });
    } catch (error) {
        if (error.errorCode) {
            res.status(400).send({
                errorCode: error.errorCode,
                message: error.errorText
            })
        } else {
            console.error(`Error during login:`, error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};