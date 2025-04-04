const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const extractJSON = (str) => {
  const cleanStr = str.replace(/```json|```/g, "").trim();
  const match = cleanStr.match(/\{[\s\S]*\}/);
  return match ? JSON.parse(match[0]) : null;
};

const generateContent = async (idea) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
Act as a startup mentor. Based on the following idea, generate a startup pitch in **pure JSON** format (no extra text):
Idea: "${idea}"
{
  "problem": "",
  "solution": "",
  "market": "",
  "business_model": "",
  "tech_stack": "",
  "revenue_model": "",
  "future_scope": ""
}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  console.log("Gemini raw response:\n", text);

  const json = extractJSON(text);
  if (!json) throw new Error("Gemini response was not valid JSON");
  return json;
};

module.exports = generateContent;
