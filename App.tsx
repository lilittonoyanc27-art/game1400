import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Timer, 
  RotateCcw, 
  ChevronRight, 
  Play, 
  Trophy,
  CheckCircle2,
  XCircle,
  Flag,
  User,
  Zap,
  Info,
  Activity,
  Flame
} from 'lucide-react';
import { 
  VENIR_IR_QUESTIONS, 
  PLAYER_CONFIG,
  RACE_ASSETS,
  RaceQuestion
} from './constants';

type GameState = 'start' | 'playing' | 'end';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gorPosition, setGorPosition] = useState(0);
  const [gayanePosition, setGayanePosition] = useState(0);
  const [activePlayer, setActivePlayer] = useState<'Gor' | 'Gayane'>('Gor');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const totalSteps = 5; // Steps to reach finish line

  const shuffledQuestions = useMemo(() => {
    return [...VENIR_IR_QUESTIONS].sort(() => Math.random() - 0.5);
  }, [gameState === 'playing' && currentIndex === 0]);

  const currentQuestion = shuffledQuestions[currentIndex];

  const handleAnswer = (idx: number) => {
    if (feedback || winner) return;

    const isCorrect = idx === currentQuestion.correctIndex;
    
    if (isCorrect) {
      if (activePlayer === 'Gor') {
        setGorPosition(prev => {
          const next = prev + 1;
          if (next >= totalSteps && !winner) setWinner('Gor');
          return next;
        });
      } else {
        setGayanePosition(prev => {
          const next = prev + 1;
          if (next >= totalSteps && !winner) setWinner('Gayane');
          return next;
        });
      }
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (winner) {
      setGameState('end');
      return;
    }
    setFeedback(null);
    setShowExplanation(false);
    setActivePlayer(prev => prev === 'Gor' ? 'Gayane' : 'Gor');
    
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setGameState('end');
    }
  };

  const restart = () => {
    setGameState('start');
    setCurrentIndex(0);
    setGorPosition(0);
    setGayanePosition(0);
    setActivePlayer('Gor');
    setFeedback(null);
    setShowExplanation(false);
    setWinner(null);
  };

  const gorProgress = (gorPosition / totalSteps) * 100;
  const gayaneProgress = (gayanePosition / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans selection:bg-blue-500/30 overflow-hidden relative">
      {/* 3D Track Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={RACE_ASSETS.track} 
          className="w-full h-full object-cover opacity-20 scale-110" 
          alt="Track" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-neutral-900" />
        
        {/* Track Lines */}
        <div className="absolute inset-x-0 bottom-1/4 h-2 bg-white/10 skew-y-[-5deg]" />
        <div className="absolute inset-x-0 bottom-1/3 h-1 bg-white/5 skew-y-[-5deg]" />
      </div>

      <AnimatePresence mode="wait">
        {/* --- START SCREEN --- */}
        {gameState === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center"
          >
             <div className="flex gap-8 md:gap-16 mb-12 items-baseline">
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="relative"
                >
                   <img src={PLAYER_CONFIG.GOR.avatar} className="w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-blue-500 object-cover shadow-[0_0_40px_rgba(59,130,246,0.3)]" referrerPolicy="no-referrer" />
                   <div className="absolute -bottom-4 inset-x-0 bg-blue-500 text-white py-1 rounded-full text-xs font-black uppercase tracking-widest">{PLAYER_CONFIG.GOR.name}</div>
                </motion.div>

                <div className="text-4xl font-black italic text-neutral-500">VS</div>

                <motion.div 
                   initial={{ x: 100, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   className="relative"
                >
                   <img src={PLAYER_CONFIG.GAYANE.avatar} className="w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-pink-500 object-cover shadow-[0_0_40px_rgba(236,72,153,0.3)]" referrerPolicy="no-referrer" />
                   <div className="absolute -bottom-4 inset-x-0 bg-pink-500 text-white py-1 rounded-full text-xs font-black uppercase tracking-widest">{PLAYER_CONFIG.GAYANE.name}</div>
                </motion.div>
             </div>

             <h1 className="text-5xl md:text-9xl font-black mb-6 tracking-tighter uppercase italic leading-none">
                ՎԱԶՔ <br/> <span className="text-blue-500">ԻՍՊԱՆԵՐԵՆՈՎ</span>
             </h1>

             <p className="max-w-xl text-lg md:text-xl text-neutral-400 mb-12 font-medium">
                Ճիշտ պատասխանիր <span className="text-white font-bold italic">Venir</span> և <span className="text-white font-bold italic">Ir</span> բայերի հարցերին: Գոռն ու Գայանեն պատասխանում են հերթով: Ով առաջինը հավաքի 5 ճիշտ պատասխան, կհաղթի մրցույթում:
             </p>

             <button 
               onClick={() => setGameState('playing')}
               className="group relative px-16 py-8 bg-white text-neutral-950 rounded-2xl font-black text-2xl hover:bg-blue-500 hover:text-white transition-all shadow-2xl flex items-center gap-6 uppercase"
             >
               ՍԿՍԵԼ ՄՐՑՈՒՅԹԸ <Activity className="w-8 h-8 group-hover:rotate-12 transition-transform" />
             </button>
          </motion.div>
        )}

        {/* --- GAMEPLAY --- */}
        {gameState === 'playing' && (
          <motion.div 
             key="playing"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="relative z-10 min-h-screen flex flex-col"
          >
             {/* Race Track Header */}
             <div className="w-full bg-neutral-900/80 backdrop-blur-3xl border-b border-white/10 p-6 md:p-10">
                <div className="max-w-6xl mx-auto space-y-12">
                   {/* Gor Track */}
                   <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-widest text-blue-400">Գոռ</span>
                        <div className="flex items-center gap-2">
                           <Zap size={14} className="text-yellow-400" />
                           <span className="font-mono text-xs">{Math.round(gorProgress)}%</span>
                        </div>
                      </div>
                      <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
                         <motion.div 
                           className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                           initial={{ width: 0 }}
                           animate={{ width: `${gorProgress}%` }}
                         />
                         <motion.div 
                            animate={{ x: `${gorProgress}%` }}
                            className="absolute -top-2 left-0 transform -translate-x-full"
                         >
                            <img src={PLAYER_CONFIG.GOR.avatar} className="w-8 h-8 rounded-full border-2 border-blue-500 shadow-xl object-cover" referrerPolicy="no-referrer" />
                         </motion.div>
                      </div>
                   </div>

                   {/* Gayane Track */}
                   <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-widest text-pink-400">Գայանե</span>
                        <div className="flex items-center gap-2">
                           <Flame size={14} className="text-orange-400" />
                           <span className="font-mono text-xs">{Math.round(gayaneProgress)}%</span>
                        </div>
                      </div>
                      <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
                         <motion.div 
                           className="h-full bg-pink-50 shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                           initial={{ width: 0 }}
                           animate={{ width: `${gayaneProgress}%` }}
                         />
                         <motion.div 
                            animate={{ x: `${gayaneProgress}%` }}
                            className="absolute -top-2 left-0 transform -translate-x-full"
                         >
                            <img src={PLAYER_CONFIG.GAYANE.avatar} className="w-8 h-8 rounded-full border-2 border-pink-500 shadow-xl object-cover" referrerPolicy="no-referrer" />
                         </motion.div>
                      </div>
                   </div>

                   <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-yellow-400 to-transparent shadow-[0_0_20px_rgba(250,204,21,0.5)] flex items-center justify-center">
                      <Flag className="text-yellow-400 absolute -top-8" size={24} />
                   </div>
                </div>
             </div>

             {/* Question Area */}
             <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl w-full"
                >
                    <div className="bg-white/5 backdrop-blur-xl p-8 md:p-16 rounded-[3rem] border border-white/10 shadow-3xl text-center relative overflow-hidden">
                       <div className="flex flex-col items-center gap-4 mb-4">
                          <div className={`relative p-1 rounded-full border-4 transition-all duration-500 ${activePlayer === 'Gor' ? 'border-blue-500 scale-110' : 'border-pink-500 scale-110'}`}>
                             <img 
                               src={activePlayer === 'Gor' ? PLAYER_CONFIG.GOR.avatar : PLAYER_CONFIG.GAYANE.avatar} 
                               className="w-16 h-16 rounded-full object-cover" 
                               referrerPolicy="no-referrer"
                             />
                             <motion.div 
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className={`absolute -bottom-2 -right-2 p-1.5 rounded-full text-white ${activePlayer === 'Gor' ? 'bg-blue-500' : 'bg-pink-500'}`}
                             >
                                <User size={12} />
                             </motion.div>
                          </div>
                          <div className={`font-black uppercase tracking-[0.3em] text-sm italic ${activePlayer === 'Gor' ? 'text-blue-400' : 'text-pink-400'}`}>
                             Հերթը {activePlayer === 'Gor' ? 'Գոռինն' : 'Գայանեինն'} է
                          </div>
                       </div>

                       <h2 className="text-3xl md:text-6xl font-black italic tracking-tighter leading-tight mb-8 text-neutral-100">
                         "{currentQuestion.sentence}"
                      </h2>
                      
                      <p className="text-blue-400/60 font-bold text-lg md:text-2xl mb-12 uppercase italic">
                         {currentQuestion.translation}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         {currentQuestion.options.map((option, idx) => (
                           <button
                             key={idx}
                             disabled={!!feedback}
                             onClick={() => handleAnswer(idx)}
                             className={`group relative py-8 px-4 rounded-[2rem] font-black text-xl md:text-3xl transition-all border-b-8 transform active:scale-95 ${
                                feedback === null 
                                ? 'bg-neutral-800 border-b-black hover:border-blue-500 hover:bg-neutral-700'
                                : idx === currentQuestion.correctIndex 
                                   ? 'bg-blue-500 border-b-blue-700 text-white scale-105 shadow-[0_0_30px_rgba(59,130,246,0.3)]'
                                   : idx === (feedback === 'incorrect' ? currentIndex : -1) ? 'bg-red-500 border-b-red-700 text-white' : 'bg-neutral-900 border-b-black opacity-30 text-neutral-500'
                             }`}
                           >
                              {option}
                           </button>
                         ))}
                      </div>

                      {/* Feedback Layer */}
                      <AnimatePresence>
                         {showExplanation && (
                           <motion.div 
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: 'auto' }}
                             className="overflow-hidden mt-12"
                           >
                              <div className={`p-8 rounded-[2rem] border-2 flex flex-col items-center ${feedback === 'correct' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-pink-500/10 border-pink-500/20 text-pink-400'}`}>
                                 <div className="flex items-center gap-4 mb-4">
                                    {feedback === 'correct' ? (
                                      <CheckCircle2 className="w-10 h-10 text-blue-400" />
                                    ) : (
                                      <XCircle className="w-10 h-10 text-pink-400" />
                                    )}
                                    <h3 className="font-black uppercase text-2xl italic">
                                       {feedback === 'correct' ? 'ՃԻՇՏ Է!' : 'ՍԽԱԼ Է!'}
                                    </h3>
                                 </div>
                                 <p className="text-white/70 max-w-xl mb-10 text-lg">
                                    <Info className="inline-block mr-2 w-5 h-5 text-blue-400" />
                                    {currentQuestion.explanation}
                                 </p>
                                 
                                 <button 
                                   onClick={nextQuestion}
                                   className="group px-16 py-5 bg-white text-neutral-950 rounded-2xl font-black text-xl hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-4 shadow-xl"
                                 >
                                    ՀԱՋՈՐԴԸ <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                 </button>
                              </div>
                           </motion.div>
                         )}
                      </AnimatePresence>
                   </div>
                </motion.div>
             </div>
          </motion.div>
        )}

        {/* --- END SCREEN --- */}
        {gameState === 'end' && (
          <motion.div 
            key="end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center"
          >
             <div className="max-w-4xl w-full bg-neutral-900 border-4 border-white/10 rounded-[5rem] p-12 md:p-24 shadow-2xl relative overflow-hidden">
                <Trophy className={`w-32 h-32 mx-auto mb-10 animate-bounce ${winner === 'Gor' ? 'text-blue-500' : 'text-pink-500'}`} />
                
                <h2 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic leading-none">
                   ՎԵՐՋՆԱԳԻԾ
                </h2>

                <div className="flex flex-col items-center mb-16">
                   <div className="relative mb-8">
                      <img 
                        src={winner === 'Gor' ? PLAYER_CONFIG.GOR.avatar : PLAYER_CONFIG.GAYANE.avatar} 
                        className={`w-48 h-48 rounded-full object-cover border-8 shadow-2xl ${winner === 'Gor' ? 'border-blue-500' : 'border-pink-500'}`} 
                        referrerPolicy="no-referrer"
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }} 
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={`absolute -top-4 -right-4 p-4 rounded-full text-white shadow-xl ${winner === 'Gor' ? 'bg-blue-500' : 'bg-pink-500'}`}
                      >
                         <Trophy size={32} />
                      </motion.div>
                   </div>
                   <h3 className={`text-5xl md:text-7xl font-black italic uppercase ${winner === 'Gor' ? 'text-blue-500' : 'text-pink-500'}`}>
                      {winner === 'Gor' ? 'ԳՈՌԸ ՀԱՂԹԵՑ!' : 'ԳԱՅԱՆԵՆ ՀԱՂԹԵՑ!'}
                   </h3>
                   <p className="text-xl mt-6 font-black opacity-40 uppercase tracking-[0.4em]">Լավագույն վազորդը</p>
                </div>

                <button 
                  onClick={restart}
                  className="w-full py-8 bg-white text-neutral-950 rounded-[3rem] font-black text-3xl hover:bg-blue-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-8 uppercase group"
                >
                  <RotateCcw className="w-12 h-12 group-hover:rotate-180 transition-transform duration-700" />
                  ՍԿՍԵԼ ՆՈՐ ՎԱԶՔ
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
