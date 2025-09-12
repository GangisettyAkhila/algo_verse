import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TopPlayersSection = ({ topPlayers, className = '' }) => {
  const getTrophyIcon = (position) => {
    switch (position) {
      case 1:
        return { name: 'Trophy', color: '#FFD700' }; // Gold
      case 2:
        return { name: 'Award', color: '#C0C0C0' }; // Silver
      case 3:
        return { name: 'Medal', color: '#CD7F32' }; // Bronze
      default:
        return { name: 'Trophy', color: 'var(--color-text-secondary)' };
    }
  };

  const getPositionGradient = (position) => {
    switch (position) {
      case 1:
        return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      case 2:
        return 'from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3:
        return 'from-orange-600/20 to-orange-700/20 border-orange-600/30';
      default:
        return 'from-card to-card border-border';
    }
  };

  if (!topPlayers || topPlayers?.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <Icon name="Trophy" size={48} className="text-text-secondary mx-auto mb-4" />
        <p className="text-text-secondary">No top players data available</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Top Champions</h2>
        <p className="text-text-secondary">Celebrating our highest achievers</p>
      </div>
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {topPlayers?.slice(0, 3)?.map((player, index) => {
          const position = index + 1;
          const trophy = getTrophyIcon(position);
          const gradient = getPositionGradient(position);
          
          return (
            <div
              key={player?.id}
              className={`relative bg-gradient-to-br ${gradient} border rounded-lg p-6 text-center micro-interaction hover:scale-105`}
            >
              {/* Position Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-background border-2 border-current rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">{position}</span>
                </div>
              </div>
              {/* Trophy Icon */}
              <div className="mb-4 mt-2">
                <Icon 
                  name={trophy?.name} 
                  size={position === 1 ? 40 : 36} 
                  color={trophy?.color}
                  className="mx-auto"
                />
              </div>
              {/* Player Avatar */}
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-border">
                  <Image
                    src={player?.avatar}
                    alt={`${player?.username} avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Player Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-lg">{player?.username}</h3>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Winnings</span>
                    <span className="font-mono text-sm text-success font-medium">
                      {player?.totalWinnings} ALGO
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Games</span>
                    <span className="font-mono text-sm text-foreground">
                      {player?.gamesPlayed}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Win Rate</span>
                    <span className="font-mono text-sm text-primary font-medium">
                      {player?.winPercentage}%
                    </span>
                  </div>
                </div>
              </div>
              {/* Special Badge for #1 */}
              {position === 1 && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="px-3 py-1 bg-yellow-500 text-yellow-900 text-xs font-bold rounded-full">
                    CHAMPION
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Mobile Layout */}
      <div className="md:hidden space-y-4">
        {topPlayers?.slice(0, 3)?.map((player, index) => {
          const position = index + 1;
          const trophy = getTrophyIcon(position);
          const gradient = getPositionGradient(position);
          
          return (
            <div
              key={player?.id}
              className={`bg-gradient-to-r ${gradient} border rounded-lg p-4 micro-interaction`}
            >
              <div className="flex items-center space-x-4">
                {/* Position & Trophy */}
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-8 h-8 bg-background border-2 border-current rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">{position}</span>
                  </div>
                  <Icon name={trophy?.name} size={24} color={trophy?.color} />
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border">
                  <Image
                    src={player?.avatar}
                    alt={`${player?.username} avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Player Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{player?.username}</h3>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-text-secondary">Winnings</p>
                      <p className="font-mono text-success font-medium">{player?.totalWinnings}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Games</p>
                      <p className="font-mono text-foreground">{player?.gamesPlayed}</p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Win Rate</p>
                      <p className="font-mono text-primary font-medium">{player?.winPercentage}%</p>
                    </div>
                  </div>
                </div>

                {position === 1 && (
                  <div className="px-2 py-1 bg-yellow-500 text-yellow-900 text-xs font-bold rounded">
                    👑
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopPlayersSection;