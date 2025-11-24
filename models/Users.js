import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required : true,
            trim: true,
            maxLength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxLength: 100,
        },
        password: {
            type: String,
            required: true,
            maxLength: 300,
        },
        department: {
            type: String,
            maxLength: 70,
            default: "unset"
        },
        role: {
            type: String,
            maxLength: 20,
            default: "unset"
        },
        head: {
            type: String,
            maxLength: 100,
            default: "unset"
        },
        manageRequests: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: "initial"
        }
    },
    {timestamps: true},
)

export default mongoose.models.Users || mongoose.model("Users", UsersSchema);