import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GameRules = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const rules = [
    {
      title: "Basic Rules",
      icon: "BookOpen",
      content: [
        "Get as close to 21 as possible without going over",
        "Face cards (J, Q, K) are worth 10 points",
        "Aces are worth 1 or 11 (whichever is better)",
        "Dealer must hit on 16 and stand on 17"
      ]
    },
    {
      title: "Player Actions",
      icon: "Target",
      content: [
        "Hit: Take another card",
        "Stand: Keep your current hand",
        "Double Down: Double your bet and take exactly one more card",
        "Split: Split identical cards into two separate hands"
      ]
    },
    {
      title: "Winning Conditions",
      icon: "Trophy",
      content: [
        "Blackjack (21 with first 2 cards): Pays 3:2",
        "Beat dealer without busting: Pays 1:1",
        "Dealer busts (over 21): You win 1:1",
        "Tie (Push): Your bet is returned"
      ]
    },
    {
      title: "Betting Limits",
      icon: "DollarSign",
      content: [
        "Minimum bet: 0.1 ALGO",
        "Maximum bet: 10 ALGO per hand",
        "Double down: Must equal original bet",
        "Split: Requires additional bet equal to original"
      ]
    }
  ];

  const payoutTable = [
    { hand: "Blackjack (Natural 21)", payout: "3:2", example: "1.5 ALGO on 1 ALGO bet" },
    { hand: "Regular Win", payout: "1:1", example: "1 ALGO on 1 ALGO bet" },
    { hand: "Push (Tie)", payout: "Even", example: "Original bet returned" },
    { hand: "Bust/Lose", payout: "Lose", example: "Lose original bet" }
  ];

  return (
    <div className={`bg-card border border-border rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
              <Icon name="HelpCircle" size={16} color="var(--color-secondary)" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Game Rules</h3>
              <p className="text-xs text-text-secondary">Learn how to play</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Rules Content */}
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[600px]' : 'max-h-0'} overflow-y-auto`}>
        <div className="p-4 space-y-6">
          {/* Rules Sections */}
          {rules?.map((section, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name={section?.icon} size={16} color="var(--color-primary)" />
                <h4 className="font-medium text-foreground">{section?.title}</h4>
              </div>
              <ul className="space-y-1 ml-6">
                {section?.content?.map((rule, ruleIndex) => (
                  <li key={ruleIndex} className="text-sm text-text-secondary flex items-start">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Payout Table */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="Calculator" size={16} color="var(--color-success)" />
              <h4 className="font-medium text-foreground">Payout Table</h4>
            </div>
            <div className="bg-muted/30 rounded-lg overflow-hidden">
              <div className="grid grid-cols-3 gap-px bg-border">
                <div className="bg-muted p-3">
                  <span className="text-xs font-medium text-foreground">Hand Type</span>
                </div>
                <div className="bg-muted p-3">
                  <span className="text-xs font-medium text-foreground">Payout</span>
                </div>
                <div className="bg-muted p-3">
                  <span className="text-xs font-medium text-foreground">Example</span>
                </div>
                
                {payoutTable?.map((row, index) => (
                  <React.Fragment key={index}>
                    <div className="bg-card p-3">
                      <span className="text-xs text-foreground">{row?.hand}</span>
                    </div>
                    <div className="bg-card p-3">
                      <span className={`text-xs font-mono font-medium ${
                        row?.payout === 'Lose' ? 'text-error' :
                        row?.payout === 'Even'? 'text-text-secondary' : 'text-success'
                      }`}>
                        {row?.payout}
                      </span>
                    </div>
                    <div className="bg-card p-3">
                      <span className="text-xs text-text-secondary">{row?.example}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Card Values */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="Cards" size={16} color="var(--color-accent)" />
              <h4 className="font-medium text-foreground">Card Values</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <h5 className="text-sm font-medium text-foreground mb-2">Number Cards</h5>
                <p className="text-xs text-text-secondary">2-10 = Face value</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-3">
                <h5 className="text-sm font-medium text-foreground mb-2">Face Cards</h5>
                <p className="text-xs text-text-secondary">J, Q, K = 10 points</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-3 col-span-2">
                <h5 className="text-sm font-medium text-foreground mb-2">Aces</h5>
                <p className="text-xs text-text-secondary">1 or 11 points (automatically optimized)</p>
              </div>
            </div>
          </div>

          {/* Blockchain Info */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} color="var(--color-primary)" />
              <div>
                <h4 className="font-medium text-primary mb-1">Provably Fair Gaming</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  All card deals are generated using blockchain-verified random numbers. 
                  Every game result is transparent and can be verified on the Algorand blockchain. 
                  Your bets and winnings are processed through smart contracts for maximum security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Reference (Always Visible) */}
      {!isExpanded && (
        <div className="p-4 bg-muted/30">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs text-text-secondary">Goal</p>
              <p className="text-sm font-medium text-foreground">Get to 21</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Blackjack Pays</p>
              <p className="text-sm font-medium text-success">3:2</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameRules;