import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BettingControls = ({ 
  betAmount, 
  setBetAmount, 
  selectedBets, 
  setSelectedBets, 
  onPlaceBet, 
  isSpinning, 
  balance,
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState('numbers');

  const numberBets = Array.from({ length: 37 }, (_, i) => i);
  const colorBets = [
    { type: 'red', label: 'Red', payout: '1:1', numbers: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36] },
    { type: 'black', label: 'Black', payout: '1:1', numbers: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35] },
    { type: 'green', label: 'Green (0)', payout: '35:1', numbers: [0] }
  ];
  const rangeBets = [
    { type: '1-18', label: '1-18', payout: '1:1' },
    { type: '19-36', label: '19-36', payout: '1:1' },
    { type: 'even', label: 'Even', payout: '1:1' },
    { type: 'odd', label: 'Odd', payout: '1:1' },
    { type: '1st-12', label: '1st 12', payout: '2:1' },
    { type: '2nd-12', label: '2nd 12', payout: '2:1' },
    { type: '3rd-12', label: '3rd 12', payout: '2:1' }
  ];

  const presetAmounts = [0.1, 0.5, 1.0, 2.5, 5.0];

  const handleBetAmountChange = (e) => {
    const value = parseFloat(e?.target?.value) || 0;
    if (value <= balance) {
      setBetAmount(value);
    }
  };

  const handlePresetAmount = (amount) => {
    if (amount <= balance) {
      setBetAmount(amount);
    }
  };

  const handleNumberBet = (number) => {
    const betKey = `number-${number}`;
    setSelectedBets(prev => ({
      ...prev,
      [betKey]: prev?.[betKey] ? null : { type: 'number', value: number, payout: '35:1' }
    }));
  };

  const handleColorBet = (color) => {
    const betKey = `color-${color?.type}`;
    setSelectedBets(prev => ({
      ...prev,
      [betKey]: prev?.[betKey] ? null : { type: 'color', value: color?.type, payout: color?.payout }
    }));
  };

  const handleRangeBet = (range) => {
    const betKey = `range-${range?.type}`;
    setSelectedBets(prev => ({
      ...prev,
      [betKey]: prev?.[betKey] ? null : { type: 'range', value: range?.type, payout: range?.payout }
    }));
  };

  const clearAllBets = () => {
    setSelectedBets({});
  };

  const getTotalBetAmount = () => {
    return Object.keys(selectedBets)?.length * betAmount;
  };

  const getNumberColor = (number) => {
    if (number === 0) return 'bg-success';
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers?.includes(number) ? 'bg-error' : 'bg-gray-800';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Bet Amount Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Bet Amount</h3>
        
        <div className="space-y-4">
          <Input
            type="number"
            label="Amount (ALGO)"
            value={betAmount}
            onChange={handleBetAmountChange}
            placeholder="0.00"
            min="0.01"
            max={balance}
            step="0.01"
            className="font-mono"
          />
          
          <div className="flex flex-wrap gap-2">
            {presetAmounts?.map((amount) => (
              <Button
                key={amount}
                variant={betAmount === amount ? "default" : "outline"}
                size="sm"
                onClick={() => handlePresetAmount(amount)}
                disabled={amount > balance}
                className="font-mono"
              >
                {amount} ALGO
              </Button>
            ))}
          </div>
          
          <div className="text-sm text-text-secondary">
            Balance: <span className="font-mono text-foreground">{balance?.toFixed(2)} ALGO</span>
          </div>
        </div>
      </div>
      {/* Betting Options Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {[
            { key: 'numbers', label: 'Numbers', icon: 'Hash' },
            { key: 'colors', label: 'Colors', icon: 'Palette' },
            { key: 'ranges', label: 'Ranges', icon: 'BarChart3' }
          ]?.map((tab) => (
            <Button
              key={tab?.key}
              variant={activeTab === tab?.key ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab?.key)}
              iconName={tab?.icon}
              iconPosition="left"
              className="flex-1"
            >
              {tab?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Betting Options Content */}
      <div className="mb-6">
        {activeTab === 'numbers' && (
          <div>
            <h4 className="text-md font-medium text-foreground mb-3">Select Numbers (35:1 payout)</h4>
            <div className="grid grid-cols-6 sm:grid-cols-9 gap-2">
              {numberBets?.map((number) => (
                <button
                  key={number}
                  onClick={() => handleNumberBet(number)}
                  className={`
                    aspect-square rounded-lg border-2 font-semibold text-sm transition-all duration-200
                    ${selectedBets?.[`number-${number}`]
                      ? 'border-primary bg-primary text-primary-foreground shadow-gaming-sm'
                      : `border-border ${getNumberColor(number)} text-white hover:border-primary/50`
                    }
                  `}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div>
            <h4 className="text-md font-medium text-foreground mb-3">Select Colors</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {colorBets?.map((color) => (
                <button
                  key={color?.type}
                  onClick={() => handleColorBet(color)}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-200
                    ${selectedBets?.[`color-${color?.type}`]
                      ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full ${
                      color?.type === 'red' ? 'bg-error' : 
                      color?.type === 'black' ? 'bg-gray-800' : 'bg-success'
                    }`}></div>
                    <div className="text-left">
                      <div className="font-medium text-foreground">{color?.label}</div>
                      <div className="text-sm text-text-secondary">{color?.payout}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ranges' && (
          <div>
            <h4 className="text-md font-medium text-foreground mb-3">Select Ranges</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rangeBets?.map((range) => (
                <button
                  key={range?.type}
                  onClick={() => handleRangeBet(range)}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-200 text-left
                    ${selectedBets?.[`range-${range?.type}`]
                      ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <div className="font-medium text-foreground">{range?.label}</div>
                  <div className="text-sm text-text-secondary">{range?.payout}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Selected Bets Summary */}
      {Object.keys(selectedBets)?.length > 0 && (
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-foreground">Selected Bets</h4>
            <Button variant="ghost" size="sm" onClick={clearAllBets}>
              <Icon name="X" size={16} className="mr-1" />
              Clear All
            </Button>
          </div>
          <div className="space-y-1 text-sm">
            {Object.entries(selectedBets)?.map(([key, bet]) => (
              <div key={key} className="flex justify-between">
                <span className="text-text-secondary">
                  {bet?.type === 'number' ? `Number ${bet?.value}` : 
                   bet?.type === 'color' ? `Color ${bet?.value}` : 
                   `Range ${bet?.value}`}
                </span>
                <span className="font-mono text-foreground">{betAmount} ALGO</span>
              </div>
            ))}
            <div className="border-t border-border pt-1 mt-2">
              <div className="flex justify-between font-medium">
                <span className="text-foreground">Total:</span>
                <span className="font-mono text-foreground">{getTotalBetAmount()?.toFixed(2)} ALGO</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Place Bet Button */}
      <Button
        variant="default"
        size="lg"
        onClick={onPlaceBet}
        disabled={isSpinning || Object.keys(selectedBets)?.length === 0 || getTotalBetAmount() > balance}
        loading={isSpinning}
        iconName="Play"
        iconPosition="left"
        fullWidth
      >
        {isSpinning ? 'Spinning...' : `Place Bet (${getTotalBetAmount()?.toFixed(2)} ALGO)`}
      </Button>
    </div>
  );
};

export default BettingControls;