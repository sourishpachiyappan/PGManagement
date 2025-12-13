

exports.getPgDetails = async (req, res) => {
    try {
        
    } catch (error) {
        if (error.errorCode) {
            res.status(400).send({
                errorCode: error.errorCode,
                message: error.errorText
            })
        }
        
        else {
            console.error(`Error in get PG details: `, error);
            res.status(500).json({ message: 'get PG error', error: error.message });
        }
    }
}

exports.listPGs = async (req, res) => {
    try {
        
    } catch (error) {
        if (error.errorCode) {
            res.status(400).send({
                errorCode: error.errorCode,
                message: error.errorText
            })
        }
        
        else {
            console.error(`Error in PG List: `, error);
            res.status(500).json({ message: 'List PG error', error: error.message });
        }
    }
}