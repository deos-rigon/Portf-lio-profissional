/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: "evermonte",
    title: "Evermonte Institute",
    company: "Personalize IT, '24",
    description: "Desenvolvimento de uma solução estratégica que integra people analytics e market data para impulsionar a governança e o crescimento sustentável.",
    image: "https://picsum.photos/seed/stadia/1200/800",
    video: "https://cdn.pixabay.com/video/2023/05/24/164314-829928509_large.mp4", // Placeholder for the uploaded video
    link: "#",
  },
  {
    id: "test-hub",
    title: "Test Hub Next",
    company: "Google, '22",
    description: "Imaginando o futuro do playtesting para todos os desenvolvedores.",
    image: "https://picsum.photos/seed/testhub/1200/800",
    link: "#",
  },
  {
    id: "spotlight",
    title: "Spotlight",
    company: "Adobe x Netflix, '21",
    description: "Tornando o entretenimento mais unido através de experiências compartilhadas.",
    image: "https://picsum.photos/seed/spotlight/1200/800",
    link: "#",
  },
  {
    id: "corporate",
    title: "Portal de Cartões",
    company: "RBC, '21",
    description: "Redesenhando um serviço interno central para gestão corporativa.",
    image: "https://picsum.photos/seed/rbc/1200/800",
    link: "#",
  },
];

