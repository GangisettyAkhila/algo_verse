import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import WalletProviderCard from './components/WalletProviderCard';
import TrustSignals from './components/TrustSignals';
import ConnectionStatus from './components/ConnectionStatus';
import SecurityEducation from './components/SecurityEducation';
import { PeraWalletConnect } from '@perawallet/connect';

const peraWallet = new PeraWalletConnect();

const WalletConnection = () => {
  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState('idle'); // idle, connecting, connected, error
  const [connectingProvider, setConnectingProvider] = useState(null);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [error, setError] = useState(null);

  // Wallet providers list
  const walletProviders = [
    {
      id: 'pera',
      name: 'Pera Wallet',
      description: 'Official Algorand mobile wallet',
      icon: 'Smartphone',
      features: [
        'Mobile-first design',
        'Built-in DeFi features',
        'Secure key management',
        'Multi-account support'
      ]
    },
    {
      id: 'myalgo',
      name: 'MyAlgo Wallet',
      description: 'Web-based Algorand wallet',
      icon: 'Globe',
      features: [
        'Browser extension',
        'Hardware wallet support',
        'Advanced transaction tools',
        'Developer friendly'
      ]
    },
    {
      id: 'algosigner',
      name: 'AlgoSigner',
      description: 'Browser extension wallet',
      icon: 'Chrome',
      features: [
        'Chrome extension',
        'dApp integration',
        'Transaction signing',
        'Account management'
      ]
    },
    {
      id: 'defly',
      name: 'Defly Wallet',
      description: 'DeFi-focused Algorand wallet',
      icon: 'Zap',
      features: [
        'DeFi optimization',
        'Portfolio tracking',
        'Yield farming tools',
        'Cross-platform sync'
      ]
    }
  ];

  // Connect to Pera Wallet using real SDK
  const handleConnect = async (providerId) => {
    setConnectionStatus('connecting');
    setConnectingProvider(providerId);
    setError(null);

    if (providerId === 'pera') {
      try {
        const accounts = await peraWallet.connect();
        if (accounts.length > 0) {
          setConnectedWallet({
            id: 'pera',
            name: 'Pera Wallet',
            address: accounts[0],
            balance: null // You can fetch balance if needed
          });
          setConnectionStatus('connected');
          localStorage.setItem('wallet-connected', 'pera');
        } else {
          setError('No accounts found in Pera Wallet.');
          setConnectionStatus('error');
        }
      } catch (err) {
        setError('Failed to connect Pera Wallet: ' + err.message);
        setConnectionStatus('error');
      } finally {
        setConnectingProvider(null);
      }
    } else {
      // For other wallets, keep mock connection for now
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const provider = walletProviders?.find(p => p?.id === providerId);
        setConnectedWallet({
          ...provider,
          address: 'ALGO7X4K2M9N8P3Q6R5S1T2U3V4W5X6Y7Z8A9B0C1D2E3F4G5H6',
          balance: '125.47'
        });
        setConnectionStatus('connected');
      } catch (err) {
        setError('Failed to connect wallet. Please make sure your wallet extension is installed and unlocked.');
        setConnectionStatus('error');
      } finally {
        setConnectingProvider(null);
      }
    }
  };

  const handleDisconnect = async () => {
    if (connectedWallet?.id === 'pera') {
      try {
        await peraWallet.disconnect();
      } catch (err) {
        console.error('Error disconnecting Pera Wallet:', err);
      }
    }
    setConnectedWallet(null);
    setConnectionStatus('idle');
    setError(null);
    localStorage.removeItem('wallet-connected');
  };

  const handleRetry = () => {
    setConnectionStatus('idle');
    setError(null);
    setConnectingProvider(null);
  };

  // Check for existing wallet connection on mount
  useEffect(() => {
    const checkExistingConnection = async () => {
      const hasExistingConnection = localStorage.getItem('wallet-connected');
      if (hasExistingConnection === 'pera') {
        try {
          const accounts = await peraWallet.connect();
          if (accounts.length > 0) {
            setConnectedWallet({
              id: 'pera',
              name: 'Pera Wallet',
              address: accounts[0],
              balance: null
            });
            setConnectionStatus('connected');
          }
        } catch (err) {
          console.error('Failed to reconnect Pera Wallet:', err);
          setConnectionStatus('idle');
        }
      }
    };

    checkExistingConnection();

    // Listen for disconnect event
    peraWallet.connector?.on('disconnect', () => {
      setConnectedWallet(null);
      setConnectionStatus('idle');
      localStorage.removeItem('wallet-connected');
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-gaming-lg">
                <Icon name="Zap" size={32} color="#FFFFFF" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Gamepad2" size={12} color="#FFFFFF" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">AlgoGaming Hub</h1>
              <p className="text-text-secondary font-mono">Decentralized Casino Platform</p>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              Connect Your Algorand Wallet
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Securely connect your Algorand wallet to access our decentralized casino games. 
              Your funds remain in your wallet at all times, ensuring maximum security and control.
            </p>
          </div>
        </div>

        {/* Connection Status */}
        {(connectionStatus === 'connecting' || connectionStatus === 'connected' || connectionStatus === 'error') && (
          <div className="max-w-2xl mx-auto mb-8">
            <ConnectionStatus
              status={connectionStatus}
              error={error}
              connectedWallet={connectedWallet}
              onRetry={handleRetry}
              onDisconnect={handleDisconnect}
            />
          </div>
        )}

        {/* Wallet Providers */}
        {connectionStatus === 'idle' && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">Choose Your Wallet</h3>
              <p className="text-text-secondary">Select your preferred Algorand wallet to get started</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {walletProviders?.map((provider) => (
                <WalletProviderCard
                  key={provider?.id}
                  provider={provider}
                  onConnect={handleConnect}
                  isConnecting={connectionStatus === 'connecting'}
                  connectingProvider={connectingProvider}
                />
              ))}
            </div>

            {/* Alternative Connection */}
            <div className="text-center mt-8">
              <p className="text-sm text-text-secondary mb-4">
                Don't have an Algorand wallet yet?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <Button
                  variant="outline"
                  onClick={() => window.open('https://perawallet.app/', '_blank')}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download Pera Wallet
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => window.open('https://wallet.myalgo.com/', '_blank')}
                  iconName="ExternalLink"
                  iconPosition="left"
                >
                  Try MyAlgo Wallet
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Trust Signals */}
        <div className="max-w-4xl mx-auto mb-12">
          <TrustSignals />
        </div>

        {/* Security Education */}
        <div className="max-w-4xl mx-auto mb-12">
          <SecurityEducation />
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-border">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span className="text-sm text-text-secondary">Secure Connection</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} color="var(--color-primary)" />
              <span className="text-sm text-text-secondary">Algorand Network</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} color="var(--color-accent)" />
              <span className="text-sm text-text-secondary">1,247+ Players</span>
            </div>
          </div>
          
          <p className="text-xs text-text-secondary">
            © {new Date()?.getFullYear()} AlgoGaming Hub. Built on Algorand blockchain for provably fair gaming.
          </p>
          
          <div className="flex items-center justify-center space-x-4 mt-3">
            <button className="text-xs text-text-secondary hover:text-primary micro-interaction">
              Terms of Service
            </button>
            <span className="text-text-secondary">•</span>
            <button className="text-xs text-text-secondary hover:text-primary micro-interaction">
              Privacy Policy
            </button>
            <span className="text-text-secondary">•</span>
            <button className="text-xs text-text-secondary hover:text-primary micro-interaction">
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnection;
