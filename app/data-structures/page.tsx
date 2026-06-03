'use client';

import React, { useState } from 'react';

type ModeType = 'stack' | 'queue';

export default function DataStructuresPage() {
  const [memory, setMemory] = useState<string[]>(['Node_1', 'Node_2', 'Node_3']);
  const [inputValue, setInputValue] = useState('');
  const [structureMode, setStructureMode] = useState<ModeType>('stack');
  const [actionMessage, setActionMessage] = useState('Workspace initialized.');

  // Add Item to structure
  const handlePush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (structureMode === 'stack') {
      // Stack adds to the top (end of array)
      setMemory([...memory, inputValue.trim()]);
      setActionMessage(`Pushed "${inputValue.trim()}" onto the top of the Stack.`);
    } else {
      // Queue adds to the back (end of array)
      setMemory([...memory, inputValue.trim()]);
      setActionMessage(`Enqueued "${inputValue.trim()}" at the back of the Queue.`);
    }
    setInputValue('');
  };

  // Remove Item from structure
  const handlePop = () => {
    if (memory.length === 0) {
      setActionMessage('Underflow Error: Structure is entirely empty!');
      return;
    }

    const updatedMemory = [...memory];
    if (structureMode === 'stack') {
      // Stack removes from the top (last element)
      const removed = updatedMemory.pop();
      setActionMessage(`Popped "${removed}" from the top of the Stack.`);
    } else {
      // Queue removes from the front (first element)
      const removed = updatedMemory.shift();
      setActionMessage(`Dequeued "${removed}" from the front of the Queue.`);
    }
    setMemory(updatedMemory);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-5 gap-6">
        
        {/* Left Control Column */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 md:col-span-2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-amber-400 mb-2">🧱 Memory Hub</h1>
            <p className="text-slate-400 text-xs mb-6">Visualize structural allocations within Linear Sequential Memory models.</p>

            {/* Mode Selector */}
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 mb-6">
              <button 
                onClick={() => { setStructureMode('stack'); setActionMessage('Switched to Stack mode.'); }}
                className={`w-1/2 py-1.5 text-xs font-medium rounded-md transition ${structureMode === 'stack' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Stack (LIFO)
              </button>
              <button 
                onClick={() => { setStructureMode('queue'); setActionMessage('Switched to Queue mode.'); }}
                className={`w-1/2 py-1.5 text-xs font-medium rounded-md transition ${structureMode === 'queue' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Queue (FIFO)
              </button>
            </div>

            {/* Data Input Form */}
            <form onSubmit={handlePush} className="space-y-3 mb-6">
              <label className="text-xs font-semibold text-slate-400 block">Insert Value:</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  maxLength={10}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g. Data_Chunk" 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-amber-500 text-slate-100"
                />
                <button type="submit" className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg border border-slate-700 transition">
                  {structureMode === 'stack' ? 'Push' : 'Enqueue'}
                </button>
              </div>
            </form>

            {/* Remove Trigger Button */}
            <button 
              onClick={handlePop}
              className="w-full py-2 bg-gradient-to-r from-rose-500 to-amber-600 font-bold text-xs rounded-lg shadow-lg shadow-rose-950/20 hover:opacity-90 transition mb-6"
            >
              {structureMode === 'stack' ? '💥 POP (Remove Top)' : '💥 DEQUEUE (Remove Front)'}
            </button>
          </div>

          {/* Action Log Status Box */}
          <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg font-mono text-[11px] text-slate-400">
            <span className="text-slate-600 block mb-0.5">// Operations Log</span>
            <p className="text-amber-400">{actionMessage}</p>
          </div>
        </div>

        {/* Right Sandbox Visualization Column */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 md:col-span-3 flex flex-col items-center justify-center min-h-[320px]">
          
          {structureMode === 'stack' ? (
            /* Vertical Stack Representation */
            <div className="flex flex-col-reverse w-48 border-b-4 border-x-2 border-slate-700 rounded-b-xl p-3 gap-2 min-h-[240px] justify-start bg-slate-900/50">
              {memory.length === 0 ? (
                <div className="text-slate-600 text-xs italic text-center my-auto">Stack Empty</div>
              ) : (
                memory.map((element, idx) => {
                  const isTop = idx === memory.length - 1;
                  return (
                    <div 
                      key={idx} 
                      className={`p-3 text-center rounded-lg text-xs font-mono font-bold transition-all duration-300 border ${isTop ? 'bg-amber-500 text-slate-950 border-amber-300 scale-105 shadow-md' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                    >
                      {element} {isTop && '← TOP'}
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            /* Horizontal Queue Representation */
            <div className="flex flex-col w-full gap-4 items-center justify-center">
              <div className="flex gap-2 items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800 w-full overflow-x-auto min-h-[90px]">
                {memory.length === 0 ? (
                  <div className="text-slate-600 text-xs italic text-center w-full">Queue Empty</div>
                ) : (
                  memory.map((element, idx) => {
                    const isFront = idx === 0;
                    const isBack = idx === memory.length - 1;
                    return (
                      <div 
                        key={idx} 
                        className={`p-3 min-w-[85px] text-center rounded-lg text-xs font-mono font-bold transition-all duration-300 border shrink-0 ${isFront ? 'bg-emerald-500 text-slate-950 border-emerald-300' : isBack ? 'bg-cyan-600 text-slate-100 border-cyan-400' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                      >
                        <div>{element}</div>
                        <div className="text-[9px] opacity-60 mt-0.5">
                          {isFront ? 'FRONT' : isBack ? 'BACK' : `idx: ${idx}`}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="flex justify-between w-full text-[10px] font-mono text-slate-500 px-2">
                <span>◀ Out (Served First)</span>
                <span>In (Join Back) ◀</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}