const pgService = require('../../services/pgService');

const getPgList = async (query) => {
    try {
        const pgList = await pgService.find(query);
        console.log("PG list retrieved successfully", pgList);
        return pgList;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    getPgList
};