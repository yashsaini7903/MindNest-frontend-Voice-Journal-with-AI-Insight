import React, { useState, useRef } from "react";

const VoiceEntry = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const chunks = useRef([]);

  // 🎙️ Start Recording
  const startRecording = async () => {
    setError("");
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setRecording(true);
      chunks.current = [];

      recorder.ondataavailable = (e) => chunks.current.push(e.data);

      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const file = new File([blob], "recording.webm", { type: "audio/webm" });
        setAudioFile(file);
        setAudioURL(URL.createObjectURL(blob));
        setRecording(false);
      };

      recorder.start();
    } catch (err) {
      console.error("Microphone access denied:", err);
      setError("Please allow microphone access to record audio.");
    }
  };

  // ⏹️ Stop Recording
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
  };

  // 📁 Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    setAudioURL(URL.createObjectURL(file));
  };

  // 🚀 Submit to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!audioFile) {
      setError("Please record or upload an audio file first.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You must be logged in to create a thought.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/journal/voice", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token in header
        },
        body: formData,
        credentials: "include", // include token cookie
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Voice entry upload failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-3 fw-bold text-success">🎙️ Voice Thought Entry</h3>

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* 🎤 Record or Upload */}
          <div className="mb-3 text-center">
            {!recording ? (
              <button
                type="button"
                className="btn btn-success me-2"
                onClick={startRecording}
              >
                🎤 Start Recording
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-danger me-2"
                onClick={stopRecording}
              >
                ⏹️ Stop Recording
              </button>
            )}

            <label className="btn btn-outline-primary">
              📁 Upload File
              <input
                type="file"
                accept="audio/*"
                hidden
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* 🎧 Audio Preview */}
          {audioURL && (
            <div className="text-center mb-3">
              <audio controls src={audioURL} style={{ width: "100%" }} />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit Voice Entry"}
          </button>
        </form>

        {/* 🧠 Result Section */}
        {result && (
          <div className="mt-4">
            <h5 className="fw-bold">AI Analysis</h5>
            <p><strong>Sentiment:</strong> {result.sentiment}</p>
            <p><strong>Emotion:</strong> {result.tone}</p>
            <p><strong>Summary:</strong> {result.aiSummary}</p>
            <p><strong>Score:</strong> {result.score}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceEntry;
