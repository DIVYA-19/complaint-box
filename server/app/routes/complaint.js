const { Router } = require('express');
const ComplaintController = require('../controllers/ComplaintController')
const Authorize = require("../middleware")

const router = Router();

router.post(
    '/complaint',
    Authorize.check,
    ComplaintController.createComplaint
);

router.get(
    '/complaints',
    Authorize.check,
    ComplaintController.getAllComplaints
)

router.get(
    '/complaint/:complaintId',
    Authorize.check,
    ComplaintController.getComplaint
)

router.delete(
    '/complaint/:complaintId',
    Authorize.check,
    ComplaintController.removeComplaint
)

router.get(
    '/complaint/category/:category',
    Authorize.check,
    ComplaintController.getComplaintsByCategory
)

router.post(
    '/complaint/:complaintId/:statusId',
    Authorize.check,
    ComplaintController.updateStatus
)

module.exports = router