import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BettingControls = ({ 
  betAmount, 
  setBetAmount, 
  prediction, 
  setPrediction, 
  onPlaceBet, 
  isRolling, 
  balance 
}) => {
  const [customAmount, setCustomAmount] = useState('');

  const presetAmounts = [0.1, 0.5, 1.0, 2.5, 5.0];
  const minBet = 0.01;
  const maxBet = Math.min(balance * 0.5, 10); // Max 50% of balance or 10 ALGO

  const handlePresetAmount = (amount) => {
    setBetAmount(amount);
    setCustomAmount(amount?.toString());
  };

  const handleCustomAmount = (value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= minBet && numValue <= maxBet) {
      setBetAmount(numValue);
    }
    setCustomAmount(value);
  };

  const handlePredictionSelect = (predictionType) => {
    setPrediction(predictionType);
  };

  const isValidBet = betAmount >= minBet && betAmount <= maxBet && betAmount <= balance;

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">Place Your Bet</h3>
        <p className="text-text-secondary text-sm">
          Choose your bet amount and prediction
        </p>
      </div>
      {/* Bet Amount Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Bet Amount</label>
          <span className="text-xs text-text-secondary">
            Min: {minBet} ALGO • Max: {maxBet?.toFixed(2)} ALGO
          </span>
        </div>

        {/* Preset Amount Buttons */}
        <div className="grid grid-cols-5 gap-2">
          {presetAmounts?.map((amount) => (
            <Button
              key={amount}
              variant={betAmount === amount ? "default" : "outline"}
              size="sm"
              onClick={() => handlePresetAmount(amount)}
              disabled={amount > balance || isRolling}
              className="text-xs"
            >
              {amount} ALGO
            </Button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <Input
          type="number"
          placeholder="Custom amount"
          value={customAmount}
          onChange={(e) => handleCustomAmount(e?.target?.value)}
          disabled={isRolling}
          min={minBet}
          max={maxBet}
          step="0.01"
          className="font-mono"
        />

        {/* Bet Amount Validation */}
        {betAmount > 0 && (
          <div className="text-xs">
            {!isValidBet ? (
              <span className="text-error flex items-center space-x-1">
                <Icon name="AlertCircle" size={12} />
                <span>
                  {betAmount > balance ? 'Insufficient balance' : 
                   betAmount < minBet ? `Minimum bet is ${minBet} ALGO` :
                   `Maximum bet is ${maxBet?.toFixed(2)} ALGO`}
                </span>
              </span>
            ) : (
              <span className="text-success flex items-center space-x-1">
                <Icon name="CheckCircle" size={12} />
                <span>Valid bet amount</span>
              </span>
            )}
          </div>
        )}
      </div>
      {/* Prediction Section */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-foreground">Your Prediction</label>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={prediction === 'over' ? "default" : "outline"}
            onClick={() => handlePredictionSelect('over')}
            disabled={isRolling}
            className="flex flex-col items-center py-4 h-auto"
          >
            <Icon name="TrendingUp" size={20} className="mb-2" />
            <span className="font-semibold">Over 3.5</span>
            <span className="text-xs opacity-75">Dice shows 4, 5, or 6</span>
            <span className="text-xs font-mono mt-1 text-success">2x Payout</span>
          </Button>

          <Button
            variant={prediction === 'under' ? "default" : "outline"}
            onClick={() => handlePredictionSelect('under')}
            disabled={isRolling}
            className="flex flex-col items-center py-4 h-auto"
          >
            <Icon name="TrendingDown" size={20} className="mb-2" />
            <span className="font-semibold">Under 3.5</span>
            <span className="text-xs opacity-75">Dice shows 1, 2, or 3</span>
            <span className="text-xs font-mono mt-1 text-success">2x Payout</span>
          </Button>
        </div>
      </div>
      {/* Potential Payout */}
      {betAmount > 0 && prediction && (
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-secondary">Potential Payout:</span>
            <span className="font-mono text-lg font-semibold text-success">
              {(betAmount * 2)?.toFixed(3)} ALGO
            </span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-text-secondary">Potential Profit:</span>
            <span className="font-mono text-sm text-foreground">
              +{betAmount?.toFixed(3)} ALGO
            </span>
          </div>
        </div>
      )}
      {/* Place Bet Button */}
      <Button
        variant="default"
        size="lg"
        onClick={onPlaceBet}
        disabled={!isValidBet || !prediction || isRolling}
        loading={isRolling}
        iconName={isRolling ? "Loader2" : "Play"}
        iconPosition="left"
        className="w-full"
      >
        {isRolling ? 'Rolling Dice...' : 'Roll Dice'}
      </Button>
      {/* Game Rules */}
      <div className="text-xs text-text-secondary text-center space-y-1">
        <p>• Predict if dice will roll over or under 3.5</p>
        <p>• Win 2x your bet amount on correct prediction</p>
        <p>• All games are provably fair on Algorand blockchain</p>
      </div>
    </div>
  );
};

export default BettingControls;