import { motion } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface CaseStudyProps {
  id: string;
  onBack: () => void;
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "The Challenge" },
  { id: "solution", label: "The Solution" },
  { id: "results", label: "Results & Impact" },
];

export default function CaseStudy({ id, onBack }: CaseStudyProps) {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();
    // Multiple attempts to ensure scroll to top works after layout and animations
    const t1 = setTimeout(scrollToTop, 50);
    const t2 = setTimeout(scrollToTop, 150);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative text-white overflow-x-hidden"
    >
      {/* Orange Glow Background */}
      <div className="absolute top-0 left-0 w-full h-[1000px] bg-orange-500/[0.08] blur-[180px] pointer-events-none -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-orange-300/[0.04] blur-[120px] pointer-events-none -z-10" />

      {/* Top Navigation / Back Button */}
      <div className="fixed top-8 left-8 md:top-12 md:left-12 z-50">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={onBack}
          className="relative px-4 py-2 md:px-6 md:py-3 rounded-full text-[11px] md:text-[13px] font-semibold transition-all duration-500 group"
        >
          <div className="absolute inset-0 rounded-full bg-white/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-[24px] rounded-full transition-all duration-500 group-hover:bg-white/[0.08]" />
          <div className="absolute inset-0 rounded-full border border-white/20 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.4),inset_0_-0.5px_1px_rgba(255,255,255,0.1)] group-hover:border-white/40 transition-all duration-500" />
          <span className="relative z-10 flex items-center gap-2 text-white group-hover:scale-[1.02] transition-transform duration-300">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back
          </span>
        </motion.button>
      </div>

      {/* Hero Section - Centered Title & Large Image */}
      <section id="overview" className="pt-32 md:pt-20 pb-32 flex flex-col items-center text-center w-full">
        <div className="space-y-6 mb-20 max-w-5xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-8xl lg:text-[10rem] font-medium tracking-tight md:tracking-tighter leading-none bg-gradient-to-b from-white via-white/95 to-white/40 bg-clip-text text-transparent"
          >
            EVERMONTE INSTITUTE
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm md:text-base text-white/30 uppercase tracking-[0.6em] font-bold"
          >
            People Analytics & Governance
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[1400px] aspect-[16/9] rounded-2xl md:rounded-[40px] overflow-hidden border border-white/5 bg-zinc-900 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative"
        >
          <img 
            src="https://picsum.photos/seed/evermonte-hero/1920/1080" 
            alt="Evermonte Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Subtle overlay to match the reference depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-20">
          {/* Main Content */}
          <div className="space-y-32">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold">Client</span>
              <p className="text-sm font-medium">Evermonte Institute</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold">Role</span>
              <p className="text-sm font-medium">Product Designer</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold">Year</span>
              <p className="text-sm font-medium">2024</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold">Deliverables</span>
              <p className="text-sm font-medium">UX/UI, Dashboard, Analytics</p>
            </div>
          </div>

          {/* Challenge Section */}
          <section id="challenge" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12">
              <h2 className="text-sm uppercase tracking-[0.3em] text-white/30 font-bold">The Challenge</h2>
              <div className="space-y-8">
                <h3 className="text-3xl md:text-4xl font-medium leading-tight">
                  Como unificar dados complexos de mercado e performance humana em uma interface intuitiva?
                </h3>
                <div className="space-y-6 text-lg text-white/60 leading-relaxed max-w-2xl">
                  <p>
                    O Evermonte Institute enfrentava o desafio de lidar com silos de informação. Dados de mercado, 
                    métricas de performance interna e indicadores de governança estavam dispersos, dificultando 
                    a tomada de decisão rápida e precisa pelos stakeholders.
                  </p>
                  <p>
                    A necessidade era criar uma ferramenta que não apenas visualizasse esses dados, mas que 
                    contasse uma história sobre a saúde organizacional e as oportunidades de mercado em tempo real.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-[4/3] rounded-[32px] overflow-hidden border border-white/5 bg-zinc-900">
                <img 
                  src="https://picsum.photos/seed/data-viz/1200/900" 
                  alt="Data Visualization" 
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="aspect-[4/3] rounded-[32px] overflow-hidden border border-white/5 bg-zinc-900">
                <img 
                  src="https://picsum.photos/seed/team-work/1200/900" 
                  alt="Team Collaboration" 
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </section>

          {/* Solution Section */}
          <section id="solution" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12">
              <h2 className="text-sm uppercase tracking-[0.3em] text-white/30 font-bold">The Solution</h2>
              <div className="space-y-8">
                <h3 className="text-3xl md:text-4xl font-medium leading-tight">
                  Uma arquitetura de informação focada em clareza e profundidade analítica.
                </h3>
                <div className="space-y-6 text-lg text-white/60 leading-relaxed max-w-2xl">
                  <p>
                    Desenvolvemos um ecossistema digital que prioriza a hierarquia visual. Através de um dashboard 
                    modular, os usuários podem navegar desde uma visão macro da governança até os detalhes mais 
                    granulares de people analytics.
                  </p>
                  <p>
                    Implementamos sistemas de filtragem inteligente e visualizações dinâmicas que permitem 
                    cruzar dados de mercado com KPIs internos, revelando correlações antes invisíveis.
                  </p>
                </div>
              </div>
            </div>
            <div className="aspect-[21/9] rounded-[40px] overflow-hidden border border-white/5 bg-zinc-900">
              <img 
                src="https://picsum.photos/seed/interface/2100/900" 
                alt="Interface Design" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </section>

          {/* Results Section */}
          <section id="results" className="space-y-12 pb-32">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12">
              <h2 className="text-sm uppercase tracking-[0.3em] text-white/30 font-bold">Results</h2>
              <div className="space-y-12">
                <h3 className="text-3xl md:text-4xl font-medium leading-tight">
                  Impacto real na governança e eficiência operacional.
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="space-y-2">
                    <span className="text-5xl font-medium text-white">40%</span>
                    <p className="text-sm text-white/40 uppercase tracking-wider">Redução no tempo de análise</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-5xl font-medium text-white">100%</span>
                    <p className="text-sm text-white/40 uppercase tracking-wider">Integração de dados</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-5xl font-medium text-white">15+</span>
                    <p className="text-sm text-white/40 uppercase tracking-wider">KPIs estratégicos monitorados</p>
                  </div>
                </div>
                <div className="space-y-6 text-lg text-white/60 leading-relaxed max-w-2xl">
                  <p>
                    O resultado final foi uma ferramenta indispensável para a diretoria do Evermonte Institute, 
                    proporcionando uma base sólida para estratégias de expansão e retenção de talentos.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sticky Sidebar Navigation */}
        <aside className="hidden lg:block">
          <div className="sticky top-32 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Conteúdo</span>
              <nav className="flex flex-col gap-4">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-sm font-medium transition-all duration-300 text-left flex items-center gap-3 group ${
                      activeSection === section.id ? "text-white" : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    <div className={`h-[1px] transition-all duration-300 ${
                      activeSection === section.id ? "w-8 bg-white" : "w-0 bg-white/30 group-hover:w-4"
                    }`} />
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </motion.div>
  );
}
