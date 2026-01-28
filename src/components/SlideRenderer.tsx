import React from 'react';
import { motion, Variants } from 'framer-motion';
import * as Icons from 'lucide-react';
import {
  SiReact, SiNextdotjs, SiFlutter, SiHtml5, SiCss3, SiJavascript,
  SiNodedotjs, SiExpress, SiAwslambda, SiApachekafka, SiDocker,
  SiKubernetes, SiPostgresql, SiMongodb, SiRedis, SiAmazons3,
  SiGithub, SiGithubactions, SiGrafana, SiPrometheus, SiElasticsearch, SiAuth0
} from 'react-icons/si';
import { Slide } from '../types';
import { InitialAnimation } from './InitialAnimation';


// Tech to icon mapping
const techIconMap: Record<string, React.ComponentType<any>> = {
  'React': SiReact,
  'React Native': SiReact,
  'Flutter': SiFlutter,
  'Next.js': SiNextdotjs,
  'HTML': SiHtml5,
  'CSS': SiCss3,
  'JavaScript': SiJavascript,
  'API Gateway': SiNodedotjs,
  'Backend principal': SiNodedotjs,
  'Contenedores y orquestación': SiDocker,
  'Comunicación y eventos': SiNodedotjs,
  'Funciones serverless': SiAwslambda,
  'Relacional': SiPostgresql,
  'NoSQL': SiMongodb,
  'Caché': SiRedis,
  'Blob Storage': SiAmazons3,
  'Control de versiones': SiGithub,
  'CI/CD': SiGithubactions,
  'Monitoreo': SiGrafana,
  'Logs': SiElasticsearch,
  'Autenticación/Security': SiAuth0
};

// Design Tokens 2026
const getTOKENS = (staticMode: boolean) => ({
  glass: staticMode ? "bg-white/10 border border-white/10 rounded-3xl shadow-lg" : "glass",
  glassStrong: staticMode ? "bg-white/10 border border-white/10 rounded-[2rem] shadow-xl" : "glass-strong",
  glassAccent: "bg-brand-primary/10 border border-brand-primary/20 backdrop-blur-xl rounded-[2rem]",
  glassGlow: staticMode ? "bg-brand-primary/5 border border-brand-primary/20 shadow-[0_0_40px_rgba(45,212,191,0.15)] rounded-[2.5rem]" : "bg-brand-primary/5 border border-brand-primary/20 backdrop-blur-2xl shadow-[0_0_40px_rgba(45,212,191,0.15)] rounded-[2.5rem]",
  glassHolo: staticMode ? "bg-brand-dark/40 border border-brand-primary/30 shadow-[0_0_50px_-10px_rgba(45,212,191,0.1)] rounded-[3rem]" : "bg-brand-dark/40 border border-brand-primary/30 backdrop-blur-xl shadow-[0_0_50px_-10px_rgba(45,212,191,0.1)] rounded-[3rem]",
  radiusMd: "rounded-[2rem]",
  shadow: "shadow-xl",
  textGradient: "bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary",
});

const IconMapper: React.FC<{ name?: string; size?: number; className?: string }> = ({ name, size = 24, className }) => {
  if (!name) return null;
  const LucideIcon = (Icons as any)[name];
  return LucideIcon ? <LucideIcon size={size} className={className} aria-hidden="true" /> : null;
};

interface SlideRendererProps {
  slide: Slide;
  buildIndex: number;
  staticMode?: boolean;
}

// Helper para Bento Data (Slides 2, 6, 36)
const BentoCard: React.FC<{ item: any; delay: number; isVisible: boolean; staticMode?: boolean; itemsCount?: number }> = ({ item, delay, isVisible, staticMode = false, itemsCount = 4 }) => {
  const TOKENS = getTOKENS(staticMode);

  const getSpan = (s?: string) => {
    // Special handling for Slide 9 (6 items: 3 big top, 3 small bottom)
    if (itemsCount === 6) {
      if (s === 'lg') return 'md:col-span-1 md:row-span-2'; // Big/Tall
      return 'md:col-span-1'; // Small/Standard
    }

    if (itemsCount === 3) return 'md:col-span-1';
    switch (s) {
      case 'xl': return 'md:col-span-3 lg:col-span-4';
      case 'lg': return 'md:col-span-2 md:row-span-2';
      case 'md': return 'md:col-span-2';
      default: return 'md:col-span-1';
    }
  };

  const getVariant = (v?: string) => {
    switch (v) {
      case 'accent': return TOKENS.glassAccent;
      case 'glassStrong': return TOKENS.glassStrong;
      case 'outline': return "border border-white/10 bg-transparent";
      default: return TOKENS.glass;
    }
  };

  const getEsgColors = (esgType?: string) => {
    switch (esgType) {
      case 'social': return { bg: 'bg-brand-primary/10', border: 'border-brand-primary/30', iconColor: 'text-brand-primary', glow: 'shadow-[0_0_30px_rgba(45,212,191,0.2)]' };
      case 'ambiental': return { bg: 'bg-brand-secondary/10', border: 'border-brand-secondary/30', iconColor: 'text-brand-secondary', glow: 'shadow-[0_0_30px_rgba(251,113,133,0.2)]' };
      case 'gobernanza': return { bg: 'bg-brand-accent/10', border: 'border-brand-accent/30', iconColor: 'text-brand-accent', glow: 'shadow-[0_0_30px_rgba(251,191,36,0.2)]' };
      default: return { bg: '', border: '', iconColor: 'text-brand-primary', glow: '' };
    }
  };

  const esgColors = getEsgColors(item.esgType);

  const value = item.value || item.v;
  const title = item.title || item.l;

  return (
    <motion.div
      initial={staticMode ? "animate" : "initial"}
      animate={isVisible ? "animate" : "initial"}
      variants={{
        initial: { opacity: 0.1, scale: 0.95, y: 30 },
        animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 20, delay } }
      }}
      className={`${getSpan(item.span || (item.size === 'lg' ? 'lg' : item.size === 'md' ? 'md' : 'sm'))} ${getVariant(item.variant)} ${TOKENS.radiusMd} ${TOKENS.shadow} p-8 md:p-8 flex flex-col justify-center group hover:border-brand-primary/50 transition-all relative overflow-hidden h-full min-h-[180px] ${esgColors.bg} ${esgColors.border} ${esgColors.glow}`}
    >
      <div className="flex justify-between items-start mb-4">
        {item.icon && (
          <div className={`p-3 rounded-2xl transition-all ${item.variant === 'accent' ? 'bg-brand-primary text-brand-dark' : `bg-white/5 ${esgColors.iconColor} group-hover:text-brand-primary group-hover:bg-brand-primary/20`}`}>
            <IconMapper name={item.icon} size={28} />
          </div>
        )}
        {item.trend && <span className="text-[10px] text-brand-primary bg-brand-primary/20 px-2 py-1 rounded-full">+{item.trend}%</span>}
      </div>
      <div className="relative z-10">
        {value && <div className={`${item.span === 'lg' ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'} font-bold mb-3 text-white tracking-tight font-display`}>{String(value)}</div>}
        <h3 className={`${item.span === 'lg' ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl'} font-bold text-white mb-2 leading-tight font-display`}>{String(title)}</h3>
        {item.description && <p className="text-sm text-gray-400 font-light leading-relaxed">{String(item.description)}</p>}
        {item.subtitle && <p className="text-xs text-brand-primary font-bold uppercase tracking-widest mt-2">{String(item.subtitle)}</p>}
      </div>
    </motion.div>
  );
};

