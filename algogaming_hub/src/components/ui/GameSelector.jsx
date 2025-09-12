import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const GameSelector = ({ className = '' }) => {
  const games = [
    {
      id: 'dice',
      title: 'Dice Game',
      description: 'Roll the dice and predict the outcome',
      path: '/dice-game',
      icon: 'Dice1',
      color: 'from-primary to-secondary',
      difficulty: 'Easy',
      minBet: '0.01 ETH',
      maxWin: '10x'
    },
    {
      id: 'wheel',
      title: 'Spin Wheel',
      description: 'Spin the wheel of fortune',
      path: '/spin-wheel-game',
      icon: 'RotateCcw',
      color: 'from-accent to-warning',
      difficulty: 'Medium',
      minBet: '0.05 ETH',
      maxWin: '36x'
    },
    {
      id: 'blackjack',
      title: 'Blackjack',
      description: 'Beat the dealer with 21',
      path: '/blackjack-game',
      icon: 'Spade',
      color: 'from-secondary to-accent',
      difficulty: 'Hard',
      minBet: '0.1 ETH',
      maxWin: '3x'
    }
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Choose Your Game</h2>
        <p className="text-text-secondary">Select a game to start playing and winning</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {games?.map((game) => (
          <Link
            key={game?.id}
            to={game?.path}
            className="group block micro-interaction hover:scale-105"
          >
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-gaming-md hover:shadow-gaming-lg transition-all duration-300">
              {/* Game Icon Header */}
              <div className={`relative h-32 bg-gradient-to-br ${game?.color} flex items-center justify-center`}>
                <Icon 
                  name={game?.icon} 
                  size={48} 
                  color="#FFFFFF" 
                  strokeWidth={1.5}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-black/20 backdrop-blur-sm rounded text-xs text-white font-medium">
                    {game?.difficulty}
                  </span>
                </div>
              </div>

              {/* Game Details */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {game?.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                  {game?.description}
                </p>

                {/* Game Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-text-secondary">Min Bet</span>
                    <span className="font-mono text-xs text-foreground">{game?.minBet}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-text-secondary">Max Win</span>
                    <span className="font-mono text-xs text-success font-medium">{game?.maxWin}</span>
                  </div>
                </div>

                {/* Play Button */}
                <Button 
                  variant="default" 
                  className="w-full group-hover:bg-primary/90"
                  iconName="Play"
                  iconPosition="left"
                >
                  Play Now
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="text-center p-6 bg-card rounded-lg border border-border">
          <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Users" size={24} color="var(--color-success)" />
          </div>
          <h4 className="font-semibold text-foreground mb-1">1,247</h4>
          <p className="text-sm text-text-secondary">Active Players</p>
        </div>

        <div className="text-center p-6 bg-card rounded-lg border border-border">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="TrendingUp" size={24} color="var(--color-primary)" />
          </div>
          <h4 className="font-semibold text-foreground mb-1 font-mono">847.2 ETH</h4>
          <p className="text-sm text-text-secondary">Total Winnings</p>
        </div>

        <div className="text-center p-6 bg-card rounded-lg border border-border">
          <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Shield" size={24} color="var(--color-accent)" />
          </div>
          <h4 className="font-semibold text-foreground mb-1">100%</h4>
          <p className="text-sm text-text-secondary">Provably Fair</p>
        </div>
      </div>
    </div>
  );
};

export default GameSelector;