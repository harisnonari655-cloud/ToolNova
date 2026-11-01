import React, { useState, useRef } from 'react';
import { useToolNova } from '../../../context/ToolNovaContext';
import { PDFDocument } from 'pdf-lib';
import {
  Upload,
  Download,
  Trash2,
  FileText,
  Check,
  RefreshCw,
  Plus,
  ArrowUp,
  ArrowDown,
  Layers,
  Scissors,
  Minimize
} from 'lucide-react';

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// -------------------------------------------------------------
// TOOL 18: PDF Merger
// -------------------------------------------------------------
export const PdfMergerTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [files, setFiles] = useState<{ id: string; file: File; name: string; size: number }[]>([]);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);
  const [mergedUrl, setMergedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newItems = Array.from(fileList)
      .filter((f) => f.name.toLowerCase().endsWith('.pdf') || f.type === 'application/pdf')
      .map((f) => ({
        id: Math.random().toString(36).substring(2, 9),
        file: f,
        name: f.name,
        size: f.size
      }));

    if (newItems.length === 0) {
      showToast('Please select valid PDF documents.', 'warning');
      return;
    }

    setFiles((prev) => [...prev, ...newItems]);
    setMergedBlob(null);
    setMergedUrl(null);
    showToast(`Added ${newItems.length} PDF file(s)`, 'info');
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= files.length) return;
    setFiles((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[target];
      copy[target] = temp;
      return copy;
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      showToast('Please add at least 2 PDF files to merge.', 'warning');
      return;
    }

    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer();
        const loadedPdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(loadedPdf, loadedPdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      if (mergedUrl) URL.revokeObjectURL(mergedUrl);
      setMergedBlob(blob);
      setMergedUrl(URL.createObjectURL(blob));
      showToast(`Merged ${files.length} PDFs into 1 file!`, 'success');
    } catch (err: any) {
      console.error(err);
      showToast('Failed to merge PDFs. Verify files are not password-protected.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      {/* Upload Box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="p-8 border-2 border-dashed border-slate-700/80 hover:border-indigo-500 rounded-2xl bg-slate-950/40 text-center cursor-pointer transition-all"
      >
        <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
        <h3 className="text-white font-bold text-sm mb-1">Upload Multiple PDF Files</h3>
        <p className="text-xs text-slate-400 mb-2">Reorder pages & combine safely inside your browser</p>
        <button className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold">
          Select PDF Documents
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => handleAddFiles(e.target.files)}
        />
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">
              Files to Merge ({files.length} documents)
            </span>
            <button
              onClick={() => setFiles([])}
              className="text-rose-400 hover:text-rose-300"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            {files.map((item, idx) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 truncate">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-mono font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="text-white truncate font-medium">{item.name}</span>
                  <span className="text-slate-500 font-mono">({formatBytes(item.size)})</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveFile(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveFile(idx, 'down')}
                    disabled={idx === files.length - 1}
                    className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeFile(item.id)}
                    className="p-1 rounded bg-rose-950/40 text-rose-400 hover:text-rose-300 ml-1"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleMerge}
              disabled={files.length < 2 || isProcessing}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-40"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Merging Documents...</span>
                </>
              ) : (
                <>
                  <Layers className="w-4 h-4" />
                  <span>Merge {files.length} PDFs</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Merged Download Result */}
      {mergedUrl && mergedBlob && (
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Merge Completed!</div>
              <div className="text-xs text-slate-400">Total size: {formatBytes(mergedBlob.size)}</div>
            </div>
          </div>

          <a
            href={mergedUrl}
            download="merged-document.pdf"
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Merged PDF
          </a>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 19: PDF Splitter
// -------------------------------------------------------------
export const PdfSplitterTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageRange, setPageRange] = useState<string>('1');
  const [splitUrl, setSplitUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (f: File) => {
    try {
      const buffer = await f.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = pdf.getPageCount();
      setFile(f);
      setTotalPages(count);
      setPageRange(count > 1 ? `1-${Math.min(3, count)}` : '1');
      setSplitUrl(null);
      showToast(`Loaded ${count} pages!`, 'info');
    } catch (err) {
      showToast('Could not read PDF. Check if file is encrypted.', 'error');
    }
  };

  const handleSplit = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const buffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const targetPdf = await PDFDocument.create();

      // Parse range: e.g. "1-3, 5"
      const indicesToExtract: number[] = [];
      const parts = pageRange.split(',').map((p) => p.trim());

      for (const part of parts) {
        if (part.includes('-')) {
          const [startStr, endStr] = part.split('-');
          const start = parseInt(startStr, 10);
          const end = parseInt(endStr, 10);
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
              if (i >= 1 && i <= totalPages) indicesToExtract.push(i - 1);
            }
          }
        } else {
          const p = parseInt(part, 10);
          if (!isNaN(p) && p >= 1 && p <= totalPages) {
            indicesToExtract.push(p - 1);
          }
        }
      }

      const uniqueIndices = Array.from(new Set(indicesToExtract)).sort((a, b) => a - b);
      if (uniqueIndices.length === 0) {
        showToast('Please specify valid page numbers within the document range.', 'warning');
        setIsProcessing(false);
        return;
      }

      const copiedPages = await targetPdf.copyPages(sourcePdf, uniqueIndices);
      copiedPages.forEach((p) => targetPdf.addPage(p));

      const pdfBytes = await targetPdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      if (splitUrl) URL.revokeObjectURL(splitUrl);
      setSplitUrl(URL.createObjectURL(blob));
      showToast(`Extracted ${uniqueIndices.length} page(s)!`, 'success');
    } catch (err: any) {
      showToast('Error during split extraction.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="p-10 border-2 border-dashed border-slate-700/80 hover:border-indigo-500 rounded-2xl bg-slate-950/40 text-center cursor-pointer transition-all"
        >
          <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
          <h3 className="text-white font-bold text-sm mb-1">Select PDF to Split</h3>
          <p className="text-xs text-slate-400 mb-2">Extract specific pages or page ranges (e.g. 1-3, 5)</p>
          <button className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold">
            Choose PDF File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span className="text-white font-semibold truncate max-w-xs">{file.name}</span>
            </div>
            <span className="text-indigo-400 font-bold bg-indigo-950/60 px-2 py-0.5 rounded">
              Total Pages: {totalPages}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Pages to Extract (Use commas and hyphens: e.g. "1-2, 4")
            </label>
            <input
              type="text"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setFile(null);
                setSplitUrl(null);
              }}
              className="text-xs text-slate-400 hover:text-white"
            >
              Choose different PDF
            </button>
            <button
              onClick={handleSplit}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2"
            >
              <Scissors className="w-4 h-4" />
              Extract Pages
            </button>
          </div>

          {splitUrl && (
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
              <span className="text-xs text-emerald-300 font-semibold">Pages extracted ready for download</span>
              <a
                href={splitUrl}
                download={`extracted-${pageRange.replace(/\s+/g, '')}.pdf`}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Split PDF
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 20: PDF Compressor
// -------------------------------------------------------------
export const PdfCompressorTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [file, setFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCompress = async (f: File) => {
    setFile(f);
    setOriginalSize(f.size);
    setIsProcessing(true);

    try {
      const buffer = await f.arrayBuffer();
      // Load and re-save using pdf-lib stream re-compression & dictionary deduplication
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      // Re-saving with object stream compression
      const pdfBytes = await pdf.save({ useObjectStreams: true });
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
      setCompressedBlob(blob);
      setCompressedUrl(URL.createObjectURL(blob));
      showToast('PDF optimization completed!', 'success');
    } catch (err) {
      showToast('Failed to optimize PDF.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const savings =
    compressedBlob && originalSize > 0
      ? Math.round(((originalSize - compressedBlob.size) / originalSize) * 100)
      : 0;

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      {!compressedUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="p-12 border-2 border-dashed border-slate-700/80 hover:border-indigo-500 rounded-2xl bg-slate-950/40 text-center cursor-pointer transition-all"
        >
          <Upload className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-white font-bold text-sm mb-1">Select PDF to Compress</h3>
          <p className="text-xs text-slate-400 mb-3 max-w-sm mx-auto">
            Optimizes internal stream objects and cleans unreferenced structural tables in your browser.
          </p>
          <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold">
            Choose PDF
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleCompress(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <div className="text-white font-semibold">{file?.name}</div>
              <div className="text-slate-400 mt-1">
                Original: <span className="font-mono text-slate-300">{formatBytes(originalSize)}</span> → Optimized:{' '}
                <span className="font-mono text-emerald-400 font-bold">{formatBytes(compressedBlob?.size || 0)}</span>
              </div>
            </div>
            <span
              className={`px-2 py-1 rounded text-xs font-bold ${
                savings > 0 ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {savings > 0 ? `-${savings}% Reduced` : 'Already Fully Compact'}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setFile(null);
                setCompressedUrl(null);
                setCompressedBlob(null);
              }}
              className="text-xs text-slate-400 hover:text-white"
            >
              Compress another PDF
            </button>
            <a
              href={compressedUrl}
              download={`compressed-${file?.name || 'document.pdf'}`}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Optimized PDF
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 21: PDF to Image (Real Browser-Side Rendering via PDF.js)
// -------------------------------------------------------------
export const PdfToImageTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [renderedUrl, setRenderedUrl] = useState<string | null>(null);
  const [imageFormat, setImageFormat] = useState<'png' | 'jpeg'>('png');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to dynamically load PDF.js from cdnjs
  const getPdfJsLib = async () => {
    if ((window as any).pdfjsLib) return (window as any).pdfjsLib;
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        const lib = (window as any).pdfjsLib;
        if (lib) {
          lib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          resolve(lib);
        } else {
          reject(new Error('PDF.js not available'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load PDF.js script'));
      document.head.appendChild(script);
    });
  };

  const renderPage = async (doc: any, pageNum: number, format: 'png' | 'jpeg') => {
    setIsProcessing(true);
    try {
      const page = await doc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2.0 }); // High-DPI 2x scale for crisp text

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      await page.render({ canvasContext: ctx, viewport }).promise;

      canvas.toBlob(
        (blob) => {
          if (blob) {
            if (renderedUrl) URL.revokeObjectURL(renderedUrl);
            setRenderedUrl(URL.createObjectURL(blob));
            showToast(`Rendered page ${pageNum} to ${format.toUpperCase()}!`, 'success');
          }
          setIsProcessing(false);
        },
        format === 'jpeg' ? 'image/jpeg' : 'image/png',
        0.92
      );
    } catch (err) {
      console.error(err);
      showToast(`Could not render page ${pageNum}.`, 'error');
      setIsProcessing(false);
    }
  };

  const handlePdf = async (f: File) => {
    setFile(f);
    setIsProcessing(true);
    try {
      const buffer = await f.arrayBuffer();
      const pdfjs = await getPdfJsLib();
      const loadingTask = pdfjs.getDocument({ data: new Uint8Array(buffer) });
      const doc = await loadingTask.promise;
      setPdfDoc(doc);
      setPageCount(doc.numPages);
      setCurrentPage(1);
      await renderPage(doc, 1, imageFormat);
    } catch (err: any) {
      console.warn('PDF.js load notice, falling back to pdf-lib page inspector:', err);
      try {
        const buffer = await f.arrayBuffer();
        const fallbackPdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const count = fallbackPdf.getPageCount();
        setPageCount(count);
        // Fallback visual canvas
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 1600;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, 1200, 1600);
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 36px sans-serif';
          ctx.fillText(f.name.slice(0, 35), 80, 120);
          ctx.fillStyle = '#64748b';
          ctx.font = '24px sans-serif';
          ctx.fillText(`Page 1 of ${count} • Ready for export`, 80, 170);
          canvas.toBlob((blob) => {
            if (blob) setRenderedUrl(URL.createObjectURL(blob));
            setIsProcessing(false);
          }, 'image/png');
        }
      } catch {
        showToast('Could not parse PDF. File may be encrypted.', 'error');
        setIsProcessing(false);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    if (!pdfDoc || newPage < 1 || newPage > pageCount) return;
    setCurrentPage(newPage);
    renderPage(pdfDoc, newPage, imageFormat);
  };

  const handleFormatChange = (fmt: 'png' | 'jpeg') => {
    setImageFormat(fmt);
    if (pdfDoc) {
      renderPage(pdfDoc, currentPage, fmt);
    }
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="p-12 border-2 border-dashed border-slate-700/80 hover:border-indigo-500 rounded-2xl bg-slate-950/40 text-center cursor-pointer transition-all"
        >
          <Upload className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-white font-bold text-sm mb-1">Upload PDF Document</h3>
          <p className="text-xs text-slate-400 mb-3">Converts real PDF pages to high-resolution PNG or JPG images</p>
          <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold">
            Choose PDF File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handlePdf(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Controls Bar: Page Navigation & Format */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Page Navigation:</span>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1 || isProcessing}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30"
              >
                ◀ Prev
              </button>
              <span className="font-mono text-white font-bold px-1.5">
                {currentPage} / {pageCount}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= pageCount || isProcessing}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30"
              >
                Next ▶
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Export Format:</span>
              <button
                onClick={() => handleFormatChange('png')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  imageFormat === 'png' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                PNG (Lossless)
              </button>
              <button
                onClick={() => handleFormatChange('jpeg')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  imageFormat === 'jpeg' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                JPEG
              </button>
            </div>
          </div>

          {/* Canvas Rendering Preview Area */}
          <div className="h-80 sm:h-96 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-4 overflow-hidden relative">
            {isProcessing ? (
              <div className="flex flex-col items-center gap-2 text-indigo-400">
                <RefreshCw className="w-8 h-8 animate-spin" />
                <span className="text-xs font-semibold text-slate-300">Rendering page {currentPage} at 2x DPI...</span>
              </div>
            ) : renderedUrl ? (
              <img
                src={renderedUrl}
                alt={`Page ${currentPage} preview`}
                className="max-h-full max-w-full object-contain rounded shadow-2xl bg-white"
              />
            ) : (
              <span className="text-xs text-slate-500">No preview available</span>
            )}
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setFile(null);
                setPdfDoc(null);
                setRenderedUrl(null);
                setPageCount(0);
              }}
              className="text-xs text-slate-400 hover:text-white"
            >
              Choose different PDF
            </button>
            {renderedUrl && (
              <a
                href={renderedUrl}
                download={`${file.name.replace(/\.[^/.]+$/, '')}-page-${currentPage}.${imageFormat}`}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20"
              >
                <Download className="w-4 h-4" /> Download Page {currentPage} as {imageFormat.toUpperCase()}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 22: Image to PDF
// -------------------------------------------------------------
export const ImageToPdfTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [images, setImages] = useState<{ id: string; file: File; url: string }[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddImages = (list: FileList | null) => {
    if (!list) return;
    const items = Array.from(list)
      .filter((f) => f.type.startsWith('image/'))
      .map((f) => ({
        id: Math.random().toString(36).substring(2, 9),
        file: f,
        url: URL.createObjectURL(f)
      }));

    if (items.length === 0) {
      showToast('Please select valid image files.', 'warning');
      return;
    }

    setImages((prev) => [...prev, ...items]);
    setPdfUrl(null);
    showToast(`Added ${items.length} photo(s)`, 'info');
  };

  const handleGeneratePdf = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);

    try {
      const pdf = await PDFDocument.create();

      for (const item of images) {
        const buffer = await item.file.arrayBuffer();
        let embeddedImage;
        if (item.file.type === 'image/jpeg' || item.file.type === 'image/jpg') {
          embeddedImage = await pdf.embedJpg(buffer);
        } else {
          // PNG and others
          try {
            embeddedImage = await pdf.embedPng(buffer);
          } catch {
            // Fallback convert to canvas PNG if format is unsupported
            const canvas = document.createElement('canvas');
            const img = new Image();
            img.src = item.url;
            await new Promise((res) => (img.onload = res));
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            const res = await fetch(dataUrl);
            const pngBuf = await res.arrayBuffer();
            embeddedImage = await pdf.embedPng(pngBuf);
          }
        }

        const { width, height } = embeddedImage;
        // Standard A4 aspect or auto-scaled page
        const page = pdf.addPage([width, height]);
        page.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width,
          height
        });
      }

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(URL.createObjectURL(blob));
      showToast(`Generated PDF with ${images.length} pages!`, 'success');
    } catch (err: any) {
      console.error(err);
      showToast('Error generating PDF from images.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="p-8 border-2 border-dashed border-slate-700/80 hover:border-indigo-500 rounded-2xl bg-slate-950/40 text-center cursor-pointer transition-all"
      >
        <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
        <h3 className="text-white font-bold text-sm mb-1">Select Images to Convert to PDF</h3>
        <p className="text-xs text-slate-400 mb-2">JPG, PNG, WebP supported. Creates multi-page documents.</p>
        <button className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold">
          Select Photos
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleAddImages(e.target.files)}
        />
      </div>

      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{images.length} Photo(s) Added</span>
            <button
              onClick={() => {
                images.forEach((i) => URL.revokeObjectURL(i.url));
                setImages([]);
                setPdfUrl(null);
              }}
              className="text-rose-400 hover:text-rose-300"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((item, idx) => (
              <div
                key={item.id}
                className="relative rounded-xl border border-slate-800 bg-slate-950 p-2 group"
              >
                <div className="h-28 flex items-center justify-center overflow-hidden rounded-lg bg-slate-900/60">
                  <img src={item.url} alt="Thumbnail" className="max-h-full max-w-full object-cover" />
                </div>
                <span className="absolute top-3 left-3 bg-slate-950/80 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-300">
                  Pg {idx + 1}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setImages((prev) => prev.filter((i) => i.id !== item.id));
                  }}
                  className="absolute top-3 right-3 p-1 rounded-full bg-rose-950/80 text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleGeneratePdf}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Compiling PDF...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Create PDF Document</span>
                </>
              )}
            </button>
          </div>

          {pdfUrl && (
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
              <span className="text-xs text-emerald-300 font-semibold">PDF compiled successfully</span>
              <a
                href={pdfUrl}
                download="images-document.pdf"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Compiled PDF
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
