import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsPanel = ({ statistics }) => {
  const statCards = [
    {
      title: 'Total Games',
      value: statistics?.totalGames?.toLocaleString(),
      icon: 'Gamepad2',
      color: 'from-primary to-secondary',
      textColor: 'text-primary'
    },
    {
      title: 'Win Rate',
      value: `${statistics?.winRate}%`,
      icon: 'TrendingUp',
      color: 'from-success to-primary',
      textColor: 'text-success'
    },
    {
      title: 'Biggest Win',
      value: `${statistics?.biggestWin} ALGO`,
      icon: 'Trophy',
      color: 'from-warning to-accent',
      textColor: 'text-warning'
    },
    {
      title: 'Total Winnings',
      value: `${statistics?.totalWinnings} ALGO`,
      icon: 'Coins',
      color: 'from-accent to-secondary',
      textColor: 'text-accent'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-gaming-md">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="BarChart3" size={20} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Gaming Statistics</h2>
      </div>
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards?.map((stat, index) => (
          <div key={index} className="bg-muted/50 border border-border rounded-lg p-4 text-center">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat?.color} rounded-lg flex items-center justify-center mx-auto mb-3 shadow-gaming-sm`}>
              <Icon name={stat?.icon} size={20} color="#FFFFFF" />
            </div>
            <div className={`text-2xl font-bold ${stat?.textColor} mb-1 font-mono`}>
              {stat?.value}
            </div>
            <div className="text-sm text-text-secondary">
              {stat?.title}
            </div>
          </div>
        ))}
      </div>
      {/* Favorite Games */}
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Favorite Games</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statistics?.favoriteGames?.map((game, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className={`w-10 h-10 bg-gradient-to-br ${game?.color} rounded-lg flex items-center justify-center shadow-gaming-sm`}>
                <Icon name={game?.icon} size={18} color="#FFFFFF" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{game?.name}</div>
                <div className="text-sm text-text-secondary">{game?.gamesPlayed} games</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono text-success">+{game?.totalWon} ALGO</div>
                <div className="text-xs text-text-secondary">{game?.winRate}% win</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Performance */}
      <div className="border-t border-border pt-6 mt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Win/Loss Ratio Chart */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Win/Loss Ratio</span>
              <span className="text-xs text-text-secondary">Last 30 days</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-success">Wins: {statistics?.recentWins}</span>
                  <span className="text-error">Losses: {statistics?.recentLosses}</span>
                </div>
                <div className="w-full bg-error/20 rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(statistics?.recentWins / (statistics?.recentWins + statistics?.recentLosses)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Profit/Loss */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Net Profit/Loss</span>
              <span className="text-xs text-text-secondary">Last 30 days</span>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold font-mono mb-1 ${statistics?.netProfit >= 0 ? 'text-success' : 'text-error'}`}>
                {statistics?.netProfit >= 0 ? '+' : ''}{statistics?.netProfit} ALGO
              </div>
              <div className="text-sm text-text-secondary">
                ≈ ${Math.abs(statistics?.netProfit * 1.68)?.toFixed(2)} USD
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;