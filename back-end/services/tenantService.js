const model = require('../models/tenant');

const create = async (input) => {
    try {
        const data = await model.create(input)
        console.log("Tenant created successfully")
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

const findOne = async (query) => {
    try {
        const data = await model.findOne(query)
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

const update = async (id, updateData) => {
    try {
        return await model.findByIdAndUpdate(id, updateData);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findAll = async (query) => {
    try {
        const data = await model.find(query)
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {
    create,
    findOne,
    update,
    findAll
}