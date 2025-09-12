import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const DiceVisualizer = ({ isRolling, result, onRollComplete }) => {
  const [currentFace, setCurrentFace] = useState(1);
  const [rollAnimation, setRollAnimation] = useState(false);

  useEffect(() => {
    if (isRolling) {
      setRollAnimation(true);
      
      // Simulate rolling animation
      const rollInterval = setInterval(() => {
        setCurrentFace(Math.floor(Math.random() * 6) + 1);
      }, 100);

      // Stop animation after 2 seconds and show result
      setTimeout(() => {
        clearInterval(rollInterval);
        setCurrentFace(result);
        setRollAnimation(false);
        onRollComplete();
      }, 2000);

      return () => clearInterval(rollInterval);
    }
  }, [isRolling, result, onRollComplete]);

  const getDiceIcon = (face) => {
    const diceIcons = {
      1: 'Dice1',
      2: 'Dice2',
      3: 'Dice3',
      4: 'Dice4',
      5: 'Dice5',
      6: 'Dice6'
    };
    return diceIcons?.[face] || 'Dice1';
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Dice Container */}
        <div className={`
          w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 
          bg-gradient-to-br from-card to-muted 
          rounded-2xl border-2 border-border 
          flex items-center justify-center
          shadow-gaming-lg
          ${rollAnimation ? 'animate-bounce' : ''}
          ${isRolling ? 'scale-110' : 'scale-100'}
          transition-all duration-300
        `}>
          <Icon 
            name={getDiceIcon(currentFace)} 
            size={80} 
            className={`
              text-primary
              ${rollAnimation ? 'animate-spin' : ''}
              transition-all duration-200
            `}
          />
        </div>

        {/* Rolling Effect Overlay */}
        {isRolling && (
          <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-pulse"></div>
        )}

        {/* Glow Effect for Win */}
        {!isRolling && result && (
          <div className="absolute -inset-2 bg-gradient-to-r from-success/20 to-primary/20 rounded-3xl blur-lg opacity-75 animate-pulse"></div>
        )}
      </div>

      {/* Dice Value Display */}
      <div className="mt-6 text-center">
        <div className="text-4xl md:text-5xl font-bold text-foreground font-mono mb-2">
          {isRolling ? '?' : currentFace}
        </div>
        <p className="text-text-secondary text-sm">
          {isRolling ? 'Rolling...' : 'Dice Result'}
        </p>
      </div>

      {/* Roll Status */}
      <div className="mt-4 flex items-center space-x-2">
        {isRolling ? (
          <>
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
            <span className="text-warning text-sm font-medium">Processing Roll</span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-success text-sm font-medium">Ready to Roll</span>
          </>
        )}
      </div>
    </div>
  );
};

export default DiceVisualizer;