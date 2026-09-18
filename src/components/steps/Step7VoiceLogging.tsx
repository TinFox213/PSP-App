import React, { useState } from 'react';
import { Mic, Sparkles, CheckCircle2 } from 'lucide-react';
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
      {/* Title Header Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-lime-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-lime-100 border border-lime-300 flex items-center justify-center text-lime-800 shrink-0">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800">Multi-Input Voice Logging</h2>
              <p className="text-xs text-slate-500 font-medium">Step 7 of 8 · Conversational NLP & Real-Time Extraction</p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-lime-100 text-lime-900 border border-lime-300">
            Web Speech API
          </span>
        </div>
      </div>

      {/* Responsive 2-Column Grid on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {/* Left Column: Voice Recorder Hub */}
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
              <Mic className="w-8 h-8" />
              {isRecording && (
                <span className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping opacity-75" />
              )}
            </button>

            <span className="mt-3 text-xs sm:text-sm font-bold text-slate-800">
              {isRecording ? 'Listening & Transcribing Speech...' : 'Tap to Simulate Voice Recording'}
            </span>
            <span className="text-[11px] text-slate-500">
              {isRecording ? 'Streaming speech recognition chunks' : 'Speak meal items in natural language'}
            </span>
          </div>

          {/* Audio Waveform Bars */}
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
          <div className="bg-white rounded-xl p-3.5 border border-lime-300/80 shadow-2xs text-left min-h-[72px] flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Live Speech Transcript:
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 italic">
              {transcript ? `"${transcript}"` : (
                <span className="text-slate-400 not-italic">
                  Press the microphone to test: "{fullPromptPhrase}"
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right Column: Instant Auto-Parsing Card */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-lime-300 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lime-600" />
                Instant Auto-Parsing (NLP Entities)
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                {isParsed ? 'Matched 2 items' : 'Waiting for audio'}
              </span>
            </div>

            {isParsed ? (
              <div className="space-y-2.5">
                {parsedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.name}</h4>
                      <span className="text-[11px] text-slate-500">{item.portion}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 inline-block">
                        +{item.proteinG}g Protein
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium block mt-0.5">{item.calories} kcal</span>
                    </div>
                  </div>
                ))}

                {/* Combined Impact */}
                <div className="p-3 bg-lime-50 rounded-xl border border-lime-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-lime-900">Combined Added Nutrition:</span>
                  <span className="text-xs font-black text-lime-950">
                    +12g Protein · +165 kcal
                  </span>
                </div>

                {/* Add to daily log action */}
                <button
                  type="button"
                  onClick={handleCommitToLog}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
                    hasAddedToLog
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-950 hover:bg-slate-800 text-white shadow-xs'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  <span>{hasAddedToLog ? 'Added to Today’s Log (Deficit Closed!)' : 'Confirm & Add to Today’s Log'}</span>
                </button>
              </div>
            ) : (
              <div className="p-6 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                Click "Tap to Simulate Voice Recording" to test speech transcription and entity extraction.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action to proceed */}
      <button
        onClick={() => {
          if (isParsed && !hasAddedToLog) handleCommitToLog();
          onNextStep();
        }}
        className="w-full py-3.5 px-4 rounded-xl bg-lime-500 hover:bg-lime-600 active:scale-[0.99] text-slate-950 font-black text-sm sm:text-base shadow-sm transition flex items-center justify-center gap-2"
      >
        <span>Proceed to Step 8: Comprehensive Health Dashboard</span>
        <span>→</span>
      </button>
    </div>
  );
};
