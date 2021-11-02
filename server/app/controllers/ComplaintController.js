const ComplaintModel = require('../models/Complaint')
const config = require("../config/config")

class ComplaintController {
    static async createComplaint(req, res) {
        const complaint = new ComplaintModel({
            title: req.body.title,
            desc: req.body.desc,
            created_by: req.userId,
            category: req.body.category,
            status: 'open'
        })

        await complaint.save();

        res.json({ status: "complaint created" })
    }

    static async getAllComplaints(req, res) {
        try {
            await ComplaintModel.find({}, (errs, complaints) => {
                res.send(complaints)
            }).clone();
        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: 'Something went wrong'
            })
        }

    }

    static async getComplaint(req, res) {
        try {
            const complaintId = req.params.complaintId;
            await ComplaintModel.find({ _id: complaintId }, (err, complaint) => {
                if (!complaint) res.send(`no complaint with id ${complaintId}`)
                else res.send(complaint);
            });
            
        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: 'Something went wrong'
            })
        }
    }

    static async removeComplaint(req, res) {
        try {
            const complaintId = req.params.complaintId;
            await ComplaintModel.deleteOne({ _id: complaintId }, (err, { deletedCount }) => {
                if (!err && deletedCount > 0) res.send(`removed complaint with id ${complaintId}`)
                else res.send(`no complaint with id ${complaintId}`);
            });
            
        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: 'Something went wrong'
            })
        }
    }

    static async getComplaintsByCategory(req, res) {
        try {
            const category = req.params.category;
            await ComplaintModel.find({ category: category }, (err, complaints) => {
                if (err) {
                    throw "error"
                }
                else res.send(complaints);
            });
        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: 'Something went wrong'
            })
        }
    }

    static async updateStatus(req, res) {
        try {
            const complaintId = req.params.complaintId;
            const statusId = req.params.statusId;
            await ComplaintModel.findOneAndUpdate({ _id: complaintId }, {status: config.statusValues[statusId - 1]});

            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: 'Something went wrong'
            })
        }
    }
}

module.exports = ComplaintController;