import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GameControls = ({ 
  gameState, 
  playerValue, 
  canDouble, 
  canSplit, 
  onHit, 
  onStand, 
  onDouble, 
  onSplit,
  isProcessing 
}) => {
  const getActionButtons = () => {
    if (gameState !== 'playing') return null;

    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Button
          variant="default"
          onClick={onHit}
          disabled={isProcessing || playerValue >= 21}
          iconName="Plus"
          iconPosition="left"
          className="h-12"
        >
          Hit
        </Button>

        <Button
          variant="outline"
          onClick={onStand}
          disabled={isProcessing}
          iconName="Hand"
          iconPosition="left"
          className="h-12"
        >
          Stand
        </Button>

        <Button
          variant="secondary"
          onClick={onDouble}
          disabled={isProcessing || !canDouble}
          iconName="TrendingUp"
          iconPosition="left"
          className="h-12"
        >
          Double
        </Button>

        <Button
          variant="accent"
          onClick={onSplit}
          disabled={isProcessing || !canSplit}
          iconName="Split"
          iconPosition="left"
          className="h-12"
        >
          Split
        </Button>
      </div>
    );
  };

  const getGameStateMessage = () => {
    switch (gameState) {
      case 'betting':
        return {
          icon: 'DollarSign',
          message: 'Place your bet to start the game',
          color: 'text-primary'
        };
      case 'playing':
        return {
          icon: 'Target',
          message: 'Choose your next action',
          color: 'text-warning'
        };
      case 'dealer-turn':
        return {
          icon: 'Clock',
          message: 'Dealer is playing...',
          color: 'text-accent'
        };
      case 'player-win':
        return {
          icon: 'Trophy',
          message: 'Congratulations! You won!',
          color: 'text-success'
        };
      case 'dealer-win':
        return {
          icon: 'XCircle',
          message: 'Dealer wins this round',
          color: 'text-error'
        };
      case 'push':
        return {
          icon: 'Equal',
          message: "It's a tie! Your bet is returned",
          color: 'text-text-secondary'
        };
      default:
        return {
          icon: 'HelpCircle',
          message: 'Game ready',
          color: 'text-text-secondary'
        };
    }
  };

  const stateInfo = getGameStateMessage();

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      {/* Game State Display */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-muted/50 ${stateInfo?.color}`}>
          <Icon name={stateInfo?.icon} size={20} />
          <span className="font-medium">{stateInfo?.message}</span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="mb-6">
        {getActionButtons()}
      </div>
      {/* Quick Tips */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-warning" />
          Quick Tips
        </h4>
        <div className="space-y-1 text-xs text-text-secondary">
          <p>• Hit: Take another card</p>
          <p>• Stand: Keep your current hand</p>
          <p>• Double: Double your bet and take one card</p>
          <p>• Split: Split identical cards into two hands</p>
        </div>
      </div>
      {/* Processing Indicator */}
      {isProcessing && (
        <div className="mt-4 flex items-center justify-center space-x-2 text-primary">
          <Icon name="Loader2" size={16} className="animate-spin" />
          <span className="text-sm">Processing transaction...</span>
        </div>
      )}
    </div>
  );
};

export default GameControls;