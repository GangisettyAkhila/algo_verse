import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SpinWheel from './components/SpinWheel';
import BettingControls from './components/BettingControls';
import SpinHistory from './components/SpinHistory';
import GameStats from './components/GameStats';
import WinCelebration from './components/WinCelebration';

const SpinWheelGame = () => {
  const [balance, setBalance] = useState(2.45);
  const [betAmount, setBetAmount] = useState(0.1);
  const [selectedBets, setSelectedBets] = useState({});
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [showWinModal, setShowWinModal] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);

  // Mock game result generation
  const generateResult = () => {
    return Math.floor(Math.random() * 37); // 0-36
  };

  // Calculate winnings based on bets
  const calculateWinnings = (winningNumber, bets) => {
    let totalWin = 0;
    
    Object.entries(bets)?.forEach(([key, bet]) => {
      if (bet?.type === 'number' && bet?.value === winningNumber) {
        totalWin += betAmount * 35; // 35:1 payout
      } else if (bet?.type === 'color') {
        const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        const isRed = redNumbers?.includes(winningNumber);
        const isBlack = winningNumber !== 0 && !isRed;
        const isGreen = winningNumber === 0;
        
        if ((bet?.value === 'red' && isRed) || 
            (bet?.value === 'black' && isBlack) || 
            (bet?.value === 'green' && isGreen)) {
          totalWin += betAmount * (bet?.value === 'green' ? 35 : 1);
        }
      } else if (bet?.type === 'range') {
        let isWin = false;
        
        switch (bet?.value) {
          case '1-18':
            isWin = winningNumber >= 1 && winningNumber <= 18;
            break;
          case '19-36':
            isWin = winningNumber >= 19 && winningNumber <= 36;
            break;
          case 'even':
            isWin = winningNumber !== 0 && winningNumber % 2 === 0;
            break;
          case 'odd':
            isWin = winningNumber !== 0 && winningNumber % 2 === 1;
            break;
          case '1st-12':
            isWin = winningNumber >= 1 && winningNumber <= 12;
            break;
          case '2nd-12':
            isWin = winningNumber >= 13 && winningNumber <= 24;
            break;
          case '3rd-12':
            isWin = winningNumber >= 25 && winningNumber <= 36;
            break;
        }
        
        if (isWin) {
          const multiplier = bet?.value?.includes('12') ? 2 : 1;
          totalWin += betAmount * multiplier;
        }
      }
    });
    
    return totalWin;
  };

  const handlePlaceBet = () => {
    if (Object.keys(selectedBets)?.length === 0 || isSpinning) return;
    
    const totalBetAmount = Object.keys(selectedBets)?.length * betAmount;
    if (totalBetAmount > balance) return;
    
    setIsSpinning(true);
    setResult(null);
    
    // Deduct bet amount from balance
    setBalance(prev => prev - totalBetAmount);
    
    // Simulate spin delay
    setTimeout(() => {
      const winningNumber = generateResult();
      const winnings = calculateWinnings(winningNumber, selectedBets);
      
      setResult(winningNumber);
      setIsSpinning(false);
      
      if (winnings > 0) {
        setWinAmount(winnings);
        setBalance(prev => prev + winnings);
        setShowWinModal(true);
      }
      
      // Add to game history
      const newGame = {
        id: Date.now(),
        number: winningNumber,
        betAmount: totalBetAmount,
        winAmount: winnings,
        isWin: winnings > 0,
        timestamp: new Date(),
        bets: { ...selectedBets }
      };
      
      setGameHistory(prev => [newGame, ...prev?.slice(0, 19)]); // Keep last 20 games
      
      // Clear bets after spin
      setTimeout(() => {
        setSelectedBets({});
      }, 2000);
    }, 3000);
  };

  const handleSpin = () => {
    handlePlaceBet();
  };

  const closeWinModal = () => {
    setShowWinModal(false);
    setWinAmount(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/dice-game" 
                className="flex items-center space-x-2 text-text-secondary hover:text-primary micro-interaction"
              >
                <Icon name="ArrowLeft" size={20} />
                <span className="hidden sm:inline">Back to Games</span>
              </Link>
              <div className="h-6 w-px bg-border hidden sm:block"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-warning rounded-lg flex items-center justify-center">
                  <Icon name="RotateCcw" size={20} color="#FFFFFF" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Spin Wheel</h1>
                  <p className="text-sm text-text-secondary">Roulette-style gaming</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg">
                <Icon name="Wallet" size={16} className="text-primary" />
                <span className="font-mono text-sm text-foreground">{balance?.toFixed(2)} ALGO</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-lg border border-success/20">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs text-success font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Game Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Spin Wheel */}
            <div className="bg-card border border-border rounded-lg p-8">
              <SpinWheel
                onSpin={handleSpin}
                isSpinning={isSpinning}
                result={result}
                className="w-full"
              />
            </div>

            {/* Betting Controls */}
            <BettingControls
              betAmount={betAmount}
              setBetAmount={setBetAmount}
              selectedBets={selectedBets}
              setSelectedBets={setSelectedBets}
              onPlaceBet={handlePlaceBet}
              isSpinning={isSpinning}
              balance={balance}
            />
          </div>

          {/* Right Column - History & Stats */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="HelpCircle"
                  iconPosition="left"
                  fullWidth
                >
                  Game Rules
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="BarChart3"
                  iconPosition="left"
                  fullWidth
                >
                  View Statistics
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Settings"
                  iconPosition="left"
                  fullWidth
                >
                  Game Settings
                </Button>
              </div>
            </div>

            {/* Spin History */}
            <SpinHistory history={gameHistory} />

            {/* Game Stats - Hidden on mobile, shown on larger screens */}
            <div className="hidden xl:block">
              <GameStats />
            </div>
          </div>
        </div>

        {/* Mobile Game Stats */}
        <div className="xl:hidden mt-8">
          <GameStats />
        </div>
      </div>
      {/* Win Celebration Modal */}
      <WinCelebration
        isVisible={showWinModal}
        winAmount={winAmount}
        winningNumber={result}
        onClose={closeWinModal}
      />
      {/* Game Navigation */}
      <div className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-auto z-200">
        <div className="bg-card border border-border rounded-lg p-3 shadow-gaming-lg">
          <div className="flex items-center justify-between lg:justify-end space-x-3">
            <Link
              to="/dice-game"
              className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary micro-interaction"
            >
              <Icon name="Dice1" size={16} />
              <span className="hidden sm:inline">Dice</span>
            </Link>
            <Link
              to="/blackjack-game"
              className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary micro-interaction"
            >
              <Icon name="Spade" size={16} />
              <span className="hidden sm:inline">Blackjack</span>
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary micro-interaction"
            >
              <Icon name="Trophy" size={16} />
              <span className="hidden sm:inline">Leaderboard</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinWheelGame;