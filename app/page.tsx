'use client';

import Link from 'next/link';

export default function HomePage() {
  const modules = [
    {
      title: '📊 Algorithm Suite',
      desc: 'Visualize dynamic sorting execution including Bubble, Selection, Insertion, Merge, and Quick Sort profiles.',
      link: '/visualizer',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      title: '🔢 Linear Algebra Matrix',
      desc: 'Interact with 2x2 coordinate transformation matrices and monitor live geometrical vector modifications.',
      link: '/linear-algebra',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: '🧱 Data Structures Hub',
      desc: 'Analyze linear sequential memory allocation tracking using live visual Stacks (LIFO) and Queues (FIFO).',
      link: '/data-structures',
      color: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent mb-3">
          Computer Science Mastery Platform
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          An interactive playground dedicated to analyzing foundational mathematical operations, memory data structures, and algorithmic logic loops.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {modules.map((mod, i) => (
          <Link 
            key={i} 
            href={mod.link} 
            className="group relative bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between overflow-hidden"
          >
            {/* Top gradient highlight effect on hover */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${mod.color} transform scale-x-0 group-hover:scale-x-100 transition duration-300 origin-left`} />
            
            <div>
              <h3 className="font-bold text-lg text-slate-100 mb-2 group-hover:text-slate-200 transition">
                {mod.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {mod.desc}
              </p>
            </div>
            
            <div className="mt-6 flex items-center text-xs font-semibold tracking-wider text-slate-400 group-hover:text-slate-200 transition">
              LAUNCH WORKSPACE <span className="transform translate-x-0 group-hover:translate-x-1 transition ml-1">→</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}