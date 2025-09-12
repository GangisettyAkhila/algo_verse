import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GameResult = ({ 
  result, 
  prediction, 
  betAmount, 
  won, 
  payout, 
  onPlayAgain, 
  onNewBet,
  isVisible 
}) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isVisible && result) {
      setShowAnimation(true);
      
      // Reset animation after it completes
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, result]);

  if (!isVisible || !result) {
    return null;
  }

  const getDiceIcon = (diceResult) => {
    const diceIcons = {
      1: 'Dice1',
      2: 'Dice2',
      3: 'Dice3',
      4: 'Dice4',
      5: 'Dice5',
      6: 'Dice6'
    };
    return diceIcons?.[diceResult] || 'Dice1';
  };

  const getResultMessage = () => {
    const predictionText = prediction === 'over' ? 'Over 3.5' : 'Under 3.5';
    const resultText = result > 3.5 ? 'over 3.5' : 'under 3.5';
    
    return {
      prediction: predictionText,
      result: `Dice rolled ${result} (${resultText})`,
      outcome: won ? 'Prediction Correct!' : 'Prediction Incorrect'
    };
  };

  const resultMessage = getResultMessage();
  const profit = won ? payout - betAmount : -betAmount;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-300 p-4">
      <div className={`
        bg-card border border-border rounded-lg p-8 max-w-md w-full
        ${showAnimation ? (won ? 'win-animation' : 'animate-pulse') : ''}
        shadow-gaming-lg
      `}>
        {/* Result Header */}
        <div className="text-center mb-6">
          <div className={`
            w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center
            ${won ? 'bg-success/20 border-2 border-success' : 'bg-error/20 border-2 border-error'}
          `}>
            <Icon 
              name={won ? "Trophy" : "X"} 
              size={40} 
              className={won ? 'text-success' : 'text-error'}
            />
          </div>
          
          <h2 className={`
            text-2xl font-bold mb-2
            ${won ? 'text-success' : 'text-error'}
          `}>
            {won ? 'You Won!' : 'You Lost!'}
          </h2>
          
          <p className="text-text-secondary">
            {resultMessage?.outcome}
          </p>
        </div>

        {/* Game Details */}
        <div className="space-y-4 mb-6">
          {/* Dice Result */}
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <Icon 
              name={getDiceIcon(result)} 
              size={48} 
              className="text-primary mx-auto mb-2"
            />
            <div className="text-lg font-semibold text-foreground mb-1">
              Rolled {result}
            </div>
            <div className="text-sm text-text-secondary">
              {resultMessage?.result}
            </div>
          </div>

          {/* Bet Summary */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Your Prediction:</span>
              <span className={`
                font-medium px-2 py-1 rounded text-sm
                ${prediction === 'over' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}
              `}>
                {resultMessage?.prediction}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Bet Amount:</span>
              <span className="font-mono text-foreground">{betAmount?.toFixed(3)} ALGO</span>
            </div>
            
            {won && (
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Payout:</span>
                <span className="font-mono text-success font-semibold">{payout?.toFixed(3)} ALGO</span>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-2 border-t border-border">
              <span className="font-medium text-foreground">Net Result:</span>
              <span className={`
                font-mono text-lg font-bold
                ${profit >= 0 ? 'text-success' : 'text-error'}
              `}>
                {profit >= 0 ? '+' : ''}{profit?.toFixed(3)} ALGO
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onNewBet}
            className="flex-1"
            iconName="RotateCcw"
            iconPosition="left"
          >
            New Bet
          </Button>
          <Button
            variant="default"
            onClick={onPlayAgain}
            className="flex-1"
            iconName="Play"
            iconPosition="left"
          >
            Play Again
          </Button>
        </div>

        {/* Additional Stats */}
        <div className="mt-6 pt-4 border-t border-border text-center">
          <div className="text-xs text-text-secondary space-y-1">
            <p>Transaction processed on Algorand blockchain</p>
            <p className="font-mono">Hash: 0x742d35cc6bf4f2a1...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameResult;