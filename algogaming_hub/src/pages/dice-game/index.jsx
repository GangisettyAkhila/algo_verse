import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import TransactionStatus from '../../components/ui/TransactionStatus';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import dice game components
import DiceVisualizer from './components/DiceVisualizer';
import BettingControls from './components/BettingControls';
import GameHistory from './components/GameHistory';
import BalanceDisplay from './components/BalanceDisplay';
import GameResult from './components/GameResult';

const DiceGame = () => {
  // Game state
  const [balance, setBalance] = useState(12.847);
  const [betAmount, setBetAmount] = useState(1.0);
  const [prediction, setPrediction] = useState('');
  const [isRolling, setIsRolling] = useState(false);
  const [diceResult, setDiceResult] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isBalanceUpdating, setIsBalanceUpdating] = useState(false);

  // Handle dice roll completion
  const handleRollComplete = () => {
    // Simulate game result calculation
    const won = (prediction === 'over' && diceResult > 3.5) || 
                 (prediction === 'under' && diceResult <= 3.5);
    
    const payout = won ? betAmount * 2 : 0;
    const newBalance = won ? balance + payout : balance - betAmount;
    
    setGameResult({
      result: diceResult,
      prediction,
      betAmount,
      won,
      payout,
      profit: won ? payout - betAmount : -betAmount
    });
    
    // Update balance
    setIsBalanceUpdating(true);
    setTimeout(() => {
      setBalance(newBalance);
      setIsBalanceUpdating(false);
      setShowResult(true);
    }, 500);
  };

  // Handle bet placement
  const handlePlaceBet = () => {
    if (!prediction || betAmount <= 0 || betAmount > balance) return;
    
    // Generate random dice result
    const result = Math.floor(Math.random() * 6) + 1;
    setDiceResult(result);
    setIsRolling(true);
  };


  // Handle play again with same bet
  const handlePlayAgain = () => {
    setShowResult(false);
    setGameResult(null);
    setDiceResult(null);
    
    // Small delay before allowing new bet
    // Removed automatic handlePlaceBet call to prevent continuous iteration
    // setTimeout(() => {
    //   handlePlaceBet();
    // }, 500);
  };

  // Handle new bet setup
  const handleNewBet = () => {
    setShowResult(false);
    setGameResult(null);
    setDiceResult(null);
    setPrediction('');
    setBetAmount(1.0);
  };

  // Other games for quick navigation
  const otherGames = [
    {
      name: 'Spin Wheel',
      path: '/spin-wheel-game',
      icon: 'RotateCcw',
      color: 'from-accent to-warning'
    },
    {
      name: 'Blackjack',
      path: '/blackjack-game',
      icon: 'Spade',
      color: 'from-secondary to-accent'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Breadcrumb */}
          <div className="mb-6">
            <NavigationBreadcrumb />
          </div>

          {/* Game Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Dice1" size={24} color="#FFFFFF" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Dice Game</h1>
                <p className="text-text-secondary">Predict the dice roll outcome</p>
              </div>
            </div>
            
            {/* Game Status */}
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-success">Live Game</span>
              </div>
              <span className="text-text-secondary">•</span>
              <span className="text-text-secondary">Provably Fair</span>
              <span className="text-text-secondary">•</span>
              <span className="text-text-secondary">2x Payout</span>
            </div>
          </div>

          {/* Main Game Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Balance & History */}
            <div className="space-y-6">
              <BalanceDisplay 
                balance={balance}
                isUpdating={isBalanceUpdating}
              />
              
              <div className="lg:hidden">
                <GameHistory />
              </div>
            </div>

            {/* Center Column - Game Area */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <DiceVisualizer
                  isRolling={isRolling}
                  result={diceResult}
                  onRollComplete={handleRollComplete}
                />
              </div>

              <BettingControls
                betAmount={betAmount}
                setBetAmount={setBetAmount}
                prediction={prediction}
                setPrediction={setPrediction}
                onPlaceBet={handlePlaceBet}
                isRolling={isRolling}
                balance={balance}
              />
            </div>

            {/* Right Column - Game History & Other Games */}
            <div className="space-y-6">
              <div className="hidden lg:block">
                <GameHistory />
              </div>

              {/* Other Games */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Other Games</h3>
                <div className="space-y-3">
                  {otherGames?.map((game) => (
                    <Link
                      key={game?.path}
                      to={game?.path}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 micro-interaction group"
                    >
                      <div className={`w-10 h-10 bg-gradient-to-br ${game?.color} rounded-lg flex items-center justify-center`}>
                        <Icon name={game?.icon} size={20} color="#FFFFFF" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {game?.name}
                        </div>
                        <div className="text-xs text-text-secondary">Play now</div>
                      </div>
                      <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Today's Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Games Played</span>
                    <span className="font-semibold text-foreground">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Win Rate</span>
                    <span className="font-semibold text-success">58.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Net Profit</span>
                    <span className="font-semibold text-success font-mono">+2.45 ALGO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-only Quick Actions */}
          <div className="lg:hidden mt-8 flex space-x-4">
            <Button variant="outline" className="flex-1" iconName="BarChart3" iconPosition="left">
              <Link to="/leaderboard">Leaderboard</Link>
            </Button>
            <Button variant="outline" className="flex-1" iconName="User" iconPosition="left">
              <Link to="/user-profile">Profile</Link>
            </Button>
          </div>
        </div>
      </main>
      {/* Game Result Modal */}
      <GameResult
        result={gameResult?.result}
        prediction={gameResult?.prediction}
        betAmount={gameResult?.betAmount}
        won={gameResult?.won}
        payout={gameResult?.payout}
        onPlayAgain={handlePlayAgain}
        onNewBet={handleNewBet}
        isVisible={showResult}
      />
      {/* Transaction Status */}
      <TransactionStatus />
    </div>
  );
};

export default DiceGame;