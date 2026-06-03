'use client';

import React, { useState, useEffect } from 'react';

export default function VisualizerPage() {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentPair, setCurrentPair] = useState<number[]>([]);

  // Generate a random array when the page loads
  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    if (isSorting) return;
    const newArray = [];
    for (let i = 0; i < 20; i++) {
      newArray.push(Math.floor(Math.random() * 200) + 10); // Random heights between 10 and 210
    }
    setArray(newArray);
    setCurrentPair([]);
  };

  // Helper function to cause a pause so we can see the animation
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Highlight the two elements being compared
        setCurrentPair([j, j + 1]);
        await sleep(100); // Pause for 100ms

        if (arr[j] > arr[j + 1]) {
          // Swap elements
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          
          // Update state to render the swap on screen
          setArray([...arr]);
        }
      }
    }
    setCurrentPair([]);
    setIsSorting(false);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">📊 Bubble Sort Visualizer</h1>
        <p className="text-slate-400 mb-6 text-sm">
          Watch how the largest elements "bubble up" to the end of the array one swap at a time.
        </p>

        {/* Control Panel */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={resetArray}
            disabled={isSorting}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 disabled:opacity-50 transition"
          >
            Generate New Array
          </button>
          <button
            onClick={bubbleSort}
            disabled={isSorting}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 transition"
          >
            {isSorting ? 'Sorting...' : 'Start Bubble Sort'}
          </button>
        </div>

        {/* The Visualizer Bars */}
        <div className="h-64 bg-slate-950 rounded-xl p-6 flex items-end justify-center gap-2 border border-slate-800">
          {array.map((value, idx) => {
            const isComparing = currentPair.includes(idx);
            return (
              <div
                key={idx}
                className={`w-8 rounded-t transition-all duration-100 ${
                  isComparing ? 'bg-rose-500 scale-105' : 'bg-cyan-500'
                }`}
                style={{ height: `${value}px` }}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}