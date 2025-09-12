import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Home from './pages/Home';
import SpinWheelGame from './pages/spin-wheel-game';
import DiceGame from './pages/dice-game';
import BlackjackGame from './pages/blackjack-game';
import WalletConnection from './pages/wallet-connection';
import Leaderboard from './pages/leaderboard';
import UserProfile from './pages/user-profile';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Home />} />
        <Route path="/spin-wheel-game" element={<SpinWheelGame />} />
        <Route path="/dice-game" element={<DiceGame />} />
        <Route path="/blackjack-game" element={<BlackjackGame />} />
        <Route path="/wallet-connection" element={<WalletConnection />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;