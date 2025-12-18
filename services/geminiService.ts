import { GoogleGenAI, Type } from "@google/genai";
import type { TriageAnalysis } from "../types";

const API_KEY = process.env.API_KEY;

console.log("API_KEY environment variable:", API_KEY ? "SET" : "NOT SET");
if (API_KEY) {
    console.log("API_KEY length:", API_KEY.length);
}

if (!API_KEY) {
    console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateSummary(notes: string): Promise<string> {
  console.log("generateSummary called with API_KEY:", API_KEY ? "SET" : "NOT SET");
  
  if (!API_KEY) {
    return Promise.resolve(`Error: Gemini API key is not configured. Displaying mock data.

**Comprehensive Patient Analysis - Examiner Report**

**Patient Overview:**
This is a comprehensive AI analysis of the patient's medical profile to assist with clinical decision-making.

**Key Findings:**
1. Patient presents with multiple symptoms requiring attention
2. Medical history indicates potential risk factors
3. Vital signs show some concerning trends
4. Current medications may interact with new prescriptions

**Clinical Recommendations:**
- Immediate: Monitor vital signs every 4 hours
- Short-term: Schedule follow-up consultation within 48 hours
- Long-term: Consider specialist referral for chronic condition management

**Risk Assessment:**
Moderate risk profile. Patient requires continued monitoring but is stable for outpatient care.

**Treatment Suggestions:**
1. Continue current medication regimen
2. Add symptomatic treatment for reported complaints
3. Schedule diagnostic tests as needed
4. Provide patient education on condition management

**Follow-up Plan:**
- Schedule next appointment in 1 week
- Order blood tests to monitor progress
- Refer to specialist if symptoms persist

This analysis is based on the available patient data and should be used in conjunction with clinical judgment.`);
  }
  
  try {
    const systemInstruction = `You are a medical expert AI assistant specializing in comprehensive patient analysis. 
    Your task is to generate a detailed examination report based on the provided patient profile. 
    The report should include:
    1. Patient Overview - A summary of the patient's key demographics and medical background
    2. Key Findings - Important clinical observations from the medical history, symptoms, and vitals
    3. Clinical Recommendations - Actionable suggestions for patient care
    4. Risk Assessment - Evaluation of the patient's current risk level
    5. Treatment Suggestions - Specific treatment options based on the patient's profile
    6. Follow-up Plan - Recommendations for ongoing care
    
    The report must be well-structured with clear headings, concise, accurate, and use professional medical terminology. 
    Do not add any information not present in the notes. Focus on providing actionable insights for the treating physician.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Please generate a comprehensive patient examination report from the following patient profile:\n\n${notes}`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating summary with Gemini:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
}

export async function calculateTriageRisk(complaint: string, age: number, gender: string): Promise<TriageAnalysis> {
  console.log("calculateTriageRisk called with API_KEY:", API_KEY ? "SET" : "NOT SET");
  
  if (!API_KEY) {
    console.log("Using mock triage analysis due to missing API key.");
    const mockScore = Math.floor(Math.random() * 60) + 30;
    return Promise.resolve({
        score: mockScore,
        justification: `This is a mock response. The patient's complaint of "${complaint}" combined with their age (${age}) presents a moderate potential for a serious underlying condition. Further investigation is warranted.`
    });
  }

  try {
    const systemInstruction = `You are an expert triage AI system. Your role is to analyze a patient's chief complaint, age, and gender to produce a numerical risk score from 1 (lowest risk) to 100 (highest risk) and a brief clinical justification for your assessment.
    Your response must be in JSON format.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze the following triage case:
        - Chief Complaint: "${complaint}"
        - Age: ${age}
        - Gender: ${gender}`,
        config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    score: { type: Type.INTEGER, description: "A risk score from 1 to 100." },
                    justification: { type: Type.STRING, description: "A brief clinical justification for the score." }
                },
                required: ['score', 'justification']
            }
        }
    });

    const jsonString = response.text;
    const parsed = JSON.parse(jsonString);
    return parsed as TriageAnalysis;

  } catch(error) {
    console.error("Error calculating triage risk with Gemini:", error);
    throw new Error("Failed to communicate with the Gemini API for triage analysis.");
  }
}

