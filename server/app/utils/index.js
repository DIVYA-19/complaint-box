const ComplaintModel = require('../models/Complaint')

const totalCountOfComplaints = async () => {
    try {
        var count = await ComplaintModel.count({})
        console.log(count)
        return { count };
    } catch (err) {
        console.log(err);
    }
    
}

const generateComplaintId = async () => {
    try {
        var count = await totalCountOfComplaints();
        count = (count.count + 1).toString();
        var id = "CB";
        while (count.length < 5) count = "0" + count;
        id += count;
        return id;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    totalCountOfComplaints,
    generateComplaintId
}