const model = require('../models/pg')

const create = async (input) => {
    try {
        const data = await model.create(input)
        console.log("User created successfully")
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

const findOne = async (query) => {
    try {
        const data = await model.findOne(query).populate('managerId')
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

const find = async (query) => {
    try {
        return await model.find(query).populate('managerId')
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {
    create,
    findOne,
    find
}