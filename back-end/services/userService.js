const model = require('../models/users')

const createAdmin = async (input) => {
    try {
        const admin = await model.findOne({ email: input.email })
        if (admin) return true
        else {
            const createAdmin = await model.create(input)
            console.log("Admin Created SuccessFully", createAdmin)
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

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
        const data = await model.findOne(query)
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

const find = async (query, projection = {}) => {
  try {
    return await model.find(query, projection);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const update = async (id, updateData) => {
    try {
        return await model.findByIdAndUpdate(id, updateData);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    createAdmin,
    create,
    findOne,
    find,
    update
}