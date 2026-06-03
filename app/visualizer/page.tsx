'use client';

import React, { useState, useEffect } from 'react';

type AlgoType = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick';

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
    for (let i = 0; i < 20; i++) { // Increased to 20 bars to see recursive splits clearer!
      newArray.push(Math.floor(Math.random() * 180) + 20);
    }
    setArray(newArray);
    setCurrentPair([]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // --- BUBBLE SORT ---
  const bubbleSort = async (arr: number[]) => {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCurrentPair([j, j + 1]);
        await sleep(40);
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
        }
      }
    }
  };

  // --- SELECTION SORT ---
  const selectionSort = async (arr: number[]) => {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        setCurrentPair([i, j]);
        await sleep(40);
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      let temp = arr[minIdx];
      arr[minIdx] = arr[i];
      arr[i] = temp;
      setArray([...arr]);
    }
  };

  // --- INSERTION SORT ---
  const insertionSort = async (arr: number[]) => {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        setCurrentPair([j, j + 1]);
        arr[j + 1] = arr[j];
        j = j - 1;
        setArray([...arr]);
        await sleep(40);
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
  };

  // --- MERGE SORT (Recursive) ---
  const mergeSort = async (arr: number[], start: number, end: number) => {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    
    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid + 1, end);
    await merge(arr, start, mid, end);
  };

  const merge = async (arr: number[], start: number, mid: number, end: number) => {
    let left = arr.slice(start, mid + 1);
    let right = arr.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      setCurrentPair([k]);
      await sleep(60);
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      setArray([...arr]);
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      i++; k++;
      setArray([...arr]);
      await sleep(60);
    }
    while (j < right.length) {
      arr[k] = right[j];
      j++; k++;
      setArray([...arr]);
      await sleep(60);
    }
  };

  // --- QUICK SORT (Recursive) ---
  const quickSort = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr: number[], low: number, high: number) => {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setCurrentPair([j, high]); // high is pivot
      await sleep(60);
      if (arr[j] < pivot) {
        i++;
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        setArray([...arr]);
      }
    }
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    setArray([...arr]);
    return i + 1;
  };

  const handleSort = async () => {
    setIsSorting(true);
    const arrCopy = [...array];
    
    if (selectedAlgo === 'bubble') await bubbleSort(arrCopy);
    if (selectedAlgo === 'selection') await selectionSort(arrCopy);
    if (selectedAlgo === 'insertion') await insertionSort(arrCopy);
    if (selectedAlgo === 'merge') await mergeSort(arrCopy, 0, arrCopy.length - 1);
    if (selectedAlgo === 'quick') await quickSort(arrCopy, 0, arrCopy.length - 1);

    setCurrentPair([]);
    setIsSorting(false);
  };

  // Dynamic explanations based on selection
  const algoDetails = {
    bubble: { title: 'Bubble Sort', time: 'O(n²)', space: 'O(1)', desc: 'Repeatedly swaps adjacent elements if they are in the wrong order. Heavy writing, slow execution.' },
    selection: { title: 'Selection Sort', time: 'O(n²)', space: 'O(1)', desc: 'Scans the unsorted pool to locate the minimum element, moving it upfront with exactly one swap per pass.' },
    insertion: { title: 'Insertion Sort', time: 'O(n²)', space: 'O(1)', desc: 'Builds a sorted subsystem shift-by-shift by sliding new unsorted values back into their exact relative position.' },
    merge: { title: 'Merge Sort', time: 'O(n log n)', space: 'O(n)', desc: 'Divide and conquer. Breaks down arrays completely, then sorts and builds them back up. Uses structural extra memory.' },
    quick: { title: 'Quick Sort', time: 'O(n log n)', space: 'O(log n)', desc: 'Partitions items around a chosen pivot element. Fast in-place recursive clustering.' },
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">📊 Algorithm Study Suite</h1>
        <p className="text-slate-400 mb-6 text-sm">Analyze structural sorting profiles across recursive and brute-force paradigms.</p>

        {/* Control Box */}
        <div className="flex flex-wrap gap-4 mb-6 items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
          <select 
            value={selectedAlgo} 
            onChange={(e) => setSelectedAlgo(e.target.value as AlgoType)}
            disabled={isSorting}
            className="bg-slate-950 border border-slate-700 text-slate-100 px-4 py-2 rounded-lg focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="merge">Merge Sort (Recursive)</option>
            <option value="quick">Quick Sort (Recursive)</option>
          </select>

          <button onClick={resetArray} disabled={isSorting} className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 disabled:opacity-50 transition text-sm font-medium">
            Generate New Array
          </button>
          
          <button onClick={handleSort} disabled={isSorting} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold rounded-lg disabled:opacity-50 transition text-sm ml-auto">
            {isSorting ? 'Sorting...' : `Run ${selectedAlgo.toUpperCase()}`}
          </button>
        </div>

        {/* The Board */}
        <div className="h-64 bg-slate-950 rounded-xl p-6 flex items-end justify-center gap-2 border border-slate-800 mb-6">
          {array.map((value, idx) => {
            const isComparing = currentPair.includes(idx);
            return (
              <div
                key={idx}
                className={`w-6 rounded-t transition-all duration-70 ${isComparing ? 'bg-rose-500 scale-110 shadow-lg shadow-rose-500/20' : 'bg-cyan-500'}`}
                style={{ height: `${value}px` }}
              />
            );
          })}
        </div>

        {/* Dynamic Study Card */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
          <div className="flex justify-between items-center mb-2 border-b border-slate-800 pb-2">
            <h3 className="font-bold text-lg text-slate-200">{algoDetails[selectedAlgo].title} Profile</h3>
            <div className="flex gap-3 text-xs">
              <span className="px-2 py-1 bg-slate-800 text-emerald-400 rounded">Time: {algoDetails[selectedAlgo].time}</span>
              <span className="px-2 py-1 bg-slate-800 text-amber-400 rounded">Space: {algoDetails[selectedAlgo].space}</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">{algoDetails[selectedAlgo].desc}</p>
        </div>
      </div>
    </main>
  );
}