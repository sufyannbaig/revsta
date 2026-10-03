import React from "react";
import { Sparkles } from "lucide-react";

export default function EmptyAnalysisState({ onRun, analyzing }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
      <div className="w-16 h-16 rounded-full bg-[#14c686]/10 flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-[#14c686]" />
      </div>
      <p className="text-figma-18 font-normal leading-figma-22 text-figma-text-3 max-w-md">
        Run sentiment analysis to get real-time reviews, keywords, and insights from social media.
      </p>
      <button
        onClick={onRun}
        disabled={analyzing}
        className="flex flex-row justify-center items-center gap-2.5 py-[15px] px-[30px] h-[53px] rounded-[32px] bg-[linear-gradient(230.27deg,_rgba(20,198,134,1.00)_0%,_rgba(34,211,238,1.00)_100%)] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {analyzing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span className="text-figma-20 font-normal leading-figma-24 text-figma-primary">Analyzing...</span>
          </>
        ) : (
          <span className="text-figma-20 font-normal leading-figma-24 text-figma-primary">▶ Run Sentiment Analysis</span>
        )}
      </button>
    </div>
  );
}