export async function recommendDepartment(
  patientData: {
    age: number;
    gender: string;
    chiefComplaint: string;
    vitals: {
      temperature?: number;
      heartRate?: number;
      respirationRate?: number;
      bloodPressure?: { systolic: number; diastolic: number };
    };
    symptomsSummary?: string;
  }
): Promise<{ department: string; explanation: string }> {
  console.log("recommendDepartment called with API_KEY:", API_KEY ? "SET" : "NOT SET");
  
  if (!API_KEY) {
    // Mock response when API key is not set
    const mockDepartments = [
      "General Medicine",
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "ENT",
      "Pediatrics",
      "Gynecology"
    ];
    
    const mockExplanations = [
      "Based on the patient's symptoms and vitals, General Medicine would be the most appropriate department for initial assessment.",
      "The patient's presentation suggests a cardiological issue requiring specialized care.",
      "Neurological symptoms are predominant in this case, warranting neurology consultation.",
      "Orthopedic involvement is evident from the patient's complaints and physical findings.",
      "The chief complaint points to an ENT-related condition that needs specialist evaluation.",
      "Given the patient's age and presenting symptoms, pediatric consultation would be appropriate.",
      "Based on the patient's gender and symptoms, Gynecology consultation is recommended."
    ];
    
    const randomIndex = Math.floor(Math.random() * mockDepartments.length);
    
    return Promise.resolve({
      department: mockDepartments[randomIndex],
      explanation: `MOCK AI RESPONSE: ${mockExplanations[randomIndex]} This is a simulated recommendation for demonstration purposes.`
    });
  }

  try {
    const systemInstruction = `You are an expert medical AI assistant specializing in hospital department allocation.
    Your task is to analyze patient data including age, gender, chief complaint, vitals, and symptoms summary to recommend the most appropriate department for treatment.
    Consider all provided information to make an informed recommendation.
    Your response must be in JSON format with "department" and "explanation" fields.`;

    const vitalsInfo = patientData.vitals 
      ? `Vital Signs:
        ${patientData.vitals.temperature ? `Temperature: ${patientData.vitals.temperature}°C` : ''}
        ${patientData.vitals.heartRate ? `Heart Rate: ${patientData.vitals.heartRate} bpm` : ''}
        ${patientData.vitals.respirationRate ? `Respiration Rate: ${patientData.vitals.respirationRate} breaths/min` : ''}
        ${patientData.vitals.bloodPressure ? `Blood Pressure: ${patientData.vitals.bloodPressure.systolic}/${patientData.vitals.bloodPressure.diastolic} mmHg` : ''}`
      : 'No vital signs recorded.';

    const patientInfo = `
      Patient Age: ${patientData.age}
      Patient Gender: ${patientData.gender}
      Chief Complaint: ${patientData.chiefComplaint}
      Symptoms Summary: ${patientData.symptomsSummary || 'Not provided'}
      ${vitalsInfo}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Based on the following patient information, recommend the most appropriate department for treatment:
      
      ${patientInfo}
      
      Provide your response in JSON format with "department" (string) and "explanation" (string) fields.`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            department: { type: Type.STRING, description: "The recommended department for the patient" },
            explanation: { type: Type.STRING, description: "Explanation for the department recommendation" }
          },
          required: ['department', 'explanation']
        }
      }
    });

    const jsonString = response.text;
    const parsed = JSON.parse(jsonString);
    return parsed as { department: string; explanation: string };

  } catch (error) {
    console.error("Error recommending department with Gemini:", error);
    throw new Error("Failed to communicate with the Gemini API for department recommendation.");
  }
}