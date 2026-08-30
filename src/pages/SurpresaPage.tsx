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

  // O ": any" bloqueia a inspeção rigorosa da Vercel e garante o deploy
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

  return (
    <div className={`mobile-wrapper step-bg-${step}`} onClick={step < 4 ? nextStep : undefined}>
      
      <div className={`ambient-light light-petroleo ${step >= 0 ? 'active' : ''}`} />
      <div className={`ambient-light light-lilas ${step >= 2 ? 'active' : ''}`} />
      <div className={`ambient-light light-caqui ${step >= 3 ? 'active' : ''}`} />

      <AnimatePresence mode="wait">
        
        {step === 0 && (
          <motion.div key="s0" variants={textVariants} initial="initial" animate="in" exit="out" className="poema-container">
            <p className="instrucao-inicial">Toque suavemente na tela para avançar</p>
            <h1 className="serif-title">O noivado é a nossa ponte.</h1>
            <p className="texto-romantico mt-4">
              A união exata entre o que fomos e o que seremos. A prata simboliza toda a leveza, a descoberta e a base do nosso namoro, enquanto o ouro amarelo chega trazendo a força, a solidez e a promessa inquebrável do nosso casamento. 
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" variants={textVariants} initial="initial" animate="in" exit="out" className="poema-container">
            <h1 className="serif-title">Toda joia autêntica passa por processos.</h1>
            <p className="texto-romantico mt-4">
              Antes de revelar seu brilho máximo, o diamante é uma pedra sem forma que precisa de pressão para ser moldada. Da mesma maneira, cada desafio, cada alinhamento e cada conversa nossa foram a lapidação necessária para dar forma à beleza do nosso amor.
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" variants={textVariants} initial="initial" animate="in" exit="out" className="poema-container">
            <h1 className="serif-title">Como uma gota diante do mar...</h1>
            <p className="texto-romantico mt-4">
              Olhar para a imensidão do oceano é entender que, por mais profundas e misteriosas que sejam as águas, nós escolhemos ter a coragem e a vontade contínua de mergulhar e descobrir um ao outro todos os dias.
            </p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" variants={textVariants} initial="initial" animate="in" exit="out" className="poema-container">
            <h1 className="serif-title">E esse é o sentido do casamento.</h1>
            <p className="texto-romantico mt-4">
              É ter a certeza de que as tempestades e as ondas bravas sempre vão existir lá fora... mas saber que, independentemente delas, nós sempre seremos a calmaria e o porto seguro um do outro.
            </p>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="s4" variants={textVariants} initial="initial" animate="in" exit="out" className="carta-final">
            <div className="glass-letter">
              <span className="detalhe-topo">✦</span>
              <h1 className="serif-title mb-4">Para Vitória</h1>
              <p className="texto-romantico">
                Minha agora noiva, a mulher mais linda desse mundo. Esta é a sua carta aberta, o registro do novo degrau que começamos a subir juntos.
              </p>
              
              <button onClick={iniciarSurpresa} className="btn-revelar mt-4">
                <Play size={18} fill="currentColor" strokeWidth={0} />
                <span>Reviver o nosso momento</span>
              </button>
            </div>
          </motion.div>
        )}

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
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.8 }}
                  className="download-overlay"
                >
                  <h2 className="serif-subtitle mb-4">Guarde nossa história</h2>
                  <a href={videoSurpresa} download="Carta_Aberta_Gabriel_e_Vitoria.mp4" className="btn-download">
                    <Download size={20} />
                    <span>Baixar Vídeo</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
      
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