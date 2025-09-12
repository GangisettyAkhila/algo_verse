import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GameHistory = ({ className = '' }) => {
  const gameHistory = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 300000),
      betAmount: 1.5,
      prediction: 'over',
      result: 5,
      won: true,
      payout: 3.0,
      txHash: '0x742d35cc6bf4f2a1'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 600000),
      betAmount: 0.5,
      prediction: 'under',
      result: 4,
      won: false,
      payout: 0,
      txHash: '0x8a3f21bc9de5c7b2'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 900000),
      betAmount: 2.0,
      prediction: 'over',
      result: 6,
      won: true,
      payout: 4.0,
      txHash: '0x1c7e94af3b2d8e5f'
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 1200000),
      betAmount: 1.0,
      prediction: 'under',
      result: 2,
      won: true,
      payout: 2.0,
      txHash: '0x9f4b8c2a1d6e3f7a'
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 1500000),
      betAmount: 0.8,
      prediction: 'over',
      result: 1,
      won: false,
      payout: 0,
      txHash: '0x5d2a9c8f4b1e7g3h'
    }
  ];

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return timestamp?.toLocaleDateString();
  };

  const getDiceIcon = (result) => {
    const diceIcons = {
      1: 'Dice1',
      2: 'Dice2',
      3: 'Dice3',
      4: 'Dice4',
      5: 'Dice5',
      6: 'Dice6'
    };
    return diceIcons?.[result] || 'Dice1';
  };

  const totalWins = gameHistory?.filter(game => game?.won)?.length;
  const totalGames = gameHistory?.length;
  const winRate = totalGames > 0 ? (totalWins / totalGames * 100)?.toFixed(1) : 0;
  const totalProfit = gameHistory?.reduce((sum, game) => sum + (game?.payout - game?.betAmount), 0);

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Game History</h3>
          <Button variant="ghost" size="sm" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-lg font-bold text-foreground">{totalGames}</div>
            <div className="text-xs text-text-secondary">Total Games</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-lg font-bold text-success">{winRate}%</div>
            <div className="text-xs text-text-secondary">Win Rate</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <div className={`text-lg font-bold font-mono ${totalProfit >= 0 ? 'text-success' : 'text-error'}`}>
              {totalProfit >= 0 ? '+' : ''}{totalProfit?.toFixed(2)}
            </div>
            <div className="text-xs text-text-secondary">Net Profit</div>
          </div>
        </div>
      </div>
      {/* Game List */}
      <div className="max-h-80 overflow-y-auto">
        {gameHistory?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Dice1" size={48} className="text-text-secondary mx-auto mb-4 opacity-50" />
            <p className="text-text-secondary">No games played yet</p>
            <p className="text-xs text-text-secondary mt-1">Your game history will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {gameHistory?.map((game) => (
              <div key={game?.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Dice Result */}
                    <div className="flex-shrink-0">
                      <Icon 
                        name={getDiceIcon(game?.result)} 
                        size={24} 
                        className="text-primary"
                      />
                    </div>

                    {/* Game Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-foreground">
                          Rolled {game?.result}
                        </span>
                        <span className={`
                          px-2 py-0.5 rounded text-xs font-medium
                          ${game?.prediction === 'over' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}
                        `}>
                          {game?.prediction?.toUpperCase()}
                        </span>
                        <span className={`
                          px-2 py-0.5 rounded text-xs font-medium
                          ${game?.won ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}
                        `}>
                          {game?.won ? 'WIN' : 'LOSS'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-text-secondary">
                        <span>Bet: {game?.betAmount} ALGO</span>
                        <span>•</span>
                        <span>{formatTime(game?.timestamp)}</span>
                        <span>•</span>
                        <span className="font-mono">{game?.txHash?.slice(0, 10)}...</span>
                      </div>
                    </div>
                  </div>

                  {/* Payout */}
                  <div className="text-right flex-shrink-0">
                    <div className={`
                      font-mono text-sm font-semibold
                      ${game?.won ? 'text-success' : 'text-error'}
                    `}>
                      {game?.won ? '+' : '-'}{game?.won ? game?.payout?.toFixed(2) : game?.betAmount?.toFixed(2)} ALGO
                    </div>
                    <div className="text-xs text-text-secondary">
                      {game?.won ? 'Won' : 'Lost'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      {gameHistory?.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button variant="outline" size="sm" className="w-full" iconName="ExternalLink" iconPosition="right">
            View All Games
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameHistory;