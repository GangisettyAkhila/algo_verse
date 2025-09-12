import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ userProfile, onUsernameUpdate, onWalletDisconnect }) => {
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(userProfile?.username);
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);

  const handleUsernameSubmit = () => {
    if (newUsername?.trim() && newUsername !== userProfile?.username) {
      onUsernameUpdate(newUsername?.trim());
    }
    setIsEditingUsername(false);
  };

  const handleUsernameCancel = () => {
    setNewUsername(userProfile?.username);
    setIsEditingUsername(false);
  };

  const copyWalletAddress = () => {
    navigator.clipboard?.writeText(userProfile?.walletAddress);
  };

  const formatWalletAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-gaming-md">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Profile Avatar & Basic Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-gaming-md">
              <Icon name="User" size={32} color="#FFFFFF" strokeWidth={2} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
              <Icon name="CheckCircle" size={12} color="#FFFFFF" />
            </div>
          </div>
          
          <div className="flex-1">
            {/* Username Section */}
            <div className="flex items-center space-x-2 mb-2">
              {isEditingUsername ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e?.target?.value)}
                    className="bg-input border border-border rounded px-3 py-1 text-foreground text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                    maxLength={20}
                    autoFocus
                  />
                  <Button variant="ghost" size="icon" onClick={handleUsernameSubmit}>
                    <Icon name="Check" size={16} className="text-success" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleUsernameCancel}>
                    <Icon name="X" size={16} className="text-error" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-foreground">{userProfile?.username}</h1>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsEditingUsername(true)}
                    className="opacity-60 hover:opacity-100"
                  >
                    <Icon name="Edit2" size={16} />
                  </Button>
                </div>
              )}
            </div>

            {/* Wallet Address */}
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Wallet" size={16} className="text-text-secondary" />
              <span className="font-mono text-sm text-text-secondary">
                {formatWalletAddress(userProfile?.walletAddress)}
              </span>
              <Button variant="ghost" size="icon" onClick={copyWalletAddress} className="h-6 w-6">
                <Icon name="Copy" size={12} />
              </Button>
            </div>

            {/* Member Since */}
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">
                Member since {userProfile?.memberSince}
              </span>
            </div>
          </div>
        </div>

        {/* Balance & Actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
          {/* Current Balance */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Icon name="Coins" size={20} className="text-primary" />
              <span className="text-sm font-medium text-text-secondary">Current Balance</span>
            </div>
            <div className="font-mono text-2xl font-bold text-foreground mb-1">
              {userProfile?.balance?.algo} ALGO
            </div>
            <div className="text-sm text-text-secondary">
              ≈ ${userProfile?.balance?.usd}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Icon name="Plus" size={16} className="mr-2" />
              Deposit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowDisconnectDialog(true)}
              className="flex-1"
            >
              <Icon name="LogOut" size={16} className="mr-2" />
              Disconnect
            </Button>
          </div>
        </div>
      </div>
      {/* Disconnect Confirmation Dialog */}
      {showDisconnectDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-300 flex items-center justify-center p-4">
          <div className="bg-popover border border-border rounded-lg p-6 max-w-md w-full shadow-gaming-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Disconnect Wallet</h3>
                <p className="text-sm text-text-secondary">Are you sure you want to disconnect?</p>
              </div>
            </div>
            
            <p className="text-sm text-text-secondary mb-6">
              You will need to reconnect your wallet to continue playing games and accessing your account.
            </p>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowDisconnectDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  onWalletDisconnect();
                  setShowDisconnectDialog(false);
                }}
                className="flex-1"
              >
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;