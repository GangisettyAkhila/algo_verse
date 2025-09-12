import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UserPositionCard = ({ userPosition, onScrollToUser, className = '' }) => {
  if (!userPosition) {
    return (
      <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
        <div className="text-center py-4">
          <Icon name="User" size={32} className="text-text-secondary mx-auto mb-2" />
          <p className="text-text-secondary text-sm">Connect wallet to see your position</p>
          <Link to="/wallet-connection">
            <Button variant="outline" size="sm" className="mt-3">
              Connect Wallet
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getRankSuffix = (rank) => {
    if (rank % 100 >= 11 && rank % 100 <= 13) return 'th';
    switch (rank % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const getRankColor = (rank) => {
    if (rank <= 10) return 'text-success';
    if (rank <= 50) return 'text-primary';
    if (rank <= 100) return 'text-warning';
    return 'text-text-secondary';
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

  return (
    <div className={`bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="User" size={20} className="text-primary" />
          <span className="font-medium text-foreground">Your Position</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-xs text-primary font-medium">Live</span>
        </div>
      </div>
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Rank */}
          <div className="text-center">
            <div className={`text-2xl font-bold ${getRankColor(userPosition?.rank)}`}>
              #{userPosition?.rank}
            </div>
            <p className="text-xs text-text-secondary">
              {userPosition?.rank}{getRankSuffix(userPosition?.rank)} place
            </p>
          </div>

          {/* Avatar & Name */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30">
              <Image
                src={userPosition?.avatar}
                alt={`${userPosition?.username} avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{userPosition?.username}</h3>
              <p className="text-sm text-text-secondary">That's you!</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <p className="font-mono text-success font-bold">
              {formatNumber(userPosition?.totalWinnings)} ALGO
            </p>
            <p className="text-xs text-text-secondary">Total Winnings</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-foreground font-bold">
              {formatNumber(userPosition?.gamesPlayed)}
            </p>
            <p className="text-xs text-text-secondary">Games Played</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-primary font-bold">{userPosition?.winPercentage}%</p>
            <p className="text-xs text-text-secondary">Win Rate</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onScrollToUser}
            iconName="MapPin"
            iconPosition="left"
          >
            Find Me
          </Button>
          <Link to="/user-profile">
            <Button variant="default" size="sm">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="md:hidden space-y-4">
        <div className="flex items-center space-x-4">
          {/* Rank */}
          <div className="text-center">
            <div className={`text-xl font-bold ${getRankColor(userPosition?.rank)}`}>
              #{userPosition?.rank}
            </div>
            <p className="text-xs text-text-secondary">
              {userPosition?.rank}{getRankSuffix(userPosition?.rank)} place
            </p>
          </div>

          {/* Avatar & Name */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
              <Image
                src={userPosition?.avatar}
                alt={`${userPosition?.username} avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{userPosition?.username}</h3>
              <p className="text-sm text-text-secondary">That's you!</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="font-mono text-success font-bold text-sm">
              {formatNumber(userPosition?.totalWinnings)}
            </p>
            <p className="text-xs text-text-secondary">Winnings</p>
          </div>
          <div>
            <p className="font-mono text-foreground font-bold text-sm">
              {formatNumber(userPosition?.gamesPlayed)}
            </p>
            <p className="text-xs text-text-secondary">Games</p>
          </div>
          <div>
            <p className="font-mono text-primary font-bold text-sm">{userPosition?.winPercentage}%</p>
            <p className="text-xs text-text-secondary">Win Rate</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onScrollToUser}
            iconName="MapPin"
            iconPosition="left"
            className="flex-1"
          >
            Find Me
          </Button>
          <Link to="/user-profile" className="flex-1">
            <Button variant="default" size="sm" className="w-full">
              Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPositionCard;