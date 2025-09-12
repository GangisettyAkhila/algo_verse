import React from 'react';
import Icon from '../../../components/AppIcon';

const PlatformStats = ({ stats, className = '' }) => {
  const formatLargeNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000)?.toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toLocaleString();
  };

  const statsData = [
    {
      icon: 'Users',
      label: 'Total Players',
      value: formatLargeNumber(stats?.totalPlayers),
      color: 'text-primary',
      bgColor: 'bg-primary/20',
      borderColor: 'border-primary/30'
    },
    {
      icon: 'Gamepad2',
      label: 'Games Played',
      value: formatLargeNumber(stats?.totalGames),
      color: 'text-secondary',
      bgColor: 'bg-secondary/20',
      borderColor: 'border-secondary/30'
    },
    {
      icon: 'TrendingUp',
      label: 'Total Winnings',
      value: `${formatLargeNumber(stats?.totalWinnings)} ALGO`,
      color: 'text-success',
      bgColor: 'bg-success/20',
      borderColor: 'border-success/30'
    },
    {
      icon: 'Zap',
      label: 'Active Today',
      value: formatLargeNumber(stats?.activeToday),
      color: 'text-accent',
      bgColor: 'bg-accent/20',
      borderColor: 'border-accent/30'
    }
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Platform Statistics</h3>
        <p className="text-sm text-text-secondary">Real-time gaming metrics</p>
      </div>
      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {statsData?.map((stat, index) => (
          <div
            key={index}
            className={`bg-card border ${stat?.borderColor} rounded-lg p-4 text-center micro-interaction hover:scale-105`}
          >
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <h4 className="font-mono text-xl font-bold text-foreground mb-1">{stat?.value}</h4>
            <p className="text-sm text-text-secondary">{stat?.label}</p>
          </div>
        ))}
      </div>
      {/* Mobile Grid */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        {statsData?.map((stat, index) => (
          <div
            key={index}
            className={`bg-card border ${stat?.borderColor} rounded-lg p-3 text-center micro-interaction`}
          >
            <div className={`w-10 h-10 ${stat?.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <h4 className="font-mono text-lg font-bold text-foreground mb-1">{stat?.value}</h4>
            <p className="text-xs text-text-secondary">{stat?.label}</p>
          </div>
        ))}
      </div>
      {/* Additional Info */}
      <div className="mt-6 bg-muted/30 rounded-lg p-4 border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-foreground font-medium">Live Updates</span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-text-secondary">
            <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={12} />
              <span>Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformStats;