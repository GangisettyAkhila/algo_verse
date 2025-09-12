import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LeaderboardTable = ({ players, currentUserId, onPlayerClick, className = '' }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return 'ArrowUpDown';
    }
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const sortedPlayers = React.useMemo(() => {
    if (!players) return [];
    
    return [...players]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];
      
      if (sortConfig?.direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [players, sortConfig]);

  const getRankBadge = (rank) => {
    if (rank <= 3) {
      const colors = {
        1: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        2: 'bg-gray-400/20 text-gray-300 border-gray-400/30',
        3: 'bg-orange-600/20 text-orange-400 border-orange-600/30'
      };
      return colors?.[rank] || 'bg-muted text-text-secondary border-border';
    }
    return 'bg-muted text-text-secondary border-border';
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000)?.toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toString();
  };

  if (!players || players?.length === 0) {
    return (
      <div className={`text-center py-12 bg-card rounded-lg border border-border ${className}`}>
        <Icon name="Users" size={48} className="text-text-secondary mx-auto mb-4" />
        <p className="text-text-secondary">No players found for the selected filters</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Table */}
      <div className="hidden md:block bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                {[
                  { key: 'rank', label: 'Rank', width: 'w-20' },
                  { key: 'username', label: 'Player', width: 'w-auto' },
                  { key: 'totalWinnings', label: 'Total Winnings', width: 'w-32' },
                  { key: 'gamesPlayed', label: 'Games', width: 'w-24' },
                  { key: 'winPercentage', label: 'Win Rate', width: 'w-24' },
                  { key: 'biggestWin', label: 'Biggest Win', width: 'w-32' },
                  { key: 'lastActive', label: 'Last Active', width: 'w-28' }
                ]?.map((column) => (
                  <th
                    key={column?.key}
                    className={`${column?.width} px-4 py-3 text-left text-sm font-medium text-foreground`}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort(column?.key)}
                      className="h-auto p-0 font-medium hover:text-primary"
                      iconName={getSortIcon(column?.key)}
                      iconPosition="right"
                      iconSize={14}
                    >
                      {column?.label}
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedPlayers?.map((player, index) => (
                <tr
                  key={player?.id}
                  className={`
                    border-b border-border hover:bg-muted/30 micro-interaction cursor-pointer
                    ${player?.id === currentUserId ? 'bg-primary/10 border-primary/30' : ''}
                  `}
                  onClick={() => onPlayerClick?.(player)}
                >
                  <td className="px-4 py-4">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border ${getRankBadge(player?.rank)}`}>
                      <span className="text-sm font-bold">{player?.rank}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                        <Image
                          src={player?.avatar}
                          alt={`${player?.username} avatar`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{player?.username}</p>
                        {player?.id === currentUserId && (
                          <p className="text-xs text-primary font-medium">You</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-success font-medium">
                      {formatNumber(player?.totalWinnings)} ALGO
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-foreground">{formatNumber(player?.gamesPlayed)}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-primary font-medium">{player?.winPercentage}%</span>
                      <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${Math.min(player?.winPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-accent font-medium">
                      {formatNumber(player?.biggestWin)} ALGO
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-text-secondary">{player?.lastActive}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {sortedPlayers?.map((player) => (
          <div
            key={player?.id}
            className={`
              bg-card border rounded-lg p-4 micro-interaction cursor-pointer
              ${player?.id === currentUserId ? 'border-primary bg-primary/5' : 'border-border'}
            `}
            onClick={() => onPlayerClick?.(player)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border ${getRankBadge(player?.rank)}`}>
                  <span className="text-sm font-bold">{player?.rank}</span>
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                  <Image
                    src={player?.avatar}
                    alt={`${player?.username} avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground">{player?.username}</p>
                  {player?.id === currentUserId && (
                    <p className="text-xs text-primary font-medium">You</p>
                  )}
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-text-secondary mb-1">Total Winnings</p>
                <p className="font-mono text-success font-medium">
                  {formatNumber(player?.totalWinnings)} ALGO
                </p>
              </div>
              <div>
                <p className="text-text-secondary mb-1">Games Played</p>
                <p className="font-mono text-foreground">{formatNumber(player?.gamesPlayed)}</p>
              </div>
              <div>
                <p className="text-text-secondary mb-1">Win Rate</p>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-primary font-medium">{player?.winPercentage}%</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${Math.min(player?.winPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-text-secondary mb-1">Biggest Win</p>
                <p className="font-mono text-accent font-medium">
                  {formatNumber(player?.biggestWin)} ALGO
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-text-secondary">Last active: {player?.lastActive}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardTable;