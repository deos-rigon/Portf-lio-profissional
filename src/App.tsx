/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "motion/react";
import { ArrowRight, ArrowDown, Github, Twitter, Chrome, Zap, Layers, Cpu, Command } from "lucide-react";
import { useState, useEffect } from "react";
import Lenis from "lenis";
import LoadingScreen from "./components/LoadingScreen";
import CaseStudy from "./components/CaseStudy";

const clients = [
  { name: "F4B Capital", src: "https://eduardodeosdesign.com.br/wp-content/uploads/2026/03/Logotipo-F4B-Capital-1.svg" },
  { name: "Une World", src: "https://eduardodeosdesign.com.br/wp-content/uploads/2026/03/UNEWORLD-LOGO-1.svg" },
  { name: "Personalize iT", src: "https://eduardodeosdesign.com.br/wp-content/uploads/2026/03/PERSONALIZE-LOGO-1.svg" },
  { name: "CG Contadores", src: "https://eduardodeosdesign.com.br/wp-content/uploads/2026/03/CG_logo-1.svg" },
  { name: "FX Capital", src: "https://eduardodeosdesign.com.br/wp-content/uploads/2026/03/FXCAPITAL-LOGO-1.svg" },
  { name: "Evermonte Institute", src: "https://eduardodeosdesign.com.br/wp-content/uploads/2026/03/EINSTITUTE-LOGO-1.svg" },
  { name: "Evermonte", src: "https://eduardodeosdesign.com.br/wp-content/uploads/2026/03/EVERMONTE-LOGO-1.svg" },
];

