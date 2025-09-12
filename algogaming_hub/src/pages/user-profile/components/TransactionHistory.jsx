import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionHistory = ({ transactions }) => {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const filteredTransactions = transactions?.filter(tx => {
    if (filter === 'all') return true;
    return tx?.type === filter;
  });

  const displayedTransactions = showAll ? filteredTransactions : filteredTransactions?.slice(0, 5);

  const getTransactionIcon = (type) => {
    const icons = {
      'deposit': 'ArrowDownToLine',
      'withdrawal': 'ArrowUpFromLine',
      'game_win': 'TrendingUp',
      'game_loss': 'TrendingDown'
    };
    return icons?.[type] || 'Activity';
  };

  const getTransactionColor = (type) => {
    const colors = {
      'deposit': 'text-success',
      'withdrawal': 'text-warning',
      'game_win': 'text-success',
      'game_loss': 'text-error'
    };
    return colors?.[type] || 'text-text-secondary';
  };

  const getTransactionLabel = (type) => {
    const labels = {
      'deposit': 'Deposit',
      'withdrawal': 'Withdrawal',
      'game_win': 'Game Win',
      'game_loss': 'Game Loss'
    };
    return labels?.[type] || type;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTransactionHash = (hash) => {
    return `${hash?.slice(0, 8)}...${hash?.slice(-6)}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-gaming-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Receipt" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Transaction History</h2>
          <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
            {filteredTransactions?.length}
          </span>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-2">
          {['all', 'deposit', 'withdrawal', 'game_win', 'game_loss']?.map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(filterType)}
              className="text-xs"
            >
              {filterType === 'all' ? 'All' : getTransactionLabel(filterType)}
            </Button>
          ))}
        </div>
      </div>
      {/* Transaction List */}
      <div className="space-y-3">
        {displayedTransactions?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileX" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">No transactions found</p>
          </div>
        ) : (
          displayedTransactions?.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              {/* Transaction Info */}
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction?.type === 'deposit' ? 'bg-success/20' :
                  transaction?.type === 'withdrawal' ? 'bg-warning/20' :
                  transaction?.type === 'game_win' ? 'bg-success/20' : 'bg-error/20'
                }`}>
                  <Icon 
                    name={getTransactionIcon(transaction?.type)} 
                    size={18} 
                    className={getTransactionColor(transaction?.type)} 
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-foreground">
                      {getTransactionLabel(transaction?.type)}
                    </span>
                    {transaction?.gameType && (
                      <span className="text-xs text-text-secondary bg-muted px-2 py-0.5 rounded">
                        {transaction?.gameType}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span>{formatDate(transaction?.date)}</span>
                    <span className="font-mono">{formatTransactionHash(transaction?.hash)}</span>
                  </div>
                </div>
              </div>

              {/* Amount & Status */}
              <div className="text-right">
                <div className={`font-mono font-medium ${getTransactionColor(transaction?.type)}`}>
                  {transaction?.type === 'withdrawal' || transaction?.type === 'game_loss' ? '-' : '+'}
                  {transaction?.amount} ALGO
                </div>
                
                <div className="flex items-center space-x-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${
                    transaction?.status === 'confirmed' ? 'bg-success' :
                    transaction?.status === 'pending' ? 'bg-warning animate-pulse' : 'bg-error'
                  }`}></div>
                  <span className="text-xs text-text-secondary capitalize">
                    {transaction?.status}
                  </span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Icon name="ExternalLink" size={12} />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Show More/Less Button */}
      {filteredTransactions?.length > 5 && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                <Icon name="ChevronUp" size={16} className="mr-2" />
                Show Less
              </>
            ) : (
              <>
                <Icon name="ChevronDown" size={16} className="mr-2" />
                Show All ({filteredTransactions?.length - 5} more)
              </>
            )}
          </Button>
        </div>
      )}
      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-success/10 rounded-lg border border-success/20">
            <div className="font-mono text-lg font-bold text-success">
              +{transactions?.filter(tx => tx?.type === 'deposit' || tx?.type === 'game_win')?.reduce((sum, tx) => sum + parseFloat(tx?.amount), 0)?.toFixed(2)} ALGO
            </div>
            <div className="text-xs text-text-secondary">Total Inflow</div>
          </div>
          
          <div className="text-center p-3 bg-error/10 rounded-lg border border-error/20">
            <div className="font-mono text-lg font-bold text-error">
              -{transactions?.filter(tx => tx?.type === 'withdrawal' || tx?.type === 'game_loss')?.reduce((sum, tx) => sum + parseFloat(tx?.amount), 0)?.toFixed(2)} ALGO
            </div>
            <div className="text-xs text-text-secondary">Total Outflow</div>
          </div>
          
          <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
            <div className="font-mono text-lg font-bold text-primary">
              {transactions?.filter(tx => tx?.status === 'confirmed')?.length}
            </div>
            <div className="text-xs text-text-secondary">Confirmed Transactions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;