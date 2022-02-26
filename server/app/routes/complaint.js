const { Router } = require('express');
const ComplaintController = require('../controllers/ComplaintController')
const Authorize = require("../middleware")

const router = Router();

router.post(
    '/complaint',
    Authorize.check,
    ComplaintController.createComplaint
);

router.get('/totalCount',
    Authorize.check,
    ComplaintController.getTotalCount)

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
    '/complaint/:complaintId/:status',
    Authorize.check,
    ComplaintController.updateStatus
)

router.get(
    '/complaints/search/:keywords',
    Authorize.check,
    ComplaintController.searchComplaints
)

module.exports = router