import dotenv from 'dotenv';

import HealthProfile from '../models/healthProfile.model.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//Create new health profile
export const createHealthProfile = async (req, res) => {
  try {
    // Check if user already has a health profile
    const existingProfile = await HealthProfile.findOne({ userId: req.user.id });
    
    if (existingProfile) {
      return res.status(400).json({ 
        message: 'Health profile already exists. Use update instead.' 
      });
    }

    const healthProfile = new HealthProfile({
      userId: req.user.id,
      ...req.body
    });
    
    await healthProfile.save();
    res.status(201).json({ 
      message: 'Health profile created successfully', 
      healthProfile 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get user's health profile
export const getHealthProfile = async (req, res) => {
  try {
    const healthProfile = await HealthProfile.findOne({ userId: req.user.id });
    
    if (!healthProfile) {
      return res.status(404).json({ 
        message: 'Health profile not found. Please create one first.' 
      });
    }
    
    res.status(200).json({ 
      message: 'Health profile retrieved successfully',
      healthProfile 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update user's health profile
export const updateHealthProfile = async (req, res) => {
  try {
    const healthProfile = await HealthProfile.findOneAndUpdate(
      { userId: req.user.id },
      { 
        ...req.body,
        updatedAt: new Date()
      },
      { 
        new: true, // Return updated document
        runValidators: true // Run mongoose validations
      }
    );
    
    if (!healthProfile) {
      return res.status(404).json({ 
        message: 'Health profile not found. Please create one first.' 
      });
    }
    
    res.status(200).json({ 
      message: 'Health profile updated successfully',
      healthProfile 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//AI health analysis using Gemini
export const analyzeHealth = async (req, res) => {
  try {
    const { symptoms, healthData } = req.body;
    
    // Get user's health profile for context
    const userProfile = await HealthProfile.findOne({ userId: req.user.id });
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `As a health advisor AI, analyze this health information:
    
    Current Symptoms: ${symptoms}
    User Health Data: ${JSON.stringify(healthData)}
    User Profile: ${userProfile ? JSON.stringify(userProfile.personalInfo) : 'No profile available'}
    Medical History: ${userProfile ? JSON.stringify(userProfile.medicalHistory) : 'No history available'}
    
    Please provide:
    1. Possible conditions or explanations (with confidence levels)
    2. Risk assessment (Low/Medium/High)
    3. Specific lifestyle recommendations
    4. When to seek medical attention
    5. Preventive measures
    
    IMPORTANT DISCLAIMERS:
    - This is AI-generated advice, not a medical diagnosis
    - Always consult healthcare professionals for serious concerns
    - Emergency symptoms require immediate medical attention
    
    Format the response in a structured, easy-to-read manner.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();
    
    // Log the analysis for the user
    if (userProfile) {
      userProfile.currentSymptoms.push({
        symptom: symptoms,
        severity: healthData.severity || 5,
        duration: healthData.duration || 'Not specified',
        dateReported: new Date()
      });
      await userProfile.save();
    }
    
    res.json({ 
      message: 'Health analysis completed',
      analysis,
      timestamp: new Date(),
      disclaimer: 'This is AI-generated advice. Consult healthcare professionals for medical decisions.'
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze health data',
      details: error.message 
    });
  }
};

//Quick symptom analysis
export const checkSymptoms = async (req, res) => {
  try {
    const { symptoms, duration, severity, additionalInfo } = req.body;
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `Symptom Checker Analysis:
    
    Reported Symptoms: ${symptoms}
    Duration: ${duration}
    Severity (1-10): ${severity}
    Additional Information: ${additionalInfo || 'None provided'}
    
    Provide:
    1. Most likely explanations (with probability estimates)
    2. Urgency level (Low/Medium/High/Emergency)
    3. Self-care recommendations
    4. Red flag symptoms to watch for
    5. When to see a doctor
    
    Keep response concise but informative.
    Include standard medical disclaimers.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();
    
    res.json({
      message: 'Symptom analysis completed',
      analysis,
      urgencyLevel: extractUrgencyLevel(analysis), // Helper function
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to extract urgency level
const extractUrgencyLevel = (analysisText) => {
  const text = analysisText.toLowerCase();
  if (text.includes('emergency') || text.includes('immediate')) return 'Emergency';
  if (text.includes('high')) return 'High';
  if (text.includes('medium')) return 'Medium';
  return 'Low';
};