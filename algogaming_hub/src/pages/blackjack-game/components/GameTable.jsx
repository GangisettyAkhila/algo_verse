import React from 'react';
import Icon from '../../../components/AppIcon';

const GameTable = ({ 
  dealerCards, 
  playerCards, 
  dealerValue, 
  playerValue, 
  gameState, 
  isDealing 
}) => {
  const renderCard = (card, index, isHidden = false) => {
    if (isHidden) {
      return (
        <div 
          key={`hidden-${index}`}
          className="w-16 h-24 bg-gradient-to-br from-accent to-secondary rounded-lg border border-border shadow-gaming-md flex items-center justify-center transform rotate-1"
        >
          <div className="w-8 h-8 bg-background/20 rounded-full flex items-center justify-center">
            <Icon name="Eye" size={16} color="#FFFFFF" />
          </div>
        </div>
      );
    }

    const getSuitIcon = (suit) => {
      switch (suit) {
        case 'hearts': return '♥️';
        case 'diamonds': return '♦️';
        case 'clubs': return '♣️';
        case 'spades': return '♠️';
        default: return '♠️';
      }
    };

    const getSuitColor = (suit) => {
      return ['hearts', 'diamonds']?.includes(suit) ? 'text-error' : 'text-foreground';
    };

    return (
      <div 
        key={`${card?.suit}-${card?.value}-${index}`}
        className={`
          w-16 h-24 bg-card border border-border rounded-lg shadow-gaming-md 
          flex flex-col items-center justify-between p-2 transform
          ${isDealing ? 'animate-pulse' : 'hover:scale-105'}
          transition-all duration-300
        `}
        style={{
          transform: `rotate(${(index - 1) * 2}deg) translateY(${index * -2}px)`,
          zIndex: index + 1
        }}
      >
        <div className={`text-sm font-bold ${getSuitColor(card?.suit)}`}>
          {card?.displayValue}
        </div>
        <div className="text-2xl">
          {getSuitIcon(card?.suit)}
        </div>
        <div className={`text-sm font-bold ${getSuitColor(card?.suit)} transform rotate-180`}>
          {card?.displayValue}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-surface/50 to-muted/30 rounded-xl border border-border p-8">
      {/* Dealer Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
              <Icon name="Bot" size={20} color="var(--color-accent)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Dealer</h3>
              <p className="text-sm text-text-secondary">
                Value: {gameState === 'playing' && dealerCards?.length > 1 ? '?' : dealerValue}
              </p>
            </div>
          </div>
          
          {gameState !== 'betting' && (
            <div className="px-3 py-1 bg-accent/20 rounded-full border border-accent/30">
              <span className="text-sm font-medium text-accent">
                {gameState === 'playing' ? 'Hidden' : `${dealerValue} points`}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center min-h-[120px]">
          {dealerCards?.length === 0 ? (
            <div className="text-center text-text-secondary">
              <Icon name="Shuffle" size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">Waiting for cards...</p>
            </div>
          ) : (
            <div className="flex space-x-2 relative">
              {dealerCards?.map((card, index) => 
                renderCard(card, index, gameState === 'playing' && index === 1)
              )}
            </div>
          )}
        </div>
      </div>
      {/* Game Status */}
      <div className="text-center mb-8">
        {gameState === 'betting' && (
          <div className="px-4 py-2 bg-primary/20 rounded-lg border border-primary/30">
            <span className="text-primary font-medium">Place your bet to start</span>
          </div>
        )}
        
        {gameState === 'playing' && (
          <div className="px-4 py-2 bg-warning/20 rounded-lg border border-warning/30">
            <span className="text-warning font-medium">Your turn - Choose your action</span>
          </div>
        )}
        
        {gameState === 'dealer-turn' && (
          <div className="px-4 py-2 bg-accent/20 rounded-lg border border-accent/30">
            <span className="text-accent font-medium">Dealer is playing...</span>
          </div>
        )}
      </div>
      {/* Player Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="User" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">You</h3>
              <p className="text-sm text-text-secondary">
                Value: {playerValue}
              </p>
            </div>
          </div>
          
          {playerCards?.length > 0 && (
            <div className={`
              px-3 py-1 rounded-full border
              ${playerValue === 21 ? 'bg-success/20 border-success/30 text-success' :
                playerValue > 21 ? 'bg-error/20 border-error/30 text-error': 'bg-primary/20 border-primary/30 text-primary'}
            `}>
              <span className="text-sm font-medium">
                {playerValue === 21 ? 'Blackjack!' :
                 playerValue > 21 ? 'Bust!' :
                 `${playerValue} points`}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center min-h-[120px]">
          {playerCards?.length === 0 ? (
            <div className="text-center text-text-secondary">
              <Icon name="Cards" size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">Your cards will appear here</p>
            </div>
          ) : (
            <div className="flex space-x-2 relative">
              {playerCards?.map((card, index) => renderCard(card, index))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameTable;