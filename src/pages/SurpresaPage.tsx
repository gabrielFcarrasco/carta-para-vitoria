import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Download } from 'lucide-react';
import videoSurpresa from '../assets/carta para Vitoria.mp4';

export default function SurpresaPage() {
  const [step, setStep] = useState(0);
  const [videoFinalizado, setVideoFinalizado] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const nextStep = () => {
    if (step < 5) setStep((prev) => prev + 1);
  };

  const iniciarSurpresa = () => {
    setStep(5);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 1500);
  };

  const textVariants: any = {
    initial: { opacity: 0, y: 30, filter: "blur(4px)" },
    in: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 1.5, ease: "easeOut" } 
    },
    out: { 
      opacity: 0, 
      y: -40, 
      filter: "blur(8px)", 
      transition: { duration: 1, ease: "easeInOut" } 
    }
  };

  // Componente interno para manter o aviso padronizado no rodapé de todas as telas
  const InstrucaoRodape = () => (
    <p style={{ 
      fontSize: '0.65rem', 
      letterSpacing: '2px', 
      textTransform: 'uppercase', 
      color: 'var(--caqui)', 
      opacity: 0.6, 
      marginTop: '40px', 
      animation: 'pulsarOpacidade 3s infinite' 
    }}>
      Toque na tela para avançar
    </p>
  );

  return (
    <div className={`mobile-wrapper step-bg-${step}`} onClick={step < 4 ? nextStep : undefined}>
      
      <div className={`ambient-light light-petroleo ${step >= 0 ? 'active' : ''}`} />
      <div className={`ambient-light light-lilas ${step >= 2 ? 'active' : ''}`} />
      <div className={`ambient-light light-caqui ${step >= 3 ? 'active' : ''}`} />

      <AnimatePresence mode="wait">
        
        {/* TELA 1: Prata e Ouro no Anel */}
        {step === 0 && (
          <motion.div key="s0" variants={textVariants} initial="initial" animate="in" exit="out" className="poema-container">
            <h1 className="serif-title">Olhe para este anel em sua mão.</h1>
            <p className="texto-romantico mt-4">
              Ele é a nossa ponte. A base em prata carrega a leveza e a história do nosso namoro, abraçando de forma indissociável o ouro amarelo, que sela a força, a solidez e a promessa inquebrável do nosso casamento.
            </p>
            <InstrucaoRodape />
          </motion.div>
        )}

        {/* TELA 2: A Lapidação do Diamante */}
        {step === 1 && (
          <motion.div key="s1" variants={textVariants} initial="initial" animate="in" exit="out" className="poema-container">
            <h1 className="serif-title">Observe esta pedra preciosa.</h1>
            <p className="texto-romantico mt-4">
              Antes de revelar seu brilho máximo, o diamante é uma pedra sem forma que precisa de pressão. Da mesma maneira, cada desafio e cada conversa que tivemos foram a lapidação necessária para dar forma à beleza deste amor que você agora veste.
            </p>
            <InstrucaoRodape />
          </motion.div>
        )}

        {/* TELA 3: A Gota e o Oceano */}
        {step === 2 && (
          <motion.div key="s2" variants={textVariants} initial="initial" animate="in" exit="out" className="poema-container">
            <h1 className="serif-title">Moldada como uma gota d'água...</h1>
            <p className="texto-romantico mt-4">
              O formato exato desta joia nos lembra a imensidão do mar. Por mais profundas e misteriosas que sejam as águas, nós escolhemos ter a coragem e a vontade contínua de mergulhar e descobrir um ao outro todos os dias.
            </p>
            <InstrucaoRodape />
          </motion.div>
        )}

        {/* TELA 4: As Ondas e o Círculo da Aliança */}
        {step === 3 && (
          <motion.div key="s3" variants={textVariants} initial="initial" animate="in" exit="out" className="poema-container">
            <h1 className="serif-title">O nosso porto seguro.</h1>
            <p className="texto-romantico mt-4">
              O círculo infinito desta aliança é a certeza de que as tempestades e as ondas bravas lá fora sempre vão existir... mas independentemente delas, nós sempre seremos a calmaria um do outro.
            </p>
            <InstrucaoRodape />
          </motion.div>
        )}

        {/* TELA 5: A Carta Final */}
        {step === 4 && (
          <motion.div key="s4" variants={textVariants} initial="initial" animate="in" exit="out" className="carta-final">
            <div className="glass-letter">
              <span className="detalhe-topo">✦</span>
              <h1 className="serif-title mb-4">Para Vitória</h1>
              <p className="texto-romantico">
                Minha noiva, a mulher mais linda desse mundo. Esta é a sua carta aberta. O registro imortalizado do nosso novo degrau.
              </p>
              
              <button onClick={iniciarSurpresa} className="btn-revelar mt-4">
                <Play size={18} fill="currentColor" strokeWidth={0} />
                <span>Reviver o nosso momento</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* TELA 6: O Vídeo e Download */}
        {step === 5 && (
          <motion.div 
            key="video" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1.5 }} 
            className="video-container"
          >
            <video
              ref={videoRef}
              controls={!videoFinalizado}
              className="video-fullscreen"
              src={videoSurpresa} 
              controlsList="nodownload" 
              playsInline
              onEnded={() => setVideoFinalizado(true)} 
            />
            
            <AnimatePresence>
              {videoFinalizado && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 1.5 }}
                  className="download-overlay"
                >
                  <div className="glass-letter" style={{ padding: '40px 24px', maxWidth: '380px', marginTop: '-10vh' }}>
                    <span className="detalhe-topo">✦</span>
                    <h2 className="serif-title mb-4" style={{ fontSize: '2rem' }}>O nosso "sim"</h2>
                    <p className="texto-romantico" style={{ marginBottom: '32px' }}>
                      Para que você possa reviver, sempre que desejar, o instante exato em que a nossa prata se tornou ouro e o nosso mar encontrou a sua calmaria definitiva.
                    </p>
                    <a href={videoSurpresa} download="Nosso_Noivado_Gabriel_e_Vitoria.mp4" className="btn-download">
                      <Download size={20} />
                      <span>Guardar nossa lembrança</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Indicador de progresso */}
      {step < 4 && (
        <div className="progresso-dots">
          <div className={`dot ${step >= 0 ? 'active' : ''}`} />
          <div className={`dot ${step >= 1 ? 'active' : ''}`} />
          <div className={`dot ${step >= 2 ? 'active' : ''}`} />
          <div className={`dot ${step >= 3 ? 'active' : ''}`} />
        </div>
      )}
    </div>
  );
}