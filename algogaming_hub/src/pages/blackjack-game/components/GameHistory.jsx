import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GameHistory = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock game history data
  const gameHistory = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 300000),
      playerCards: [
        { suit: 'hearts', value: 'K', displayValue: 'K' },
        { suit: 'spades', value: 'A', displayValue: 'A' }
      ],
      dealerCards: [
        { suit: 'clubs', value: '10', displayValue: '10' },
        { suit: 'diamonds', value: '9', displayValue: '9' }
      ],
      playerValue: 21,
      dealerValue: 19,
      betAmount: 1.5,
      winAmount: 2.25,
      result: 'blackjack',
      transactionHash: '0x742d35cc6bf4f2a'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 600000),
      playerCards: [
        { suit: 'hearts', value: '8', displayValue: '8' },
        { suit: 'spades', value: '7', displayValue: '7' },
        { suit: 'clubs', value: '9', displayValue: '9' }
      ],
      dealerCards: [
        { suit: 'diamonds', value: 'Q', displayValue: 'Q' },
        { suit: 'hearts', value: '6', displayValue: '6' }
      ],
      playerValue: 24,
      dealerValue: 16,
      betAmount: 0.5,
      winAmount: 0,
      result: 'bust',
      transactionHash: '0x8a3f21bc9de7c45'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 900000),
      playerCards: [
        { suit: 'clubs', value: '9', displayValue: '9' },
        { suit: 'diamonds', value: '9', displayValue: '9' }
      ],
      dealerCards: [
        { suit: 'hearts', value: 'J', displayValue: 'J' },
        { suit: 'spades', value: '8', displayValue: '8' }
      ],
      playerValue: 18,
      dealerValue: 18,
      betAmount: 2.0,
      winAmount: 2.0,
      result: 'push',
      transactionHash: '0x5c9e84fd2a1b678'
    }
  ];

  const getResultIcon = (result) => {
    switch (result) {
      case 'blackjack': case'win':
        return 'Trophy';
      case 'bust': case'lose':
        return 'XCircle';
      case 'push':
        return 'Equal';
      default:
        return 'HelpCircle';
    }
  };

  const getResultColor = (result) => {
    switch (result) {
      case 'blackjack': case'win':
        return 'text-success';
      case 'bust': case'lose':
        return 'text-error';
      case 'push':
        return 'text-text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const getResultLabel = (result) => {
    switch (result) {
      case 'blackjack':
        return 'Blackjack!';
      case 'win':
        return 'Win';
      case 'bust':
        return 'Bust';
      case 'lose':
        return 'Lose';
      case 'push':
        return 'Push';
      default:
        return 'Unknown';
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getSuitSymbol = (suit) => {
    switch (suit) {
      case 'hearts': return '♥️';
      case 'diamonds': return '♦️';
      case 'clubs': return '♣️';
      case 'spades': return '♠️';
      default: return '♠️';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="History" size={16} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Game History</h3>
              <p className="text-xs text-text-secondary">Recent hands played</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* History List */}
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-48'} overflow-y-auto`}>
        {gameHistory?.length === 0 ? (
          <div className="p-6 text-center text-text-secondary">
            <Icon name="Clock" size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No games played yet</p>
            <p className="text-xs mt-1">Your game history will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {gameHistory?.map((game) => (
              <div key={game?.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getResultIcon(game?.result)} 
                      size={16} 
                      className={getResultColor(game?.result)} 
                    />
                    <span className={`text-sm font-medium ${getResultColor(game?.result)}`}>
                      {getResultLabel(game?.result)}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-secondary">{formatTime(game?.timestamp)}</p>
                    <p className={`text-sm font-mono font-medium ${
                      game?.winAmount > game?.betAmount ? 'text-success' :
                      game?.winAmount === game?.betAmount ? 'text-text-secondary': 'text-error'
                    }`}>
                      {game?.winAmount > game?.betAmount ? '+' : ''}
                      {(game?.winAmount - game?.betAmount)?.toFixed(2)} ALGO
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  {/* Player Hand */}
                  <div>
                    <p className="text-text-secondary mb-1">Your Hand ({game?.playerValue})</p>
                    <div className="flex space-x-1">
                      {game?.playerCards?.map((card, index) => (
                        <div key={index} className="flex items-center space-x-0.5">
                          <span className="font-mono">{card?.displayValue}</span>
                          <span>{getSuitSymbol(card?.suit)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dealer Hand */}
                  <div>
                    <p className="text-text-secondary mb-1">Dealer ({game?.dealerValue})</p>
                    <div className="flex space-x-1">
                      {game?.dealerCards?.map((card, index) => (
                        <div key={index} className="flex items-center space-x-0.5">
                          <span className="font-mono">{card?.displayValue}</span>
                          <span>{getSuitSymbol(card?.suit)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-border/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">
                      Bet: {game?.betAmount?.toFixed(2)} ALGO
                    </span>
                    <span className="font-mono text-text-secondary">
                      {game?.transactionHash?.substring(0, 10)}...
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer Stats */}
      <div className="p-4 bg-muted/30 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-text-secondary">Games</p>
            <p className="font-mono text-sm font-medium text-foreground">{gameHistory?.length}</p>
          </div>
          <div>
            <p className="text-xs text-text-secondary">Win Rate</p>
            <p className="font-mono text-sm font-medium text-success">
              {gameHistory?.length > 0 ? 
                Math.round((gameHistory?.filter(g => ['win', 'blackjack']?.includes(g?.result))?.length / gameHistory?.length) * 100) : 0}%
            </p>
          </div>
          <div>
            <p className="text-xs text-text-secondary">Net P&L</p>
            <p className={`font-mono text-sm font-medium ${
              gameHistory?.reduce((sum, g) => sum + (g?.winAmount - g?.betAmount), 0) >= 0 ? 'text-success' : 'text-error'
            }`}>
              {gameHistory?.reduce((sum, g) => sum + (g?.winAmount - g?.betAmount), 0)?.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHistory;