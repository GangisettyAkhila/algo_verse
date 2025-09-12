import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/AppIcon';
import Header from '../components/ui/Header';
import { PeraWalletConnect } from '@perawallet/connect';

const peraWallet = new PeraWalletConnect();

function Home() {
  const [activeAccount, setActiveAccount] = useState(null);

  const handleWalletConnect = () => {
    peraWallet
      .connect()
      .then((accounts) => {
        if (accounts.length > 0) {
          setActiveAccount(accounts[0]);
        }
      })
      .catch((error) => {
        console.error('Wallet connection failed:', error);
      });
  };

  useEffect(() => {
    peraWallet.connector?.on('disconnect', () => {
      setActiveAccount(null);
    });
  }, []);

  const games = [
    {
      id: 1,
      title: 'Spin Wheel',
      description: 'Spin the wheel to win exciting prizes',
      path: '/spin-wheel-game',
      gradient: 'from-yellow-500 to-orange-500',
      iconBg: 'from-yellow-500 to-orange-500',
      icon: 'RotateCcw'
    },
    {
      id: 2,
      title: 'Dice Game',
      description: 'Roll the dice and test your luck',
      path: '/dice-game',
      gradient: 'from-blue-500 to-purple-500',
      iconBg: 'from-blue-500 to-purple-500',
      icon: 'Dice6'
    },
    {
      id: 3,
      title: 'Blackjack',
      description: 'Classic card game with high stakes',
      path: '/blackjack-game',
      gradient: 'from-red-500 to-pink-500',
      iconBg: 'from-red-500 to-pink-500',
      icon: 'Spade'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-transparent to-indigo-900/30"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-yellow-400/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-radial from-red-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>

        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.5) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      <Header />

      <main className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">

          {/* Pera Wallet Connect */}
          <div className="mb-12">
            <button
              onClick={handleWalletConnect}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Icon name="Wallet" size={20} />
              <span>{activeAccount ? 'Wallet Connected' : 'Connect Pera Wallet'}</span>
            </button>
          </div>

          {/* Royal Welcome Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text">
              Welcome to <br />
              <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text">
                LuckyVerse
              </span>
            </h1>
            <p className="text-xl text-purple-200/80 max-w-2xl mx-auto leading-relaxed">
              Where fortune meets luxury in the most prestigious gaming experience
            </p>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {games.map((game, index) => (
              <Link
                key={game.id}
                to={game.path}
                className={`relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-purple-900/60 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 lg:p-8 shadow-royal group hover:shadow-royal-intense transition-all duration-300`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                <div className={`w-16 h-16 bg-gradient-to-br ${game.iconBg} rounded-3xl flex items-center justify-center shadow-royal mb-4`}>
                  <Icon name={game.icon} size={28} color="#fff" />
                </div>
                <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text mb-2">
                  {game.title}
                </h3>
                <p className="text-base text-purple-200/80 leading-relaxed mb-4">
                  {game.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
