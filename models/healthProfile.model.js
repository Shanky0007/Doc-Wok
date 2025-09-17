import mongoose from "mongoose";

const healthProfileSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true 
    },
    personalInfo:{
        age: { type: Number, required: true, min: 0, max: 150 },
        gender: { type: String, required: true, enum: ["MALE", "FEMALE", "OTHER"] },
        height: { type: Number, required: true, min: 0 }, // in cm
        weight: { type: Number, required: true, min: 0 }, // in kg
        bloodType: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    },
    medicalHistory:{
        conditions: [{ type: String }],
        surgeries: [{ type: String }],
        allergies: [{ type: String }],
        medications: [{ type: String }],
        familyHistory: [{ type: String }],
    },
    currentSymptoms:[{
        symptom: { type: String, required: true },
        severity: { type: String, enum: ["MILD", "MODERATE", "SEVERE"], required: true },
        duration: { type: String }, 
        dateReported: { type: Date, default: Date.now }
    }],
    vitalSigns:[{
        bloodPressure: { type: String }, 
        heartRate: { type: Number, min: 30, max: 250 }, 
        temperature: { type: Number, min: 30, max: 45 }, // in Celsius
        date: { type: Date, default: Date.now }
    }],
}, { timestamps: true });

export default mongoose.model("HealthProfile", healthProfileSchema);