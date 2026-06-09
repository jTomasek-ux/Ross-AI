type ResultsPanelProps = {
  summaryText: string;
  obligationsText: string;
  isStreaming: boolean;
  hasResult: boolean;
};

function Cursor() {
  return (
    <span className="inline-block w-0.5 h-4 bg-ross-black align-middle ml-0.5 animate-pulse" />
  );
}

function ObligationsList({ text }: { text: string }) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("-"));

  if (lines.length === 0) {
    return (
      <p className="font-sans font-light text-ross-black text-sm leading-relaxed whitespace-pre-wrap">
        {text}
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {lines.map((line, i) => {
        const content = line.replace(/^-\s*/, "");
        const colonIndex = content.indexOf(":");
        const party =
          colonIndex > -1 ? content.slice(0, colonIndex).trim() : null;
        const obligation =
          colonIndex > -1 ? content.slice(colonIndex + 1).trim() : content;

        return (
          <li key={i} className="flex flex-col gap-0.5">
            {party && (
              <span className="font-sans text-xs font-medium tracking-widest uppercase text-ross-midgrey">
                {party}
              </span>
            )}
            <span className="font-sans font-light text-ross-black text-sm leading-relaxed">
              {obligation}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default function ResultsPanel({
  summaryText,
  obligationsText,
  isStreaming,
  hasResult,
}: ResultsPanelProps) {
  if (!hasResult && !isStreaming) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4 text-center">
        <div className="flex items-center justify-center w-14 h-14 bg-ross-lightgrey">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="2"
              width="18"
              height="18"
              rx="0"
              stroke="#8a8a8a"
              strokeWidth="1.25"
            />
            <path
              d="M6 7h10M6 11h10M6 15h6"
              stroke="#8a8a8a"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <p className="font-serif font-light text-ross-black text-xl">
            Ready to analyze
          </p>
          <p className="font-sans font-light text-ross-midgrey text-sm mt-1">
            Upload a PDF contract and click Analyze.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Summary card */}
      {(summaryText || isStreaming) && (
        <div className="bg-white border border-ross-lightgrey p-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-sans text-xs font-medium tracking-[0.3em] uppercase text-ross-midgrey">
              Summary
            </span>
            <div className="flex-1 h-px bg-ross-lightgrey" />
          </div>

          {summaryText ? (
            <p className="font-sans font-light text-ross-black text-sm leading-relaxed">
              {summaryText}
              {isStreaming && !obligationsText && <Cursor />}
            </p>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-sans font-light text-ross-midgrey text-sm">
                Reading contract
              </span>
              <Cursor />
            </div>
          )}
        </div>
      )}

      {/* Obligations card */}
      {(obligationsText || (isStreaming && summaryText)) && (
        <div className="bg-white border border-ross-lightgrey p-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-sans text-xs font-medium tracking-[0.3em] uppercase text-ross-midgrey">
              Key Obligations
            </span>
            <div className="flex-1 h-px bg-ross-lightgrey" />
          </div>

          {obligationsText ? (
            <>
              <ObligationsList text={obligationsText} />
              {isStreaming && <Cursor />}
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-sans font-light text-ross-midgrey text-sm">
                Identifying obligations
              </span>
              <Cursor />
            </div>
          )}
        </div>
      )}

      {/* Completed badge */}
      {!isStreaming && hasResult && (
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-ross-black rounded-full" />
          <span className="font-sans text-xs font-light text-ross-midgrey tracking-wider">
            Analysis complete
          </span>
        </div>
      )}
    </div>
  );
}
