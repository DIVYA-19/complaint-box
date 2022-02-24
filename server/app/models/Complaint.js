const mongoose =  require('mongoose');

const ComplaintSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 30,
            trim: true
        },
        desc: {
            type: String,
            required: true,
            minlength: 15,
            maxlength: 400
        },
        created_by: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        upvoted_by: [{
            type: String
        }],
        address: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },
        pincode: {
            type: String,
            required: true,
            trim: true
        },
        imageUrls: [{
            type: String
        }]
    },
    {
        collection: 'complaints',
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports = ComplaintModel =  mongoose.model("Complaint", ComplaintSchema)