// Extracted component to safely use useMemo
const FallingImagesView: React.FC<{ slide: Slide; isVisible: (i: number) => boolean }> = ({ slide, isVisible }) => {
  const images = (slide as any).itemsImages || [];

  // Stable random positions - calculated only when images list changes
  const scatteredImages = React.useMemo(() => {
    return images.map((img: string) => ({
      img,
      // Full screen coverage but keeping away from absolute edges
      x: Math.random() * 60 + 5, // 5% to 65% width (more left-leaning and centered)
      y: Math.random() * 55 + 15, // 15% to 70% height (less touching edges)
      rotation: Math.random() * 40 - 20, // -20 to 20 deg rotation
      scale: 1.0 + Math.random() * 0.4, // 1.0 to 1.4 size variation (larger)
      zIndex: Math.floor(Math.random() * 20) + 100 // Layering (foreground > title z-50)
    }));
  }, [images]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Title Block with high z-index to stay on top */}
      <div className="mb-12 text-center z-50 bg-black/60 p-8 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl relative select-none">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-bold uppercase tracking-[0.5em] mb-4 text-sm text-blue-500 font-display"
        >
          {slide.subtitle}
        </motion.h2>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic font-display"
        >
          {slide.title}
        </motion.h1>
      </div>

      {/* Scattered Images Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {scatteredImages.map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: -1200, opacity: 0, scale: 0.8, rotate: item.rotation }}
            animate={isVisible(i) ? {
              y: 0, // Animate to 0 offset from top, meaning actual position is "top: item.y vh" 
              opacity: 1,
              scale: item.scale,
              rotate: item.rotation,
              transition: {
                type: "spring",
                damping: 25, // Higher damping for less bounce/jitter "thud" effect
                stiffness: 70,
                mass: 1.5, // Heavier feel
                delay: i * 0.15 // Cascade delay
              }
            } : { y: -1200, opacity: 0, scale: 0.8 }}
            style={{
              left: `${item.x}vw`,
              top: `${item.y}vh`,
              position: 'absolute',
              zIndex: item.zIndex,
              width: '450px', // Larger base width
              maxWidth: '35vw', // Responsive limit increased
            }}
            className="absolute shadow-2xl rounded-lg overflow-hidden border-4 border-white/90 transform origin-center"
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/titulares/${item.img}`}
              alt={`Titular ${i}`}
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.style.display = 'none';
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, buildIndex, staticMode = false }) => {
  const TOKENS = getTOKENS(staticMode);

  const containerVariants: Variants = {
    initial: { opacity: staticMode ? 1 : 0 },
    animate: { opacity: 1, transition: { staggerChildren: staticMode ? 0 : 0.1 } }
  };

  const itemVariants: Variants = {
    initial: { y: staticMode ? 0 : 30, opacity: staticMode ? 1 : 0 },
    animate: { y: 0, opacity: 1, transition: { type: "spring", damping: 20, duration: staticMode ? 0 : undefined } }
  };

  const isVisible = (index: number) => {
    if (staticMode) return true;
    if (!slide.builds) return true;
    return index <= buildIndex;
  };

  const slideType = (slide.type || 'HERO').toString().toUpperCase().trim();

  // --- RENDERER: INITIAL ANIMATION ---
  if (slideType === 'INITIAL_ANIMATION') {
    return <InitialAnimation />;
  }


  // --- RENDERER: ARCHITECTURE DIAGRAM ---
  if (slideType === 'ARCHITECTURE_DIAGRAM') {
    const layerColors = [
      'bg-gradient-to-r from-brand-primary/10 to-transparent border-l-4 border-brand-primary',
      'bg-gradient-to-r from-brand-secondary/10 to-transparent border-l-4 border-brand-secondary',
      'bg-gradient-to-r from-brand-accent/10 to-transparent border-l-4 border-brand-accent',
      'bg-gradient-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500',
      'bg-gradient-to-r from-brand-primary/5 to-transparent border-l-4 border-brand-primary'
    ];

    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col space-y-6 lg:space-y-8 p-4 lg:p-8 relative overflow-y-auto lg:overflow-visible justify-center">
        {/* Layers as horizontal full-width rows */}
        {slide.architectureLayers?.map((layer, layerIndex) => {
          const isLayerVisible = isVisible(layerIndex);
          if (!isLayerVisible && !staticMode) return null;

          return (
            <motion.div
              key={layerIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className={`w-full lg:h-40 flex flex-col lg:flex-row relative ${layerColors[layerIndex % layerColors.length]} rounded-2xl overflow-hidden py-4 lg:py-0`}
            >
              {/* Left area: Layer Title and Description */}
              <div className="flex-shrink-0 w-full lg:w-96 flex flex-col justify-center px-8 lg:pr-6 mb-4 lg:mb-0">
                <h2 className="text-xl md:text-3xl font-black uppercase text-white mb-2">{layer.name}</h2>
                <p className="text-sm lg:text-base text-gray-200 font-medium">{layer.role}</p>
              </div>

              {/* Visual separator (subtle gradient cut) */}
              <div
                className={`hidden lg:block w-px h-full ${staticMode ? 'bg-white/20' : 'bg-gradient-to-b from-transparent via-white/20 to-transparent'}`}
              /> {/* Right area: Technology Boxes in a horizontal row */}
              <div className="flex-1 flex flex-wrap lg:flex-nowrap items-center justify-start gap-4 lg:gap-6 lg:space-x-6 px-8 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
                {layer.technologies?.map((tech, techIndex) => {
                  const IconComponent = techIconMap[tech.split(':')[0].trim()] || techIconMap[tech.split('(')[0].trim()] || Icons.Code;
                  const isUILayer = layerIndex === 0; // UI layer doesn't have sequential arrows
                  return (
                    <div key={techIndex} className="flex items-center">
                      <motion.div
                        initial={{ opacity: staticMode ? 1 : 0, scale: staticMode ? 1 : 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: staticMode ? 0 : layerIndex * 0.1 + techIndex * 0.05 }}
                        className={`${TOKENS.glassStrong} flex flex-col items-center justify-center p-4 rounded-xl w-32 h-24 lg:w-40 lg:h-28 text-center hover:scale-105 transition-all group shadow-lg border border-white/10`}
                      >
                        <IconComponent size={24} className="lg:size-8 text-brand-primary mb-2 group-hover:text-white" />
                        <span className="text-[10px] lg:text-xs font-bold text-gray-200 group-hover:text-white leading-tight font-display">{tech}</span>
                      </motion.div>

                      {/* Horizontal arrow between techs (except last, and not in UI layer) */}
                      {!isUILayer && techIndex < layer.technologies.length - 1 && (
                        <motion.div
                          initial={{ opacity: staticMode ? 1 : 0, scaleX: staticMode ? 1 : 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ delay: staticMode ? 0 : layerIndex * 0.1 + techIndex * 0.05 + 0.1 }}
                          className="mx-1 lg:mx-3 hidden lg:block"
                        >
                          <Icons.ArrowRight size={20} className="text-white/40" />
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Vertical arrow to next layer (left side, except last) */}
              {layerIndex < (slide.architectureLayers?.length || 0) - 1 && (
                <motion.div
                  initial={{ opacity: staticMode ? 1 : 0, scale: staticMode ? 1 : 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: staticMode ? 0 : layerIndex * 0.2 + 0.8 }}
                  className="absolute lg:-bottom-10 left-10 lg:z-30 bottom-0 lg:relative hidden lg:block"
                >
                  <Icons.ArrowDown size={36} className="text-brand-primary" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  // --- RENDERER: EXECUTIVE SUMMARY (THE HOLOGRAPHIC DASHBOARD) ---
  if (slideType === 'EXECUTIVE_SUMMARY') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex items-center justify-center p-4 lg:p-12 max-w-[1600px] mx-auto overflow-y-auto lg:overflow-visible">

        {/* Contenedor Asimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full h-full lg:h-[80vh]">

          {/* Columna Izquierda: Brand & Core Vision (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full relative gap-8 lg:gap-0">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3 mb-4 lg:mb-8">
                <div className="w-2 h-8 lg:h-12 bg-brand-primary shadow-[0_0_20px_rgba(45,212,191,0.5)]" />
                <h1 className="text-4xl lg:text-6xl font-display font-medium text-white leading-none tracking-tight">Bio<span className="text-brand-primary">.</span><br className="hidden lg:block" />Life</h1>
              </div>
              <h2 className="text-base lg:text-xl text-brand-primary font-display tracking-widest uppercase border-b border-brand-primary/30 pb-4 inline-block">
                {slide.subtitle}
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className={`${TOKENS.glassHolo} p-6 lg:p-8 border-l-4 border-brand-primary relative overflow-hidden group`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50 animate-pulse" />
              <IconMapper name="Cpu" size={32} className="lg:size-12 text-brand-primary mb-4" />
              <p className="text-lg lg:text-2xl font-light text-white leading-tight font-display">
                "Nutrición personalizada, predictiva y accionable."
              </p>
              <p className="mt-4 text-[10px] lg:text-xs text-brand-primary font-mono">SYSTEM_STATUS: READY_FOR_DEPLOYMENT</p>
            </motion.div>
          </div>

          {/* Columna Derecha: The Grid of Value (8 cols) */}
          <div className="lg:col-span-8 flex flex-col h-full gap-4">
            {/* Header Row */}
            <div className="flex justify-between items-end border-b border-white/10 pb-2 mb-4">
              <span className="text-xs font-mono text-gray-500">INITIATIVE_SUMMARY_Protocol_v2.0</span>
              <div className="flex gap-2">
                {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-cyan-500/30" />)}
              </div>
            </div>

            {/* The Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              {slide.bentoItems?.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                  className={`
                                    relative p-6 rounded-2xl border border-white/10 flex flex-col justify-center gap-2 group transition-all duration-300
                                    ${idx === 0 ? 'md:col-span-2 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-500/30' : 'bg-white/[0.02]'}
                                `}
                >
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconMapper name={item.icon} size={idx === 0 ? 32 : 24} className="text-brand-primary" />
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-brand-primary">0{idx + 1}</span>
                    <h3 className={`font-black uppercase tracking-tight ${idx === 0 ? 'text-2xl text-white' : 'text-lg text-gray-200 group-hover:text-brand-primary'}`}>
                      {item.title}
                    </h3>
                  </div>
                  <p className={`font-light leading-relaxed ${idx === 0 ? 'text-lg text-gray-300' : 'text-sm text-gray-400'}`}>
                    {item.description}
                  </p>

                  {idx === 0 && (
                    <div className="absolute bottom-4 right-4 text-cyan-500/20">
                      <Icons.Activity size={64} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // ... REST OF THE RENDERERS (TIMELINE, PYRAMID, ETC.) REMAIN UNCHANGED ...
  // [Se mantiene el código anterior de los otros renderizadores aquí para no romper nada]

  if (slideType === 'TIMELINE') {
    const timelineData = (slide as any).timeline || [];
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col justify-center items-center p-4 relative z-20 overflow-y-auto lg:overflow-visible pt-12 lg:pt-0">
        <div className="text-center mb-8 lg:mb-16 z-30">
          <motion.span variants={itemVariants} className="text-brand-primary font-bold tracking-[0.3em] lg:tracking-[0.5em] text-[10px] lg:text-xs uppercase mb-3 block">{slide.subtitle}</motion.span>
          <motion.h1 variants={itemVariants} className="text-3xl lg:text-7xl font-display font-medium tracking-tight uppercase text-white drop-shadow-2xl">{slide.title}</motion.h1>
        </div>
        <div className="w-full max-w-7xl relative min-h-[300px]">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -translate-y-1/2 w-full z-0 hidden lg:block" />
          <motion.div
            initial={{ scaleX: staticMode ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: staticMode ? 0 : 2, ease: "easeInOut" }}
            className={`absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-blue-900 via-blue-500 to-cyan-400 ${staticMode ? '' : 'shadow-[0_0_20px_rgba(59,130,246,0.8)]'} -translate-y-1/2 origin-left z-0 w-full hidden lg:block`}
          />
          <div className="flex flex-col lg:flex-row justify-between lg:items-center relative z-10 h-full w-full space-y-6 lg:space-y-0">
            {timelineData.map((item: any, i: number) => {
              const isHighlight = item.highlight === true;
              const isTop = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: staticMode ? 1 : 0, scale: staticMode ? 1 : 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: staticMode ? 0 : i * 0.3 }}
                  className="relative flex flex-row lg:flex-col items-center lg:justify-center group lg:w-32"
                >
                  {/* Mobile Dot Link Line */}
                  <div className="lg:hidden absolute left-4 top-10 bottom-0 w-0.5 bg-white/10 -z-10 group-last:hidden" />

                  {/* Mobile/Shared Dot */}
                  <div className={`w-8 h-8 lg:w-8 lg:h-8 rounded-full border-[3px] flex items-center justify-center z-20 shrink-0 relative shadow-xl transition-transform duration-300 lg:hover:scale-150 ${isHighlight ? 'bg-cyan-500 border-white scale-110 lg:scale-125' : 'bg-[#050810] border-blue-500'}`}>
                    {isHighlight && <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-50" />}
                  </div>

                  {/* Content Container (Mobile: Right, Desktop: Top/Bottom) */}
                  <div className="ml-4 lg:ml-0 flex-1 lg:flex-none">
                    <div className={`
                      lg:absolute lg:w-48 lg:text-center transition-all duration-500
                      ${isTop ? 'lg:bottom-10 lg:opacity-100 lg:translate-y-0' : 'lg:opacity-0 lg:translate-y-4'}
                      ${!isTop ? 'lg:top-10 lg:opacity-100 lg:translate-y-0' : 'lg:opacity-0 lg:-translate-y-4'}
                      ${isHighlight ? 'bg-blue-500/20 border-blue-400' : 'bg-white/5 border-white/10'} 
                      backdrop-blur-md p-3 lg:p-3 rounded-xl border
                    `}>
                      <span className={`text-xl lg:text-2xl font-black ${isHighlight ? 'text-cyan-400' : 'text-blue-500'} block`}>{item.year}</span>
                      <span className="text-[11px] lg:text-xs font-bold uppercase text-white leading-tight block mt-1">{item.event}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  }

  if (slideType === 'PYRAMID') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center relative">
        <div className="mb-8 text-center">
          <motion.h1 variants={itemVariants} className="text-6xl font-black italic uppercase text-white">{slide.title}</motion.h1>
          <motion.p variants={itemVariants} className="text-blue-400 font-bold tracking-widest mt-2">{slide.subtitle}</motion.p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl">
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-[400px]">
            <motion.div variants={itemVariants} className="w-[400px] h-[100px] bg-gradient-to-r from-blue-900 to-blue-800 absolute bottom-0 clip-trapezoid flex items-center justify-center rounded-lg border border-white/10 z-10">
              <span className="text-2xl font-black text-white/20 uppercase tracking-[1em] absolute inset-0 flex items-center justify-center">Adherencia</span>
            </motion.div>
            <motion.div variants={itemVariants} className="w-[300px] h-[100px] bg-gradient-to-r from-blue-700 to-blue-600 absolute bottom-[110px] flex items-center justify-center rounded-lg border border-white/10 z-20 shadow-2xl">
              <span className="text-2xl font-black text-white/30 uppercase tracking-[0.5em] absolute inset-0 flex items-center justify-center">Decisión</span>
            </motion.div>
            <motion.div variants={itemVariants} className="w-[200px] h-[100px] bg-gradient-to-r from-cyan-500 to-blue-400 absolute bottom-[220px] flex items-center justify-center rounded-lg border border-white/10 z-30 shadow-[0_0_50px_rgba(34,211,238,0.4)]">
              <IconMapper name="ShieldCheck" size={40} className="text-white" />
            </motion.div>
          </div>
          <div className="flex-1 space-y-8">
            {slide.bentoItems?.map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors">
                <div className={`p-4 rounded-full ${idx === 0 ? 'bg-cyan-500 text-black' : 'bg-blue-900/50 text-blue-400'}`}>
                  <IconMapper name={item.icon} size={24} />
                </div>
                <div>
                  <h3 className={`text-2xl font-black uppercase ${idx === 0 ? 'text-cyan-400' : 'text-white'}`}>{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  if (slideType === 'CIRCULAR') {
    const getEsgColors = (esgType?: string) => {
      switch (esgType) {
        case 'social': return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', iconColor: 'text-blue-400', glow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]' };
        case 'ambiental': return { bg: 'bg-green-500/10', border: 'border-green-500/30', iconColor: 'text-green-400', glow: 'shadow-[0_0_30px_rgba(34,197,94,0.3)]' };
        case 'gobernanza': return { bg: 'bg-purple-500/10', border: 'border-purple-500/30', iconColor: 'text-purple-400', glow: 'shadow-[0_0_30px_rgba(147,51,234,0.3)]' };
        default: return { bg: '', border: '', iconColor: 'text-blue-400', glow: '' };
      }
    };

    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center relative">
        <motion.h1 variants={itemVariants} className="text-5xl font-black italic uppercase text-center mb-12">{slide.title}</motion.h1>
        <div className="relative w-[600px] h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-10 border border-blue-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          {slide.bentoItems?.slice(0, 3).map((item, idx) => {
            const angle = (idx * 120) * (Math.PI / 180);
            const radius = 240;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const esgColors = getEsgColors(item.esgType);
            return (
              <motion.div
                key={idx}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.2 }}
                style={{ position: 'absolute', x, y }}
                className={`${TOKENS.glassStrong} w-48 h-48 rounded-full flex flex-col items-center justify-center text-center p-6 ${esgColors.bg} ${esgColors.border} ${esgColors.glow} z-20`}
              >
                <IconMapper name={item.icon} className={`mb-4 ${esgColors.iconColor}`} size={36} />
                <h3 className="font-bold text-lg uppercase text-white">{item.title}</h3>
                <p className="text-sm text-gray-300 mt-2 leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
          <div className="absolute z-10 text-center">
            <div className="w-48 h-80 bg-black border-4 border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-xl z-20" />
              <div className="flex-1 bg-gradient-to-b from-blue-900 to-black p-4 flex flex-col items-center justify-center">
                <Icons.Target className="text-cyan-400 mb-2 animate-pulse" size={40} />
                <span className="text-white font-bold text-lg">ESG Impact</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (slideType === 'FUNNEL' || slideType === 'MVP_MOCKUP') {
    if (slideType === 'MVP_MOCKUP') {
      return (
        <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex items-center justify-center gap-12 max-w-7xl mx-auto px-4">
          <div className="flex-1 flex justify-center items-center">
            {/* Mobile Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-64 h-[500px] bg-black border-4 border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-20" />
              <div className="flex-1 bg-gradient-to-b from-blue-900/40 to-black p-6 flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Icons.Target className="text-cyan-400 animate-pulse" size={32} />
                </div>
                <div className="w-full space-y-2">
                  <div className="h-2 w-3/4 bg-white/20 rounded" />
                  <div className="h-2 w-1/2 bg-white/10 rounded" />
                </div>
                <div className="grid grid-cols-2 gap-2 w-full mt-4">
                  {[1, 2, 3, 4].map(i => <div key={i} className="h-12 bg-white/5 rounded-lg border border-white/10" />)}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <motion.h1 variants={itemVariants} className="text-6xl font-black italic uppercase text-white mb-8">{slide.title}</motion.h1>
            {slide.items?.map((item: any, idx: number) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                animate={isVisible(idx) ? "animate" : "initial"}
                className={`${TOKENS.glass} p-6 rounded-2xl border-l-4 border-blue-500 flex items-center gap-4`}
              >
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                  <IconMapper name={item.icon} size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl uppercase text-white">
                    {item.t}
                  </h3>
                  {item.d && <p className="text-sm text-gray-400 mt-1">{item.d}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    }
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex items-center justify-center gap-12 max-w-7xl mx-auto px-4">
        <div className="flex-1 flex flex-col gap-6">
          <motion.h1 variants={itemVariants} className="text-6xl font-black italic uppercase text-white mb-8">{slide.title}</motion.h1>
          {slide.bentoItems?.filter(i => i.span === 'md').map((item, idx) => (
            <motion.div key={idx} variants={itemVariants} className={`${TOKENS.glass} p-6 rounded-2xl border-l-4 border-blue-500`}>
              <div className="flex items-center gap-3 mb-2">
                <IconMapper name={item.icon} className="text-blue-400" />
                <h3 className="font-bold text-xl uppercase">{item.title}</h3>
              </div>
              <p className="text-sm text-gray-300">{item.subtitle} | {item.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {['Adquisición', 'Activación', 'Retención', 'Suscripción'].map((step, idx) => {
            const width = 100 - (idx * 20);
            const opacity = 1 - (idx * 0.15);
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="h-24 mb-2 flex items-center justify-center rounded-2xl relative shadow-lg backdrop-blur-md border border-white/10"
                style={{
                  width: `${width}%`,
                  backgroundColor: `rgba(59, 130, 246, ${opacity * 0.3})`,
                }}
              >
                <span className="text-xl font-black uppercase tracking-widest text-white">{step}</span>
              </motion.div>
            )
          })}
          <Icons.ArrowDown className="text-blue-500 mt-4 animate-bounce" size={40} />
        </div>
      </motion.div>
    )
  }

  if (slideType === 'ROADMAP') {
    const isDiagonal = slide.subtitle === '5 AÑOS' || slide.id === 22;

    if (isDiagonal) {
      return (
        <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center px-4 relative">
          <motion.h1 variants={itemVariants} className="text-4xl lg:text-6xl font-black italic uppercase text-white mb-12 lg:mb-24 z-20">{slide.title}</motion.h1>

          <div className="relative w-full max-w-6xl h-[500px]">
            {/* Diagonal Path (Visual only, no horizontal line) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="none">
              <motion.path
                d="M 50 450 L 950 50"
                fill="none"
                stroke="rgba(45,212,191,0.1)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>

            <div className="absolute inset-0">
              {slide.items?.map((item: any, i: number) => {
                const total = slide.items.length;
                const progress = i / (total - 1);
                // Diagonal positioning: Bottom-Left to Top-Right
                const left = 5 + progress * 80; // 5% to 85%
                const top = 80 - progress * 70; // 80% to 10%

                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    animate={isVisible(i) ? "animate" : "initial"}
                    style={{
                      position: 'absolute',
                      left: `${left}%`,
                      top: `${top}%`,
                      zIndex: 20
                    }}
                    className="flex flex-col items-center group -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="w-6 h-6 lg:w-10 lg:h-10 bg-[#050810] border-4 border-cyan-400 rounded-full lg:mb-4 z-20 lg:group-hover:scale-125 transition-transform shadow-[0_0_20px_rgba(34,211,238,0.5)] flex-shrink-0 flex items-center justify-center">
                      <div className="w-2 h-2 lg:w-4 lg:h-4 bg-cyan-400 rounded-full animate-pulse" />
                    </div>

                    <div className={`${TOKENS.glassStrong} p-4 lg:p-6 rounded-2xl w-48 lg:w-72 text-center border-t-4 border-blue-500 relative transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]`}>
                      <div className="flex justify-center mb-2">
                        <IconMapper name={item.icon} size={24} className="lg:size-8 text-blue-400" />
                      </div>
                      <h3 className="text-base lg:text-xl font-black uppercase text-white mb-1 leading-tight">{item.t}</h3>
                      <p className="text-[10px] lg:text-xs text-gray-400 leading-tight">{item.d}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center px-4">
        <motion.h1 variants={itemVariants} className="text-6xl font-black italic uppercase text-white mb-20">{slide.title}</motion.h1>
        <div className="relative w-full max-w-6xl">
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-800 -translate-y-1/2 rounded-full" />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-blue-600 to-cyan-400 -translate-y-1/2 rounded-full"
          />
          <div className="flex flex-col lg:flex-row justify-between relative z-10 space-y-8 lg:space-y-0">
            {slide.items?.map((item: any, i: number) => {
              const isYearOne = i === 0 && slide.id === 20;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex flex-row lg:flex-col items-center gap-6 lg:gap-0 group"
                >
                  <div className={`w-8 h-8 lg:w-8 lg:h-8 bg-[#050810] border-4 border-cyan-400 rounded-full lg:mb-6 z-20 transition-all ${isYearOne ? 'scale-125 shadow-[0_0_30px_rgba(34,211,238,0.8)]' : 'lg:group-hover:scale-125 shadow-[0_0_20px_rgba(34,211,238,0.5)]'} flex-shrink-0`} />
                  <div className={`${isYearOne ? TOKENS.glassGlow + ' ring-2 ring-cyan-500/30' : TOKENS.glassStrong} p-6 rounded-2xl w-full lg:w-64 text-left lg:text-center border-t-4 border-blue-500 relative lg:group-hover:-translate-y-2 lg:transition-transform duration-300`}>
                    <div className="hidden lg:block absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-white/20" />
                    <div className="flex lg:justify-center mb-3">
                      <IconMapper name={item.icon} size={28} className={`lg:size-8 ${isYearOne ? 'text-cyan-400' : 'text-blue-400'}`} />
                    </div>
                    <h3 className={`text-lg lg:text-xl font-black uppercase mb-2 ${isYearOne ? 'text-cyan-400' : 'text-white'}`}>{item.t}</h3>
                    <p className={`text-sm ${isYearOne ? 'text-white font-medium' : 'text-gray-400'}`}>{item.d}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    )
  }

  if (slideType === 'CARDS_CHOICE') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center lg:justify-center px-4 py-12 lg:py-0 overflow-y-auto lg:overflow-visible">
        <div className="mb-12 text-center">
          <motion.h1 variants={itemVariants} className="text-4xl lg:text-6xl font-black italic uppercase text-white">{slide.title}</motion.h1>
          <motion.p variants={itemVariants} className="text-blue-500 font-mono mt-2 text-sm lg:text-base">{slide.subtitle}</motion.p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl lg:h-[50vh]">
          {slide.items?.map((item: any, i: number) => {
            // Updated highlight logic: Only highlight if builds exist and we are at buildIndex 0
            // Or if no builds exist (backwards compatibility), use old logic
            let isHighlight = false;
            let isDimmed = false;

            if (slide.builds && slide.builds.length > 0) {
              if (buildIndex >= 0 && i === 2) {
                isHighlight = true;
              } else if (buildIndex >= 0 && i !== 2) {
                isDimmed = true;
              }
            } else {
              // Legacy/Static mode
              const highlightIdx = (slide as any).highlightIndex !== undefined ? (slide as any).highlightIndex : (slide.id === 13 ? 2 : -1);
              isHighlight = highlightIdx === i;
              isDimmed = highlightIdx !== -1 && !isHighlight;
            }

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className={`flex-1 relative rounded-[2rem] overflow-hidden group transition-all duration-500
                                ${isHighlight ? 'flex-[1.5] scale-105 z-10 border-2 border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.3)]' : ''}
                                ${isDimmed ? 'opacity-30 blur-sm scale-95 grayscale' : 'hover:flex-[1.2]'}
                                ${TOKENS.glassStrong}
                            `}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${isHighlight ? 'from-cyan-900/50 to-blue-900/80' : 'from-gray-900/50 to-black/80'} opacity-80`} />
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center" style={{ backdropFilter: isDimmed ? 'blur(10px)' : 'none' }}>
                  <motion.div
                    className={`p-6 rounded-full mb-6 ${isHighlight ? 'bg-cyan-500 text-black' : 'bg-white/5 text-gray-400'}`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                  >
                    <IconMapper name={item.icon} size={isHighlight ? 48 : 32} />
                  </motion.div>
                  <h2 className={`text-2xl md:text-3xl font-black uppercase mb-4 leading-none ${isHighlight ? 'text-white' : 'text-gray-300'}`}>{item.t}</h2>
                  <p className={`text-sm ${isHighlight ? 'text-cyan-100 font-bold' : 'text-gray-500'}`}>{item.d}</p>
                  {isHighlight && (
                    <div className="mt-8 px-4 py-2 bg-cyan-400 text-black font-black uppercase tracking-widest text-xs rounded-full">
                      Opción Estratégica
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    )
  }

  if (slideType === 'SQUADS') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center px-4">
        <motion.h1 variants={itemVariants} className="text-7xl font-black italic uppercase text-white mb-2">{slide.title}</motion.h1>
        <motion.p variants={itemVariants} className="text-xl text-blue-500 mb-12 font-light tracking-[0.5em]">{slide.subtitle}</motion.p>
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl">
          {slide.bentoItems?.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`${TOKENS.glassStrong} w-64 h-64 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-6 border-2 border-white/5 hover:border-blue-500/50 relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <IconMapper name={item.icon} size={40} className="text-blue-400 mb-4 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-bold uppercase text-white leading-tight">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  if (slideType === 'ECONOMIC') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center px-4 max-w-7xl mx-auto">
        <motion.h1 variants={itemVariants} className="text-5xl font-black italic uppercase text-white mb-12">{slide.title}</motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
          <motion.div variants={itemVariants} className={`${TOKENS.glassGlow} p-8 rounded-3xl flex items-center gap-6`}>
            <div className="p-4 bg-green-500/20 rounded-full text-green-400"><IconMapper name="DollarSign" size={32} /></div>
            <div>
              <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-1">Fuentes de</h3>
              <p className="text-2xl font-black text-white">Suscripción + Cross-sell</p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className={`${TOKENS.glassStrong} p-8 rounded-3xl flex items-center gap-6 border-red-500/20`}>
            <div className="p-4 bg-red-500/20 rounded-full text-red-400"><IconMapper name="Ban" size={32} /></div>
            <div>
              <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-1">No Hacemos</h3>
              <p className="text-2xl font-black text-white">Venta de datos personales</p>
            </div>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {['Margen Saludable', 'LTV / CAC > 3', 'Churn < 5%'].map((metric, i) => (
            <motion.div key={i} variants={itemVariants} className={`${TOKENS.glass} p-6 rounded-2xl text-center border-t-2 border-blue-500/50`}>
              <p className="text-xl font-bold text-gray-200">{metric}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  if (slideType === 'QUADRANT') {
    // Special handling for roles complementarios slide
    if (slide.title === 'GOBERNANZA – Roles complementarios') {
      return (
        <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center px-4 max-w-7xl mx-auto">
          <motion.h1 variants={itemVariants} className="text-5xl font-black italic uppercase text-white mb-16">{slide.title}</motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
            {slide.bentoItems?.map((item, i) => {
              // Split description into bullet points
              const bullets = item.description.split('\n');
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={`${TOKENS.glassStrong} p-8 rounded-3xl border border-white/10`}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black text-blue-400 uppercase">{item.title}</h3>
                    <IconMapper name={item.icon} size={32} className="text-blue-400" />
                  </div>
                  <div className="space-y-6">
                    {bullets.map((bullet, bulletIdx) => (
                      <div key={bulletIdx} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                          <IconMapper name={item.icon} size={16} className="text-blue-400" />
                        </div>
                        <p className="text-lg text-white font-light leading-relaxed">{bullet}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      );
    }

    // Default QUADRANT renderer for other slides
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center px-4 max-w-6xl mx-auto">
        <motion.h1 variants={itemVariants} className="text-5xl font-black italic uppercase text-white mb-12">{slide.title}</motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-[60vh]">
          {slide.bentoItems?.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`p-8 rounded-3xl flex flex-col justify-start relative overflow-hidden group border border-white/5 hover:border-blue-500/30 transition-all ${item.variant === 'accent' ? 'bg-blue-900/20' : TOKENS.glassStrong}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-2xl font-black ${item.variant === 'outline' ? 'text-red-400' : 'text-blue-400'}`}>{item.title}</h3>
                <IconMapper name={item.icon} size={24} className="opacity-50" />
              </div>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">{item.description}</p>
              <div className={`absolute bottom-0 right-0 p-20 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity ${item.variant === 'outline' ? 'bg-red-600' : 'bg-blue-600'}`} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  if (slideType === 'FALLING_IMAGES') {
    return <FallingImagesView slide={slide} isVisible={isVisible} />;
  }

  if (slideType === 'BENTO_DATA' || slideType === 'BENTO_GRID') {
    const items = slide.stats || slide.bentoItems || [];
    // Force 3 columns for slide 9 or if items is 6, otherwise default logic
    const isThreeCol = items.length === 3 || items.length === 6 || slide.id === 8;

    const gridClass = isThreeCol
      ? `grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl ${items.length === 6 ? 'md:grid-rows-3 h-[70vh]' : ''}`
      : "grid grid-cols-1 md:grid-cols-4 gap-4 w-full";

    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full max-w-[1800px] px-4 flex flex-col h-full items-center lg:justify-center mx-auto py-8 lg:py-0 overflow-y-auto lg:overflow-visible">
        <div className="mb-4 lg:mb-8 text-center w-full">
          <motion.span variants={itemVariants} className="text-blue-500 font-bold tracking-[0.3em] lg:tracking-[0.4em] text-[10px] lg:text-xs uppercase mb-2 block">{slide.subtitle}</motion.span>
          <motion.h1 variants={itemVariants} className="text-2xl lg:text-6xl font-black tracking-tighter uppercase italic leading-none mb-4 lg:mb-8">{slide.title}</motion.h1>
        </div>
        <div className={`${gridClass} h-fit pb-10`}>
          {items.map((item: any, i: number) => (
            <BentoCard key={i} item={item} delay={i * 0.1} isVisible={isVisible(i)} staticMode={staticMode} itemsCount={items.length} />
          ))}
        </div>
      </motion.div>
    );
  }

  if (slideType === 'BENTO_MARKET') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full max-w-7xl px-4 flex flex-col justify-center h-full mx-auto">
        <div className="mb-12 text-center">
          <motion.span variants={itemVariants} className="text-blue-500 font-bold tracking-widest text-xs uppercase">{slide.subtitle}</motion.span>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic">{slide.title}</motion.h1>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-${(slide.tableData || []).length} gap-6 w-full`}>
          {slide.tableData?.map((col, i) => (
            <motion.div key={i} variants={itemVariants} animate={isVisible(i) ? "animate" : "initial"} className={`${TOKENS.glassStrong} ${TOKENS.radiusMd} p-8 flex flex-col gap-6 relative overflow-hidden`}>
              {i === 2 && <div className="absolute inset-0 bg-blue-600/10 pointer-events-none" />}
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <IconMapper name={col.icon} size={28} className={i === 1 ? "text-blue-500" : (i === 2 ? "text-cyan-400" : "text-gray-400")} />
                <h3 className={`text-xl font-black uppercase ${i === 2 ? 'text-white' : 'text-gray-400'}`}>{col.h}</h3>
              </div>
              <ul className="space-y-4">
                {col.items.map((it, idx) => {
                  const icons = ["Activity", "Award", "Zap", "Lock", "Repeat"];
                  const iconName = icons[idx % icons.length];
                  return (
                    <li key={idx} className="flex items-center gap-3 text-sm md:text-base text-gray-300">
                      <IconMapper name={iconName} size={16} className={i === 2 ? "text-cyan-400" : "text-gray-600"} />
                      {String(it)}
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (slideType === 'ALERT' || slideType === 'STEPS') {
    const items = slide.cards || slide.items || [];
    const isGrid2x3 = items.length === 6 && slide.title === 'MODELO DE NEGOCIO';

    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full max-w-7xl px-4 flex flex-col justify-center h-full mx-auto">
        <div className="mb-12 text-center">
          <motion.h2 variants={itemVariants} className={`font-bold uppercase tracking-[0.5em] mb-4 text-sm ${slideType === 'ALERT' ? 'text-red-500' : 'text-blue-500'}`}>{slide.subtitle}</motion.h2>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">{slide.title}</motion.h1>
        </div>
        <div className={`grid gap-6 ${isGrid2x3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : (items.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4')}`}>
          {items.map((item: any, i: number) => {
            const isString = typeof item === 'string';
            return (
              <motion.div key={i} animate={isVisible(i) ? "animate" : "initial"} variants={itemVariants} className={`${TOKENS.glassStrong} rounded-[2rem] p-8 text-center border border-white/10 h-full flex flex-col justify-center items-center group hover:border-blue-500/30 transition-all`}>
                {isString ? (
                  <div className="text-2xl font-bold flex flex-col gap-4">
                    <span className="text-5xl font-black text-blue-500/20 group-hover:text-blue-500 transition-colors">0{i + 1}</span>
                    {item}
                  </div>
                ) : (
                  <>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${slideType === 'ALERT' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      <IconMapper name={item.icon} size={28} />
                    </div>
                    <h3 className="text-xl font-black mb-2 leading-tight">{item.t}</h3>
                    <p className="text-sm text-gray-400 font-light whitespace-pre-line">{item.d}</p>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  if (slideType === 'VIDEO') {
    const isPlaying = isVisible(0); // If buildIndex >= 0
    const videoUrl = (slide as any).videoUrl;

    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full bg-black flex items-center justify-center relative overflow-hidden">
        {!isPlaying ? (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} className="text-blue-500 font-mono text-sm tracking-widest animate-pulse">
              SISTEMA LISTO PARA REPRODUCCIÓN_
            </motion.div>
          </div>
        ) : (
          <motion.video
            key={videoUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          >
            <source src={`${import.meta.env.BASE_URL}assets/videos/${videoUrl}`} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        )}
      </motion.div>
    );
  }

  if (slideType === 'KINETIC_BRIDGE') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="flex flex-col items-center justify-center text-center px-4 max-w-7xl h-full w-full mx-auto relative">
        <motion.h1 variants={itemVariants} className="text-[12vw] font-black leading-none tracking-tighter uppercase italic text-white/5 absolute select-none pointer-events-none">{slide.title}</motion.h1>
        <div className="relative z-10 max-w-4xl">
          <motion.h2 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic mb-8 drop-shadow-2xl">{slide.title}</motion.h2>
          {slide.highlight && (
            <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border-l-4 border-blue-500">
              <p className="text-2xl md:text-4xl font-light italic leading-tight">"{slide.highlight}"</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }

  // --- RENDERER: VERTICAL_DIAGRAM (Governance Structure) ---
  if (slideType === 'VERTICAL_DIAGRAM') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center px-4 relative">
        <div className="text-center mb-12">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white mb-4">{slide.title}</motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-blue-400 font-bold tracking-widest uppercase">{slide.subtitle}</motion.p>
        </div>
        <div className="flex flex-col items-center space-y-8 max-w-4xl">
          {(slide as any).verticalBlocks?.map((block: any, idx: number) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`${TOKENS.glassStrong} p-8 rounded-2xl border border-white/10 w-full max-w-2xl text-center`}
            >
              <h3 className="text-2xl font-black text-white uppercase mb-4">{block.title}</h3>
              {block.items && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {block.items.map((item: string, itemIdx: number) => (
                    <div key={itemIdx} className="text-sm text-gray-300">{item}</div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          {slide.highlight && (
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-lg text-blue-400 font-bold italic">{slide.highlight}</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }

  // --- RENDERER: TRIANGLE_ESG ---
  if (slideType === 'TRIANGLE_ESG') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center px-4 relative">
        <div className="text-center mb-12">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white mb-4">{slide.title}</motion.h1>
        </div>
        <div className="relative w-[600px] h-[400px] flex items-center justify-center">
          {/* Triangle lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400">
            <polygon points="300,50 100,350 500,350" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="2" />
          </svg>
          {(slide as any).esgNodes?.map((node: any, idx: number) => {
            const positions = [
              { x: 300, y: 80 }, // Top
              { x: 150, y: 320 }, // Bottom left
              { x: 450, y: 320 }  // Bottom right
            ];
            const pos = positions[idx];
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`${TOKENS.glassStrong} absolute p-6 rounded-2xl border border-white/10 w-48 text-center`}
                style={{ left: pos.x - 96, top: pos.y - 60 }}
              >
                <IconMapper name={node.icon} size={32} className="text-blue-400 mb-4 mx-auto" />
                <h3 className="text-lg font-black text-white uppercase mb-2">{node.title}</h3>
                <p className="text-sm text-gray-300">{node.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // --- RENDERER: ECONOMIC_TABLE ---
  if (slideType === 'ECONOMIC_TABLE') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center lg:justify-center px-4 py-8 lg:py-0">
        <div className="text-center mb-8 lg:mb-12">
          <motion.h1 variants={itemVariants} className="text-3xl lg:text-6xl font-black tracking-tighter uppercase italic text-white mb-4">{slide.title}</motion.h1>
          {slide.highlight && (
            <motion.p variants={itemVariants} className="text-sm lg:text-lg text-blue-400 font-bold italic mb-4 lg:mb-8">{slide.highlight}</motion.p>
          )}
        </div>
        <div className={`${TOKENS.glassStrong} p-4 lg:p-8 rounded-2xl border border-white/10 w-full max-w-6xl overflow-x-auto`}>
          <table className="w-full text-white min-w-[800px] lg:min-w-0">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-2 lg:py-4 px-2 lg:px-4 font-black uppercase text-[10px] lg:text-base sticky left-0 bg-[#0a1210] lg:relative lg:bg-transparent"></th>
                <th className="text-left py-2 lg:py-4 px-2 lg:px-4 font-black uppercase text-[10px] lg:text-base">Año 1</th>
                <th className="text-left py-2 lg:py-4 px-2 lg:px-4 font-black uppercase text-[10px] lg:text-base">Año 2</th>
                <th className="text-left py-2 lg:py-4 px-2 lg:px-4 font-black uppercase text-[10px] lg:text-base">Año 3</th>
                <th className="text-left py-2 lg:py-4 px-2 lg:px-4 font-black uppercase text-[10px] lg:text-base">Año 4</th>
                <th className="text-left py-2 lg:py-4 px-2 lg:px-4 font-black uppercase text-[10px] lg:text-base">Año 5</th>
                <th className="text-left py-2 lg:py-4 px-2 lg:px-4 font-black uppercase text-[10px] lg:text-base">Año 6</th>
                <th className="text-left py-2 lg:py-4 px-2 lg:px-4 font-black uppercase text-[10px] lg:text-base">Año 7</th>
                <th className="text-left py-2 lg:py-4 px-2 lg:px-4 font-black uppercase text-[10px] lg:text-base">Año 8</th>
              </tr>
            </thead>
            <tbody>
              {(slide as any).economicData?.map((row: any, idx: number) => (
                <motion.tr key={idx} variants={itemVariants} className="border-b border-white/10">
                  <td className="py-2 lg:py-4 px-2 lg:px-4 font-bold whitespace-nowrap text-[10px] lg:text-sm sticky left-0 bg-[#0a1210] lg:relative lg:bg-transparent">{row.label}</td>
                  <td className="py-2 lg:py-4 px-2 lg:px-4 whitespace-nowrap text-[10px] lg:text-sm">{row["Año 1"] || '-'}</td>
                  <td className="py-2 lg:py-4 px-2 lg:px-4 whitespace-nowrap text-[10px] lg:text-sm">{row["Año 2"] || '-'}</td>
                  <td className="py-2 lg:py-4 px-2 lg:px-4 whitespace-nowrap text-[10px] lg:text-sm">{row["Año 3"] || '-'}</td>
                  <td className="py-2 lg:py-4 px-2 lg:px-4 whitespace-nowrap text-[10px] lg:text-sm">{row["Año 4"] || '-'}</td>
                  <td className="py-2 lg:py-4 px-2 lg:px-4 whitespace-nowrap text-[10px] lg:text-sm">{row["Año 5"] || '-'}</td>
                  <td className="py-2 lg:py-4 px-2 lg:px-4 whitespace-nowrap text-[10px] lg:text-sm">{row["Año 6"] || '-'}</td>
                  <td className="py-2 lg:py-4 px-2 lg:px-4 whitespace-nowrap text-[10px] lg:text-sm">{row["Año 7"] || '-'}</td>
                  <td className="py-2 lg:py-4 px-2 lg:px-4 whitespace-nowrap text-[10px] lg:text-sm font-bold text-brand-primary">{row["Año 8"] || '-'}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  }

  // --- RENDERER: ECONOMIC_SUMMARY ---
  if (slideType === 'ECONOMIC_SUMMARY') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center px-4">
        <div className="text-center mb-12">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white mb-4">{slide.title}</motion.h1>
          {slide.highlight && (
            <motion.p variants={itemVariants} className="text-lg text-blue-400 font-bold italic">{slide.highlight}</motion.p>
          )}
        </div>
        <div className={`${TOKENS.glassStrong} p-8 rounded-2xl border border-white/10 w-full max-w-7xl overflow-x-auto`}>
          <table className="w-full text-white min-w-[1200px] table-fixed">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-4 px-4 font-black uppercase"></th>
                <th className="text-left py-4 px-4 font-black uppercase">Año 1</th>
                <th className="text-left py-4 px-4 font-black uppercase">Año 2</th>
                <th className="text-left py-4 px-4 font-black uppercase">Año 3</th>
                <th className="text-left py-4 px-4 font-black uppercase">Año 4</th>
                <th className="text-left py-4 px-4 font-black uppercase">Año 5</th>
                <th className="text-left py-4 px-4 font-black uppercase">Año 6</th>
                <th className="text-left py-4 px-4 font-black uppercase">Año 7</th>
                <th className="text-left py-4 px-4 font-black uppercase">Año 8</th>
              </tr>
            </thead>
            <tbody>
              {(slide as any).economicSummary?.map((row: any, idx: number) => (
                <motion.tr key={idx} variants={itemVariants} className="border-b border-white/10">
                  <td className="py-4 px-4 font-bold">{row.metric}</td>
                  <td className="py-4 px-4">{row["Año 1"] || '-'}</td>
                  <td className="py-4 px-4">{row["Año 2"] || '-'}</td>
                  <td className="py-4 px-4">{row["Año 3"] || '-'}</td>
                  <td className="py-4 px-4">{row["Año 4"] || '-'}</td>
                  <td className="py-4 px-4">{row["Año 5"] || '-'}</td>
                  <td className="py-4 px-4">{row["Año 6"] || '-'}</td>
                  <td className="py-4 px-4">{row["Año 7"] || '-'}</td>
                  <td className="py-4 px-4 font-bold">{row["Año 8"] || '-'}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  }

  // --- RENDERER: CORPORATE_HIERARCHY ---
  if (slideType === 'CORPORATE_HIERARCHY') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center px-4 relative">
        <div className="text-center mb-4">
          <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-white mb-2">{slide.title}</motion.h1>
          {slide.subtitle && (
            <motion.p variants={itemVariants} className="text-sm text-blue-400 font-light italic leading-tight">{slide.subtitle}</motion.p>
          )}
        </div>

        <div className="flex flex-col items-center space-y-4 max-w-7xl">
          {/* Parent Level: Grupo Nestlé */}
          {(slide as any).corporateEntities?.filter((entity: any) => entity.level === 'parent').map((entity: any, idx: number) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`${TOKENS.glassStrong} p-4 rounded-xl border border-white/10 w-80 text-center shadow-lg`}
            >
              <IconMapper name={entity.icon} size={32} className="text-blue-400 mb-2 mx-auto" />
              <h3 className="text-lg font-black text-white uppercase">{entity.title}</h3>
            </motion.div>
          ))}

          {/* Vertical connecting line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-0.5 h-6 bg-gradient-to-b from-blue-500 to-cyan-400"
          />

          {/* Child Level: Nestlé Health Science */}
          {(slide as any).corporateEntities?.filter((entity: any) => entity.level === 'child').map((entity: any, idx: number) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`${TOKENS.glassStrong} p-4 rounded-xl border border-white/10 w-80 text-center shadow-lg`}
            >
              <IconMapper name={entity.icon} size={32} className="text-blue-400 mb-2 mx-auto" />
              <h3 className="text-lg font-black text-white uppercase">{entity.title}</h3>
            </motion.div>
          ))}

          {/* Vertical connecting line to siblings */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="w-0.5 h-4 bg-gradient-to-b from-cyan-400 to-blue-500"
          />

          {/* Sibling Level: Horizontal row of entities */}
          <div className="flex flex-wrap justify-center gap-4 max-w-7xl">
            {(slide as any).corporateEntities?.filter((entity: any) => entity.level === 'sibling').map((entity: any, idx: number) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`${TOKENS.glassStrong} p-3 rounded-xl border border-white/10 w-48 text-center shadow-md hover:shadow-lg transition-all`}
              >
                <IconMapper name={entity.icon} size={24} className="text-blue-400 mb-1 mx-auto" />
                <h4 className="text-sm font-black text-white uppercase mb-1">{entity.title}</h4>
                {entity.subtitle && (
                  <p className="text-xs text-gray-300 leading-tight">{entity.subtitle}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // --- RENDERER: COST_ANALYSIS ---
  if (slideType === 'COST_ANALYSIS') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col px-4 py-8 relative">
        {/* Upper Half: Title + Main Content */}
        <div className="h-1/2 flex flex-col">
          {/* Title and Subtitle */}
          <div className="text-center mb-1">
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white mb-1">{slide.title}</motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl font-bold text-blue-400 uppercase tracking-widest">{slide.subtitle}</motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {/* Left Block: Cost Table */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className={`${TOKENS.glassStrong} bg-blue-900/30 border-blue-500/30 p-4 rounded-2xl`}>
                <h3 className="text-lg font-black text-white uppercase mb-3 text-center">Costes por Usuario</h3>
                <div className="space-y-2">
                  {slide.costTable?.map((item, idx) => (
                    <div key={idx} className={`flex justify-between items-center py-1.5 px-2 rounded ${item.isTotal ? 'bg-blue-500/20 border border-blue-400/50 font-bold' : 'bg-white/5'}`}>
                      <span className="text-white font-medium text-sm">{item.concept}</span>
                      <span className={`font-bold text-sm ${item.isTotal ? 'text-blue-400' : 'text-white'}`}>{item.year0}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Block: Year Evolution */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <h3 className="text-lg font-black text-white uppercase mb-3 text-center">Evolución de Costes Totales</h3>
              <div className="grid grid-cols-8 gap-1">
                {slide.yearEvolution?.map((year, idx) => (
                  <div key={idx} className="text-center">
                    <div className="bg-blue-500/20 border border-blue-400/30 rounded p-2 mb-1">
                      <span className="text-blue-400 font-black text-xs uppercase">{year.year}</span>
                    </div>
                    <div className="text-white font-bold text-xs">{year.value}</div>
                  </div>
                ))}
              </div>
              {/* Visual connector from Year 0 */}
              <div className="flex justify-start mt-2">
                <div className="flex items-center">
                  <div className="w-3 h-0.5 bg-blue-400"></div>
                  <Icons.ArrowRight className="text-blue-400 mx-1" size={12} />
                  <span className="text-blue-400 text-xs font-medium">Continuidad Temporal</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Lower Half: Metric Boxes */}
        <div className="h-1/2 flex items-center">
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto w-full">
            {slide.metricBoxes?.map((box, idx) => (
              <div key={idx} className={`${TOKENS.glass} bg-gray-900/40 border border-gray-600/50 p-4 rounded-2xl`}>
                <h4 className="text-base font-black text-white uppercase mb-3">{box.title}</h4>
                <div className="space-y-1">
                  {box.content.map((line, lineIdx) => {
                    const highlighted = box.highlightValues?.some(val => line.includes(val));
                    return (
                      <p key={lineIdx} className={`text-sm leading-relaxed ${highlighted ? 'text-blue-400 font-bold' : 'text-gray-300'}`}>
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // --- RENDERER: CAPEX_OPEX_TABLES ---
  if (slideType === 'CAPEX_OPEX_TABLES') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white mb-4">{slide.title}</motion.h1>
        </div>

        {/* Tables Container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Table: CAPEX */}
          <motion.div variants={itemVariants} className={`${TOKENS.glassStrong} p-6 rounded-2xl lg:col-span-1`}>
            <h3 className="text-xl font-black text-white uppercase mb-6 text-center border-b border-white/20 pb-4">CAPEX</h3>
            <div className="space-y-3">
              {slide.capexData?.map((item, idx) => (
                <div key={idx} className={`flex justify-between items-center py-3 px-4 rounded-lg ${item.isTotal ? 'bg-blue-500/20 border border-blue-400/50 font-bold text-lg' : 'bg-white/5 hover:bg-white/10 transition-colors'}`}>
                  <span className="text-white font-medium text-sm flex-1">{item.concept}</span>
                  <span className={`font-bold text-sm ${item.isTotal ? 'text-blue-400 text-lg' : 'text-white'}`}>{item.cost}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Table: OPEX */}
          <motion.div variants={itemVariants} className={`${TOKENS.glassStrong} p-6 rounded-2xl lg:col-span-2`}>
            <h3 className="text-xl font-black text-white uppercase mb-6 text-center border-b border-white/20 pb-4">OPEX</h3>
            <div className="space-y-2">
              {/* Header Row */}
              <div className="grid grid-cols-9 gap-1 text-xs font-bold text-blue-400 uppercase mb-3 border-b border-white/10 pb-2">
                <span className="col-span-2">Partida</span>
                <span>Año 1</span>
                <span>Año 2</span>
                <span>Año 3</span>
                <span>Año 4</span>
                <span>Año 5</span>
                <span>Año 6</span>
                <span>Año 7</span>
                <span>Año 8</span>
              </div>
              {/* Data Rows */}
              {slide.opexData?.map((item, idx) => (
                <div key={idx} className={`grid grid-cols-9 gap-1 py-2 px-2 rounded ${item.isTotal ? 'bg-green-500/20 border border-green-400/50 font-bold' : 'hover:bg-white/5 transition-colors'}`}>
                  <span className="text-white font-medium text-xs col-span-2 leading-tight">{item.partida}</span>
                  <span className={`text-xs font-bold ${item.isTotal ? 'text-green-400' : 'text-gray-300'}`}>{item.year1}</span>
                  <span className={`text-xs font-bold ${item.isTotal ? 'text-green-400' : 'text-gray-300'}`}>{item.year2}</span>
                  <span className={`text-xs font-bold ${item.isTotal ? 'text-green-400' : 'text-gray-300'}`}>{item.year3}</span>
                  <span className={`text-xs font-bold ${item.isTotal ? 'text-green-400' : 'text-gray-300'}`}>{item.year4}</span>
                  <span className={`text-xs font-bold ${item.isTotal ? 'text-green-400' : 'text-gray-300'}`}>{item.year5}</span>
                  <span className={`text-xs font-bold ${item.isTotal ? 'text-green-400' : 'text-gray-300'}`}>{item.year6}</span>
                  <span className={`text-xs font-bold ${item.isTotal ? 'text-green-400' : 'text-gray-300'}`}>{item.year7}</span>
                  <span className={`text-xs font-bold ${item.isTotal ? 'text-green-400' : 'text-gray-300'}`}>{item.year8}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // --- RENDERER: COMPARISON_GRID (Keynote Style) ---
  if (slideType === 'COMPARISON_GRID') {
    const data = (slide as any).comparisonData;
    if (!data) return null;

    const getColumnStyle = (variant: string) => {
      switch (variant) {
        case 'well-life': return 'bg-[#1a1c25] text-white/60';
        case 'trust': return 'bg-[#10141d] text-white/70';
        case 'biolife': return 'bg-[#1a3a3a] text-white font-bold ring-1 ring-cyan-500/30';
        default: return 'bg-[#111]';
      }
    };

    return (
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="w-full h-screen flex flex-col items-center justify-center p-0 overflow-hidden"
      >
        <div className="w-full max-w-7xl px-8 mb-8 text-center flex flex-col items-center">
          <motion.h1
            variants={itemVariants}
            className="text-5xl lg:text-7xl font-black italic uppercase text-white tracking-tighter mb-2"
          >
            {slide.title}
          </motion.h1>
          <motion.div variants={itemVariants} className="h-1 w-24 bg-cyan-500 rounded-full mb-4" />
        </div>

        <div className="flex w-full h-[75vh] max-w-[1700px] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* COLUMN 1: CRITERIOS */}
          <motion.div
            variants={itemVariants}
            className="flex-[1.5] flex flex-col bg-[#1a1a1a] border-r border-white/10"
          >
            <div className="h-16 flex items-center px-6 border-b border-white/10 bg-black/20">
              <span className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Criterio</span>
            </div>
            <div className="flex-1 flex flex-col">
              {data.criterios.map((c: string, idx: number) => (
                <div key={idx} className="flex-1 flex items-center px-6 border-b border-white/5 last:border-0">
                  <span className="text-white text-base lg:text-lg font-bold tracking-tight leading-tight uppercase">{c}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* COLUMNS 2, 3, 4: OPTIONS */}
          {data.columns.map((col: any, colIdx: number) => {
            const isBiolife = col.variant === 'biolife';
            const colVisible = isVisible(colIdx + 1);

            return (
              <motion.div
                key={colIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={colVisible ? {
                  opacity: 1,
                  x: 0,
                  scale: isBiolife ? [1, 1.02, 1] : 1,
                  transition: {
                    delay: 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    scale: { duration: 0.5, delay: 0.2 }
                  }
                } : { opacity: 0, x: 20 }}
                className={`flex-1 flex flex-col ${getColumnStyle(col.variant)} transition-all duration-700 ${isBiolife ? 'z-10 relative' : ''}`}
              >
                <div className={`h-16 flex items-center justify-center px-4 border-b ${isBiolife ? 'border-cyan-500/30 bg-cyan-500/10' : 'border-white/10 bg-black/10'}`}>
                  <span className={`text-center font-black uppercase tracking-tighter ${isBiolife ? 'text-xl lg:text-2xl text-cyan-400' : 'text-sm lg:text-base text-white/90'}`}>{col.title}</span>
                </div>
                <div className="flex-1 flex flex-col">
                  {col.values.map((val: string, valIdx: number) => (
                    <div key={valIdx} className={`flex-1 flex items-center justify-center border-b ${isBiolife ? 'border-cyan-500/10' : 'border-white/5'} last:border-0 px-2`}>
                      <span className={`uppercase tracking-[0.1em] text-center leading-none ${isBiolife ? 'text-lg lg:text-2xl font-black text-white' : 'text-sm lg:text-lg'}`}>
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
                {isBiolife && (
                  <div className="absolute inset-x-0 -bottom-3 flex justify-center">
                    <div className="px-4 py-1 bg-cyan-500 text-black font-black uppercase text-[9px] rounded-full shadow-lg shadow-cyan-500/40">
                      Recomendado
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // --- RENDERER: BUSINESS_MODEL (3-Column Value Chain) ---
  if (slideType === 'BUSINESS_MODEL') {
    const items = slide.items || [];

    // Grid weights: Left (1.5), Center (1), Right (1.2) -> Approximate with grid-cols-12
    // Left: col-span-5 (~41%)
    // Center: col-span-3 (~25%)
    // Right: col-span-4 (~33%)

    const columnVariants = {
      initial: { opacity: 0, y: 30 },
      animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.4,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }
      })
    };

    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center p-8 lg:p-16 relative overflow-hidden">
        <div className="text-center mb-12 lg:mb-16">
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-8xl font-black italic uppercase text-white tracking-tighter mb-4 leading-none font-display">
            {slide.title}
          </motion.h1>
          <motion.p variants={itemVariants} className="text-brand-primary font-bold uppercase tracking-[0.5em] text-sm lg:text-base">
            OBJETIVO: CADENA LÓGICA DE VALOR
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-[1800px] items-stretch">

          {/* COLUMN LEFT: CAPACIDADES (1.5x) */}
          <motion.div
            custom={0}
            variants={columnVariants}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px flex-1 bg-gradient-to-r from-brand-primary to-transparent opacity-30" />
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em]">Capacidades</span>
            </div>

            {/* 01 - Recursos Clave (FOCO VISUAL) */}
            <div className={`${TOKENS.glassGlow} p-8 border-brand-primary/40 relative group overflow-hidden`}>
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <IconMapper name={items[0]?.icon} size={40} className="text-brand-primary" />
              </div>
              <span className="text-5xl font-black text-brand-primary/20 mb-4 block">01</span>
              <h3 className="text-2xl font-black text-white uppercase mb-4 font-display">{items[0]?.t}</h3>
              <p className="text-lg text-gray-300 font-light leading-relaxed whitespace-pre-line">
                {items[0]?.d}
              </p>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-primary/10 blur-[50px] rounded-full" />
            </div>

            {/* 02 - Actividades Clave */}
            <div className={`${TOKENS.glassStrong} p-8 border-white/5 hover:border-brand-primary/30 transition-all`}>
              <span className="text-4xl font-black text-white/10 mb-4 block">02</span>
              <h3 className="text-xl font-black text-white uppercase mb-4 font-display">{items[1]?.t}</h3>
              <p className="text-base text-gray-400 font-light leading-relaxed whitespace-pre-line">
                {items[1]?.d}
              </p>
            </div>
          </motion.div>

          {/* COLUMN CENTER: VALOR (1x) */}
          <motion.div
            custom={1}
            variants={columnVariants}
            className="lg:col-span-3 flex flex-col items-center justify-center relative"
          >
            {/* Connecting arrows/lines (Visual only for desktop) */}
            <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 text-brand-primary/40">
              <Icons.ChevronRight size={40} />
            </div>
            <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-brand-primary/40">
              <Icons.ChevronRight size={40} />
            </div>

            <div className="w-full h-full flex flex-col gap-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-px flex-1 bg-brand-primary/30" />
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em]">Valor</span>
                <div className="h-px flex-1 bg-brand-primary/30" />
              </div>

              {/* 03 - Propuesta de Valor */}
              <div className={`${TOKENS.glassAccent} p-10 flex flex-col items-center text-center justify-center border-brand-primary/50 shadow-[0_0_50px_rgba(45,212,191,0.15)] flex-1`}>
                <div className="p-5 bg-brand-primary/10 rounded-full text-brand-primary mb-8">
                  <IconMapper name={items[2]?.icon} size={48} />
                </div>
                <span className="text-4xl font-black text-brand-primary/20 mb-4 block">03</span>
                <h3 className="text-2xl font-black text-white uppercase mb-6 font-display">{items[2]?.t}</h3>
                <p className="text-lg text-white font-medium leading-relaxed italic">
                  “{items[2]?.d}”
                </p>
              </div>
            </div>
          </motion.div>

          {/* COLUMN RIGHT: MODELO ECONÓMICO (1.2x) */}
          <motion.div
            custom={2}
            variants={columnVariants}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em]">Modelo Económico</span>
              <div className="h-px flex-1 bg-gradient-to-l from-brand-primary to-transparent opacity-30" />
            </div>

            {/* 04 - Segmento de clientes */}
            <div className={`${TOKENS.glassStrong} p-6 border-white/5`}>
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black text-white/10">04</span>
                <div>
                  <h3 className="text-lg font-black text-white uppercase mb-2 font-display">{items[3]?.t}</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed whitespace-pre-line">
                    {items[3]?.d}
                  </p>
                </div>
              </div>
            </div>

            {/* 05 - Fuentes de Ingresos */}
            <div className={`${TOKENS.glassStrong} p-6 border-white/5 bg-brand-primary/5`}>
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black text-brand-primary/30">05</span>
                <div className="w-full">
                  <h3 className="text-lg font-black text-white uppercase mb-3 font-display">{items[4]?.t}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <div className="text-[10px] text-gray-500 uppercase mb-1">Mensual</div>
                      <div className="text-xl font-bold text-brand-primary">15€</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                      <div className="text-[10px] text-gray-500 uppercase mb-1">Anual</div>
                      <div className="text-xl font-bold text-brand-primary">180€</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 06 - Estructura de Costes */}
            <div className={`${TOKENS.glassStrong} p-6 border-white/5`}>
              <div className="flex items-start gap-4">
                <span className="text-2xl font-black text-white/10">06</span>
                <div>
                  <h3 className="text-lg font-black text-white uppercase mb-2 font-display">{items[5]?.t}</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {items[5]?.d.split('. ').map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-400 uppercase">
                        {tag.replace('.', '')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // --- RENDERER: OKRS_VIEW (North Pole Star + OKR Grid) ---
  if (slideType === 'OKRS_VIEW') {
    const items = slide.bentoItems || [];

    const blockVariants = {
      initial: { opacity: 0, y: 20 },
      animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.8 + (i * 0.1),
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }
      })
    };

    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center p-8 lg:p-16 relative overflow-hidden">
        {/* TOP LEVEL: NORTH POLE STAR */}
        <div className="w-full max-w-6xl mb-16 lg:mb-24 flex flex-col items-center">
          <div className="w-full flex items-center justify-start gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-yellow-400 blur-[20px] opacity-40 animate-pulse" />
              <Icons.Star className="text-yellow-400 fill-yellow-400 relative z-10" size={40} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2 className="text-2xl font-black text-white uppercase tracking-[0.3em]">NORTH POLE STAR</h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={`${TOKENS.glassStrong} w-full py-12 px-8 text-center border-brand-primary/30 shadow-[0_0_60px_rgba(45,212,191,0.1)] relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <p className="text-2xl lg:text-4xl font-light text-white leading-relaxed max-w-4xl mx-auto">
              Usuarios de pago activos que interactúan semanalmente con recomendaciones personalizadas
              <span className="block mt-4 text-brand-primary font-black text-4xl lg:text-6xl tracking-tight">
                ≈ 90.000 año
              </span>
            </p>
          </motion.div>
        </div>

        {/* BOTTOM LEVEL: OKRs GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          {items.map((item: any, i: number) => (
            <motion.div
              key={i}
              custom={i}
              variants={blockVariants}
              className={`${TOKENS.glassStrong} p-8 border-white/5 flex flex-col gap-4 hover:border-brand-primary/20 transition-all`}
            >
              <div>
                <h3 className="text-brand-primary font-black text-xs uppercase tracking-[0.3em] mb-1">{item.title}</h3>
                <p className="text-white font-bold text-lg leading-tight mb-4">{item.subtitle}</p>
              </div>
              <ul className="space-y-2">
                {item.description && item.description.split('\n').map((bullet: string, bIdx: number) => (
                  <li key={bIdx} className="flex items-start gap-3 text-sm text-gray-400 font-light">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary/40" />
                    {bullet.replace('- ', '')}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // --- RENDERER: MARKET ANALYSIS (KEYNOTE STYLE) ---
  if (slideType === 'MARKET_ANALYSIS') {
    const BrandLogo: React.FC<{ name: string }> = ({ name }) => {
      switch (name) {
        case 'Apple Health':
          return (
            <div className="flex items-center gap-2">
              <Icons.Heart className="text-white fill-white" size={24} />
              <span className="text-xl font-medium tracking-tight text-white">Health</span>
            </div>
          );
        case 'Garmin':
          return (
            <div className="flex items-center gap-1">
              <Icons.Triangle className="text-white fill-white rotate-180" size={18} />
              <span className="text-xl font-black tracking-tighter text-white">GARMIN</span>
            </div>
          );
        case 'Fitbit':
          return (
            <div className="flex items-center gap-2">
              <div className="grid grid-cols-3 gap-0.5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-white rounded-full opacity-80" />
                ))}
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">fitbit</span>
            </div>
          );
        case 'Oura':
          return (
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2.5 h-0.5 bg-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white italic">OURA</span>
            </div>
          );
        case 'Noom':
          return <span className="text-2xl font-black tracking-tighter text-white lowercase group-hover:text-brand-primary transition-colors">noom</span>;
        case 'Zoe':
          return <span className="text-2xl font-black tracking-widest text-white uppercase group-hover:text-brand-primary transition-colors">ZOE</span>;
        case 'InsideTracker':
          return (
            <div className="flex items-center">
              <span className="text-xl font-normal text-white">Inside</span>
              <span className="text-xl font-black text-white">Tracker</span>
            </div>
          );
        default:
          return <span className="text-xl font-bold text-white">{name}</span>;
      }
    };

    const logoNames = ['Apple Health', 'Garmin', 'Fitbit', 'Oura', 'Noom', 'Zoe', 'InsideTracker'];

    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-between p-8 lg:p-16 relative overflow-hidden">
        {/* Top Row: Logos */}
        <motion.div variants={itemVariants} className="w-full flex flex-col items-center gap-6">
          <span className="text-gray-500 uppercase tracking-[0.4em] text-[10px] font-black opacity-60">Ecosistema actual</span>
          <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-14 opacity-40 hover:opacity-100 transition-all duration-700 select-none">
            {logoNames.map((name, i) => (
              <div key={i} className="group cursor-default">
                <BrandLogo name={name} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Center: Title and Cards */}
        <div className="flex flex-col items-center gap-12 lg:gap-16 w-full max-w-7xl">
          <div className="text-center">
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-8xl font-black italic uppercase text-white tracking-tighter mb-4 leading-none font-display">
              {slide.title}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-brand-primary font-bold uppercase tracking-[0.5em] text-sm lg:text-base">
              {slide.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
            {slide.cards?.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isVisible(i) ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
                transition={{ type: "spring", damping: 15, mass: 1, stiffness: 100 }}
                className={`${TOKENS.glassStrong} p-8 flex flex-col items-center text-center gap-4 border-t-2 border-brand-primary/30 relative group overflow-hidden h-full`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-4 bg-brand-primary/10 rounded-2xl text-brand-primary mb-2 group-hover:scale-110 transition-transform">
                  <IconMapper name={card.icon} size={40} />
                </div>
                <h3 className="text-lg lg:text-xl font-black uppercase text-white leading-tight font-display">{card.t}</h3>
                <p className="text-xs lg:text-sm text-gray-400 font-medium leading-relaxed">{card.d}</p>
                <div className="mt-auto pt-4">
                  <div className="px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase rounded-full border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                    Sin resolver
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom: Insight */}
        <motion.div
          variants={itemVariants}
          className="w-full flex justify-center mt-8 lg:mt-0"
        >
          <div className={`${TOKENS.glassAccent} px-10 py-5 rounded-2xl border border-brand-primary/40 shadow-[0_0_50px_rgba(45,212,191,0.1)] backdrop-blur-3xl`}>
            <p className="text-xl lg:text-3xl font-light text-white italic tracking-tight font-display">
              “{slide.highlight}”
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.article variants={containerVariants} initial="initial" animate="animate" className="flex flex-col items-center text-center max-w-6xl mx-auto px-4 justify-center h-full relative z-10 overflow-y-auto lg:overflow-visible">
      <motion.div variants={itemVariants} className="mb-4 lg:mb-8 relative">
        {slideType === 'HERO_GLOW' ? (
          <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20 animate-pulse" />
        ) : null}
        <div className={`${TOKENS.glassStrong} p-4 lg:p-6 rounded-full text-blue-400 relative border border-blue-500/20`}>
          <Icons.Activity size={32} className={staticMode ? "" : "lg:size-12 animate-pulse"} />
        </div>
      </motion.div>

      <motion.h1 variants={itemVariants} className={`${slide.id === 11 ? 'text-4xl lg:text-[6rem] text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]' : 'text-4xl lg:text-[7rem] text-white'} font-black mb-6 tracking-tighter leading-[0.9] uppercase italic drop-shadow-2xl`}>
        {slide.title}
      </motion.h1>

      {slide.subtitle && (
        <motion.div variants={itemVariants} className={`${TOKENS.glassAccent} px-6 lg:px-8 py-2 lg:py-3 rounded-full`}>
          <p className="text-sm lg:text-xl font-bold text-blue-400 uppercase tracking-[0.2em] lg:tracking-[0.3em]">
            {slide.subtitle}
          </p>
        </motion.div>
      )}
      {slide.highlight && (
        <motion.p variants={itemVariants} className={`mt-6 lg:mt-8 max-w-2xl font-light text-base lg:text-lg ${slide.id === 11 ? 'text-lg lg:text-2xl text-white font-bold tracking-widest' : 'text-gray-400'}`}>{slide.highlight}</motion.p>
      )}
    </motion.article>
  );
};
