import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, StickyNote, Maximize2, Minimize2, X, ChevronRight, ChevronLeft, Printer, Loader2 } from 'lucide-react';
import { Scene3D } from './components/Scene3D';
import { SlideRenderer } from './components/SlideRenderer';
import { ContentData } from './types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const App: React.FC = () => {
  const [data, setData] = useState<ContentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentBuildIndex, setCurrentBuildIndex] = useState(-1);
  const [direction, setDirection] = useState(0);

  const [showOverview, setShowOverview] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Touch gesture states
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Solo cargamos desde la ruta estandarizada en public/content/
    fetch('./content/content.json?t=' + Date.now())
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar content.json");
        return res;
      })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        console.error("Error loading content:", err);
        setError("System Error: Could not load strategic data.");
      });
  }, []);

  const navigateForward = useCallback(() => {
    if (!data || isGeneratingPDF) return;
    const currentSlide = data.slides[currentSlideIndex];
    const maxBuilds = (currentSlide.builds?.length || 0) - 1;

    if (currentBuildIndex < maxBuilds) {
      setCurrentBuildIndex(prev => prev + 1);
    } else if (currentSlideIndex < data.slides.length - 1) {
      setDirection(1);
      setCurrentSlideIndex(prev => prev + 1);
      setCurrentBuildIndex(-1);
    }
  }, [data, currentSlideIndex, currentBuildIndex, isGeneratingPDF]);

  const navigateBackward = useCallback(() => {
    if (!data || isGeneratingPDF) return;

    if (currentBuildIndex > -1) {
      setCurrentBuildIndex(prev => prev - 1);
    } else if (currentSlideIndex > 0) {
      setDirection(-1);
      const prevSlideIndex = currentSlideIndex - 1;
      const prevSlide = data.slides[prevSlideIndex];
      setCurrentSlideIndex(prevSlideIndex);
      setCurrentBuildIndex((prevSlide.builds?.length || 0) - 1);
    }
  }, [data, currentSlideIndex, currentBuildIndex, isGeneratingPDF]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => { });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const generatePDF = useCallback(async () => {
    if (!data || !pdfContainerRef.current || isGeneratingPDF) return;
    setIsGeneratingPDF(true);

    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1920, 1080]
      });

      const slides = pdfContainerRef.current.children;
      for (let i = 0; i < slides.length; i++) {
        const slideElement = slides[i] as HTMLElement;
        await new Promise(r => setTimeout(r, 800)); // Wait for render and GC

        const canvas = await html2canvas(slideElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#050810',
          width: 1920,
          height: 1080,
          windowWidth: 1920,
          windowHeight: 1080,
          onclone: (clonedDoc) => {
            // Safety check for data existence
            if (data && data.slides[i]) {
              const element = clonedDoc.getElementById(`pdf-${data.slides[i].id}`);
              if (element) {
                element.style.transform = 'none';
              }
            }
          },
          ignoreElements: (element) => {
            return element.tagName.toLowerCase() === 'canvas';
          }
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.8);
        if (i > 0) pdf.addPage([1920, 1080], 'landscape');
        pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
        console.log(`Slide ${i + 1} generated`);

        // Force small GC pause
        await new Promise(r => setTimeout(r, 100));
      }

      pdf.save('Nestle-BioLife-Presentation.pdf');
    } catch (err) {
      console.error("PDF Error:", err);
      alert("Error generating PDF export.");
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [data, isGeneratingPDF]);

  // Touch gesture handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (showOverview || isGeneratingPDF) return;
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  }, [showOverview, isGeneratingPDF]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (showOverview || isGeneratingPDF) return;
    setTouchEndX(e.targetTouches[0].clientX);
  }, [showOverview, isGeneratingPDF]);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX || !touchEndX || showOverview || isGeneratingPDF) return;

    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50; // Minimum swipe distance
    const isRightSwipe = distance < -50; // Minimum swipe distance

    if (isLeftSwipe) {
      navigateForward();
    } else if (isRightSwipe) {
      navigateBackward();
    }

    // Reset touch states
    setTouchStartX(null);
    setTouchEndX(null);
  }, [touchStartX, touchEndX, showOverview, isGeneratingPDF, navigateForward, navigateBackward]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((showOverview || isGeneratingPDF) && e.key !== 'Escape') return;
      switch (e.key) {
        case 'ArrowRight': case 'ArrowDown': case ' ': e.preventDefault(); navigateForward(); break;
        case 'ArrowLeft': case 'ArrowUp': e.preventDefault(); navigateBackward(); break;
        case 'Escape': setShowOverview(prev => !prev); break;
        case 'f': case 'F': toggleFullscreen(); break;
        case 'n': case 'N': setShowNotes(prev => !prev); break;
        case 'p': case 'P': generatePDF(); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigateForward, navigateBackward, showOverview, toggleFullscreen, generatePDF, isGeneratingPDF]);


  const [scale, setScale] = useState(1);

  // Resolution Scaler Logic
  useEffect(() => {
    const handleResize = () => {
      const targetWidth = 1920;
      const targetHeight = 1080;

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const scaleX = windowWidth / targetWidth;
      const scaleY = windowHeight / targetHeight;

      // Use the smaller scale to ensure it fits entirely
      const newScale = Math.min(scaleX, scaleY);
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Init

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!data) return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-brand-dark text-brand-primary font-sans">
      <div className="text-4xl font-display font-medium animate-pulse tracking-tight mb-4">Iniciando BioLife Experience...</div>
      <div className="w-48 h-1 bg-brand-primary/20 rounded-full overflow-hidden">
        <motion.div className="h-full bg-brand-primary" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, repeat: Infinity }} />
      </div>
      {error && <div className="mt-4 text-brand-secondary font-mono text-xs">{error}</div>}
    </div>
  );

  const currentSlide = data.slides[currentSlideIndex];

  return (
    <div
      ref={containerRef}
      className="w-full h-screen bg-black flex items-center justify-center overflow-hidden relative outline-none select-none font-sans"
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >

      {/* SCALER CONTAINER */}
      <div
        style={{
          width: '1920px',
          height: '1080px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#0a1210' // brand-dark
        }}
        className="shadow-2xl"
      >

        <AnimatePresence>
          {isGeneratingPDF && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl text-center"
            >
              <div className="relative mb-8">
                <Loader2 className="w-24 h-24 text-blue-500 animate-spin" />
                <Printer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/30" size={30} />
              </div>
              <h2 className="text-4xl font-display font-medium tracking-tight uppercase">Exporting Strategic Nodes</h2>
              <p className="text-brand-primary font-mono text-xs mt-4 animate-pulse">RENDERING ASSETS AND DATA LAYERS...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={pdfContainerRef} style={{ position: 'fixed', top: 0, left: -20000, width: '1920px', zIndex: -100 }}>
          {data.slides.map((slide, idx) => (
            <div key={`pdf-${slide.id}`} id={`pdf-${slide.id}`} style={{ width: '1920px', height: '1080px', background: '#050810', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="scale-[1.25] w-full">
                <SlideRenderer slide={slide} buildIndex={100} staticMode={true} />
              </div>
              <div className="absolute bottom-10 left-10 text-brand-primary/40 text-3xl font-display font-bold">BIO•LIFE</div>
              <div className="absolute bottom-10 right-10 text-white/40 font-mono text-xl">{idx + 1} / {data.slides.length}</div>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none opacity-40" data-html2canvas-ignore="true">
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={40} />
            <Scene3D slideIndex={currentSlideIndex} slideCount={data.slides.length} />
          </Canvas>
        </div>

        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#050810_130%)] pointer-events-none" />

        <main className="relative z-20 h-full w-full flex items-center justify-center px-6 md:px-20">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlideIndex}
              custom={direction}
              initial={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full flex items-center justify-center"
            >
              <SlideRenderer slide={currentSlide} buildIndex={currentBuildIndex} />
            </motion.div>
          </AnimatePresence>
        </main>

        <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50">
          <motion.div
            className="h-full bg-brand-primary shadow-[0_0_20px_rgba(45,212,191,0.5)]"
            animate={{ width: `${((currentSlideIndex + 1) / data.slides.length) * 100}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>{/* Scaler End */}
      </div>



      {/* Mobile navigation buttons - always visible and larger */}
      <div className="md:hidden absolute top-1/2 left-4 right-4 z-50 flex justify-between items-center pointer-events-none">
        <button
          onClick={navigateBackward}
          className="pointer-events-auto p-4 glass rounded-full hover:bg-white/10 active:scale-90 transition-all shadow-2xl"
          aria-label="Diapositiva anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={navigateForward}
          className="pointer-events-auto p-4 glass rounded-full hover:bg-white/10 active:scale-90 transition-all shadow-2xl"
          aria-label="Diapositiva siguiente"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Desktop navigation panel */}
      <div className="hidden md:flex absolute bottom-8 right-8 z-50 group flex items-center justify-end">
        <div className="flex items-center gap-3 p-4 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">

          <div className="flex flex-col items-end mr-2">
            <span className="text-[9px] font-bold text-brand-primary tracking-[0.3em] uppercase">Evolución</span>
            <span className="text-2xl font-display font-bold leading-none">0{currentSlideIndex + 1}</span>
          </div>

          <button onClick={navigateBackward} className="p-3 glass rounded-xl hover:bg-white/10 active:scale-90 transition-all"><ChevronLeft size={20} /></button>
          <button onClick={navigateForward} className="p-3 glass rounded-xl hover:bg-white/10 active:scale-90 transition-all"><ChevronRight size={20} /></button>

          <div className="h-8 w-px bg-white/10 mx-1" />

          <button onClick={() => setShowOverview(true)} className="p-3 glass rounded-xl hover:bg-white/10 active:scale-90 transition-all" title="Ver todas las fases"><Grid size={18} /></button>
          <button onClick={() => setShowNotes(prev => !prev)} className={`p-3 glass rounded-xl hover:bg-white/10 transition-all ${showNotes ? 'text-blue-400 border-blue-500/50' : ''}`} title="Notas del orador"><StickyNote size={18} /></button>

          <button
            onClick={generatePDF}
            disabled={isGeneratingPDF}
            title="Exportar Presentación a PDF (P)"
            className={`p-3 glass rounded-xl transition-all active:scale-90 ${isGeneratingPDF ? 'cursor-not-allowed opacity-50' : 'hover:bg-white/10 hover:text-blue-400'}`}
          >
            {isGeneratingPDF ? <Loader2 size={18} className="animate-spin" /> : <Printer size={18} />}
          </button>

          <button onClick={toggleFullscreen} className="p-3 glass rounded-xl hover:bg-white/10 active:scale-90 transition-all" title="Pantalla Completa (F)">
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ x: 350, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 350, opacity: 0 }}
            className="absolute top-24 right-8 z-50 w-80 p-8 glass-strong rounded-[2.5rem] shadow-2xl border border-white/10"
          >
            <div className="flex items-center gap-2 mb-4 border-b border-brand-primary/20 pb-3">
              <StickyNote size={14} className="text-brand-primary" />
              <h3 className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Guía del Narrador</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed italic font-light">
              {currentSlide.speakerNotes || "Iniciando secuencia estratégica..."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOverview && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#050810]/98 backdrop-blur-3xl flex flex-col p-12 md:p-24 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-6xl font-display font-medium italic tracking-tight uppercase">BIO_SYSTEM<span className="text-brand-primary">.</span>MAP</h2>
              <button onClick={() => setShowOverview(false)} className="p-5 glass rounded-full hover:bg-brand-secondary/20 hover:text-brand-secondary transition-all"><X size={30} /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.slides.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentSlideIndex(idx); setCurrentBuildIndex(-1); setShowOverview(false); }}
                  className={`group relative text-left transition-all duration-500 rounded-[2.5rem] p-1 ${currentSlideIndex === idx ? 'ring-2 ring-blue-500 scale-105 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'opacity-40 hover:opacity-100 hover:scale-105'}`}
                >
                  <div className="aspect-video p-6 glass flex flex-col justify-end h-full w-full">
                    <span className="text-xs font-bold text-brand-primary uppercase mb-2">ETAPA 0{idx + 1}</span>
                    <h3 className="text-lg font-bold truncate text-white leading-none mb-1 font-display">{s.title}</h3>
                    <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest truncate">{s.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="absolute bottom-8 left-8 z-50 opacity-20 hover:opacity-100 transition-opacity">
        <div className="text-4xl font-display font-medium tracking-tight uppercase">BIO<span className="text-brand-primary">.</span>LIFE</div>
      </footer>
    </div>
  );
};

export default App;
