import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BettingPanel = ({ 
  currentBet, 
  onBetChange, 
  balance, 
  onDeal, 
  gameState, 
  isProcessing 
}) => {
  const [betAmount, setBetAmount] = useState(currentBet?.toString());
  const [betError, setBetError] = useState('');

  const quickBetAmounts = [0.1, 0.5, 1.0, 2.5, 5.0];

  const validateBet = (amount) => {
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount <= 0) {
      return 'Please enter a valid bet amount';
    }
    
    if (numAmount < 0.1) {
      return 'Minimum bet is 0.1 ALGO';
    }
    
    if (numAmount > balance) {
      return 'Insufficient balance';
    }
    
    if (numAmount > 10) {
      return 'Maximum bet is 10 ALGO';
    }
    
    return '';
  };

  const handleBetChange = (value) => {
    setBetAmount(value);
    const error = validateBet(value);
    setBetError(error);
    
    if (!error) {
      onBetChange(parseFloat(value));
    }
  };

  const handleQuickBet = (amount) => {
    const newAmount = amount?.toString();
    setBetAmount(newAmount);
    const error = validateBet(newAmount);
    setBetError(error);
    
    if (!error) {
      onBetChange(amount);
    }
  };

  const handleDeal = () => {
    const error = validateBet(betAmount);
    if (error) {
      setBetError(error);
      return;
    }
    
    onDeal();
  };

  const canDeal = gameState === 'betting' && !betError && betAmount && !isProcessing;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      {/* Balance Display */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Current Balance</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success">Connected</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Wallet" size={20} color="var(--color-primary)" />
          <span className="text-2xl font-bold font-mono text-foreground balance-update">
            {balance?.toFixed(2)} ALGO
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          ≈ ${(balance * 0.18)?.toFixed(2)} USD
        </p>
      </div>
      {/* Bet Amount Input */}
      <div className="mb-6">
        <Input
          label="Bet Amount (ALGO)"
          type="number"
          value={betAmount}
          onChange={(e) => handleBetChange(e?.target?.value)}
          placeholder="Enter bet amount"
          error={betError}
          disabled={gameState !== 'betting' || isProcessing}
          min="0.1"
          max="10"
          step="0.1"
          className="mb-4"
        />

        {/* Quick Bet Buttons */}
        <div className="grid grid-cols-5 gap-2">
          {quickBetAmounts?.map((amount) => (
            <Button
              key={amount}
              variant={parseFloat(betAmount) === amount ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleQuickBet(amount)}
              disabled={gameState !== 'betting' || isProcessing || amount > balance}
              className="text-xs"
            >
              {amount}
            </Button>
          ))}
        </div>
      </div>
      {/* Deal Button */}
      <Button
        variant="default"
        size="lg"
        onClick={handleDeal}
        disabled={!canDeal}
        loading={isProcessing}
        iconName="Play"
        iconPosition="left"
        fullWidth
        className="mb-4"
      >
        {isProcessing ? 'Dealing...' : 'Deal Cards'}
      </Button>
      {/* Bet Summary */}
      {currentBet > 0 && (
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="Calculator" size={16} className="mr-2 text-primary" />
            Bet Summary
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Current Bet</span>
              <span className="font-mono text-foreground">{currentBet?.toFixed(2)} ALGO</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Potential Win (1:1)</span>
              <span className="font-mono text-success">+{currentBet?.toFixed(2)} ALGO</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Blackjack Win (3:2)</span>
              <span className="font-mono text-success">+{(currentBet * 1.5)?.toFixed(2)} ALGO</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span className="text-text-secondary">Balance After Bet</span>
                <span className="font-mono text-foreground">
                  {(balance - currentBet)?.toFixed(2)} ALGO
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BettingPanel;