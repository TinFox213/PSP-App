import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles, CheckCircle2, Plus, ArrowRight } from 'lucide-react';
import { LoggedMealItem } from '../../types';

interface Step7VoiceLoggingProps {
  onAddVoiceItems: (items: LoggedMealItem[]) => void;
  onNextStep: () => void;
}

export const Step7VoiceLogging: React.FC<Step7VoiceLoggingProps> = ({
  onAddVoiceItems,
  onNextStep,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isParsed, setIsParsed] = useState(false);
  const [hasAddedToLog, setHasAddedToLog] = useState(false);

  const fullPromptPhrase = "I had one cup of curd and a boiled egg.";

  const handleStartSimulation = () => {
    setIsRecording(true);
    setTranscript('');
    setIsParsed(false);
    setHasAddedToLog(false);

    // Simulate real-time word-by-word transcription
    const words = fullPromptPhrase.split(' ');
    let currentWordIdx = 0;

    const interval = setInterval(() => {
      if (currentWordIdx < words.length) {
        setTranscript(words.slice(0, currentWordIdx + 1).join(' '));
        currentWordIdx++;
      } else {
        clearInterval(interval);
        setIsRecording(false);
        setIsParsed(true);
      }
    }, 280);
  };

  // Auto-parsed items
  const parsedItems: LoggedMealItem[] = [
    {
      id: 'voice-curd',
      time: '05:15 PM',
      name: 'Fresh Curd (Dahi)',
      portion: '1 cup (200ml)',
      calories: 95,
      proteinG: 6,
      carbsG: 8,
      fatG: 4,
      source: 'voice',
    },
    {
      id: 'voice-egg',
      time: '05:15 PM',
      name: 'Boiled Country Egg',
      portion: '1 large unit (50g)',
      calories: 70,
      proteinG: 6,
      carbsG: 0.5,
      fatG: 5,
      source: 'voice',
    },
  ];

  const handleCommitToLog = () => {
    onAddVoiceItems(parsedItems);
    setHasAddedToLog(true);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Title & Callout Header */}
      <div className="bg-white rounded-2xl p-4 border border-lime-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Multi-Input Voice Logging</h2>
              <p className="text-xs text-slate-500">Step 7 of 8 · Conversational NLP</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-100 text-lime-800 border border-lime-200">
            Web Speech API
          </span>
        </div>

        {/* Mandatory Explanatory Callout */}
        <div className="mt-3 p-3 rounded-xl bg-lime-50/80 border border-lime-200 text-xs text-lime-900 leading-relaxed">
          <strong className="font-semibold block mb-0.5 text-lime-950">Explanatory Callout:</strong>
          "Step 7: Web Speech API support for friction-free voice meal logging."
        </div>
      </div>

      {/* Voice Recorder Interactive Hub */}
      <div className="bg-gradient-to-b from-white to-lime-50/40 rounded-2xl p-5 border border-lime-200 shadow-sm text-center space-y-4">
        <div className="flex flex-col items-center">
          {/* Animated Mic Circle */}
          <button
            type="button"
            onClick={handleStartSimulation}
            disabled={isRecording}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95 ${
              isRecording
                ? 'bg-rose-500 text-white ring-8 ring-rose-200 animate-pulse'
                : 'bg-lime-500 hover:bg-lime-600 text-slate-950 ring-4 ring-lime-200'
            }`}
          >
            {isRecording ? <Mic className="w-8 h-8" /> : <Mic className="w-8 h-8" />}

            {/* Ripple rings when recording */}
            {isRecording && (
              <span className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping opacity-75" />
            )}
          </button>

          <span className="mt-3 text-xs font-bold text-slate-700">
            {isRecording ? 'Listening & Transcribing Speech...' : 'Tap to Simulate Voice Recording'}
          </span>
          <span className="text-[11px] text-slate-600">
            {isRecording ? 'Simulating Web Speech API stream' : 'Click mic to speak natural voice prompt'}
          </span>
        </div>

        {/* Audio Waveform Bars (Simulation) */}
        {isRecording && (
          <div className="flex items-center justify-center gap-1.5 h-8">
            {[40, 75, 100, 60, 90, 45, 80, 55, 95, 70, 35].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-lime-600 rounded-full animate-bounce"
                style={{
                  height: `${h}%`,
                  animationDelay: `${(i % 4) * 0.12}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Transcribed Text Display Box */}
        <div className="bg-white rounded-xl p-3.5 border border-lime-300/80 shadow-xs text-left min-h-[64px] flex flex-col justify-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
            Live Speech Transcript:
          </span>
          <p className="text-sm font-semibold text-slate-800 italic">
            {transcript ? `"${transcript}"` : (
              <span className="text-slate-500 not-italic">
                Press the microphone to simulate speech: "{fullPromptPhrase}"
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Auto-Parsing Breakdown Card (Required by prompt) */}
      {isParsed && (
        <div className="bg-white rounded-2xl p-4 border border-lime-300 shadow-md space-y-3 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-lime-600" />
              Instant Auto-Parsing Card (Extracted Entities)
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              NLP Matched (2 items)
            </span>
          </div>

          <div className="space-y-2">
            {parsedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{item.name}</h4>
                  <span className="text-[11px] text-slate-500">{item.portion}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-block">
                    +{item.proteinG}g Protein
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{item.calories} kcal</span>
                </div>
              </div>
            ))}
          </div>

          {/* Combined Impact */}
          <div className="p-3 bg-lime-50 rounded-xl border border-lime-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-lime-900">Combined Added Nutrition:</span>
            <span className="text-xs font-black text-lime-900">
              +12g Protein · +165 kcal
            </span>
          </div>

          {/* Add to daily log action */}
          <button
            type="button"
            onClick={handleCommitToLog}
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
              hasAddedToLog
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-lime-400" />
            <span>{hasAddedToLog ? 'Added to Daily Log (Deficit Reduced)' : 'Confirm & Add to Today’s Log'}</span>
          </button>
        </div>
      )}

      {/* Action to proceed */}
      <button
        onClick={() => {
          if (isParsed && !hasAddedToLog) handleCommitToLog();
          onNextStep();
        }}
        className="w-full py-3 px-4 rounded-xl bg-lime-500 hover:bg-lime-600 active:scale-[0.99] text-slate-900 font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
      >
        <span>Proceed to Step 8: Comprehensive Health Dashboard</span>
        <span>→</span>
      </button>
    </div>
  );
};
