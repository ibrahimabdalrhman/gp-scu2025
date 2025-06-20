'use client';
import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff, RefreshCcw, StopCircle } from 'lucide-react';

const VoiceToText = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [started, setStarted] = useState(false);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-red-600 text-center p-4 font-semibold">
        ❌ Your browser doesn't support speech recognition.
      </div>
    );
  }

  const startListening = () => {
    setStarted(true);
    SpeechRecognition.startListening({ language: 'en-US', continuous: true });
  };

  const stopListening = () => {
    setStarted(false);
    SpeechRecognition.stopListening();
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 border space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">🎙️ Voice to Text</h2>

      <div className="flex justify-center gap-4">
        {!started ? (
          <button
            onClick={startListening}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-md transition"
            title="Start Listening"
          >
            <Mic className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-md transition"
            title="Stop Listening"
          >
            <MicOff className="w-6 h-6" />
          </button>
        )}

        <button
          onClick={resetTranscript}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-full shadow-md transition"
          title="Reset"
        >
          <RefreshCcw className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-md text-gray-800 min-h-[100px] whitespace-pre-wrap">
        {transcript ? transcript : 'Speak something in English...'}
      </div>

      <p className="text-sm text-center text-gray-500">
        Microphone is {listening ? '🎧 Listening...' : '🔇 Not listening'}
      </p>
    </div>
  );
};

export default VoiceToText;
