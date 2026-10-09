import React, { useState, useEffect } from 'react';
import { PRESENTATION_SLIDES, PROJECT_METADATA } from '../data/projectData';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, CheckCircle2 } from 'lucide-react';

export const PresentationMode: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const totalSlides = PRESENTATION_SLIDES.length;
  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  return (
    <div className={`max-w-7xl mx-auto px-6 py-8 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-8 overflow-y-auto max-w-none' : ''}`}>
      {/* Slide Navigation Controls */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            Academic Project Viva Defense Presentation
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            GIFT Autonomous College · CSE (Applied AI)
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-slate-400 mr-2">
            Slide <span className="text-white font-bold">{currentSlideIndex + 1}</span> of {totalSlides}
          </div>

          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
            title="Previous Slide (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === totalSlides - 1}
            className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
            title="Next Slide (Right Arrow or Space)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors ml-2"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="mt-8 bg-slate-900 rounded-2xl border border-slate-800 p-8 sm:p-12 shadow-2xl relative min-h-[480px] flex flex-col justify-between">
        {/* Slide Header */}
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-4 mb-6">
            <span className="text-cyan-400">{currentSlide.institution}</span>
            <span>Team Trackmind · Mentor: Kalpa Pandit</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {currentSlide.title}
          </h3>
          <p className="text-sm text-cyan-300/80 font-medium mb-8">
            {currentSlide.subtitle}
          </p>

          {/* Slide Content Points */}
          <div className="space-y-4">
            {currentSlide.keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 text-slate-200 text-sm leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Footer */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <div>
            Authors: <span className="text-slate-300 font-semibold">Ankit Kumar Manjhi</span> & <span className="text-slate-300 font-semibold">Amardeep Kumar</span>
          </div>
          <div className="font-mono text-slate-400">
            NVIDIA Jetson Orin Nano Edge Computing Platform
          </div>
        </div>
      </div>

      {/* Slide Thumbnails strip */}
      <div className="mt-6 grid grid-cols-6 gap-2">
        {PRESENTATION_SLIDES.map((slide, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlideIndex(i)}
            className={`p-2.5 rounded-lg border text-left text-[11px] font-medium transition-all ${
              currentSlideIndex === i
                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="font-mono text-[10px] text-slate-400">0{i + 1}</div>
            <div className="truncate mt-0.5">{slide.title.replace(/^\d+\.\s*/, '')}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
