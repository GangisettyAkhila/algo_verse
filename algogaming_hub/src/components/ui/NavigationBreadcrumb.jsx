import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumb = ({ className = '' }) => {
  const location = useLocation();

  const breadcrumbMap = {
    '/dice-game': { label: 'Dice Game', parent: 'Games' },
    '/spin-wheel-game': { label: 'Spin Wheel', parent: 'Games' },
    '/blackjack-game': { label: 'Blackjack', parent: 'Games' },
    '/leaderboard': { label: 'Leaderboard', parent: null },
    '/user-profile': { label: 'Profile', parent: null },
    '/wallet-connection': { label: 'Wallet Connection', parent: null }
  };

  const currentPage = breadcrumbMap?.[location?.pathname];

  if (!currentPage) {
    return null;
  }

  const isGamePage = currentPage?.parent === 'Games';

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      {/* Home/Games Link */}
      {isGamePage && (
        <>
          <Link 
            to="/dice-game" 
            className="flex items-center space-x-1 text-text-secondary hover:text-primary micro-interaction"
          >
            <Icon name="Gamepad2" size={16} />
            <span>Games</span>
          </Link>
          <Icon name="ChevronRight" size={14} className="text-text-secondary" />
        </>
      )}
      {/* Current Page */}
      <div className="flex items-center space-x-2">
        <span className="text-foreground font-medium">{currentPage?.label}</span>
        
        {/* Game Status Indicator */}
        {isGamePage && (
          <div className="flex items-center space-x-2 ml-3 px-2 py-1 bg-success/10 rounded border border-success/20">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success font-medium">Live</span>
          </div>
        )}
      </div>
      {/* Quick Actions for Game Pages */}
      {isGamePage && (
        <div className="flex items-center space-x-2 ml-auto">
          <button 
            className="flex items-center space-x-1 px-2 py-1 text-xs text-text-secondary hover:text-foreground micro-interaction"
            title="Game Rules"
          >
            <Icon name="HelpCircle" size={14} />
            <span className="hidden sm:inline">Rules</span>
          </button>
          <button 
            className="flex items-center space-x-1 px-2 py-1 text-xs text-text-secondary hover:text-foreground micro-interaction"
            title="Game History"
          >
            <Icon name="History" size={14} />
            <span className="hidden sm:inline">History</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavigationBreadcrumb;