'use client';

interface ScrollProgressIndicatorProps {
    progress: number;
    currentSection: number;
    totalSections: number;
}

export default function ScrollProgressIndicator({
    progress,
    currentSection,
    totalSections,
}: ScrollProgressIndicatorProps) {
    return (
        <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex font-mono">
            {/* Section dots */}
            {Array.from({ length: totalSections }).map((_, i) => (
                <div
                    key={i}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${i === currentSection
                            ? 'scale-125 bg-cyan-400 shadow-lg shadow-cyan-400/60'
                            : i < currentSection
                                ? 'bg-cyan-600/60'
                                : 'bg-slate-800'
                        }`}
                />
            ))}

            {/* Progress line */}
            <div className="mt-2 flex flex-col items-center">
                <span className="text-[10px] font-bold text-cyan-400">
                    {String(currentSection + 1).padStart(2, '0')}
                </span>
                <div className="my-1 h-14 w-[2px] bg-slate-800">
                    <div
                        className="w-full bg-gradient-to-b from-cyan-400 to-violet-500 transition-all duration-300 shadow-md shadow-cyan-400/50"
                        style={{ height: `${progress * 100}%` }}
                    />
                </div>
                <span className="text-[10px] font-bold text-slate-500">
                    {String(totalSections).padStart(2, '0')}
                </span>
            </div>
        </div>
    );
}
