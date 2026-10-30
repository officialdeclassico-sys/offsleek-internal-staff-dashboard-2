import React from 'react';
import { Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { KBArticle } from '../types/support';

interface ArticleBodyProps {
  article: KBArticle;
}

export const ArticleBody: React.FC<ArticleBodyProps> = ({ article }) => {
  return (
    <div className="space-y-4 font-sans text-gray-900 print:text-black">
      {/* 1. Overview Panel (Blue information box matching screenshot) */}
      <div className="p-4.5 bg-sky-50/80 border border-sky-100 rounded-2xl flex items-start gap-3.5">
        <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
          <Info className="w-4 h-4" />
        </div>
        <div className="text-sm text-gray-800 leading-relaxed">
          <h3 className="font-bold text-sm sm:text-base text-gray-950 mb-1">Overview</h3>
          <p className="leading-relaxed">{article.overview}</p>
        </div>
      </div>

      {/* 2. Common Symptoms Panel (Green check box matching screenshot) */}
      <div className="p-4.5 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex items-start gap-3.5">
        <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div className="text-sm text-gray-800 flex-1 leading-relaxed">
          <h3 className="font-bold text-sm sm:text-base text-gray-950 mb-1.5">Common Symptoms</h3>
          <ul className="space-y-1.5 list-disc list-inside text-gray-800">
            {article.symptoms.map((symptom, idx) => (
              <li key={idx} className="pl-1">
                {symptom}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Possible Causes Panel (Yellow warning box matching screenshot) */}
      <div className="p-4.5 bg-amber-50/70 border border-amber-100 rounded-2xl flex items-start gap-3.5">
        <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="text-sm text-gray-800 flex-1 leading-relaxed">
          <h3 className="font-bold text-sm sm:text-base text-gray-950 mb-1.5">Possible Causes</h3>
          <ul className="space-y-1.5 list-disc list-inside text-gray-800">
            {article.possibleCauses.map((cause, idx) => (
              <li key={idx} className="pl-1">
                {cause}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4. Step-by-Step Solution Section */}
      <div className="pt-5">
        <h2 className="text-xl font-bold text-gray-950 mb-6 tracking-tight">
          Step-by-Step Solution
        </h2>

        <div className="space-y-6">
          {article.steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 relative group">
              {/* Vertical connector line between steps */}
              {idx < article.steps.length - 1 && (
                <div className="absolute left-4 top-9 bottom-0 w-0.5 bg-gray-200 -mb-6 group-last:hidden" />
              )}

              {/* Numbered circular badge */}
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0 z-10 shadow-2xs">
                {idx + 1}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <h3 className="text-base font-bold text-gray-950">
                  {step.title}
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
                  {step.substeps.map((sub, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <span className="text-gray-400 select-none mt-0.5">&bull;</span>
                      <span className="leading-relaxed">{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
