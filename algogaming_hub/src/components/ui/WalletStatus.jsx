import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const WalletStatus = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [balance] = useState('2.45');
  const [usdValue] = useState('4,127.50');
  const [isConnected] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isConnected) {
    return (
      <div className={`flex items-center space-x-2 px-3 py-2 bg-card rounded-lg border border-border ${className}`}>
        <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
        <Button variant="ghost" size="sm" onClick={() => {}}>
          <span className="text-sm text-error">Connect Wallet</span>
        </Button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        onClick={toggleExpanded}
        className="flex items-center space-x-3 px-4 py-2 bg-card rounded-lg border border-border hover:bg-muted micro-interaction"
      >
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        <div className="text-left">
          <p className="font-mono text-sm text-foreground">{balance} ETH</p>
          <p className="text-xs text-text-secondary">Connected</p>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-secondary" 
        />
      </Button>

      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-gaming-lg z-300">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Wallet Details</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs text-success">Connected</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">ETH Balance</span>
                <span className="font-mono text-sm text-foreground balance-update">{balance} ETH</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">USD Value</span>
                <span className="font-mono text-sm text-foreground">${usdValue}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Network</span>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground">Ethereum</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-secondary">Address</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs text-foreground">0x742d...4f2a</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Icon name="Copy" size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="Send" size={14} className="mr-2" />
                Send
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="Download" size={14} className="mr-2" />
                Receive
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletStatus;