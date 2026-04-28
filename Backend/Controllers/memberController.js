const Member = require('../Models/members');
const addMember = async (req, res) => {
    try {
        const member = await Member.create(req.body);
        res.status(201).json({
            status: 'success',
            data: member
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
const getAllMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).json({
            status: 'success',
            results: members.length,
            data: members
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
const updateMember = async (req, res) => {
    try {
        const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: member
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
module.exports = {
    addMember,
    getAllMembers,
    updateMember
};
