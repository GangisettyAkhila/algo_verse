import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SpinHistory = ({ history = [], className = '' }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedHistory = showAll ? history : history?.slice(0, 5);

  const getNumberColor = (number) => {
    if (number === 0) return 'bg-success text-white';
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers?.includes(number) ? 'bg-error text-white' : 'bg-gray-800 text-white';
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - new Date(timestamp)) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const getBetTypeLabel = (betType) => {
    if (betType === 'number') return 'Number';
    if (betType?.startsWith('color-')) return `Color ${betType?.split('-')?.[1]}`;
    if (betType?.startsWith('range-')) return `Range ${betType?.split('-')?.[1]}`;
    return betType;
  };

  const totalWinnings = history?.reduce((sum, spin) => sum + (spin?.isWin ? spin?.winAmount : 0), 0);
  const totalBets = history?.reduce((sum, spin) => sum + spin?.betAmount, 0);
  const winRate = (history?.filter(spin => spin?.isWin)?.length / history?.length * 100)?.toFixed(1);

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="History" size={20} className="mr-2 text-primary" />
            Spin History
          </h3>
          <div className="text-sm text-text-secondary">
            {history?.length} spins
          </div>
        </div>
      </div>
      {/* Statistics */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-sm text-text-secondary">Win Rate</div>
            <div className="font-mono text-lg font-semibold text-success">{winRate}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-text-secondary">Total Bet</div>
            <div className="font-mono text-lg font-semibold text-foreground">{totalBets?.toFixed(2)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-text-secondary">Total Won</div>
            <div className="font-mono text-lg font-semibold text-primary">{totalWinnings?.toFixed(2)}</div>
          </div>
        </div>
      </div>
      {/* Recent Numbers */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Recent Numbers</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {history?.slice(0, 10)?.map((spin) => (
            <div
              key={spin?.id}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${getNumberColor(spin?.number)}`}
            >
              {spin?.number}
            </div>
          ))}
        </div>
      </div>
      {/* History List */}
      <div className="max-h-80 overflow-y-auto">
        {displayedHistory?.map((spin) => (
          <div key={spin?.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${getNumberColor(spin?.number)}`}>
                  {spin?.number}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">
                      {getBetTypeLabel(spin?.betType)}
                    </span>
                    {spin?.isWin && (
                      <Icon name="TrendingUp" size={14} className="text-success" />
                    )}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {formatTime(spin?.timestamp)}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-secondary">Bet:</span>
                  <span className="font-mono text-sm text-foreground">{spin?.betAmount}</span>
                </div>
                {spin?.isWin ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary">Won:</span>
                    <span className="font-mono text-sm text-success font-medium">+{spin?.winAmount}</span>
                  </div>
                ) : (
                  <div className="text-sm text-error">Lost</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More/Less Button */}
      {history?.length > 5 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            iconName={showAll ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            fullWidth
          >
            {showAll ? 'Show Less' : `Show All (${history?.length - 5} more)`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SpinHistory;
