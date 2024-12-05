import { Schema } from "mongoose"

const meetingSchema = new Schema({
    user_id: { type: String },
    meetingCode: { Type: String, required: true },
    date: { type: Date, default: Date.now, required: true }
})

const Meeting = mongoose.model("Meeting", meetingSchema);

export { Meeting };