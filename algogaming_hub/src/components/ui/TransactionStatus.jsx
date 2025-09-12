import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const TransactionStatus = ({ className = '' }) => {
  const [transactions, setTransactions] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Mock transaction data - in real app this would come from context/state management
  useEffect(() => {
    const mockTransactions = [
      {
        id: '1',
        type: 'bet',
        status: 'pending',
        amount: '0.1 ETH',
        game: 'Dice Game',
        timestamp: Date.now() - 30000,
        hash: '0x742d35cc6bf4f2a'
      }
    ];
    
    if (mockTransactions?.length > 0) {
      setTransactions(mockTransactions);
      setIsVisible(true);
    }
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return 'Clock';
      case 'success':
        return 'CheckCircle';
      case 'failed':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-warning';
      case 'success':
        return 'text-success';
      case 'failed':
        return 'text-error';
      default:
        return 'text-warning';
    }
  };

  const dismissTransaction = (id) => {
    setTransactions(prev => prev?.filter(tx => tx?.id !== id));
    if (transactions?.length <= 1) {
      setIsVisible(false);
    }
  };

  const dismissAll = () => {
    setTransactions([]);
    setIsVisible(false);
  };

  if (!isVisible || transactions?.length === 0) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 right-4 z-300 w-80 max-w-[calc(100vw-2rem)] ${className}`}>
      <div className="bg-popover border border-border rounded-lg shadow-gaming-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Transactions</span>
            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
              {transactions?.length}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={dismissAll}
            className="h-6 w-6"
            title="Dismiss all"
          >
            <Icon name="X" size={14} />
          </Button>
        </div>

        {/* Transaction List */}
        <div className="max-h-64 overflow-y-auto">
          {transactions?.map((tx) => (
            <div key={tx?.id} className="p-3 border-b border-border last:border-b-0">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`mt-0.5 ${getStatusColor(tx?.status)}`}>
                    <Icon 
                      name={getStatusIcon(tx?.status)} 
                      size={16} 
                      className={tx?.status === 'pending' ? 'animate-spin' : ''}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground capitalize">
                        {tx?.type} - {tx?.game}
                      </span>
                      <span className="font-mono text-sm text-foreground">
                        {tx?.amount}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span className={`capitalize ${getStatusColor(tx?.status)}`}>
                        {tx?.status}
                      </span>
                      <span className="font-mono truncate ml-2">
                        {tx?.hash}
                      </span>
                    </div>
                    
                    {tx?.status === 'pending' && (
                      <div className="mt-2">
                        <div className="w-full bg-muted rounded-full h-1">
                          <div className="bg-warning h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                        </div>
                        <p className="text-xs text-text-secondary mt-1">
                          Confirming on blockchain...
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dismissTransaction(tx?.id)}
                  className="h-6 w-6 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Dismiss"
                >
                  <Icon name="X" size={12} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-muted/50 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">
              Updates automatically
            </span>
            <Button variant="ghost" size="sm" className="h-6 text-xs">
              <Icon name="ExternalLink" size={12} className="mr-1" />
              View All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatus;