import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GameHistoryTable = ({ gameHistory, onSort, onFilter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterGame, setFilterGame] = useState('all');
  const [filterOutcome, setFilterOutcome] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(gameHistory?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = gameHistory?.slice(startIndex, endIndex);

  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    onSort(field, newDirection);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getGameIcon = (gameType) => {
    const icons = {
      'Dice': 'Dice1',
      'Spin Wheel': 'RotateCcw',
      'Blackjack': 'Spade',
      'Slot Machine': 'Cherry'
    };
    return icons?.[gameType] || 'Gamepad2';
  };

  const getOutcomeColor = (outcome) => {
    return outcome === 'Win' ? 'text-success' : 'text-error';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-gaming-md">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="History" size={20} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Game History</h2>
            <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
              {gameHistory?.length} games
            </span>
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:flex items-center space-x-3">
            <select
              value={filterGame}
              onChange={(e) => {
                setFilterGame(e?.target?.value);
                onFilter('game', e?.target?.value);
              }}
              className="bg-input border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Games</option>
              <option value="Dice">Dice Game</option>
              <option value="Spin Wheel">Spin Wheel</option>
              <option value="Blackjack">Blackjack</option>
              <option value="Slot Machine">Slot Machine</option>
            </select>

            <select
              value={filterOutcome}
              onChange={(e) => {
                setFilterOutcome(e?.target?.value);
                onFilter('outcome', e?.target?.value);
              }}
              className="bg-input border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Outcomes</option>
              <option value="Win">Wins Only</option>
              <option value="Loss">Losses Only</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden"
          >
            <Icon name="Filter" size={16} className="mr-2" />
            Filters
          </Button>
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="md:hidden mt-4 p-4 bg-muted/30 rounded-lg space-y-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Game Type</label>
              <select
                value={filterGame}
                onChange={(e) => {
                  setFilterGame(e?.target?.value);
                  onFilter('game', e?.target?.value);
                }}
                className="w-full bg-input border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Games</option>
                <option value="Dice">Dice Game</option>
                <option value="Spin Wheel">Spin Wheel</option>
                <option value="Blackjack">Blackjack</option>
                <option value="Slot Machine">Slot Machine</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Outcome</label>
              <select
                value={filterOutcome}
                onChange={(e) => {
                  setFilterOutcome(e?.target?.value);
                  onFilter('outcome', e?.target?.value);
                }}
                className="w-full bg-input border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Outcomes</option>
                <option value="Win">Wins Only</option>
                <option value="Loss">Losses Only</option>
              </select>
            </div>
          </div>
        )}
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('date')}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Date & Time
                  <Icon name={getSortIcon('date')} size={14} className="ml-2" />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('game')}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Game
                  <Icon name={getSortIcon('game')} size={14} className="ml-2" />
                </Button>
              </th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('betAmount')}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Bet Amount
                  <Icon name={getSortIcon('betAmount')} size={14} className="ml-2" />
                </Button>
              </th>
              <th className="text-left p-4">Outcome</th>
              <th className="text-left p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('winnings')}
                  className="font-medium text-foreground hover:text-primary"
                >
                  Winnings
                  <Icon name={getSortIcon('winnings')} size={14} className="ml-2" />
                </Button>
              </th>
              <th className="text-left p-4">Transaction</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((game, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/20">
                <td className="p-4">
                  <div className="text-sm text-foreground">{formatDate(game?.date)}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name={getGameIcon(game?.gameType)} size={16} className="text-primary" />
                    <span className="text-sm text-foreground">{game?.gameType}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm text-foreground">{game?.betAmount} ALGO</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={game?.outcome === 'Win' ? 'TrendingUp' : 'TrendingDown'} 
                      size={14} 
                      className={getOutcomeColor(game?.outcome)} 
                    />
                    <span className={`text-sm font-medium ${getOutcomeColor(game?.outcome)}`}>
                      {game?.outcome}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`font-mono text-sm font-medium ${getOutcomeColor(game?.outcome)}`}>
                    {game?.outcome === 'Win' ? '+' : '-'}{game?.winnings} ALGO
                  </span>
                </td>
                <td className="p-4">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Icon name="ExternalLink" size={12} className="mr-1" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden">
        {currentItems?.map((game, index) => (
          <div key={index} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name={getGameIcon(game?.gameType)} size={18} className="text-primary" />
                <div>
                  <div className="font-medium text-foreground">{game?.gameType}</div>
                  <div className="text-xs text-text-secondary">{formatDate(game?.date)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`flex items-center space-x-1 ${getOutcomeColor(game?.outcome)}`}>
                  <Icon 
                    name={game?.outcome === 'Win' ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                  />
                  <span className="text-sm font-medium">{game?.outcome}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Bet:</span>
                <span className="font-mono text-foreground ml-2">{game?.betAmount} ALGO</span>
              </div>
              <div>
                <span className="text-text-secondary">Result:</span>
                <span className={`font-mono font-medium ml-2 ${getOutcomeColor(game?.outcome)}`}>
                  {game?.outcome === 'Win' ? '+' : '-'}{game?.winnings} ALGO
                </span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-border">
              <Button variant="ghost" size="sm" className="text-xs">
                <Icon name="ExternalLink" size={12} className="mr-1" />
                View Transaction
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Showing {startIndex + 1}-{Math.min(endIndex, gameHistory?.length)} of {gameHistory?.length} games
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameHistoryTable;