'use client';

import React, { useState, useEffect } from 'react';

type AlgoType = 'bubble' | 'selection' | 'insertion';

export default function VisualizerPage() {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentPair, setCurrentPair] = useState<number[]>([]);
  const [selectedAlgo, setSelectedAlgo] = useState<AlgoType>('bubble');

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    if (isSorting) return;
    const newArray = [];
    for (let i = 0; i < 15; i++) {
      newArray.push(Math.floor(Math.random() * 180) + 20);
    }
    setArray(newArray);
    setCurrentPair([]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // 1. BUBBLE SORT
  const bubbleSort = async (arr: number[]) => {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCurrentPair([j, j + 1]);
        await sleep(100);
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
        }
      }
    }
  };

  // 2. SELECTION SORT
  const selectionSort = async (arr: number[]) => {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        setCurrentPair([i, j]); // Highlight current scan
        await sleep(100);
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      // Swap the found minimum element with the first element
      let temp = arr[minIdx];
      arr[minIdx] = arr[i];
      arr[i] = temp;
      setArray([...arr]);
    }
  };

  // 3. INSERTION SORT
  const insertionSort = async (arr: number[]) => {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      
      setCurrentPair([i, j]);
      await sleep(100);

      while (j >= 0 && arr[j] > key) {
        setCurrentPair([j, j + 1]);
        arr[j + 1] = arr[j];
        j = j - 1;
        setArray([...arr]);
        await sleep(100);
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
  };

  const handleSort = async () => {
    setIsSorting(true);
    const arrCopy = [...array];
    
    if (selectedAlgo === 'bubble') await bubbleSort(arrCopy);
    if (selectedAlgo === 'selection') await selectionSort(arrCopy);
    if (selectedAlgo === 'insertion') await insertionSort(arrCopy);

    setCurrentPair([]);
    setIsSorting(false);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">📊 Algorithm Visualizer</h1>
        <p className="text-slate-400 mb-6 text-sm">Compare and analyze how different sorting mechanics operate step-by-step.</p>

        {/* Control Panel */}
        <div className="flex flex-wrap gap-4 mb-8 items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
          <select 
            value={selectedAlgo} 
            onChange={(e) => setSelectedAlgo(e.target.value as AlgoType)}
            disabled={isSorting}
            className="bg-slate-950 border border-slate-700 text-slate-100 px-4 py-2 rounded-lg focus:outline-none focus:border-cyan-500"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
          </select>

          <button onClick={resetArray} disabled={isSorting} className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 disabled:opacity-50 transition text-sm font-medium">
            Generate New Array
          </button>
          
          <button onClick={handleSort} disabled={isSorting} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold rounded-lg disabled:opacity-50 transition text-sm ml-auto">
            {isSorting ? 'Sorting...' : `Run ${selectedAlgo.charAt(0).toUpperCase() + selectedAlgo.slice(1)}`}
          </button>
        </div>

        {/* The Board */}
        <div className="h-64 bg-slate-950 rounded-xl p-6 flex items-end justify-center gap-3 border border-slate-800">
          {array.map((value, idx) => {
            const isComparing = currentPair.includes(idx);
            return (
              <div
                key={idx}
                className={`w-8 rounded-t transition-all duration-100 ${isComparing ? 'bg-rose-500 scale-110' : 'bg-cyan-500'}`}
                style={{ height: `${value}px` }}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}