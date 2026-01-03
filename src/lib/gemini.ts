import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = 'AIzaSyASIfKJROg-eLSBU6gP8uQvnNRDVFmxwtE';

const MODEL_NAME = 'gemini-2.5-flash';

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

export const analyzeGenome = async (searchTerm: string) => {
  const prompt = `
    You are a world-class bioinformatics AI. A user has uploaded a genome sample identifier: "${searchTerm}".
    Your task is to provide a comprehensive analysis in a specific JSON format.
    If the identifier is not found or invalid, return an error.
    Otherwise, generate a realistic, detailed analysis for the given sample.

    Here is the required JSON output structure:
    {
      "sampleId": "string",
      "pathogen": "string",
      "collectionLocation": "string",
      "detectedVia": "string",
      "lineageAssignment": [{ "tool": "string", "result": "string", "confidence": "number" }],
      "mutationAnalysis": [{ "gene": "string", "mutation": "string", "type": "string", "knownEffect": "string" }],
      "totalMutations": "number",
      "coMutationPattern": "string",
      "riskScores": [{ "category": "string", "score": "number", "reason": "string" }],
      "finalRiskTier": "string",
      "phylogeneticPlacement": "string",
      "predictedFutureMutations": [{ "mutation": "string", "confidence": "number", "effect": "string" }],
      "recommendedAction": "string"
    }

    Based on "${searchTerm}", provide the analysis. For example, for "EPI_ISL_1704655", you should identify it as a SARS-CoV-2 Delta variant and fill in the details accordingly.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonString = text.replace(/```json|```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error analyzing genome:", error);
    throw error;
  }
};