const tabs = [
  { id: "work", label: "Work" },
  { id: "info", label: "Info" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("work");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -50]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.98]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <div className="min-h-screen selection:bg-ink selection:text-bg">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white/20 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center transition-all duration-500 ${
          isScrolled 
            ? "bg-black/60 backdrop-blur-xl py-3 md:py-4" 
            : "bg-transparent"
        } text-white`}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-lg font-semibold tracking-tight z-10"
        >
          Eduardo Deos
        </motion.div>

        {/* Navigation Pill - Centered */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
          <div className={`relative backdrop-blur-md transition-all duration-500 p-1 rounded-full flex items-center border border-white/10 shadow-lg group hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] ${
            isScrolled 
              ? "bg-black/40" 
              : "bg-white/5"
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative w-28 h-9 rounded-full text-[13px] font-medium transition-all duration-300 z-10 flex items-center justify-center ${
                  activeTab === tab.id 
                    ? "text-white" 
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {/* Hover Background */}
                {hoveredTab === tab.id && activeTab !== tab.id && (
                  <motion.div
                    layoutId="hover-pill"
                    className="absolute inset-0 rounded-full bg-white/5 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}

                {/* Active State */}
                {activeTab === tab.id && (
                  <>
                    {/* Active Button Background Highlight */}
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full -z-10 bg-white/10"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                    
                    {/* Top Glow Indicator Bar */}
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-white rounded-full"
                      style={{
                        boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.6), 0 0 20px 4px rgba(255, 255, 255, 0.3)"
                      }}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  </>
                )}
                
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative px-8 py-3.5 rounded-full text-[14px] font-semibold transition-all duration-500 group"
        >
          {/* Breathing Outer Glow */}
          <div className="absolute inset-0 rounded-full bg-white/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Liquid Glass Base - Slightly more opaque for prominence */}
          <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-[24px] rounded-full transition-all duration-500 group-hover:bg-white/[0.08]" />
          
          {/* Liquid Glass Rim Light (Top Highlight) */}
          <div className="absolute inset-0 rounded-full border border-white/20 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.4),inset_0_-0.5px_1px_rgba(255,255,255,0.1)] group-hover:border-white/40 transition-all duration-500" />
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                x: ['-100%', '200%'],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "linear",
                repeatDelay: 2
              }}
              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.1] to-transparent skew-x-[-20deg]"
            />
          </div>
          
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.12] to-transparent opacity-50 pointer-events-none" />
          
          <span className="relative z-10 flex items-center gap-2 text-white group-hover:scale-[1.02] transition-transform duration-300">
            Vamos criar juntos
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </motion.button>
      </header>

      {/* Mobile Pill (Optional, keeping it at bottom for mobile usability or hidden) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] md:hidden">
        <div className="relative bg-[#121212]/90 backdrop-blur-2xl border border-white/5 p-1 rounded-full flex items-center shadow-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`relative w-24 h-9 rounded-full text-[13px] font-medium transition-all duration-300 z-10 flex items-center justify-center ${
                activeTab === tab.id ? "text-white" : "text-white/30 hover:text-white/60"
              }`}
            >
              {hoveredTab === tab.id && activeTab !== tab.id && (
                <motion.div
                  layoutId="hover-pill-mobile"
                  className="absolute inset-0 rounded-full bg-white/5 -z-10"
                  transition={{ duration: 0.2 }}
                />
              )}
              {activeTab === tab.id && (
                <>
                  <motion.div
                    layoutId="active-pill-mobile"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                  <motion.div
                    layoutId="active-indicator-mobile"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-white rounded-full"
                    style={{
                      boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.6), 0 0 20px 4px rgba(255, 255, 255, 0.3)"
                    }}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                </>
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="px-6 md:px-12 pt-32 pb-20 max-w-7xl mx-auto">
        {/* Hero Section - MacBook Style Glass Window (Light Mode) */}
        <section className="mb-32 md:mb-48 relative">
          {/* Background Glow behind the window - matching the internal gradients */}
          <div className="absolute -inset-20 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none translate-x-20" />
          
          <motion.div
            style={{ 
              y: heroY, 
              scale: heroScale,
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-t-[16px] rounded-b-none overflow-hidden bg-[#0A0A0A] border-t border-x border-white/10 flex flex-col shadow-[0_-20px_100px_-20px_rgba(255,255,255,0.08)]"
          >
            {/* Window Header */}
            <div className="h-12 border-b border-white/5 bg-white/[0.03] backdrop-blur-md flex items-center justify-between px-6">
              <div className="flex gap-2 shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] shrink-0 aspect-square" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shrink-0 aspect-square" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F] shrink-0 aspect-square" />
              </div>

              <div className="flex items-center gap-6">
                {/* Status Label (Inside window header) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="flex items-center gap-2 text-[8px] font-medium uppercase tracking-[0.2em] text-white/50 leading-none"
                >
                  <div className="relative flex h-2 w-2 shrink-0 items-center justify-center aspect-square">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-green-500/40"></span>
                    <span className="relative block h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                  </div>
                  Disponível para novos projetos
                </motion.div>
              </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 relative p-8 md:p-16 flex flex-col justify-center bg-[#0A0A0A] overflow-hidden">
              {/* Bottom Gradient Fade to blend with background */}
              <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent z-20 pointer-events-none" />

              {/* Background Glows */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

              <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col">
                <motion.h1
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="text-4xl md:text-7xl lg:text-8xl leading-[1.1] text-white font-medium tracking-tight mb-16 text-glow"
                >
                  Eu crio <span className="text-white">produtos</span>,<br /> interações & <span className="font-display italic text-white/90"> histórias. </span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="space-y-1 self-start text-left"
                >
                  <p className="text-lg md:text-xl text-white font-medium">
                    Designer de produto na Personalize IT. Atualmente em Porto Alegre, RS.
                  </p>
                </motion.div>
              </div>

            </div>
          </motion.div>

          {/* Scroll Indicator (Outside the window to avoid mask-image fade) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: [0, 6, 0]
            }}
            transition={{ 
              opacity: { delay: 1.5, duration: 1 },
              y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
          >
            <ArrowDown className="text-white/40" size={16} strokeWidth={2.5} />
          </motion.div>
        </section>

        {/* Projects Grid */}
        <section className="space-y-8 md:space-y-12 mt-24">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative bg-[#0F0F0F] rounded-[40px] border border-white/5 p-8 md:p-16 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Project Header */}
              <div className="flex justify-between items-start mb-16">
                <div className="space-y-3">
                  <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white">
                    {project.title}
                  </h2>
                  <p className="text-base md:text-lg text-white/40 max-w-2xl">
                    <span className="font-semibold text-white">{project.company}</span> — {project.description}
                  </p>
                </div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="text-white/30 group-hover:text-white transition-colors duration-300"
                >
                  <ArrowRight size={32} strokeWidth={1.5} />
                </motion.div>
              </div>

              {/* Project Media Container */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-900 shadow-lg border border-white/5">
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                ) : (
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                )}
                
                {/* Dark Overlay - Fades on hover */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/0 transition-all duration-700 ease-in-out" />
              </div>

              {/* Background Decorative Glow (Subtle) */}
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-white/10 transition-all duration-700" />
            </motion.div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-20 border-t border-border mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl italic">Vamos conversar?</h3>
            <a 
              href="mailto:dududeos@gmail.com" 
              className="text-xl md:text-2xl font-medium border-b border-white/20 hover:border-white transition-colors"
            >
              dududeos@gmail.com
            </a>
          </div>
          <div className="flex gap-8 text-sm font-medium uppercase tracking-widest opacity-60">
            <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Twitter</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] opacity-30">
          <p>© 2026 Eduardo Deos</p>
          <p>Feito com ❤️ em Toronto</p>
        </div>
      </footer>
    </div>
  );
}