const projects = [
  {
    id: "evermonte",
    title: "Evermonte Institute",
    company: "Personalize IT, '24",
    description: "Desenvolvimento de uma solução estratégica que integra people analytics e market data para impulsionar a governança e o crescimento sustentável.",
    video: "https://eduardodeosdesign.com.br/wp-content/uploads/2026/03/Video-Evermonte.mp4", // Raw GitHub URL for the project video
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

const experience = [
  {
    company: "CG Contadores",
    roles: [
      {
        title: "Designer de produto",
        period: "Março/2024 – o momento",
        description: "Como Designer de Produto, atuo na criação e desenvolvimento de soluções digitais centradas no usuário, utilizando metodologias ágeis para entregar produtos inovadores e funcionais"
      }
    ]
  },
  {
    company: "Personalize IT",
    roles: [
      {
        title: "Web Designer",
        period: "Março/2024 – o momento",
        description: "Como Designer de Produto, atuo na criação e desenvolvimento de soluções digitais centradas no usuário, utilizando metodologias ágeis para entregar produtos inovadores e funcionais"
      }
    ]
  },
  {
    company: "Apolo Mídia",
    roles: [
      {
        title: "UX/UI Designer Junior",
        period: "Dez/2021 – Fev/2024",
        description: "Na posição de UX/UI Designer Júnior, concentrei-me em criar experiências digitais intuitivas e atraentes, com foco no usuário."
      },
      {
        title: "Designer Gráfico Pleno",
        period: "Nov/2021 – Fev/2024",
        description: "Sendo Designer Gráfico Pleno, fui responsável pela concepção e execução de projetos visuais de alto impacto, alinhados com os objetivos estratégicos da empresa."
      },
      {
        title: "Social media Designer/Estrategista de Conteúdos",
        period: "Jun/2021 – Nov/2021",
        description: "Sendo um profissional de Social Media Designer e Estrategista de Conteúdos, desenvolvi campanhas criativas e estratégias eficazes para mídias sociais, impulsionando o engajamento e a visibilidade da marca."
      }
    ]
  }
];

const education = [
  {
    institution: "Universidade Federal do Rio Grande do Sul",
    degree: "Bacharelado em Design Visual",
    period: "2017 — 2021",
  },
  {
    institution: "Interaction Design Foundation",
    degree: "User Experience (UX) Design Specialization",
    period: "2022",
  }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("work");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentCase, setCurrentCase] = useState<string | null>(null);
  const { scrollYProgress, scrollY } = useScroll();

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  const heroY = useTransform(scrollY, [0, 500], [0, -50]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.98]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div 
        className="min-h-screen selection:bg-ink selection:text-bg overflow-x-hidden"
        style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: "opacity 0.5s ease-out" 
        }}
      >
        {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white/20 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      {!currentCase && (
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
          className="z-10"
        >
          <img 
            src="https://eduardodeosdesign.com.br/wp-content/uploads/2026/03/logo.svg" 
            alt="Eduardo Deos Logo" 
            className="h-5 md:h-8 w-auto"
            draggable={false}
            referrerPolicy="no-referrer"
          />
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
          className="relative px-5 py-2.5 md:px-8 md:py-3.5 rounded-full text-[12px] md:text-[14px] font-semibold transition-all duration-500 group"
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
      )}

      {/* Mobile Pill (Optional, keeping it at bottom for mobile usability or hidden) */}
      {!currentCase && (
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
      )}

      <main className={`px-6 md:px-12 pb-20 max-w-7xl mx-auto ${currentCase ? 'pt-0' : 'pt-32'}`}>
        <AnimatePresence mode="wait">
          {currentCase ? (
            <motion.div key="case-study">
              <CaseStudy id={currentCase as string} onBack={() => setCurrentCase(null)} />
            </motion.div>
          ) : activeTab === "work" ? (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Hero Section - MacBook Style Glass Window (Light Mode) - ONLY FOR WORK */}
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
                  className="relative w-full aspect-[4/5] md:aspect-[16/9] rounded-t-[16px] rounded-b-none overflow-hidden bg-[#0A0A0A] border-t border-x border-white/10 flex flex-col shadow-[0_-20px_100px_-20px_rgba(255,255,255,0.08)]"
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
                  <div className="flex-1 relative p-6 md:p-16 flex flex-col justify-center bg-[#0A0A0A] overflow-hidden">
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
                        className="text-3xl md:text-7xl lg:text-8xl leading-[1.1] text-white font-medium tracking-tight mb-16 text-glow"
                      >
                        Eu crio <span className="text-white">produtos</span>,<br /> interações & <span className="font-display italic text-white/90"> histórias. </span>
                      </motion.h1>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="space-y-1 self-start text-left"
                      >
                        <p className="text-base md:text-xl text-white font-medium">
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

              {/* Logo Carousel */}
              <section className="relative w-full overflow-hidden py-10 -mt-16 mb-12">
                {/* fade lateral */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent" />

                <div className="group relative flex overflow-hidden">
                  <motion.div 
                    className="flex min-w-max items-center gap-16 will-change-transform"
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                      duration: 28,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
                      <div
                        key={`${client.src}-${index}`}
                        className="flex shrink-0 items-center justify-center opacity-35 transition-opacity duration-300 hover:opacity-100 px-8 w-40 md:w-56"
                      >
                        <img
                          src={client.src}
                          alt={client.name}
                          className="max-h-6 md:max-h-8 max-w-full object-contain"
                          draggable={false}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </section>

              {/* Projects Grid */}
              <section className="space-y-8 md:space-y-12 mt-12">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    onClick={() => {
                      if (project.id === "evermonte") {
                        setCurrentCase("evermonte");
                        window.scrollTo({ top: 0, behavior: 'instant' });
                      }
                    }}
                    className={`group relative bg-[#0F0F0F] rounded-[40px] border border-white/5 p-8 md:p-16 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden ${project.id === "evermonte" ? "cursor-pointer" : ""}`}
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
            </motion.div>
          ) : (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-48 pt-12"
            >
              {/* Section 1: History & Making it Happen */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
                {/* Left Column */}
                <div className="space-y-12">
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                      Um pouco sobre minha história
                    </h2>
                    <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                      Com 19 anos descobri minha paixão pelo design e criação. No início, comecei como designer de social media, não era muito fã mas me ajudou a me aprofundar cada vez mais nesse vasto mundo do design. Logo após, comecei a desenhar identidades visuais e desbravar o mundo de branding, por um bom tempo era só o que eu pensava. Desenvolvi ótimos projetos que me orgulho muito e me fizeram ser o profissional que sou hoje.
                    </p>
                  </div>
                  <div className="aspect-[4/5] rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl">
                    <img 
                      src="https://picsum.photos/seed/workspace-setup/1200/1500?grayscale" 
                      alt="Workspace" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-12 md:pt-48">
                  <div className="aspect-[4/5] rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&h=1500&auto=format&fit=crop" 
                      alt="Portrait" 
                      className="w-full h-full object-cover grayscale"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                      Fazendo acontecer
                    </h2>
                    <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                      Foi então que descobri o mundo de ux e produto. Foi amor a primeira vista, desde a pesquisa até o desenvolvimento das interfaces, era um mundo completamente novo para mim. Por mais que a composição e idealização de visuais sempre estiveram dentro de mim.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: Photography & Creative Fragments */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
                {/* Left Column */}
                <div className="space-y-12">
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                      Meu background na fotografia
                    </h2>
                    <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                      A fotografia sempre foi meu jeito de enxergar o mundo de outra forma. Luz, sombras e composições me ensinaram a contar histórias visuais, e esse olhar refinado inspira meu trabalho como designer. A atenção aos detalhes e a busca pela harmonia estética se refletem em cada projeto, criando experiências que vão além da funcionalidade.
                    </p>
                  </div>
                  <div className="aspect-[4/5] rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl">
                    <img 
                      src="https://picsum.photos/seed/suburban-houses/1200/1500?grayscale" 
                      alt="Photography" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-12 md:pt-48">
                  <div className="aspect-[4/5] rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&h=1500&auto=format&fit=crop" 
                      alt="Night Scene" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                      Fragmentos criativos
                    </h2>
                    <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                      Sempre tive uma curiosidade inquieta, dessas que fazem a gente perder a noção do tempo. Me perco entre partidas intensas, livros sobre ideias que expandem o olhar, eletrônicos desmontados e novas ferramentas digitais. Gosto de explorar o que é bonito, o que é estranho, o que é possível — seja em pixels, tecidos ou fios de cobre. No fundo, é só meu jeito de me divertir enquanto descubro o mundo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Experience Section */}
              <section className="pt-20">
                <div className="flex items-center gap-3 mb-24">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  <h2 className="text-[10px] uppercase tracking-[0.3em] text-white font-bold">
                    Experiência
                  </h2>
                </div>
                
                <div className="space-y-32">
                  {experience.map((company, companyIndex) => (
                    <div key={companyIndex} className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-24">
                      {/* Left: Company Name */}
                      <h3 className="text-3xl md:text-5xl font-medium text-white tracking-tight">
                        {company.company}
                      </h3>
                      
                      {/* Right: Roles */}
                      <div className="space-y-16">
                        {company.roles.map((role, roleIndex) => (
                          <div key={roleIndex} className="space-y-16">
                            <div className="space-y-4">
                              <h4 className="text-2xl md:text-3xl font-medium text-white">
                                {role.title}
                              </h4>
                              <p className="text-sm md:text-base text-white/40 font-medium">
                                {role.period}
                              </p>
                              <p className="text-lg text-white/50 leading-relaxed max-w-xl">
                                {role.description}
                              </p>
                            </div>
                            
                            {/* Vertical line between roles */}
                            {roleIndex < company.roles.length - 1 && (
                              <div className="w-[1px] h-24 bg-white/10" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Education Section - Separated */}
                <div className="mt-48 pt-32 border-t border-white/5">
                  <div className="flex items-center gap-3 mb-24">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                      Formações
                    </h2>
                  </div>
                  
                  <div className="space-y-12">
                    {education.map((item, index) => (
                      <div 
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 py-12 border-b border-white/5"
                      >
                        <div className="text-white/40 font-medium text-sm md:text-base">{item.period}</div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">{item.degree}</h3>
                          <p className="text-lg text-white/60">{item.institution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-20 border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-0">
          {/* Left Side: Logo, Navigation & Contact */}
          <div className="flex flex-col gap-12">
            {/* Footer Logo */}
            <div className="opacity-50 hover:opacity-100 transition-opacity duration-500">
              <img 
                src="https://eduardodeosdesign.com.br/wp-content/uploads/2026/03/logo.svg" 
                alt="Eduardo Deos Logo" 
                className="h-6 md:h-8 w-auto"
                draggable={false}
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex gap-24 md:gap-32">
              {/* Principal Column */}
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold">Principal</span>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => {
                    setActiveTab("work");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xl font-bold text-white hover:text-white/70 transition-colors text-left"
                >
                  Work
                </button>
                <button 
                  onClick={() => {
                    setActiveTab("info");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xl font-bold text-white hover:text-white/70 transition-colors text-left"
                >
                  Info
                </button>
              </div>
            </div>

            {/* Contato Column */}
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold">Contato</span>
              <div className="flex flex-col gap-4">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-white hover:text-white/70 transition-colors flex items-center gap-2"
                >
                  LinkedIn <ArrowRight size={16} className="-rotate-45 opacity-50" />
                </a>
                <a 
                  href="#" 
                  className="text-xl font-bold text-white hover:text-white/70 transition-colors flex items-center gap-2"
                >
                  Currículo <ArrowRight size={16} className="-rotate-45 opacity-50" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: CTA & Email */}
          <div className="text-left md:text-right space-y-4">
            <h3 className="text-2xl md:text-3xl italic font-display text-white/90">Vamos conversar?</h3>
            <a 
              href="mailto:contato.eduardodeos@gmail.com" 
              className="block text-xl md:text-2xl font-medium text-white hover:text-white/70 transition-colors"
            >
              contato.eduardodeos@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] opacity-30">
          <p>© 2026 Eduardo Deos. Todos os direitos reservados.</p>
          <p>Feito com ❤️ em Toronto</p>
        </div>
      </footer>
    </div>
    </>
  );
}
