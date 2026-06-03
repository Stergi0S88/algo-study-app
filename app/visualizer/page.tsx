'use client';

import React, { useState, useEffect } from 'react';

export default function VisualizerPage() {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentPair, setCurrentPair] = useState<number[]>([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    if (isSorting) return;
    const newArray = [];
    for (let i = 0; i < 15; i++) {
      newArray.push(Math.floor(Math.random() * 180) + 20); // heights for our bars
    }
    setArray(newArray);
    setCurrentPair([]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCurrentPair([j, j + 1]); // Highlight the bars being compared
        await sleep(150); // Pause so humans can see it!

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]); // Update UI with the swap
        }
      }
    }
    setCurrentPair([]);
    setIsSorting(false);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">📊 Bubble Sort Visualizer</h1>
        <p className="text-slate-400 mb-6 text-sm">Watch the largest elements "bubble up" to the end of the array.</p>

        <div className="flex gap-4 mb-8">
          <button onClick={resetArray} disabled={isSorting} className="px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 disabled:opacity-50 transition">
            Generate New Array
          </button>
          <button onClick={bubbleSort} disabled={isSorting} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold rounded-lg disabled:opacity-50 transition">
            {isSorting ? 'Sorting...' : 'Start Bubble Sort'}
          </button>
        </div>

        <div className="h-64 bg-slate-950 rounded-xl p-6 flex items-end justify-center gap-3 border border-slate-800">
          {array.map((value, idx) => {
            const isComparing = currentPair.includes(idx);
            return (
              <div
                key={idx}
                className={`w-8 rounded-t transition-all duration-150 ${isComparing ? 'bg-rose-500 scale-110' : 'bg-cyan-500'}`}
                style={{ height: `${value}px` }}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}