import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LeaderboardFilters from './components/LeaderboardFilters';
import TopPlayersSection from './components/TopPlayersSection';
import LeaderboardTable from './components/LeaderboardTable';
import PlatformStats from './components/PlatformStats';
import UserPositionCard from './components/UserPositionCard';
import PaginationControls from './components/PaginationControls';

const Leaderboard = () => {
  const [filters, setFilters] = useState({
    game: 'all',
    timeframe: 'all-time',
    metric: 'total-winnings'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const tableRef = useRef(null);
  const itemsPerPage = 20;

  // Mock current user ID for demonstration
  const currentUserId = 'user_123';

  // Mock data - in real app this would come from API
  const mockTopPlayers = [
    {
      id: 'user_001',
      username: 'CryptoKing2024',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      totalWinnings: 15847.5,
      gamesPlayed: 1247,
      winPercentage: 68.4,
      biggestWin: 2847.3,
      rank: 1
    },
    {
      id: 'user_002',
      username: 'AlgoQueen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      totalWinnings: 12934.2,
      gamesPlayed: 892,
      winPercentage: 71.2,
      biggestWin: 1934.7,
      rank: 2
    },
    {
      id: 'user_003',
      username: 'DiceWizard',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      totalWinnings: 9847.8,
      gamesPlayed: 1456,
      winPercentage: 64.8,
      biggestWin: 1247.9,
      rank: 3
    }
  ];

  const mockAllPlayers = [
    ...mockTopPlayers,
    {
      id: 'user_004',
      username: 'SpinMaster',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      totalWinnings: 8234.6,
      gamesPlayed: 743,
      winPercentage: 69.3,
      biggestWin: 1834.2,
      rank: 4,
      lastActive: '2 hours ago'
    },
    {
      id: 'user_005',
      username: 'BlackjackPro',
      avatar: 'https://randomuser.me/api/portraits/men/89.jpg',
      totalWinnings: 7456.3,
      gamesPlayed: 1123,
      winPercentage: 58.7,
      biggestWin: 987.4,
      rank: 5,
      lastActive: '5 hours ago'
    },
    {
      id: currentUserId,
      username: 'YourUsername',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      totalWinnings: 3247.8,
      gamesPlayed: 456,
      winPercentage: 62.1,
      biggestWin: 547.3,
      rank: 15,
      lastActive: 'Online'
    },
    // Add more mock players for pagination
    ...Array.from({ length: 50 }, (_, i) => ({
      id: `user_${String(i + 100)?.padStart(3, '0')}`,
      username: `Player${i + 6}`,
      avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${(i % 50) + 1}.jpg`,
      totalWinnings: Math.floor(Math.random() * 5000) + 500,
      gamesPlayed: Math.floor(Math.random() * 800) + 100,
      winPercentage: Math.floor(Math.random() * 40) + 40,
      biggestWin: Math.floor(Math.random() * 1000) + 100,
      rank: i + 6,
      lastActive: `${Math.floor(Math.random() * 24) + 1} hours ago`
    }))
  ];

  const mockPlatformStats = {
    totalPlayers: 12847,
    totalGames: 456789,
    totalWinnings: 2847563,
    activeToday: 1247
  };

  const mockUserPosition = mockAllPlayers?.find(player => player?.id === currentUserId);

  // Filter and paginate players
  const filteredPlayers = mockAllPlayers?.filter(player => {
    // In real app, this would be handled by backend API
    return true;
  });

  const totalPages = Math.ceil(filteredPlayers?.length / itemsPerPage);
  const paginatedPlayers = filteredPlayers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsLoading(true);
    
    // Scroll to top of table
    if (tableRef?.current) {
      tableRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handlePlayerClick = (player) => {
    // In real app, this would navigate to player profile or show modal
    console.log('Player clicked:', player);
  };

  const handleScrollToUser = () => {
    if (mockUserPosition) {
      const userPage = Math.ceil(mockUserPosition?.rank / itemsPerPage);
      if (userPage !== currentPage) {
        setCurrentPage(userPage);
      }
      
      // Simulate scrolling to user row after page change
      setTimeout(() => {
        if (tableRef?.current) {
          tableRef?.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 600);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setRefreshKey(prev => prev + 1);
    
    // Simulate API refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    // Simulate initial data load
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Leaderboard - AlgoGaming Hub</title>
        <meta name="description" content="View top players and competitive rankings on AlgoGaming Hub. Track your position and compete with the best players." />
      </Helmet>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Trophy" size={28} color="#FFFFFF" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Leaderboard</h1>
          </div>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Compete with the best players and climb the ranks. Track your progress and celebrate achievements in our gaming community.
          </p>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-end mb-6">
          <Button
            variant="outline"
            onClick={handleRefresh}
            loading={isLoading}
            iconName="RefreshCw"
            iconPosition="left"
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh Rankings'}
          </Button>
        </div>

        {/* Platform Stats */}
        <PlatformStats stats={mockPlatformStats} className="mb-8" />

        {/* User Position Card */}
        <UserPositionCard 
          userPosition={mockUserPosition}
          onScrollToUser={handleScrollToUser}
          className="mb-8"
        />

        {/* Top Players Section */}
        <TopPlayersSection topPlayers={mockTopPlayers} className="mb-12" />

        {/* Filters */}
        <LeaderboardFilters
          onFilterChange={handleFilterChange}
          activeFilters={filters}
          className="mb-6"
        />

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-2">
              <Icon name="Loader2" size={24} className="text-primary animate-spin" />
              <span className="text-foreground">Loading rankings...</span>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        {!isLoading && (
          <div ref={tableRef}>
            <LeaderboardTable
              players={paginatedPlayers}
              currentUserId={currentUserId}
              onPlayerClick={handlePlayerClick}
              className="mb-6"
            />
          </div>
        )}

        {/* Pagination */}
        {!isLoading && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredPlayers?.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="bg-muted/30 rounded-lg p-6 border border-border">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="font-medium text-foreground">Provably Fair Rankings</span>
            </div>
            <p className="text-sm text-text-secondary max-w-2xl mx-auto">
              All rankings are calculated transparently using blockchain data. Rankings update in real-time as games are completed and verified on the Algorand network.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-text-secondary">
              <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
              <span>•</span>
              <span>Next update: {new Date(Date.now() + 60000)?.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;