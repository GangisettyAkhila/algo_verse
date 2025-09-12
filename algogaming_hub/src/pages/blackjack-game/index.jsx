import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import TransactionStatus from '../../components/ui/TransactionStatus';
import GameTable from './components/GameTable';
import GameControls from './components/GameControls';
import BettingPanel from './components/BettingPanel';
import GameHistory from './components/GameHistory';
import GameRules from './components/GameRules';

const BlackjackGame = () => {
  // Game state
  const [gameState, setGameState] = useState('betting'); // betting, playing, dealer-turn, player-win, dealer-win, push
  const [dealerCards, setDealerCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerValue, setDealerValue] = useState(0);
  const [playerValue, setPlayerValue] = useState(0);
  const [currentBet, setCurrentBet] = useState(0.5);
  const [balance, setBalance] = useState(2.45);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDealing, setIsDealing] = useState(false);

  // Create a deck of cards
  const createDeck = () => {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];

    suits?.forEach(suit => {
      values?.forEach(value => {
        deck?.push({
          suit,
          value,
          displayValue: value,
          numericValue: value === 'A' ? 11 : ['J', 'Q', 'K']?.includes(value) ? 10 : parseInt(value)
        });
      });
    });

    return deck?.sort(() => Math.random() - 0.5);
  };

  // Calculate hand value
  const calculateHandValue = (cards) => {
    let value = 0;
    let aces = 0;

    cards?.forEach(card => {
      if (card?.value === 'A') {
        aces++;
        value += 11;
      } else {
        value += card?.numericValue;
      }
    });

    // Adjust for aces
    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }

    return value;
  };

  // Deal initial cards
  const dealInitialCards = async () => {
    setIsProcessing(true);
    setIsDealing(true);
    setGameState('playing');

    const deck = createDeck();
    const newPlayerCards = [deck?.[0], deck?.[2]];
    const newDealerCards = [deck?.[1], deck?.[3]];

    // Simulate dealing animation
    setTimeout(() => {
      setPlayerCards(newPlayerCards);
      setDealerCards(newDealerCards);
      setPlayerValue(calculateHandValue(newPlayerCards));
      setDealerValue(calculateHandValue(newDealerCards));
      setIsDealing(false);
      setIsProcessing(false);

      // Check for blackjack
      const playerBJ = calculateHandValue(newPlayerCards) === 21;
      const dealerBJ = calculateHandValue(newDealerCards) === 21;

      if (playerBJ && dealerBJ) {
        setGameState('push');
      } else if (playerBJ) {
        setGameState('player-win');
        setBalance(prev => prev + (currentBet * 1.5));
      } else if (dealerBJ) {
        setGameState('dealer-win');
        setBalance(prev => prev - currentBet);
      }
    }, 1500);
  };

  // Player actions
  const handleHit = () => {
    const deck = createDeck();
    const newCard = deck?.[0];
    const newPlayerCards = [...playerCards, newCard];
    const newValue = calculateHandValue(newPlayerCards);

    setPlayerCards(newPlayerCards);
    setPlayerValue(newValue);

    if (newValue > 21) {
      setGameState('dealer-win');
      setBalance(prev => prev - currentBet);
    }
  };

  const handleStand = () => {
    setGameState('dealer-turn');
    dealerPlay();
  };

  const handleDouble = () => {
    if (balance >= currentBet * 2) {
      setBalance(prev => prev - currentBet);
      setCurrentBet(prev => prev * 2);
      handleHit();
      if (playerValue <= 21) {
        setTimeout(() => handleStand(), 1000);
      }
    }
  };

  const handleSplit = () => {
    // Split logic would go here
    console.log('Split not implemented in this demo');
  };

  // Dealer play logic
  const dealerPlay = () => {
    const deck = createDeck();
    let newDealerCards = [...dealerCards];
    let newDealerValue = calculateHandValue(newDealerCards);
    let cardIndex = 0;

    const dealerHit = () => {
      if (newDealerValue < 17) {
        newDealerCards?.push(deck?.[cardIndex++]);
        newDealerValue = calculateHandValue(newDealerCards);
        setDealerCards([...newDealerCards]);
        setDealerValue(newDealerValue);
        
        setTimeout(dealerHit, 1000);
      } else {
        // Determine winner
        if (newDealerValue > 21) {
          setGameState('player-win');
          setBalance(prev => prev + currentBet);
        } else if (newDealerValue > playerValue) {
          setGameState('dealer-win');
          setBalance(prev => prev - currentBet);
        } else if (newDealerValue < playerValue) {
          setGameState('player-win');
          setBalance(prev => prev + currentBet);
        } else {
          setGameState('push');
        }
      }
    };

    setTimeout(dealerHit, 1000);
  };

  // Start new game
  const handleNewGame = () => {
    setGameState('betting');
    setDealerCards([]);
    setPlayerCards([]);
    setDealerValue(0);
    setPlayerValue(0);
    setIsProcessing(false);
    setIsDealing(false);
  };

  // Handle bet change
  const handleBetChange = (amount) => {
    setCurrentBet(amount);
  };

  // Handle deal
  const handleDeal = () => {
    if (balance >= currentBet) {
      dealInitialCards();
    }
  };

  // Check if player can double or split
  const canDouble = playerCards?.length === 2 && balance >= currentBet * 2;
  const canSplit = playerCards?.length === 2 && 
                   playerCards?.[0]?.value === playerCards?.[1]?.value && 
                   balance >= currentBet * 2;

  // Auto-start new game after result
  useEffect(() => {
    if (['player-win', 'dealer-win', 'push']?.includes(gameState)) {
      const timer = setTimeout(() => {
        handleNewGame();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blackjack Game - AlgoGaming Hub</title>
        <meta name="description" content="Play classic blackjack with cryptocurrency on Algorand blockchain. Provably fair gaming with real-time transactions." />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation */}
          <div className="mb-8">
            <NavigationBreadcrumb />
          </div>

          {/* Game Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Game Area */}
            <div className="xl:col-span-3 space-y-6">
              {/* Game Table */}
              <GameTable
                dealerCards={dealerCards}
                playerCards={playerCards}
                dealerValue={dealerValue}
                playerValue={playerValue}
                gameState={gameState}
                isDealing={isDealing}
              />

              {/* Game Controls */}
              <GameControls
                gameState={gameState}
                playerValue={playerValue}
                canDouble={canDouble}
                canSplit={canSplit}
                onHit={handleHit}
                onStand={handleStand}
                onDouble={handleDouble}
                onSplit={handleSplit}
                isProcessing={isProcessing}
              />
            </div>

            {/* Side Panel */}
            <div className="xl:col-span-1 space-y-6">
              {/* Betting Panel */}
              <BettingPanel
                currentBet={currentBet}
                onBetChange={handleBetChange}
                balance={balance}
                onDeal={handleDeal}
                gameState={gameState}
                isProcessing={isProcessing}
              />

              {/* Game History */}
              <GameHistory />

              {/* Game Rules */}
              <GameRules />
            </div>
          </div>

          {/* New Game Button (Mobile) */}
          {['player-win', 'dealer-win', 'push']?.includes(gameState) && (
            <div className="fixed bottom-4 left-4 right-4 xl:hidden">
              <div className="bg-card border border-border rounded-lg p-4 shadow-gaming-lg">
                <div className="text-center mb-3">
                  <p className={`font-medium ${
                    gameState === 'player-win' ? 'text-success' :
                    gameState === 'dealer-win'? 'text-error' : 'text-text-secondary'
                  }`}>
                    {gameState === 'player-win' ? 'You Won!' :
                     gameState === 'dealer-win'? 'Dealer Wins' : 'Push - Tie Game'}
                  </p>
                </div>
                <button
                  onClick={handleNewGame}
                  className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-medium micro-interaction"
                >
                  New Game
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <TransactionStatus />
    </div>
  );
};

export default BlackjackGame;