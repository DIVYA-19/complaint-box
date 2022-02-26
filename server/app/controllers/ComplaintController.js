const ComplaintModel = require('../models/Complaint')
const config = require("../config/config")
const utils = require("../utils")

class ComplaintController {
    static async createComplaint(req, res) {
        var complaint_id = await utils.generateComplaintId();
        const complaint = new ComplaintModel({
            complaint_id,
            title: req.body.title,
            desc: req.body.desc,
            created_by: req.userId,
            category: req.body.category,
            status: 'open',
            pincode: req.body.pincode,
            address: req.body.address
        })

        await complaint.save();

        res.json({ status: "complaint created" })
    }

    static async getTotalCount(req, res) {
        try {
            let count = await utils.totalCountOfComplaints();
            console.log(count);
            res.send(count);
        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: 'Something went wrong'
            });
        }
    }

    static async getAllComplaints(req, res) {
        try {
            var complaints = await utils.getAllComplaints();
            res.send(complaints);
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
            const status = req.params.status;
            await ComplaintModel.findOneAndUpdate({ complaint_id: complaintId }, {status: status});

            res.send(`status updated for ${complaintId} to ${status}`)
        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: 'Something went wrong'
            })
        }
    }

    static async searchComplaints(req, res) {
        try {
            var complaints = await utils.getAllComplaints();
            var keywords = req.params.keywords.split(' ');
            var resultComplaints = [];
            complaints.map(complaint => {
                var keyMatchCount = 0;
                keywords.map(keyword => {
                    if (complaint.title.includes(keyword) || complaint.desc.includes(keyword)) {
                        keyMatchCount += 1;
                    }
                })
                if (keyMatchCount > 0) {
                    resultComplaints.push({complaint, rank: keyMatchCount});
                }
            })

            resultComplaints.sort((a, b) => {
                return b.rank - a.rank;
            });

            resultComplaints = resultComplaints.map(complaint => complaint.complaint)

            res.send(resultComplaints);

        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: 'Something went wrong'
            })
        }
    }
}

module.exports = ComplaintController;