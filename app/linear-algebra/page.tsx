'use client';

import React, { useState } from 'react';

export default function LinearAlgebraPage() {
  // Matrix values: [a, b, c, d] representing a 2x2 matrix
  const [matrix, setMatrix] = useState<[number, number, number, number]>([1, 0, 0, 1]); // Default Identity matrix
  // Original Vector [x, y]
  const [vector, setVector] = useState<[number, number]>([2, 3]);

  const [a, b, c, d] = matrix;
  const [x, y] = vector;

  // Compute transformed vector: Ax + By, Cx + Dy
  const transformedX = a * x + b * y;
  const transformedY = c * x + d * y;

  const handleMatrixChange = (index: number, val: string) => {
    const num = parseFloat(val) || 0;
    const newMatrix = [...matrix] as [number, number, number, number];
    newMatrix[index] = num;
    setMatrix(newMatrix);
  };

  // Quick preset templates
  const applyPreset = (type: 'identity' | 'scale' | 'rotate' | 'shear') => {
    if (type === 'identity') setMatrix([1, 0, 0, 1]);
    if (type === 'scale') setMatrix([2, 0, 0, 0.5]);
    if (type === 'rotate') setMatrix([0, -1, 1, 0]); // 90 deg rotation
    if (type === 'shear') setMatrix([1, 1, 0, 1]);
  };

  // SVG grid dimensions config
  const width = 300;
  const height = 300;
  const center = 150;
  const scaleFactor = 25; // pixels per unit grid line

  // Helper to map math coordinates to SVG pixels
  const toSvgCoords = (mx: number, my: number) => {
    return {
      cx: center + mx * scaleFactor,
      cy: center - my * scaleFactor, // Invert Y because SVG coordinates go down
    };
  };

  const origSvg = toSvgCoords(x, y);
  const transSvg = toSvgCoords(transformedX, transformedY);

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Control Panel */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-emerald-400 mb-2">🔢 Matrix Vector Transformer</h1>
            <p className="text-slate-400 text-sm mb-6">Modify the 2x2 matrix grid to physically transform vector space.</p>

            {/* Matrix Inputs */}
            <h3 className="text-sm font-semibold text-slate-300 mb-2">Transformation Matrix (A)</h3>
            <div className="grid grid-cols-2 gap-3 max-w-[200px] mb-6 p-3 bg-slate-900 border border-slate-800 rounded-lg">
              <input type="number" step="0.5" value={a} onChange={(e) => handleMatrixChange(0, e.target.value)} className="w-full bg-slate-950 border border-slate-700 text-center rounded py-1 text-emerald-400 font-mono" />
              <input type="number" step="0.5" value={b} onChange={(e) => handleMatrixChange(1, e.target.value)} className="w-full bg-slate-950 border border-slate-700 text-center rounded py-1 text-emerald-400 font-mono" />
              <input type="number" step="0.5" value={c} onChange={(e) => handleMatrixChange(2, e.target.value)} className="w-full bg-slate-950 border border-slate-700 text-center rounded py-1 text-emerald-400 font-mono" />
              <input type="number" step="0.5" value={d} onChange={(e) => handleMatrixChange(3, e.target.value)} className="w-full bg-slate-950 border border-slate-700 text-center rounded py-1 text-emerald-400 font-mono" />
            </div>

            {/* Vector Inputs */}
            <h3 className="text-sm font-semibold text-slate-300 mb-2">Input Vector (v)</h3>
            <div className="flex gap-3 max-w-[200px] mb-6 p-3 bg-slate-900 border border-slate-800 rounded-lg">
              <div className="flex items-center gap-1 w-1/2">
                <span className="text-xs text-slate-500 font-mono">X:</span>
                <input type="number" value={x} onChange={(e) => setVector([parseFloat(e.target.value) || 0, y])} className="w-full bg-slate-950 border border-slate-700 text-center rounded py-1 text-cyan-400 font-mono" />
              </div>
              <div className="flex items-center gap-1 w-1/2">
                <span className="text-xs text-slate-500 font-mono">Y:</span>
                <input type="number" value={y} onChange={(e) => setVector([x, parseFloat(e.target.value) || 0])} className="w-full bg-slate-950 border border-slate-700 text-center rounded py-1 text-cyan-400 font-mono" />
              </div>
            </div>

            {/* Presets */}
            <h3 className="text-sm font-semibold text-slate-300 mb-2">Preset Matrix Profiles</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              <button onClick={() => applyPreset('identity')} className="px-3 py-1.5 bg-slate-800 text-xs rounded hover:bg-slate-700 transition">Identity</button>
              <button onClick={() => applyPreset('scale')} className="px-3 py-1.5 bg-slate-800 text-xs rounded hover:bg-slate-700 transition">Stretch Scale</button>
              <button onClick={() => applyPreset('rotate')} className="px-3 py-1.5 bg-slate-800 text-xs rounded hover:bg-slate-700 transition">90° Rotation</button>
              <button onClick={() => applyPreset('shear')} className="px-3 py-1.5 bg-slate-800 text-xs rounded hover:bg-slate-700 transition">Shear Map</button>
            </div>
          </div>

          {/* Mathematical Output Readout */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl font-mono text-xs text-slate-300 space-y-1">
            <p className="text-slate-500">// Output Calculation Result</p>
            <p>Vector Original : [{x}, {y}]</p>
            <p className="text-emerald-400">Vector Transformed: [{transformedX.toFixed(2)}, {transformedY.toFixed(2)}]</p>
          </div>
        </div>

        {/* Right Canvas Screen Visualizer */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
          <svg width={width} height={height} className="bg-slate-900 rounded-lg border border-slate-800">
            {/* Draw Graph Grid Mesh Lines */}
            {Array.from({ length: 13 }).map((_, i) => {
              const pos = i * scaleFactor;
              return (
                <React.Fragment key={i}>
                  <line x1={pos} y1={0} x2={pos} y2={height} stroke="#1e293b" strokeWidth="1" />
                  <line x1={0} y1={pos} x2={width} y2={pos} stroke="#1e293b" strokeWidth="1" />
                </React.Fragment>
              );
            })}

            {/* Primary X & Y Graph Axes */}
            <line x1={0} y1={center} x2={width} y2={center} stroke="#475569" strokeWidth="2" />
            <line x1={center} y1={0} x2={center} y2={height} stroke="#475569" strokeWidth="2" />

            {/* Marker Definitions for Arrow Heads */}
            <defs>
              <marker id="cyan-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
              </marker>
              <marker id="emerald-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
            </defs>

            {/* Original Vector Arrow Line (Cyan) */}
            <line x1={center} y1={center} x2={origSvg.cx} y2={origSvg.cy} stroke="#06b6d4" strokeWidth="3" markerEnd="url(#cyan-arrow)" />
            
            {/* Transformed Vector Arrow Line (Emerald) */}
            <line x1={center} y1={center} x2={transSvg.cx} y2={transSvg.cy} stroke="#10b981" strokeWidth="3" strokeDasharray="4 2" markerEnd="url(#emerald-arrow)" />

            {/* Origin Anchor point */}
            <circle cx={center} cy={center} r="4" fill="#ffffff" />
          </svg>
          
          <div className="flex gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-cyan-500"></div> <span className="text-slate-400">Original Vector</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-emerald-500 border-dashed border-t"></div> <span className="text-slate-400">Transformed Space</span></div>
          </div>
        </div>

      </div>
    </main>
  );
}