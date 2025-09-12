import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Games',
      path: '/',
      icon: 'Gamepad2',
      tooltip: 'Play casino games'
    },
    {
      label: 'Leaderboard',
      path: '/leaderboard',
      icon: 'Trophy',
      tooltip: 'View rankings'
    },
    {
      label: 'Profile',
      path: '/user-profile',
      icon: 'User',
      tooltip: 'Manage account'
    }
  ];

  const isActiveRoute = (path) => {
    if (path === '/') {
      return location?.pathname === '/';
    }
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleWalletAction = () => {
    if (isWalletConnected) {
      setIsWalletConnected(false);
      // Add wallet disconnect logic here
    } else {
      // Navigate to wallet connection page or trigger connection
      navigate('/wallet-connection');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 micro-interaction">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-gaming-md">
              <Icon name="Zap" size={24} color="#0A0A0B" strokeWidth={2.5} />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-foreground">LuckyVerse</h1>
            <p className="text-xs text-text-secondary font-mono">Hub</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg micro-interaction
                ${isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-gaming-sm'
                  : 'text-text-secondary hover:text-foreground hover:bg-muted'
                }
              `}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={18} />
              <span className="font-medium">{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Wallet Button & Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Desktop Wallet Button */}
          <Button
            onClick={handleWalletAction}
            className={`
              hidden sm:flex items-center space-x-3 px-4 py-2 rounded-lg border transition-all
              ${isWalletConnected 
                ? 'bg-card border-border hover:bg-muted' :'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
              }
            `}
          >
            {isWalletConnected ? (
              <>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <div className="text-sm">
                  <p className="font-mono text-foreground">2.45 ETH</p>
                  <p className="text-xs text-text-secondary">Connected</p>
                </div>
                <Icon name="LogOut" size={16} />
              </>
            ) : (
              <>
                <Icon name="Wallet" size={18} />
                <span className="font-medium">Connect Wallet</span>
              </>
            )}
          </Button>

          {/* Mobile Wallet Button */}
          <Button
            onClick={handleWalletAction}
            className={`
              sm:hidden flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all
              ${isWalletConnected 
                ? 'bg-card border-border' :'bg-primary text-primary-foreground border-primary'
              }
            `}
          >
            {isWalletConnected ? (
              <>
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="font-mono text-sm text-foreground">2.45 ETH</span>
                <Icon name="LogOut" size={14} />
              </>
            ) : (
              <>
                <Icon name="Wallet" size={16} />
                <span className="font-medium text-sm">Connect</span>
              </>
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-200 bg-background/95 backdrop-blur-sm">
          <nav className="flex flex-col p-6 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-4 rounded-lg micro-interaction
                  ${isActiveRoute(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-gaming-sm'
                    : 'text-text-secondary hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={item?.icon} size={20} />
                <div>
                  <span className="font-medium">{item?.label}</span>
                  <p className="text-xs opacity-75">{item?.tooltip}</p>
                </div>
              </Link>
            ))}
            
            {/* Mobile Wallet Details */}
            {isWalletConnected && (
              <div className="mt-6 p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">Wallet Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs text-success">Connected</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">Balance</span>
                    <span className="font-mono text-sm text-foreground">2.45 ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-text-secondary">USD Value</span>
                    <span className="font-mono text-sm text-foreground">$4,127.50</span>
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;