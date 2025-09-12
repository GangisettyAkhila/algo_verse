import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConnectionStatus = ({ 
  status, 
  error, 
  connectedWallet, 
  onRetry, 
  onDisconnect 
}) => {
  const navigate = useNavigate();

  if (status === 'connected' && connectedWallet) {
    return (
      <div className="bg-success/10 border border-success/20 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} color="var(--color-success)" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Wallet Connected Successfully!</h3>
        <p className="text-text-secondary mb-4">
          Your {connectedWallet?.name} wallet is now connected to AlgoGaming Hub
        </p>
        <div className="bg-background/50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Wallet Address</span>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Icon name="Copy" size={14} />
            </Button>
          </div>
          <p className="font-mono text-sm text-foreground break-all">
            {connectedWallet?.address || 'ALGO7X4K2M9N8P3Q6R5S1T2U3V4W5X6Y7Z8A9B0C1D2E3F4G5H6'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            fullWidth
            onClick={() => navigate('/dice-game')}
            iconName="Play"
            iconPosition="left"
          >
            Start Gaming
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={onDisconnect}
            iconName="LogOut"
            iconPosition="left"
          >
            Disconnect
          </Button>
        </div>
      </div>
    );
  }

  if (status === 'error' && error) {
    return (
      <div className="bg-error/10 border border-error/20 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="XCircle" size={32} color="var(--color-error)" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Connection Failed</h3>
        <p className="text-text-secondary mb-4">{error}</p>
        <div className="bg-background/50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-foreground mb-2">Troubleshooting Tips:</h4>
          <ul className="text-sm text-text-secondary space-y-1 text-left">
            <li>• Make sure your wallet extension is installed and unlocked</li>
            <li>• Check if you have sufficient ALGO for transaction fees</li>
            <li>• Try refreshing the page and connecting again</li>
            <li>• Ensure you're on the correct Algorand network</li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            fullWidth
            onClick={onRetry}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={() => window.location?.reload()}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  if (status === 'connecting') {
    return (
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Clock" size={32} color="var(--color-warning)" className="animate-spin" />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-2">Connecting Wallet...</h3>
        <p className="text-text-secondary mb-4">
          Please check your wallet extension and approve the connection request
        </p>
        
        <div className="bg-background/50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
            <span className="text-sm text-text-secondary">Waiting for wallet approval</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-warning h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>

        <Button
          variant="outline"
          fullWidth
          onClick={onRetry}
          iconName="X"
          iconPosition="left"
        >
          Cancel Connection
        </Button>
      </div>
    );
  }

  return null;
};

export default ConnectionStatus;