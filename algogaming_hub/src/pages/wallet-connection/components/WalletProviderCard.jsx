import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WalletProviderCard = ({ 
  provider, 
  onConnect, 
  isConnecting, 
  connectingProvider 
}) => {
  const isCurrentlyConnecting = isConnecting && connectingProvider === provider?.id;

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 micro-interaction group">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
          <Icon name={provider?.icon} size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {provider?.name}
          </h3>
          <p className="text-sm text-text-secondary">{provider?.description}</p>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        {provider?.features?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon name="Check" size={16} color="var(--color-success)" />
            <span className="text-sm text-text-secondary">{feature}</span>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        fullWidth
        onClick={() => onConnect(provider?.id)}
        loading={isCurrentlyConnecting}
        disabled={isConnecting}
        iconName={isCurrentlyConnecting ? undefined : "Wallet"}
        iconPosition="left"
        className="group-hover:border-primary group-hover:text-primary"
      >
        {isCurrentlyConnecting ? 'Connecting...' : `Connect ${provider?.name}`}
      </Button>
    </div>
  );
};

export default WalletProviderCard;