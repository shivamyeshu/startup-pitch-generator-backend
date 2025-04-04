const express = require("express");
const generateContent = require("../service/ai_gen");

const app = express();

app.get("/", (req, res) => {
  res.send("🎯 Welcome to PitchPerfect AI Startup Pitch Generator!");
});

app.post("/generate_pitch", async (req, res) => {
  const { idea, startup_name, download } = req.body;

  if (!idea || !startup_name) {
    return res.status(400).json({ error: "Idea and startup_name required" });
  }

  try {
    const pitchData = await generateContent(idea);
    pitchData.startup_name = startup_name;

    res.status(200).json({ message: "Pitch generated!", data: pitchData });
  } catch (error) {
    console.error("Err :", error);
    res.status(500).json({ error: "Failed to generate pitch" });
  }
});

module.exports = app;
