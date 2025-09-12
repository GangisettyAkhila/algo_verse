import React from 'react';
import Icon from '../../../components/AppIcon';

const GameStats = ({ className = '' }) => {
  const stats = {
    totalPlayers: 1247,
    totalVolume: 847.2,
    biggestWin: 125.8,
    hotNumbers: [23, 7, 14, 0, 31],
    coldNumbers: [26, 33, 8, 15, 22],
    recentWinners: [
      { address: '0x742d...4f2a', amount: 45.2, number: 23, time: '2m ago' },
      { address: '0x891b...7e3c', amount: 18.7, number: 0, time: '5m ago' },
      { address: '0x456f...9a1d', amount: 32.1, number: 14, time: '8m ago' }
    ]
  };

  const getNumberColor = (number) => {
    if (number === 0) return 'bg-success text-white';
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers?.includes(number) ? 'bg-error text-white' : 'bg-gray-800 text-white';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Live Stats */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2 text-primary" />
          Live Statistics
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name="Users" size={24} color="var(--color-primary)" />
            </div>
            <div className="font-mono text-xl font-bold text-foreground">{stats?.totalPlayers?.toLocaleString()}</div>
            <div className="text-sm text-text-secondary">Active Players</div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name="TrendingUp" size={24} color="var(--color-success)" />
            </div>
            <div className="font-mono text-xl font-bold text-foreground">{stats?.totalVolume}</div>
            <div className="text-sm text-text-secondary">Total Volume (ALGO)</div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name="Trophy" size={24} color="var(--color-accent)" />
            </div>
            <div className="font-mono text-xl font-bold text-foreground">{stats?.biggestWin}</div>
            <div className="text-sm text-text-secondary">Biggest Win (ALGO)</div>
          </div>
        </div>
      </div>
      {/* Hot & Cold Numbers */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Flame" size={20} className="mr-2 text-accent" />
          Hot & Cold Numbers
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-accent" />
              <span className="text-sm font-medium text-foreground">Hot Numbers</span>
              <span className="text-xs text-text-secondary">(Most frequent)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {stats?.hotNumbers?.map((number) => (
                <div
                  key={number}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${getNumberColor(number)} shadow-gaming-sm`}
                >
                  {number}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingDown" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Cold Numbers</span>
              <span className="text-xs text-text-secondary">(Least frequent)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {stats?.coldNumbers?.map((number) => (
                <div
                  key={number}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${getNumberColor(number)} opacity-60`}
                >
                  {number}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Recent Winners */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Crown" size={20} className="mr-2 text-warning" />
          Recent Winners
        </h3>
        
        <div className="space-y-3">
          {stats?.recentWinners?.map((winner, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${getNumberColor(winner?.number)}`}>
                  {winner?.number}
                </div>
                <div>
                  <div className="font-mono text-sm text-foreground">{winner?.address}</div>
                  <div className="text-xs text-text-secondary">{winner?.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-semibold text-success">+{winner?.amount} ALGO</div>
                <div className="text-xs text-text-secondary">Won</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Payout Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Calculator" size={20} className="mr-2 text-secondary" />
          Payout Information
        </h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center p-2 bg-muted rounded">
            <span className="text-text-secondary">Single Number</span>
            <span className="font-mono font-semibold text-foreground">35:1</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-muted rounded">
            <span className="text-text-secondary">Red/Black</span>
            <span className="font-mono font-semibold text-foreground">1:1</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-muted rounded">
            <span className="text-text-secondary">Odd/Even</span>
            <span className="font-mono font-semibold text-foreground">1:1</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-muted rounded">
            <span className="text-text-secondary">1-18 / 19-36</span>
            <span className="font-mono font-semibold text-foreground">1:1</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-muted rounded">
            <span className="text-text-secondary">Dozens (1-12, 13-24, 25-36)</span>
            <span className="font-mono font-semibold text-foreground">2:1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;