const mongoose =  require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 4,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        profile_pic: {
            type: String
        },
        age: {
            type: Number
        }, 
        type: {
            type: String,
            // required: true
        },
        refreshTokens: [
            {
                type: String
            }
        ],
        address: {
            type: String,
            // required: true,
            trim: true,
            maxlength: 100
        },
        pincode: {
            type: String,
            // required: true,
            trim: true
        }
    },
    {
        collection: 'users',
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports = UserModel =  mongoose.model("User", UserSchema)