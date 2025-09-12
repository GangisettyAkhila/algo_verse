import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const WinCelebration = ({ isVisible, winAmount, winningNumber, onClose, className = '' }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-300 flex items-center justify-center bg-black/50 backdrop-blur-sm ${className}`}>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 })?.map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
          {Array.from({ length: 30 })?.map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute w-1 h-4 bg-accent animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      )}
      {/* Win Modal */}
      <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full mx-4 shadow-gaming-lg win-animation">
        <div className="text-center">
          {/* Trophy Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-warning to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-gaming-md">
            <Icon name="Trophy" size={40} color="#FFFFFF" />
          </div>

          {/* Congratulations Text */}
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Congratulations!
          </h2>
          <p className="text-text-secondary mb-6">
            You won on number {winningNumber}!
          </p>

          {/* Win Amount */}
          <div className="bg-gradient-to-r from-primary/20 to-success/20 rounded-lg p-6 mb-6 border border-primary/30">
            <div className="text-sm text-text-secondary mb-1">You Won</div>
            <div className="font-mono text-4xl font-bold text-success mb-2">
              +{winAmount?.toFixed(2)} ALGO
            </div>
            <div className="text-sm text-text-secondary">
              ≈ ${(winAmount * 1.68)?.toFixed(2)} USD
            </div>
          </div>

          {/* Winning Details */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-sm text-text-secondary">Winning Number</div>
                <div className="font-mono text-xl font-bold text-primary">{winningNumber}</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center">
                <div className="text-sm text-text-secondary">Multiplier</div>
                <div className="font-mono text-xl font-bold text-accent">35x</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors micro-interaction"
            >
              <Icon name="RotateCcw" size={18} className="inline mr-2" />
              Play Again
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors micro-interaction"
            >
              <Icon name="TrendingUp" size={18} className="inline mr-2" />
              View Stats
            </button>
          </div>

          {/* Social Share */}
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs text-text-secondary mb-3">Share your win</p>
            <div className="flex justify-center space-x-3">
              <button className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors">
                <Icon name="Share2" size={16} className="text-text-secondary" />
              </button>
              <button className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors">
                <Icon name="Copy" size={16} className="text-text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinCelebration;