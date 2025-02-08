import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Loader2, User, Calendar, ClipboardCheck, ArrowRight } from "lucide-react";

const DiagnosisForm = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [inputSymptom, setInputSymptom] = useState("");
  const [validSymptoms, setValidSymptoms] = useState([]);
  const [userSymptoms, setUserSymptoms] = useState([]);
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [numDays, setNumDays] = useState(1);
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchValidSymptoms = async () => {
      const res = await fetch("http://127.0.0.1:5000/get_valid_symptoms");
      const data = await res.json();
      setValidSymptoms(data.symptoms);
    };
    fetchValidSymptoms();
  }, []);

  const playAudio = (text) => {
    window.speechSynthesis.cancel(); // Stop any ongoing speech
  
    // Remove special characters like underscores, slashes, and dots
    const cleanedText = text.replace(/[_\/\\.-]/g, " ");
  
    const speech = new SpeechSynthesisUtterance(cleanedText);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };
  
  

  const validateSymptom = async () => {
    if (validSymptoms.includes(inputSymptom.toLowerCase())) {
      setUserSymptoms([...userSymptoms, inputSymptom]);
      setInputSymptom("");
      await fetchFollowUpQuestions([inputSymptom]); // Fetch related questions
      setStep(3);
    } else {
      setError("Invalid symptom! Please select from the dropdown.");
      playAudio("Invalid symptom! Please select from the dropdown.");
    }
  };

  const fetchFollowUpQuestions = async (selectedSymptoms) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/get_related_questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });
      const data = await res.json();
      setFollowUpQuestions(data.questions);
      
      if (data.questions.length > 0) {
        playAudio(`Now, I will ask some follow-up questions based on your symptoms.`);
        playAudio(`Do you have ${data.questions[0]}?`);
      }
    } catch (error) {
      setError("Failed to fetch follow-up questions.");
    }
  };
  

  const handleResponse = (answer) => {
    setResponses((prev) => ({ ...prev, [followUpQuestions[currentQuestionIndex]]: answer }));
  
    if (currentQuestionIndex < followUpQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      window.speechSynthesis.cancel();
playAudio(`Do you have ${followUpQuestions[currentQuestionIndex + 1]}?`);

    } else {
      setStep(4);
      playAudio("How many days have you experienced these symptoms?");
    }
  };
  

  const submitDiagnosis = async () => {
    setLoading(true);
    setError("");

    const selectedSymptoms = Object.keys(responses).filter((symptom) => responses[symptom] === "yes");

    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selectedSymptoms, num_days: numDays }),
      });

      if (!response.ok) throw new Error("Failed to fetch diagnosis.");

      const data = await response.json();
      setDiagnosis(data);
      setStep(5);
      playAudio(`Your top predicted disease is ${data.predictions[0].disease}`);
    } catch (error) {
      console.error("Error fetching diagnosis:", error);
      setError("Failed to fetch diagnosis. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-300">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            AI Health Assistant
          </h2>
          <p className="text-gray-500">Your personal health companion</p>
        </div>

        {/* Step 1: Name Input */}
        {step === 1 && (
          <div className="space-y-6 w-full">
            <User className="w-16 h-16 text-blue-500 mx-auto" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your full name"
            />
            <button
onClick={() => {
  if (name.trim()) {
    window.speechSynthesis.cancel();
    setStep(2);
    playAudio(`Hello ${name}, let's begin the diagnosis.`);
  }
}}

  
  className="w-full bg-blue-500 text-white py-3 rounded-lg transition-all disabled:opacity-50"
  disabled={!name.trim()}
>
  Continue <ArrowRight className="w-5 h-5 inline-block" />
</button>

          </div>
        )}

        {/* Step 2: Symptom Input */}
        {step === 2 && (
          <div className="space-y-6 w-full">
            <ClipboardCheck className="w-16 h-16 text-blue-500 mx-auto" />
            <input
              type="text"
              value={inputSymptom}
              onChange={(e) => setInputSymptom(e.target.value)}
              list="symptomList"
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Type your symptom"
            />
            <datalist id="symptomList">
              {validSymptoms.map((s, index) => (
                <option key={index} value={s} />
              ))}
            </datalist>
            <button
              onClick={validateSymptom}
              className="w-full bg-green-500 text-white py-3 rounded-lg transition-all"
            >
              Confirm <CheckCircle className="w-5 h-5 inline-block" />
            </button>
          </div>
        )}

        {/* Step 3: Yes/No Questions */}
        {step === 3 && followUpQuestions.length > 0 && (
          <div className="space-y-6 w-full">
            <p className="text-lg font-medium text-center">Do you have {followUpQuestions[currentQuestionIndex]}?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => handleResponse("yes")} className="bg-green-500 text-white py-3 px-6 rounded-lg">
                Yes <CheckCircle className="w-5 h-5 inline-block" />
              </button>
              <button onClick={() => handleResponse("no")} className="bg-red-500 text-white py-3 px-6 rounded-lg">
                No <XCircle className="w-5 h-5 inline-block" />
              </button>
            </div>
          </div>
        )}

        
        {/* Step 4: Duration Input */}
{step === 4 && (
  <div className="space-y-6 w-full">
    <Calendar className="w-16 h-16 text-blue-500 mx-auto" />
    <input
      type="number"
      value={numDays}
      onChange={(e) => {
        const value = Number(e.target.value);
        if (value > 0) {
          setNumDays(value);
          window.speechSynthesis.cancel();
playAudio(`You selected ${value} days. Click Get Diagnosis.`);

        }
      }}
      className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 transition-all"
      min="1"
    />
    <button
      onClick={submitDiagnosis}
      className="w-full bg-blue-500 text-white py-3 rounded-lg transition-all disabled:opacity-50"
      disabled={!numDays || loading}
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin inline-block" /> : "Get Diagnosis"}
    </button>
  </div>
)}

    {/* Step 5: Show Diagnosis Results */}
{/* Step 5: Show Diagnosis Results */}
{step === 5 && diagnosis && (
  <div className="w-full space-y-6 animate-fadeIn">
    <h3 className="text-2xl font-bold text-center text-gray-800">Your Diagnosis</h3>
    {diagnosis.predictions.map((pred, index) => (
      <div key={index} className="bg-gray-50 rounded-lg p-6 space-y-4 shadow-md">
        <h4 className="text-xl font-semibold text-gray-800 flex justify-between">
          {pred.disease}
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {pred.confidence}% match
          </span>
        </h4>
        <p className="text-gray-600">{pred.description}</p>

        <div className="space-y-2">
          {/* Precautions Section */}
          <p className="font-medium text-gray-700">Recommended Precautions:</p>
          <ul className="space-y-2">
            {pred.precautions.map((p, i) => (
              <li key={i} className="flex items-center space-x-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}

    {diagnosis.graph && (
      <img src={diagnosis.graph} alt="Confidence Chart" className="mt-4 rounded-lg shadow-md" />
    )}

    {/* Restart Button */}
    <button
      onClick={() => {
        setStep(1);
        setName("");
        setInputSymptom("");
        setUserSymptoms([]);
        setFollowUpQuestions([]);
        setCurrentQuestionIndex(0);
        setResponses({});
        setNumDays(1);
        setDiagnosis(null);
        setError("");
      }}
      className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg transition-all mt-4"
    >
      Restart Diagnosis
    </button>
  </div>
)}
      </div>
    </div>
  );
};

export default DiagnosisForm;


