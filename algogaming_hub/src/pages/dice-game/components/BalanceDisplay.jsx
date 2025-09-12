import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BalanceDisplay = ({ balance, isUpdating, className = '' }) => {
  const [previousBalance, setPreviousBalance] = useState(balance);
  const [showBalanceChange, setShowBalanceChange] = useState(false);
  const [balanceChange, setBalanceChange] = useState(0);

  // Mock USD conversion rate
  const usdRate = 0.18; // 1 ALGO = $0.18
  const usdValue = (balance * usdRate)?.toFixed(2);

  useEffect(() => {
    if (balance !== previousBalance) {
      const change = balance - previousBalance;
      setBalanceChange(change);
      setShowBalanceChange(true);
      setPreviousBalance(balance);

      // Hide balance change indicator after 3 seconds
      const timer = setTimeout(() => {
        setShowBalanceChange(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [balance, previousBalance]);

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="text-center space-y-4">
        {/* Balance Header */}
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Wallet" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Current Balance</h3>
          {isUpdating && (
            <Icon name="Loader2" size={16} className="text-primary animate-spin" />
          )}
        </div>

        {/* Main Balance Display */}
        <div className="relative">
          <div className={`
            text-4xl md:text-5xl font-bold font-mono text-foreground
            ${isUpdating ? 'balance-update' : ''}
            transition-all duration-300
          `}>
            {balance?.toFixed(3)} ALGO
          </div>
          
          {/* Balance Change Indicator */}
          {showBalanceChange && balanceChange !== 0 && (
            <div className={`
              absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium
              ${balanceChange > 0 
                ? 'bg-success/20 text-success border border-success/30' :'bg-error/20 text-error border border-error/30'
              }
              animate-pulse
            `}>
              {balanceChange > 0 ? '+' : ''}{balanceChange?.toFixed(3)}
            </div>
          )}
        </div>

        {/* USD Value */}
        <div className="text-text-secondary">
          <span className="text-sm">≈ ${usdValue} USD</span>
          <div className="text-xs mt-1">1 ALGO = ${usdRate}</div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center justify-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-success font-medium">Wallet Connected</span>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2 pt-4">
          <Button variant="outline" size="sm" className="flex-1" iconName="Plus" iconPosition="left">
            Add Funds
          </Button>
          <Button variant="outline" size="sm" className="flex-1" iconName="Send" iconPosition="left">
            Withdraw
          </Button>
        </div>

        {/* Balance History */}
        <div className="pt-4 border-t border-border">
          <div className="text-xs text-text-secondary mb-2">Recent Activity</div>
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-text-secondary">Last Game</span>
              <span className="text-error font-mono">-1.500 ALGO</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-text-secondary">Previous Win</span>
              <span className="text-success font-mono">+3.000 ALGO</span>
            </div>
          </div>
        </div>

        {/* Low Balance Warning */}
        {balance < 1.0 && (
          <div className="bg-warning/10 border border-warning/30 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-warning text-sm font-medium">Low Balance</span>
            </div>
            <p className="text-xs text-text-secondary mt-1">
              Consider adding funds to continue playing
            </p>
          </div>
        )}

        {/* Wallet Address */}
        <div className="pt-2">
          <div className="flex items-center justify-center space-x-2 text-xs text-text-secondary">
            <span className="font-mono">0x742d...4f2a</span>
            <Button variant="ghost" size="icon" className="h-4 w-4">
              <Icon name="Copy" size={10} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceDisplay;