import mongoose from "mongoose"
import { connectDB } from "../lib/db";


connectDB();

const LeavesSchema = new mongoose.Schema(
    {
        requestBy: {
            type: String,
            required : true,
            trim: true,
            maxLength: 30
        },
        name: {
            type: String,
            required : true,
            trim: true,
            maxLength: 30
        },
        designation: {
            type: String,
            required : true,
            trim: true,
            maxLength: 70
        },
        department: {
            type: String,
            required : true,
            trim: true,
            maxLength: 30
        },
        days: {
            type: Number,
            required : true,
            trim: true,
            maxLength: 5
        },
        from: {
            type: String,
        },
        to: {
            type: String,
        },
        purpose: {
            type: String,
            required : true,
            trim: true,
            maxLength: 500
        },
        date: {
            type: String,
            required: true
        },
        managedBy: {
            type: String,
            required: true,
            maxLength: 30,
        },
        adjustments: [
            {
                work: {
                    type: String,
                    required: true,
                    trim: true,
                    maxLength: 100
                },
                time: {
                    type: String,
                    required: true,
                },
                subject: {
                    type: String,
                    trim: true,
                    required: true,
                    maxLength: 200,
                },
                assignedTo: {
                    type: String,
                    trim: true,
                    required: true,
                    maxLength: 30,
                },
                status: {
                    type: String,
                    trim: true,
                    default: "Pending",
                }
            }
        ]
    },
    {timestamps: true},
)

export default mongoose.models.Leaves || mongoose.model("Leaves", LeavesSchema);
