const { default: mongoose } = require("mongoose");

const ContactsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required : true,
            trim: true,
            maxLength: 50
        },
        email: {
            type: String,
            required : true,
            trim: true,
            maxLength: 200
        },
        message: {
            type: String,
            required : true,
            trim: true,
            maxLength: 2000
        }
    }, {timestamps: true}
);

export default mongoose.models.Contacts || mongoose.model("Contacts", ContactsSchema);