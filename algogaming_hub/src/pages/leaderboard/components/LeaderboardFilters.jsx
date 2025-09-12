import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const LeaderboardFilters = ({ onFilterChange, activeFilters, className = '' }) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const gameOptions = [
    { value: 'all', label: 'All Games' },
    { value: 'dice', label: 'Dice Game' },
    { value: 'wheel', label: 'Spin Wheel' },
    { value: 'blackjack', label: 'Blackjack' },
    { value: 'slots', label: 'Slot Machine' }
  ];

  const timeOptions = [
    { value: 'all-time', label: 'All Time' },
    { value: 'monthly', label: 'This Month' },
    { value: 'weekly', label: 'This Week' },
    { value: 'daily', label: 'Today' }
  ];

  const metricOptions = [
    { value: 'total-winnings', label: 'Total Winnings' },
    { value: 'biggest-win', label: 'Biggest Win' },
    { value: 'games-played', label: 'Games Played' },
    { value: 'win-percentage', label: 'Win Percentage' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...activeFilters,
      [filterType]: value
    });
  };

  const resetFilters = () => {
    onFilterChange({
      game: 'all',
      timeframe: 'all-time',
      metric: 'total-winnings'
    });
  };

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Filters */}
      <div className="hidden md:flex items-center justify-between bg-card rounded-lg border border-border p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} className="text-text-secondary" />
            <span className="text-sm font-medium text-foreground">Filters:</span>
          </div>
          
          <Select
            options={gameOptions}
            value={activeFilters?.game}
            onChange={(value) => handleFilterChange('game', value)}
            placeholder="Select game"
            className="w-40"
          />
          
          <Select
            options={timeOptions}
            value={activeFilters?.timeframe}
            onChange={(value) => handleFilterChange('timeframe', value)}
            placeholder="Select timeframe"
            className="w-40"
          />
          
          <Select
            options={metricOptions}
            value={activeFilters?.metric}
            onChange={(value) => handleFilterChange('metric', value)}
            placeholder="Select metric"
            className="w-44"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset
          </Button>
          
          <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 rounded border border-primary/20">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span className="text-sm text-primary font-medium">Live Rankings</span>
          </div>
        </div>
      </div>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex items-center justify-between bg-card rounded-lg border border-border p-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} className="text-text-secondary" />
          <span className="text-sm font-medium text-foreground">Filters</span>
          <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs text-primary">Live</span>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMobileFilters}
          iconName={isMobileFiltersOpen ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isMobileFiltersOpen ? 'Hide' : 'Show'}
        </Button>
      </div>
      {/* Mobile Filters Panel */}
      {isMobileFiltersOpen && (
        <div className="md:hidden mt-4 bg-card rounded-lg border border-border p-4 space-y-4">
          <Select
            label="Game Type"
            options={gameOptions}
            value={activeFilters?.game}
            onChange={(value) => handleFilterChange('game', value)}
            placeholder="Select game"
          />
          
          <Select
            label="Time Period"
            options={timeOptions}
            value={activeFilters?.timeframe}
            onChange={(value) => handleFilterChange('timeframe', value)}
            placeholder="Select timeframe"
          />
          
          <Select
            label="Ranking Metric"
            options={metricOptions}
            value={activeFilters?.metric}
            onChange={(value) => handleFilterChange('metric', value)}
            placeholder="Select metric"
          />

          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              iconName="RotateCcw"
              iconPosition="left"
              className="flex-1"
            >
              Reset Filters
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={toggleMobileFilters}
              className="flex-1"
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardFilters;