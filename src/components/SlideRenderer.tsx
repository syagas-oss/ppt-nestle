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
const TOKENS = {
  glass: "glass",
  glassStrong: "glass-strong",
  glassAccent: "bg-brand-primary/10 border border-brand-primary/20 backdrop-blur-xl rounded-[2rem]",
  glassGlow: "bg-brand-primary/5 border border-brand-primary/20 backdrop-blur-2xl shadow-[0_0_40px_rgba(45,212,191,0.15)] rounded-[2.5rem]",
  glassHolo: "bg-brand-dark/40 border border-brand-primary/30 backdrop-blur-xl shadow-[0_0_50px_-10px_rgba(45,212,191,0.1)] rounded-[3rem]",
  radiusMd: "rounded-[2rem]",
  shadow: "shadow-xl",
  textGradient: "bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary",
};

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
const BentoCard: React.FC<{ item: any; delay: number; isVisible: boolean; staticMode?: boolean; itemsCount?: number }> = ({ item, delay, isVisible, staticMode, itemsCount = 4 }) => {
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
        {value && <div className="text-4xl md:text-5xl font-bold mb-3 text-white tracking-tight font-display">{String(value)}</div>}
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight font-display">{String(title)}</h3>
        {item.description && <p className="text-sm text-gray-400 font-light leading-relaxed">{String(item.description)}</p>}
        {item.subtitle && <p className="text-xs text-brand-primary font-bold uppercase tracking-widest mt-2">{String(item.subtitle)}</p>}
      </div>
    </motion.div>
  );
};

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, buildIndex, staticMode = false }) => {
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
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col space-y-4 p-4 relative">
        {/* Cross-cutting security concern */}
        <motion.div
          initial={{ opacity: staticMode ? 1 : 0, scaleY: staticMode ? 1 : 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: staticMode ? 0 : 2, duration: staticMode ? 0 : 1 }}
          className="absolute left-[35%] top-6 bottom-6 w-px border-l border-dotted border-gray-400/40 z-10"
        />
        <motion.div
          initial={{ opacity: staticMode ? 1 : 0, y: staticMode ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: staticMode ? 0 : 2.3 }}
          className="absolute left-[35%] top-4 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 bg-gray-600/20 border border-gray-400/30 rounded-full backdrop-blur-sm">
              <Icons.Shield size={16} className="text-gray-300" />
            </div>
            <div className="text-center">
              <div className="text-gray-300 text-[10px] font-bold uppercase tracking-wide leading-tight">
                Seguridad & Autenticación
              </div>
              <div className="text-gray-400 text-[9px] leading-tight">
                Auth0 / OAuth2 / JWT / IAM
              </div>
            </div>
          </div>
        </motion.div>

        {/* Layers as horizontal full-width rows */}
        {slide.architectureLayers?.map((layer, layerIndex) => (
          <motion.div
            key={layerIndex}
            variants={itemVariants}
            className={`w-full h-32 flex relative ${layerColors[layerIndex % layerColors.length]} rounded-2xl overflow-hidden`}
          >
            {/* Left area: Layer Title and Description */}
            <div className="flex-shrink-0 w-80 flex flex-col justify-center pl-6 pr-4">
              <h2 className="text-lg md:text-xl font-black uppercase text-white mb-1">{layer.name}</h2>
              <p className="text-xs text-gray-200 font-medium">{layer.role}</p>
            </div>

            {/* Visual separator (subtle gradient cut) */}
            <div className="w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

            {/* Right area: Technology Boxes in a horizontal row */}
            <div className="flex-1 flex items-center justify-start space-x-4 px-6 overflow-x-auto">
              {layer.technologies?.map((tech, techIndex) => {
                const IconComponent = techIconMap[tech.split(':')[0].trim()] || techIconMap[tech.split('(')[0].trim()] || Icons.Code;
                const isUILayer = layerIndex === 0; // UI layer doesn't have sequential arrows
                return (
                  <div key={techIndex} className="flex items-center">
                    <motion.div
                      initial={{ opacity: staticMode ? 1 : 0, scale: staticMode ? 1 : 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: staticMode ? 0 : layerIndex * 0.1 + techIndex * 0.05 }}
                      className={`${TOKENS.glassStrong} flex flex-col items-center justify-center p-3 rounded-lg w-32 h-20 text-center hover:scale-105 transition-all group shadow-lg border border-white/10`}
                    >
                      <IconComponent size={24} className="text-brand-primary mb-1 group-hover:text-white" />
                      <span className="text-[10px] font-bold text-gray-200 group-hover:text-white leading-tight font-display">{tech}</span>
                    </motion.div>

                    {/* Horizontal arrow between techs (except last, and not in UI layer) */}
                    {!isUILayer && techIndex < layer.technologies.length - 1 && (
                      <motion.div
                        initial={{ opacity: staticMode ? 1 : 0, scaleX: staticMode ? 1 : 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: staticMode ? 0 : layerIndex * 0.1 + techIndex * 0.05 + 0.1 }}
                        className="mx-2"
                      >
                        <Icons.ArrowRight size={16} className="text-white/40" />
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
                className="absolute -bottom-8 left-8 z-30"
              >
                <Icons.ArrowDown size={32} className="text-brand-primary" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // --- RENDERER: EXECUTIVE SUMMARY (THE HOLOGRAPHIC DASHBOARD) ---
  if (slideType === 'EXECUTIVE_SUMMARY') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex items-center justify-center p-4 md:p-12 max-w-[1600px] mx-auto">

        {/* Contenedor Asimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full h-full lg:h-[80vh]">

          {/* Columna Izquierda: Brand & Core Vision (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full relative">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-12 bg-brand-primary shadow-[0_0_20px_rgba(45,212,191,0.5)]" />
                <h1 className="text-6xl font-display font-medium text-white leading-none tracking-tight">Bio<span className="text-brand-primary">.</span><br />Life</h1>
              </div>
              <h2 className="text-xl text-brand-primary font-display tracking-widest uppercase border-b border-brand-primary/30 pb-4 inline-block">
                {slide.subtitle}
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className={`${TOKENS.glassHolo} p-8 border-l-4 border-brand-primary relative overflow-hidden group`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50 animate-pulse" />
              <IconMapper name="Cpu" size={48} className="text-brand-primary mb-4" />
              <p className="text-2xl font-light text-white leading-tight font-display">
                "Nutrición personalizada, predictiva y accionable."
              </p>
              <p className="mt-4 text-xs text-brand-primary font-mono">SYSTEM_STATUS: READY_FOR_DEPLOYMENT</p>
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
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col justify-center items-center p-4 relative z-20">
        <div className="text-center mb-16 z-30">
          <motion.span variants={itemVariants} className="text-brand-primary font-bold tracking-[0.5em] text-xs uppercase mb-3 block">{slide.subtitle}</motion.span>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-display font-medium tracking-tight uppercase text-white drop-shadow-2xl">{slide.title}</motion.h1>
        </div>
        <div className="w-full max-w-7xl relative min-h-[300px]">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -translate-y-1/2 w-full z-0" />
          <motion.div
            initial={{ scaleX: staticMode ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: staticMode ? 0 : 2, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-blue-900 via-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(59,130,246,0.8)] -translate-y-1/2 origin-left z-0 w-full"
          />
          <div className="flex justify-between items-center relative z-10 h-full w-full">
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
                  className="relative flex flex-col items-center group w-32"
                >
                  <div className={`absolute bottom-10 w-48 text-center transition-all duration-500 ${isTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {isTop && (
                      <div className={`${isHighlight ? 'bg-blue-500/20 border-blue-400' : 'bg-white/5 border-white/10'} backdrop-blur-md p-3 rounded-xl border`}>
                        <span className={`text-2xl font-black ${isHighlight ? 'text-cyan-400' : 'text-blue-500'} block`}>{item.year}</span>
                        <span className="text-xs font-bold uppercase text-white leading-tight block mt-1">{item.event}</span>
                      </div>
                    )}
                  </div>
                  <div className={`w-8 h-8 rounded-full border-[3px] flex items-center justify-center z-20 shrink-0 relative shadow-xl transition-transform duration-300 hover:scale-150 ${isHighlight ? 'bg-cyan-500 border-white scale-125' : 'bg-[#050810] border-blue-500'}`}>
                    {isHighlight && <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-50" />}
                  </div>
                  <div className={`absolute top-10 w-48 text-center transition-all duration-500 ${!isTop ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    {!isTop && (
                      <div className={`${isHighlight ? 'bg-blue-500/20 border-blue-400' : 'bg-white/5 border-white/10'} backdrop-blur-md p-3 rounded-xl border`}>
                        <span className={`text-2xl font-black ${isHighlight ? 'text-cyan-400' : 'text-blue-500'} block`}>{item.year}</span>
                        <span className="text-xs font-bold uppercase text-white leading-tight block mt-1">{item.event}</span>
                      </div>
                    )}
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

  if (slideType === 'FUNNEL') {
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
          <div className="flex justify-between relative z-10">
            {slide.items?.map((item: any, i: number) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col items-center group"
              >
                <div className="w-8 h-8 bg-[#050810] border-4 border-cyan-400 rounded-full mb-6 z-20 group-hover:scale-125 transition-transform shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
                <div className={`${TOKENS.glassStrong} p-6 rounded-2xl w-64 text-center border-t-4 border-blue-500 relative group-hover:-translate-y-2 transition-transform duration-300`}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-white/20" />
                  <div className="flex justify-center mb-3">
                    <IconMapper name={item.icon} size={32} className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-black uppercase text-white mb-2">{item.t}</h3>
                  <p className="text-sm text-gray-400">{item.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  if (slideType === 'CARDS_CHOICE') {
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center px-4">
        <div className="mb-12 text-center">
          <motion.h1 variants={itemVariants} className="text-6xl font-black italic uppercase text-white">{slide.title}</motion.h1>
          <motion.p variants={itemVariants} className="text-blue-500 font-mono mt-2">{slide.subtitle}</motion.p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl h-[50vh]">
          {slide.items?.map((item: any, i: number) => {
            // Check for explicit highlightIndex in slide data, fallback to old hardcoded logic for slide 17 if needed (though we could migrate that too)
            const highlightIdx = (slide as any).highlightIndex !== undefined ? (slide as any).highlightIndex : (slide.id === 17 ? 2 : -1);

            const isHighlight = highlightIdx === i;
            const isDimmed = highlightIdx !== -1 && !isHighlight;

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
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
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
    const isThreeCol = items.length === 3 || items.length === 6 || slide.id === 9;

    const gridClass = isThreeCol
      ? "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl"
      : "grid grid-cols-1 md:grid-cols-4 gap-4 w-full";

    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full max-w-[1800px] px-4 flex flex-col h-full items-center justify-center mx-auto">
        <div className="mb-8 text-center w-full">
          <motion.span variants={itemVariants} className="text-blue-500 font-bold tracking-[0.4em] text-xs uppercase mb-2 block">{slide.subtitle}</motion.span>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none mb-8">{slide.title}</motion.h1>
        </div>
        <div className={`${gridClass} h-fit pb-10`}>
          {items.map((item: any, i: number) => (
            <BentoCard key={i} item={item} delay={i * 0.1} isVisible={isVisible(i)} staticMode={staticMode} itemsCount={isThreeCol ? 3 : 4} />
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
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full max-w-7xl px-4 flex flex-col justify-center h-full mx-auto">
        <div className="mb-12 text-center">
          <motion.h2 variants={itemVariants} className={`font-bold uppercase tracking-[0.5em] mb-4 text-sm ${slideType === 'ALERT' ? 'text-red-500' : 'text-blue-500'}`}>{slide.subtitle}</motion.h2>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">{slide.title}</motion.h1>
        </div>
        <div className={`grid gap-6 ${(slide.cards || slide.items)?.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
          {(slide.cards || slide.items)?.map((item: any, i: number) => {
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
                    <p className="text-sm text-gray-400 font-light">{item.d}</p>
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
    return (
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 z-0 bg-blue-500/5 animate-pulse" />
        <div className={`${TOKENS.glassStrong} p-20 rounded-[3rem] border border-blue-500/30 flex flex-col items-center justify-center text-center max-w-4xl relative z-10`}>
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(37,99,235,0.5)] cursor-pointer hover:scale-110 transition-transform">
            <Icons.Play size={40} className="ml-2 text-white" />
          </div>
          <h1 className="text-6xl font-black italic uppercase mb-4 tracking-tighter">BioLife Demo</h1>
          <p className="text-xl text-blue-400 font-mono">FULLSCREEN_PLAYBACK_SEQUENCE_INIT</p>
        </div>
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
      <motion.div variants={containerVariants} initial="initial" animate="animate" className="w-full h-full flex flex-col items-center justify-center px-4">
        <div className="text-center mb-12">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white mb-4">{slide.title}</motion.h1>
          {slide.highlight && (
            <motion.p variants={itemVariants} className="text-lg text-blue-400 font-bold italic mb-8">{slide.highlight}</motion.p>
          )}
        </div>
        <div className={`${TOKENS.glassStrong} p-8 rounded-2xl border border-white/10 w-full max-w-6xl`}>
          <table className="w-full text-white">
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
              {(slide as any).economicData?.map((row: any, idx: number) => (
                <motion.tr key={idx} variants={itemVariants} className="border-b border-white/10">
                  <td className="py-4 px-4 font-bold whitespace-nowrap">{row.label}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{row["Año 1"] || '-'}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{row["Año 2"] || '-'}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{row["Año 3"] || '-'}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{row["Año 4"] || '-'}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{row["Año 5"] || '-'}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{row["Año 6"] || '-'}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{row["Año 7"] || '-'}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{row["Año 8"] || '-'}</td>
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

  return (
    <motion.article variants={containerVariants} initial="initial" animate="animate" className="flex flex-col items-center text-center max-w-6xl mx-auto px-4 justify-center h-full relative z-10">
      <motion.div variants={itemVariants} className="mb-8 relative">
        {slideType === 'HERO_GLOW' ? (
          <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20 animate-pulse" />
        ) : null}
        <div className={`${TOKENS.glassStrong} p-6 rounded-full text-blue-400 relative border border-blue-500/20`}>
          <Icons.Activity size={48} className={staticMode ? "" : "animate-pulse"} />
        </div>
      </motion.div>

      <motion.h1 variants={itemVariants} className={`${slide.id === 12 ? 'text-[6rem] text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]' : 'text-5xl md:text-[7rem] text-white'} font-black mb-6 tracking-tighter leading-[0.9] uppercase italic drop-shadow-2xl`}>
        {slide.title}
      </motion.h1>

      {slide.subtitle && (
        <motion.div variants={itemVariants} className={`${TOKENS.glassAccent} px-8 py-3 rounded-full`}>
          <p className="text-lg md:text-xl font-bold text-blue-400 uppercase tracking-[0.3em]">
            {slide.subtitle}
          </p>
        </motion.div>
      )}
      {slide.highlight && (
        <motion.p variants={itemVariants} className={`mt-8 max-w-2xl font-light text-lg ${slide.id === 12 ? 'text-2xl text-white font-bold tracking-widest' : 'text-gray-400'}`}>{slide.highlight}</motion.p>
      )}
    </motion.article>
  );
};
