const user = require('../models/users')

const createAdmin = async (input) => {
    try {
        const admin = await user.findOne({ email: input.email })
        if(admin) return true
        else {
            const createAdmin = await user.create(input)
            console.log("Admin Created SuccessFully", createAdmin)
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

const create = async (input) => {
    try {
        const data = await user.create(input)
        console.log("User created successfully")
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

const findOne = async (query) => {
    try {
        const data = await user.findOne(query)
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

const find = async (query) => {
    try {
        return await user.find(query)
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {
    createAdmin,
    create,
    findOne,
    find
}