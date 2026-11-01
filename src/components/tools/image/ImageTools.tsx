import React, { useState, useRef, useEffect } from 'react';
import { useToolNova } from '../../../context/ToolNovaContext';
import {
  Upload,
  Download,
  Trash2,
  Image as ImageIcon,
  Check,
  RefreshCw,
  Lock,
  Unlock,
  Crop as CropIcon,
  Maximize,
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
// TOOL 13: Image Compressor
// -------------------------------------------------------------
export const ImageCompressorTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [quality, setQuality] = useState<number>(75);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP).', 'warning');
      return;
    }
    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    setCompressedUrl(null);
    setCompressedBlob(null);
    processCompression(file, quality, maxWidth);
  };

  const processCompression = (file: File, q: number, maxW: number) => {
    setIsProcessing(true);
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxW) {
        height = Math.round((height * maxW) / width);
        width = maxW;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      // Determine format: preserve webp/png or fallback to jpeg for maximum compression
      const format = file.type === 'image/png' ? 'image/webp' : 'image/jpeg';
      canvas.toBlob(
        (blob) => {
          if (blob) {
            if (compressedUrl) URL.revokeObjectURL(compressedUrl);
            setCompressedBlob(blob);
            setCompressedUrl(URL.createObjectURL(blob));
            showToast('Compression finished!', 'success');
          }
          setIsProcessing(false);
        },
        format,
        q / 100
      );
    };
    img.onerror = () => {
      setIsProcessing(false);
      showToast('Failed to load image for compression', 'error');
    };
  };

  const handleDownload = () => {
    if (!compressedUrl || !originalFile) return;
    const a = document.createElement('a');
    a.href = compressedUrl;
    const ext = originalFile.type === 'image/png' ? '.webp' : '.jpg';
    a.download = `compressed-${originalFile.name.replace(/\.[^/.]+$/, '')}${ext}`;
    a.click();
    showToast('Download started', 'success');
  };

  const savings =
    originalFile && compressedBlob
      ? Math.max(0, Math.round(((originalFile.size - compressedBlob.size) / originalFile.size) * 100))
      : 0;

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      {!originalFile ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
          }}
          className="p-12 border-2 border-dashed border-slate-700/80 hover:border-indigo-500 rounded-2xl bg-slate-950/40 text-center cursor-pointer transition-all hover:bg-slate-900/40 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">
            Choose or Drag & Drop Image Here
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-3">
            Supports JPG, PNG, and WebP up to 50MB. Processed 100% locally in your browser memory for absolute privacy.
          </p>
          <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold">
            Select From Device
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300">Compression Quality</span>
                <span className="font-mono text-indigo-400 font-bold">{quality}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={quality}
                onChange={(e) => {
                  const q = Number(e.target.value);
                  setQuality(q);
                  processCompression(originalFile, q, maxWidth);
                }}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>Maximum Savings (10%)</span>
                <span>High Quality (90%)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300">Max Dimension Scaling</span>
                <span className="font-mono text-indigo-400 font-bold">{maxWidth}px</span>
              </div>
              <select
                value={maxWidth}
                onChange={(e) => {
                  const m = Number(e.target.value);
                  setMaxWidth(m);
                  processCompression(originalFile, quality, m);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value={1200}>1200px (Blog standard)</option>
                <option value={1920}>1920px (Full HD Recommended)</option>
                <option value={2560}>2560px (2K QHD)</option>
                <option value={3840}>3840px (4K Ultra)</option>
              </select>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col">
              <div className="flex items-center justify-between mb-2 text-xs">
                <span className="font-bold text-slate-400 uppercase tracking-wider">
                  Original Image
                </span>
                <span className="font-mono text-slate-300">
                  {formatBytes(originalFile.size)}
                </span>
              </div>
              <div className="h-64 rounded-lg bg-slate-900/60 flex items-center justify-center overflow-hidden border border-slate-800/60 p-2">
                {originalUrl && (
                  <img
                    src={originalUrl}
                    alt="Original preview"
                    className="max-h-full max-w-full object-contain rounded"
                  />
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 flex flex-col">
              <div className="flex items-center justify-between mb-2 text-xs">
                <span className="font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  Optimized
                  {savings > 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                      -{savings}% Smaller
                    </span>
                  )}
                </span>
                <span className="font-mono text-indigo-300 font-bold">
                  {compressedBlob ? formatBytes(compressedBlob.size) : 'Calculating...'}
                </span>
              </div>
              <div className="h-64 rounded-lg bg-slate-900/60 flex items-center justify-center overflow-hidden border border-indigo-500/20 p-2 relative">
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-2 text-indigo-400">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    <span className="text-xs">Compressing in canvas...</span>
                  </div>
                ) : (
                  compressedUrl && (
                    <img
                      src={compressedUrl}
                      alt="Compressed preview"
                      className="max-h-full max-w-full object-contain rounded"
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setOriginalFile(null);
                setOriginalUrl(null);
                setCompressedUrl(null);
                setCompressedBlob(null);
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Compress Another Image
            </button>

            <button
              onClick={handleDownload}
              disabled={!compressedUrl || isProcessing}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-40 transition-all"
            >
              <Download className="w-4 h-4" />
              Download Compressed File
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 14: Image Resizer
// -------------------------------------------------------------
export const ImageResizerTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [targetWidth, setTargetWidth] = useState<number>(1080);
  const [targetHeight, setTargetHeight] = useState<number>(1080);
  const [lockRatio, setLockRatio] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'warning');
      return;
    }
    setFile(f);
    const u = URL.createObjectURL(f);
    setPreviewUrl(u);
    const img = new Image();
    img.src = u;
    img.onload = () => {
      setOriginalDimensions({ width: img.width, height: img.height });
      setTargetWidth(img.width);
      setTargetHeight(img.height);
      setResizedUrl(null);
    };
  };

  const handleWidthChange = (w: number) => {
    setTargetWidth(w);
    if (lockRatio && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setTargetHeight(Math.round(w * ratio));
    }
  };

  const handleHeightChange = (h: number) => {
    setTargetHeight(h);
    if (lockRatio && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setTargetWidth(Math.round(h * ratio));
    }
  };

  const applyPreset = (w: number, h: number) => {
    setLockRatio(false);
    setTargetWidth(w);
    setTargetHeight(h);
  };

  const processResize = () => {
    if (!file || !previewUrl) return;
    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      canvas.toBlob((blob) => {
        if (blob) {
          if (resizedUrl) URL.revokeObjectURL(resizedUrl);
          setResizedUrl(URL.createObjectURL(blob));
          showToast(`Resized to ${targetWidth}x${targetHeight}!`, 'success');
        }
      }, file.type || 'image/png');
    };
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="p-12 border-2 border-dashed border-slate-700/80 hover:border-indigo-500 rounded-2xl bg-slate-950/40 text-center cursor-pointer transition-all"
        >
          <Upload className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-white font-bold text-sm mb-1">Select an Image to Resize</h3>
          <p className="text-xs text-slate-400 mb-3">JPG, PNG, WebP supported</p>
          <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold">
            Upload Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Preset Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-semibold mr-1">Presets:</span>
            <button
              onClick={() => applyPreset(1080, 1080)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
            >
              Instagram Square (1080x1080)
            </button>
            <button
              onClick={() => applyPreset(1200, 630)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
            >
              Social OG Card (1200x630)
            </button>
            <button
              onClick={() => applyPreset(1920, 1080)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
            >
              Full HD (1920x1080)
            </button>
            <button
              onClick={() => applyPreset(1280, 720)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
            >
              YouTube Thumb (1280x720)
            </button>
          </div>

          {/* Dimension inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Width (pixels)
              </label>
              <input
                type="number"
                min={10}
                max={8000}
                value={targetWidth}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Height (pixels)
              </label>
              <input
                type="number"
                min={10}
                max={8000}
                value={targetHeight}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setLockRatio(!lockRatio)}
                className={`w-full py-1.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  lockRatio
                    ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                {lockRatio ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                {lockRatio ? 'Ratio Locked' : 'Ratio Unlocked'}
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={processResize}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/20"
            >
              Apply Resize
            </button>
          </div>

          {/* Preview */}
          <div className="h-64 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-4 overflow-hidden">
            <img
              src={resizedUrl || previewUrl || ''}
              alt="Resize preview"
              className="max-h-full max-w-full object-contain rounded"
            />
          </div>

          {resizedUrl && (
            <div className="flex justify-end gap-3">
              <a
                href={resizedUrl}
                download={`resized-${targetWidth}x${targetHeight}-${file.name}`}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Resized Image
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 15: JPG to PNG Converter
// -------------------------------------------------------------
export const JpgToPngConverterTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [file, setFile] = useState<File | null>(null);
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConvert = (f: File) => {
    setFile(f);
    const img = new Image();
    img.src = URL.createObjectURL(f);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          setPngUrl(URL.createObjectURL(blob));
          showToast('Converted to PNG lossless format!', 'success');
        }
      }, 'image/png');
    };
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      {!pngUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="p-12 border-2 border-dashed border-slate-700/80 hover:border-indigo-500 rounded-2xl bg-slate-950/40 text-center cursor-pointer transition-all"
        >
          <Upload className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-white font-bold text-sm mb-1">Upload JPG/JPEG File</h3>
          <p className="text-xs text-slate-400 mb-3">Instant browser-side lossless transcode to PNG</p>
          <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold">
            Choose JPG
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,image/jpeg"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleConvert(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-4 text-center">
          <div className="h-64 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-4">
            <img src={pngUrl} alt="PNG preview" className="max-h-full max-w-full object-contain rounded" />
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setFile(null);
                setPngUrl(null);
              }}
              className="px-4 py-2 rounded-xl text-xs bg-slate-800 text-slate-300 hover:text-white"
            >
              Convert Another
            </button>
            <a
              href={pngUrl}
              download={`${file?.name.replace(/\.[^/.]+$/, '') || 'converted'}.png`}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download PNG
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 16: PNG to WebP Converter
// -------------------------------------------------------------
export const PngToWebpConverterTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [file, setFile] = useState<File | null>(null);
  const [webpUrl, setWebpUrl] = useState<string | null>(null);
  const [origSize, setOrigSize] = useState<number>(0);
  const [newSize, setNewSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConvert = (f: File) => {
    setFile(f);
    setOrigSize(f.size);
    const img = new Image();
    img.src = URL.createObjectURL(f);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          setNewSize(blob.size);
          setWebpUrl(URL.createObjectURL(blob));
          showToast('Converted to WebP!', 'success');
        }
      }, 'image/webp', 0.85);
    };
  };

  const reduction = origSize > 0 ? Math.round(((origSize - newSize) / origSize) * 100) : 0;

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      {!webpUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="p-12 border-2 border-dashed border-slate-700/80 hover:border-indigo-500 rounded-2xl bg-slate-950/40 text-center cursor-pointer transition-all"
        >
          <Upload className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-white font-bold text-sm mb-1">Upload PNG or JPG to Convert to WebP</h3>
          <p className="text-xs text-slate-400 mb-3">Reduces file size by up to 70% while keeping alpha transparency</p>
          <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold">
            Select File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleConvert(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-4 text-center">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 inline-block text-xs text-slate-300">
            Original: <span className="font-mono text-slate-400">{formatBytes(origSize)}</span> → WebP:{' '}
            <span className="font-mono text-emerald-400 font-bold">{formatBytes(newSize)}</span>{' '}
            {reduction > 0 && <span className="text-emerald-300 font-semibold">({reduction}% smaller)</span>}
          </div>
          <div className="h-64 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-4">
            <img src={webpUrl} alt="WebP preview" className="max-h-full max-w-full object-contain rounded" />
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setFile(null);
                setWebpUrl(null);
              }}
              className="px-4 py-2 rounded-xl text-xs bg-slate-800 text-slate-300 hover:text-white"
            >
              Convert Another
            </button>
            <a
              href={webpUrl}
              download={`${file?.name.replace(/\.[^/.]+$/, '') || 'image'}.webp`}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download WebP
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// TOOL 17: Image Cropper
// -------------------------------------------------------------
export const ImageCropperTool: React.FC = () => {
  const { showToast } = useToolNova();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const [aspect, setAspect] = useState<string>('1:1');
  const [scale, setScale] = useState<number>(80);
  const [position, setPosition] = useState<'center' | 'top' | 'bottom' | 'left' | 'right'>('center');
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [cropStats, setCropStats] = useState<{ width: number; height: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setCroppedUrl(null);
    setCropStats(null);
  };

  const applyCrop = () => {
    if (!previewUrl) return;
    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      const scaleMultiplier = scale / 100;
      let targetWidth = img.width * scaleMultiplier;
      let targetHeight = img.height * scaleMultiplier;

      if (aspect === '1:1') {
        const side = Math.min(targetWidth, targetHeight);
        targetWidth = side;
        targetHeight = side;
      } else if (aspect === '16:9') {
        targetHeight = Math.round(targetWidth * (9 / 16));
        if (targetHeight > img.height) {
          targetHeight = img.height;
          targetWidth = Math.round(targetHeight * (16 / 9));
        }
      } else if (aspect === '4:3') {
        targetHeight = Math.round(targetWidth * (3 / 4));
        if (targetHeight > img.height) {
          targetHeight = img.height;
          targetWidth = Math.round(targetHeight * (4 / 3));
        }
      }

      // Clamp dimensions
      const cropW = Math.max(10, Math.min(img.width, Math.round(targetWidth)));
      const cropH = Math.max(10, Math.min(img.height, Math.round(targetHeight)));

      // Calculate startX and startY according to alignment
      let startX = Math.round((img.width - cropW) / 2);
      let startY = Math.round((img.height - cropH) / 2);

      if (position === 'top') {
        startY = 0;
      } else if (position === 'bottom') {
        startY = img.height - cropH;
      } else if (position === 'left') {
        startX = 0;
      } else if (position === 'right') {
        startX = img.width - cropW;
      }

      const canvas = document.createElement('canvas');
      canvas.width = cropW;
      canvas.height = cropH;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, startX, startY, cropW, cropH, 0, 0, cropW, cropH);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            if (croppedUrl) URL.revokeObjectURL(croppedUrl);
            setCroppedUrl(URL.createObjectURL(blob));
            setCropStats({ width: cropW, height: cropH });
            showToast(`Cropped to ${cropW}x${cropH} px!`, 'success');
          }
        },
        format === 'jpeg' ? 'image/jpeg' : 'image/png',
        0.92
      );
    };
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-7 border border-slate-800 space-y-6">
      {!previewUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="p-12 border-2 border-dashed border-slate-700/80 hover:border-indigo-500 rounded-2xl bg-slate-950/40 text-center cursor-pointer transition-all"
        >
          <Upload className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-white font-bold text-sm mb-1">Upload Photo to Crop</h3>
          <p className="text-xs text-slate-400 mb-3">Crop with standard aspect ratios (1:1, 16:9, 4:3, Freeform) and scale</p>
          <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold">
            Choose Photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
            {/* Aspect Ratio */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1.5">Aspect Ratio</label>
              <div className="flex gap-1.5 flex-wrap">
                {['1:1', '16:9', '4:3', 'free'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setAspect(r)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                      aspect === r ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {r.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Position Alignment */}
            <div>
              <label className="block text-slate-400 font-semibold mb-1.5">Alignment Focus</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white focus:outline-none"
              >
                <option value="center">Center</option>
                <option value="top">Top Focus</option>
                <option value="bottom">Bottom Focus</option>
                <option value="left">Left Focus</option>
                <option value="right">Right Focus</option>
              </select>
            </div>

            {/* Scale / Zoom Slider */}
            <div>
              <div className="flex justify-between mb-1 font-semibold text-slate-300">
                <span>Crop Window Scale</span>
                <span className="font-mono text-indigo-400">{scale}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Format:</span>
              <button
                onClick={() => setFormat('png')}
                className={`px-2.5 py-1 rounded-lg font-semibold ${
                  format === 'png' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                PNG
              </button>
              <button
                onClick={() => setFormat('jpeg')}
                className={`px-2.5 py-1 rounded-lg font-semibold ${
                  format === 'jpeg' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                JPEG
              </button>
            </div>

            <button
              onClick={applyCrop}
              className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20"
            >
              Apply Crop Transformation
            </button>
          </div>

          {/* Preview Canvas Display */}
          <div className="h-72 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-4 overflow-hidden relative">
            <img
              src={croppedUrl || previewUrl}
              alt="Crop preview"
              className="max-h-full max-w-full object-contain rounded"
            />
          </div>

          {croppedUrl && cropStats && (
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="text-emerald-300 font-semibold">
                Cropped Dimensions: {cropStats.width} x {cropStats.height} px
              </span>
              <a
                href={croppedUrl}
                download={`cropped-${file?.name.replace(/\.[^/.]+$/, '') || 'photo'}.${format === 'jpeg' ? 'jpg' : 'png'}`}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Cropped Image
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
