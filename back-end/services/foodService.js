const model = require('../models/foodMenu');

const findOne = async (query = {}) => {
    try {
        const data = await model.findOne(query)
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {
    findOne
}