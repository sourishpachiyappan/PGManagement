const Joi = require('joi')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user = require('../../models/users')

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
        const userData = await user.findOne({ email })
        console.log(userData)

        // Check password
        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ name: userData.name, email: userData.email, role: userData.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            message: 'Logged in successfully',
            user: userData,
            token,
        });
    } catch (error) {
        console.error(`Error during login:`, error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};