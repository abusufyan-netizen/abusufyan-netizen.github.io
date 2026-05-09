'use client'
import React, { useState, useEffect } from 'react'
import { Download, Image as ImageIcon, Search, Loader2, ExternalLink, AlertCircle, History, Trash2 } from 'lucide-react'

interface Pin {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
}

export default function PinterestDownloader() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState<Pin[]>([])
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [history, setHistory] = useState<string[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('pinterest_history')
    if (saved) {
      try {
        setHistory(JSON.parse(saved))
      } catch (e) {
        setHistory([])
      }
    }
  }, [])

  const saveToHistory = (newUrl: string) => {
    if (!newUrl || history.includes(newUrl)) return;
    const updated = [newUrl, ...history].slice(0, 5)
    setHistory(updated)
    localStorage.setItem('pinterest_history', JSON.stringify(updated))
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('pinterest_history')
  }

  const fetchPins = async (inputUrl?: string) => {
    const targetUrl = inputUrl || url;
    if (!targetUrl) return;
    
    setLoading(true);
    setError('');
    setPins([]);

    try {
      const res = await fetch(`/api/pinterest/fetch?url=${encodeURIComponent(targetUrl)}`);
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      const uniquePins: Pin[] = data.pins || [];
      if (uniquePins.length === 0) throw new Error('No public images found.');

      setPins(uniquePins);
      setSelectedIds(new Set(uniquePins.map(p => p.id)));
      setShowAll(false);
      saveToHistory(targetUrl);
      if (inputUrl) setUrl(inputUrl);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch images.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === pins.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(pins.map(p => p.id)));
  };

  const handleDownloadAll = async () => {
    const selectedPins = pins.filter(p => selectedIds.has(p.id));
    if (selectedPins.length === 0) return;
    
    setDownloading(true);
    setProgress({ current: 0, total: selectedPins.length });

    try {
      const JSZipModule: any = await import('jszip');
      const JSZip = JSZipModule.default || JSZipModule;
      const zip = new JSZip();
      const folder = zip.folder("pinterest-downloads");

      const batchSize = 5;
      for (let i = 0; i < selectedPins.length; i += batchSize) {
        const batch = selectedPins.slice(i, i + batchSize);
        await Promise.all(batch.map(async (pin, idx) => {
          try {
            const response = await fetch(`/api/proxy-image?url=${encodeURIComponent(pin.url)}`);
            if (!response.ok) throw new Error('Proxy error');
            const blob = await response.blob();
            const fileName = `${pin.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${i + idx}.jpg`;
            folder?.file(fileName, blob);
          } catch (e) {
            console.error(`Error index ${i + idx}:`, e);
          } finally {
            setProgress(prev => ({ ...prev, current: prev.current + 1 }));
          }
        }));
      }

      const content = await zip.generateAsync({ type: "blob" });
      const downloadUrl = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `pinterest_collection_${new Date().getTime()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Bulk download failed.');
    } finally {
      setDownloading(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  return (
    <div className="space-y-12">
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchPins()}
              placeholder="Paste Pin or Board URL..."
              className="w-full h-16 sm:h-20 pl-16 sm:pl-20 pr-6 bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 rounded-3xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none dark:text-white text-base sm:text-lg shadow-xl"
            />
          </div>
          <button 
            onClick={() => fetchPins()}
            disabled={loading || !url}
            className="px-8 h-16 sm:h-20 bg-red-600 text-white font-bold rounded-3xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-red-600/20 shrink-0 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Fetch Images'}
          </button>
        </div>

        {history.length > 0 && !pins.length && (
          <div className="mt-4 flex flex-wrap items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">
              <History className="w-3.5 h-3.5" /> Recent
            </div>
            {history.map((h, i) => (
              <button
                key={i}
                onClick={() => fetchPins(h)}
                className="px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-800 rounded-lg text-xs text-gray-500 dark:text-slate-400 truncate max-w-[150px] transition-colors"
              >
                {h.split('/').pop() || 'Untitled'}
              </button>
            ))}
            <button onClick={clearHistory} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
      </div>

      <div className="min-h-[400px]">
        {pins.length > 0 ? (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
               <button 
                onClick={toggleSelectAll}
                className="px-6 py-3 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 font-bold rounded-2xl border-2 border-gray-100 dark:border-slate-800 transition-all text-sm"
              >
                {selectedIds.size === pins.length ? 'Deselect All' : 'Select All'}
              </button>
              <button 
                onClick={handleDownloadAll}
                disabled={selectedIds.size === 0 || downloading}
                className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-xl shadow-red-600/20 transition-all disabled:opacity-50"
              >
                <Download className="w-5 h-5" />
                <span>{downloading ? `Packaging ${progress.current}/${progress.total}...` : `Download ${selectedIds.size} ZIP`}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(showAll ? pins : pins.slice(0, 12)).map((pin) => (
                <div key={pin.id} className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-gray-100 dark:border-slate-800">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img 
                      src={pin.thumbnail} 
                      alt={pin.title} 
                      className={`w-full h-full object-cover transition-all duration-500 ${selectedIds.has(pin.id) ? 'scale-100' : 'scale-90 opacity-40 grayscale'} group-hover:scale-110`}
                      loading="lazy"
                    />
                    <div 
                      onClick={() => toggleSelect(pin.id)}
                      className="absolute top-4 left-4 z-20 cursor-pointer"
                    >
                      <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${selectedIds.has(pin.id) ? 'bg-red-600 border-red-600 shadow-lg shadow-red-600/40' : 'bg-white/20 border-white/40 backdrop-blur-md'}`}>
                        {selectedIds.has(pin.id) && <Download className="w-3.5 h-3.5 text-white transform rotate-180" />}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <div className="flex gap-2">
                        <a href={pin.url} download target="_blank" rel="noreferrer" className="flex-1 py-2 bg-white text-gray-900 text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100">
                          <Download className="w-3 h-3" /> Save
                        </a>
                        <a href={`https://pinterest.com/pin/${pin.id}`} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!showAll && pins.length > 12 && (
              <div className="mt-8 text-center">
                <button onClick={() => setShowAll(true)} className="px-12 py-4 bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 text-gray-900 dark:white font-bold rounded-2xl shadow-xl transition-all">
                  Show all {pins.length} images
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-[3rem]">
            <div className="p-6 bg-gray-100 dark:bg-slate-900 rounded-full mb-4">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ready to download?</h3>
            <p className="text-gray-500 mt-2">Paste a Pinterest link above to see the magic</p>
          </div>
        )}
      </div>
    </div>
  )
}
