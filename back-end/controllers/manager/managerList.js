const userService = require('../../services/userService')
const Errors = require('./errorCodes')

exports.getManager = async (req, res) => {
    try {
        const query = req.query

        const user = await userService.findOne({ email: query.email, status: 'approve' })
        if (!user) throw Errors.EC002
        res.status(200).send({
            message: "Manager Fetched Successfully!",
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
            console.error(`Error in get Manager: `, error);
            res.status(500).json({ message: 'get Manager error', error: error.message });
        }
    }
}

exports.listManagers = async (req, res) => {
    try {
        const managerList = await userService.find({ role: 'manager' })
        res.status(200).send({
            message: "Manager List Fetched Successfully!",
            data: managerList
        })
    } catch (error) {
        if (error.errorCode) {
            res.status(400).send({
                errorCode: error.errorCode,
                message: error.errorText
            })
        }
        else {
            console.error(`Error in Manager List: `, error);
            res.status(500).json({ message: 'List Manager error', error: error.message });
        }
    }
}

exports.listManagersName = async (req, res) => {
    try {
        const managerList = await userService.find({ role: 'manager', assignedPG: null, status: 'approve' }, {_id: 1, name: 1})
        res.status(200).send({
            message: "Manager List Fetched Successfully!",
            data: managerList
        })
    } catch (error) {
        if (error.errorCode) {
            res.status(400).send({
                errorCode: error.errorCode,
                message: error.errorText
            })
        }
        else {
            console.error(`Error in Manager List: `, error);
            res.status(500).json({ message: 'List Manager error', error: error.message });
        }
    }
}
