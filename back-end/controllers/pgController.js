const { PG } = require("../models/User");

const getAllPGs = async (req, res) => {
  try {
    const pgs = await PG.find();
    res.status(200).json(pgs);
  } catch (error) {
    console.error("Error fetching PGs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addPG = async (req, res) => {
  const { PGData } = req.body;

  try{
    const newPg = new PG(PGData);
    await newPg.save();
    res.status(201).json({ message: "PG added successfully", pg: newPg });
  } catch (error) {
    console.log("Error to add PG:", error);
    res.status(500).json({ message: "Internal Server Error" })
  }
}

const updatePG = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPG = await PG.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPG) {
      return res.status(404).json({ message: "PG not found" });
    }
    res.status(200).json({ message: "PG updated successfully", pg: updatedPG });
  } catch (error) {
    console.error("Error updating PG:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deletePG = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPG = await PG.findByIdAndDelete(id);

    if (!deletedPG) {
      return res.status(404).json({ message: "PG not found" });
    }
    res.status(200).json({ message: "PG deleted successfully" });
  } catch (error) {
    console.error("Error deleting PG:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllPGs, addPG, updatePG, deletePG
};
