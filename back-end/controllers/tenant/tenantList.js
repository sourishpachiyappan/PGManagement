const tenantService = require('../../services/tenantService')

exports.listTenants = async (req, res) => {
    try {
        const query = req.query
        const tenantList = await tenantService.findAll(query);
        res.status(200).json({
            "message": "Tenant list fetched successfully",
            data: tenantList
        });
    } catch (error) {
        if (error.errorCode) {
            res.status(400).send({
                errorCode: error.errorCode,
                message: error.errorText
            })
        }
        else {
            console.error(`Error in get list tenant details: `, error);
            res.status(500).json({ message: 'get List error', error: error.message });
        }
    }
};

exports.getTenantDetails = async (req, res) => {
    try {
        const id = req.query.id;
        const tenantDetails = await tenantService.findOne({ _id: id });
        res.status(200).json({
            "message": "Tenant details fetched successfully",
            data: tenantDetails
        });
    } catch (error) {
        if (error.errorCode) {
            res.status(400).send({
                errorCode: error.errorCode,
                message: error.errorText
            })
        }
        else {
            console.error(`Error in get tenant details: `, error);
            res.status(500).json({ message: 'get Tenant error', error: error.message });
        }
    }
};