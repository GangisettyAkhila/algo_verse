import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import ProfileHeader from './components/ProfileHeader';
import StatisticsPanel from './components/StatisticsPanel';
import GameHistoryTable from './components/GameHistoryTable';
import TransactionHistory from './components/TransactionHistory';
import Icon from '../../components/AppIcon';


const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user profile data
  const [userProfile, setUserProfile] = useState({
    username: "CryptoGamer2024",
    walletAddress: "ALGO7X4K9P2M8N6Q3R5T1W8Y4Z7A2C5E8F1H3J6L9M2P5S8V1X4Z7B9D2F5H8K1N4Q7T9W2Y5A8C1E4G7J9L2O5R8U1X4Z7B9E2F5I8L1O4R7U9X2A5D8G1J4M7P9S2V5Y8B1E4H7K9N2Q5T8W1Z4C7F9I2L5O8R1U4X7A9D2G5J8M1P4S7V9Y2B5E8H1K4N7Q9T2W5Z8C1F4I7L9O2R5U8X1A4D7G9J2M5P8S1V4Y7B9E2H5K8N1Q4T7W9Z2C5F8I1L4O7R9U2X5A8D1G4J7M9P2S5V8Y1B4E7H9K2N5Q8T1W4Z7C9F2I5L8O1R4U7X9A2D5G8J1M4P7S9V2Y5B8E1H4K7N9Q2T5W8Z1C4F7I9L2O5R8U1X4A7D9G2J5M8P1S4V7Y9B2E5H8K1N4Q7T9W2Z5C8F1I4L7O9R2U5X8A1D4G7J9M2P5S8V1Y4B7E9H2K5N8Q1T4W7Z9C2F5I8L1O4R7U9X2A5D8G1J4M7P9S2V5Y8B1E4H7K9N2Q5T8W1Z4C7F9I2L5O8R1U4X7",
    balance: {
      algo: "247.85",
      usd: "416.78"
    },
    memberSince: "March 2024"
  });

  // Mock statistics data
  const [statistics] = useState({
    totalGames: 1247,
    winRate: 68.5,
    biggestWin: "45.2",
    totalWinnings: "892.4",
    recentWins: 23,
    recentLosses: 12,
    netProfit: 15.7,
    favoriteGames: [
      {
        name: "Dice Game",
        icon: "Dice1",
        color: "from-primary to-secondary",
        gamesPlayed: 456,
        totalWon: "234.5",
        winRate: 72
      },
      {
        name: "Spin Wheel",
        icon: "RotateCcw",
        color: "from-accent to-warning",
        gamesPlayed: 321,
        totalWon: "187.2",
        winRate: 65
      },
      {
        name: "Blackjack",
        icon: "Spade",
        color: "from-secondary to-accent",
        gamesPlayed: 289,
        totalWon: "156.8",
        winRate: 58
      }
    ]
  });

  // Mock game history data
  const [gameHistory] = useState([
    {
      date: "2025-01-11T19:45:00Z",
      gameType: "Dice",
      betAmount: "2.5",
      outcome: "Win",
      winnings: "5.0",
      transactionHash: "0x742d35cc6bf4f2a8d1e9c3b7a5f8e2d4c6b9a1f3e5d7c9b2a4f6e8d1c3b5a7f9"
    },
    {
      date: "2025-01-11T18:30:00Z",
      gameType: "Spin Wheel",
      betAmount: "1.0",
      outcome: "Loss",
      winnings: "1.0",
      transactionHash: "0x8f2a6d4c9b1e3f5a7d9c2b4f6e8a1d3c5b7f9e2a4d6c8b1f3e5a7d9c2b4f6e8"
    },
    {
      date: "2025-01-11T17:15:00Z",
      gameType: "Blackjack",
      betAmount: "5.0",
      outcome: "Win",
      winnings: "15.0",
      transactionHash: "0x3c5b7f9e2a4d6c8b1f3e5a7d9c2b4f6e8a1d3c5b7f9e2a4d6c8b1f3e5a7d9c2"
    },
    {
      date: "2025-01-11T16:00:00Z",
      gameType: "Dice",
      betAmount: "3.0",
      outcome: "Win",
      winnings: "6.0",
      transactionHash: "0x9e2a4d6c8b1f3e5a7d9c2b4f6e8a1d3c5b7f9e2a4d6c8b1f3e5a7d9c2b4f6e8"
    },
    {
      date: "2025-01-11T15:30:00Z",
      gameType: "Spin Wheel",
      betAmount: "2.0",
      outcome: "Loss",
      winnings: "2.0",
      transactionHash: "0x4d6c8b1f3e5a7d9c2b4f6e8a1d3c5b7f9e2a4d6c8b1f3e5a7d9c2b4f6e8a1d3"
    },
    {
      date: "2025-01-11T14:45:00Z",
      gameType: "Blackjack",
      betAmount: "4.0",
      outcome: "Win",
      winnings: "12.0",
      transactionHash: "0x6c8b1f3e5a7d9c2b4f6e8a1d3c5b7f9e2a4d6c8b1f3e5a7d9c2b4f6e8a1d3c5"
    },
    {
      date: "2025-01-11T13:20:00Z",
      gameType: "Dice",
      betAmount: "1.5",
      outcome: "Loss",
      winnings: "1.5",
      transactionHash: "0x8b1f3e5a7d9c2b4f6e8a1d3c5b7f9e2a4d6c8b1f3e5a7d9c2b4f6e8a1d3c5b7"
    },
    {
      date: "2025-01-11T12:10:00Z",
      gameType: "Spin Wheel",
      betAmount: "3.5",
      outcome: "Win",
      winnings: "10.5",
      transactionHash: "0x1f3e5a7d9c2b4f6e8a1d3c5b7f9e2a4d6c8b1f3e5a7d9c2b4f6e8a1d3c5b7f9"
    },
    {
      date: "2025-01-11T11:00:00Z",
      gameType: "Blackjack",
      betAmount: "2.0",
      outcome: "Win",
      winnings: "6.0",
      transactionHash: "0x3e5a7d9c2b4f6e8a1d3c5b7f9e2a4d6c8b1f3e5a7d9c2b4f6e8a1d3c5b7f9e2"
    },
    {
      date: "2025-01-11T10:30:00Z",
      gameType: "Dice",
      betAmount: "4.5",
      outcome: "Loss",
      winnings: "4.5",
      transactionHash: "0x5a7d9c2b4f6e8a1d3c5b7f9e2a4d6c8b1f3e5a7d9c2b4f6e8a1d3c5b7f9e2a4"
    }
  ]);

  // Mock transaction history data
  const [transactions] = useState([
    {
      type: "deposit",
      amount: "50.0",
      date: "2025-01-11T20:00:00Z",
      status: "confirmed",
      hash: "0x742d35cc6bf4f2a8d1e9c3b7a5f8e2d4c6b9a1f3e5d7c9b2a4f6e8d1c3b5a7f9"
    },
    {
      type: "game_win",
      amount: "15.0",
      date: "2025-01-11T17:15:00Z",
      status: "confirmed",
      gameType: "Blackjack",
      hash: "0x3c5b7f9e2a4d6c8b1f3e5a7d9c2b4f6e8a1d3c5b7f9e2a4d6c8b1f3e5a7d9c2"
    },
    {
      type: "game_loss",
      amount: "2.0",
      date: "2025-01-11T15:30:00Z",
      status: "confirmed",
      gameType: "Spin Wheel",
      hash: "0x4d6c8b1f3e5a7d9c2b4f6e8a1d3c5b7f9e2a4d6c8b1f3e5a7d9c2b4f6e8a1d3"
    },
    {
      type: "withdrawal",
      amount: "25.0",
      date: "2025-01-10T16:45:00Z",
      status: "confirmed",
      hash: "0x8f2a6d4c9b1e3f5a7d9c2b4f6e8a1d3c5b7f9e2a4d6c8b1f3e5a7d9c2b4f6e8"
    },
    {
      type: "game_win",
      amount: "10.5",
      date: "2025-01-10T12:10:00Z",
      status: "confirmed",
      gameType: "Spin Wheel",
      hash: "0x1f3e5a7d9c2b4f6e8a1d3c5b7f9e2a4d6c8b1f3e5a7d9c2b4f6e8a1d3c5b7f9"
    },
    {
      type: "deposit",
      amount: "100.0",
      date: "2025-01-09T14:20:00Z",
      status: "confirmed",
      hash: "0x9e2a4d6c8b1f3e5a7d9c2b4f6e8a1d3c5b7f9e2a4d6c8b1f3e5a7d9c2b4f6e8"
    }
  ]);

  const handleUsernameUpdate = (newUsername) => {
    setUserProfile(prev => ({
      ...prev,
      username: newUsername
    }));
  };

  const handleWalletDisconnect = () => {
    navigate('/wallet-connection');
  };

  const handleSort = (field, direction) => {
    // In a real app, this would sort the game history
    console.log(`Sorting by ${field} in ${direction} order`);
  };

  const handleFilter = (filterType, value) => {
    // In a real app, this would filter the game history
    console.log(`Filtering ${filterType} by ${value}`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'history', label: 'Game History', icon: 'History' },
    { id: 'transactions', label: 'Transactions', icon: 'Receipt' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <NavigationBreadcrumb />
          </div>

          {/* Profile Header */}
          <div className="mb-8">
            <ProfileHeader
              userProfile={userProfile}
              onUsernameUpdate={handleUsernameUpdate}
              onWalletDisconnect={handleWalletDisconnect}
            />
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm micro-interaction
                      ${activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground hover:border-border'
                      }
                    `}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <StatisticsPanel statistics={statistics} />
            )}

            {activeTab === 'history' && (
              <GameHistoryTable
                gameHistory={gameHistory}
                onSort={handleSort}
                onFilter={handleFilter}
              />
            )}

            {activeTab === 'transactions' && (
              <TransactionHistory transactions={transactions} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;