import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustSignals = [
    {
      id: 'blockchain',
      icon: 'Shield',
      title: 'Blockchain Transparency',
      description: 'All transactions are verifiable on Algorand blockchain',
      color: 'var(--color-success)'
    },
    {
      id: 'smart-contract',
      icon: 'FileCheck',
      title: 'Smart Contract Verified',
      description: 'Audited smart contracts ensure fair gaming',
      color: 'var(--color-primary)'
    },
    {
      id: 'decentralized',
      icon: 'Globe',
      title: 'Decentralized Gaming',
      description: 'No central authority controls your funds',
      color: 'var(--color-accent)'
    },
    {
      id: 'provably-fair',
      icon: 'Calculator',
      title: 'Provably Fair',
      description: 'Cryptographic proof of game fairness',
      color: 'var(--color-secondary)'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Why Trust AlgoGaming Hub?</h3>
        <p className="text-text-secondary">Built on blockchain technology for maximum transparency and security</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trustSignals?.map((signal) => (
          <div key={signal?.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name={signal?.icon} size={16} color={signal?.color} />
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm mb-1">{signal?.title}</h4>
              <p className="text-xs text-text-secondary leading-relaxed">{signal?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-text-secondary">Algorand Network</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={14} color="var(--color-text-secondary)" />
            <span className="text-text-secondary">1,247+ Players</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} color="var(--color-text-secondary)" />
            <span className="text-text-secondary">847.2 ALGO Won</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;