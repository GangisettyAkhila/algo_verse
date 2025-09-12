import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const SecurityEducation = () => {
  const [activeTab, setActiveTab] = useState('security');

  const tabs = [
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield'
    },
    {
      id: 'benefits',
      label: 'Benefits',
      icon: 'Star'
    },
    {
      id: 'how-it-works',
      label: 'How It Works',
      icon: 'Info'
    }
  ];

  const content = {
    security: {
      title: 'Wallet Security Best Practices',
      items: [
        {
          icon: 'Lock',
          title: 'Never Share Your Seed Phrase',
          description: 'Your seed phrase is the key to your wallet. Never share it with anyone, including our support team.'
        },
        {
          icon: 'Eye',
          title: 'Verify All Transactions',
          description: 'Always review transaction details in your wallet before confirming any gaming bets or withdrawals.'
        },
        {
          icon: 'Smartphone',
          title: 'Use Official Wallet Apps',
          description: 'Only download wallet applications from official sources and verified app stores.'
        },
        {
          icon: 'Wifi',
          title: 'Secure Network Connection',
          description: 'Always use secure, private internet connections when accessing your wallet and gaming platform.'
        }
      ]
    },
    benefits: {
      title: 'Decentralized Gaming Benefits',
      items: [
        {
          icon: 'Coins',
          title: 'True Ownership',
          description: 'Your funds remain in your wallet at all times. No need to deposit to a centralized platform.'
        },
        {
          icon: 'Eye',
          title: 'Complete Transparency',
          description: 'All game results and transactions are recorded on the blockchain for full transparency.'
        },
        {
          icon: 'Zap',
          title: 'Instant Payouts',
          description: 'Win payouts are processed immediately through smart contracts, no waiting periods.'
        },
        {
          icon: 'Globe',
          title: 'Global Access',
          description: 'Play from anywhere in the world without geographical restrictions or KYC requirements.'
        }
      ]
    },
    'how-it-works': {
      title: 'How Blockchain Gaming Works',
      items: [
        {
          icon: 'Wallet',
          title: 'Connect Your Wallet',
          description: 'Link your Algorand wallet to the platform without sharing private keys or seed phrases.'
        },
        {
          icon: 'Gamepad2',
          title: 'Choose Your Game',
          description: 'Select from dice, spin wheel, blackjack, or slot machine games with various betting options.'
        },
        {
          icon: 'Send',
          title: 'Place Your Bet',
          description: 'Approve the transaction in your wallet to place your bet on the blockchain.'
        },
        {
          icon: 'Trophy',
          title: 'Instant Results',
          description: 'Smart contracts determine results instantly and transfer winnings directly to your wallet.'
        }
      ]
    }
  };

  const activeContent = content?.[activeTab];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`
              flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors
              ${activeTab === tab?.id
                ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                : 'text-text-secondary hover:text-foreground hover:bg-muted'
              }
            `}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{activeContent?.title}</h3>
        
        <div className="space-y-4">
          {activeContent?.items?.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={item?.icon} size={16} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm mb-1">{item?.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{item?.description}</p>
              </div>
            </div>
          ))}
        </div>

        {activeTab === 'security' && (
          <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground text-sm mb-1">Important Security Notice</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  AlgoGaming Hub will never ask for your private keys, seed phrases, or passwords. 
                  Always verify you're on the correct website (algogaming-hub.com) before connecting your wallet.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityEducation;