"use client";
import { useState } from 'react';
import { Upload, Download, Loader2, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setResult(null);
    setProcessing(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/remove', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Failed to process');
      const blob = await res.blob();
      setResult(URL.createObjectURL(blob));
    } catch (err) {
      alert("Processing failed. Please check your API Key or connection.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Image Background <span className="text-blue-600">Remover</span>
        </h1>
        <p className="text-xl text-slate-600">
          Professional AI background removal in seconds. 100% Automatic.
        </p>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {!image ? (
          <div className="p-12 text-center">
            <label className="group flex flex-col items-center justify-center border-4 border-dashed border-slate-200 rounded-2xl py-20 px-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300">
              <div className="bg-blue-100 p-6 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Upload an image</h2>
              <p className="text-slate-500 mb-8 text-lg">or drag and drop a file here</p>
              <div className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg group-hover:bg-blue-700">
                Choose File
              </div>
              <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
            </label>
            <p className="mt-8 text-slate-400 text-sm italic">Supported formats: JPG, PNG, WEBP (Max 5MB)</p>
          </div>
        ) : (
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="flex items-center gap-2 font-bold text-slate-700"><ImageIcon className="w-5 h-5" /> Original</span>
                  <button onClick={() => {setImage(null); setResult(null);}} className="text-sm text-blue-600 hover:underline">Change</button>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-inner bg-slate-100 border border-slate-200">
                  <img src={image} className="w-full h-auto object-contain max-h-[400px]" alt="Original" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 px-2 font-bold text-slate-700">
                   {result ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Loader2 className={`w-5 h-5 ${processing ? 'animate-spin' : ''}`} />} 
                   Result
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-inner bg-slate-200 min-h-[300px] flex items-center justify-center border border-slate-200">
                  {/* Checkerboard Pattern */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] opacity-30"></div>
                  
                  {processing ? (
                    <div className="relative z-10 flex flex-col items-center gap-4 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
                      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                      <p className="font-bold text-slate-800 animate-pulse text-lg">AI is thinking...</p>
                    </div>
                  ) : result ? (
                    <img src={result} className="relative z-10 w-full h-auto object-contain max-h-[400px]" alt="Result" />
                  ) : (
                    <p className="text-slate-400 italic">Waiting for processing...</p>
                  )}
                </div>
              </div>
            </div>

            {result && !processing && (
              <div className="mt-10 flex justify-center pb-4">
                <a href={result} download="removed-background.png" 
                   className="flex items-center gap-3 bg-green-600 text-white px-10 py-4 rounded-2xl font-black text-xl shadow-xl hover:bg-green-700 hover:scale-105 active:scale-95 transition-all">
                  <Download className="w-7 h-7" />
                  Download Result
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="mt-12 text-slate-400 flex items-center gap-2">
        Made with 🌓 Black & White Assistant
      </footer>
    </main>
  );
}
