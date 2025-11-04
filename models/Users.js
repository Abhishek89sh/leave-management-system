import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required : true,
            trim: true,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 100,
        },
        password: {
            type: String,
            required: true,
            maxlength: 300,
        },
        department: {
            type: String,
            maxlength: 70,
            default: "unset"
        },
        role: {
            type: String,
            maxlength: 20,
            default: "unset"
        },
        head: {
            type: String,
            maxlength: 100,
            default: "unset"
        },
        manageRequests: {
            type: Boolean,
            default: false
        },
    },
    {timestamps: true},
)

export default mongoose.models.Users || mongoose.model("Users", UsersSchema);