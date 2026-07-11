export default function LogModal({ log, onClose }) {
  if (!log) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800">Raw SIEM Log Details</h3>
              <p className="text-xs text-slate-400 font-mono">ID: {log._id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition p-1 rounded-md hover:bg-slate-100 bg-transparent border-0 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-slate-400 font-bold uppercase text-[9px]">Timestamp</span>
              <p className="font-semibold text-slate-800">{new Date(log.createdAt).toLocaleString()}</p>
            </div>
            <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-slate-400 font-bold uppercase text-[9px]">Event Type</span>
              <p className="font-semibold text-slate-800 uppercase">{log.type}</p>
            </div>
            <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-slate-400 font-bold uppercase text-[9px]">Source IP</span>
              <p className="font-semibold text-blue-600">{log.sourceIP}</p>
            </div>
            <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-slate-400 font-bold uppercase text-[9px]">Destination IP</span>
              <p className="font-semibold text-slate-800">{log.destIP || "10.0.0.12"}</p>
            </div>
            <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-slate-400 font-bold uppercase text-[9px]">Protocol / Port</span>
              <p className="font-semibold text-slate-800">{log.protocol || "TCP"} / {log.destPort || 80}</p>
            </div>
            <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-slate-400 font-bold uppercase text-[9px]">AI Threat Score</span>
              <p className={`font-black ${((log.threat?.score || 0) * 100) >= 70 ? 'text-rose-600' : ((log.threat?.score || 0) * 100) >= 35 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {((log.threat?.score || 0) * 100).toFixed(0)}%
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-805 uppercase tracking-wider">Raw JSON Payload</h4>
            <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto border border-slate-800 shadow-inner">
              <pre className="text-green-400 font-mono text-[10px] leading-relaxed">
                {JSON.stringify(log, null, 2)}
              </pre>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition cursor-pointer shadow-sm"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
}
