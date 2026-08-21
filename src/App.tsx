import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FeedPage } from './pages/FeedPage';
import { WriteReviewPage } from './pages/WriteReviewPage';
import { ReviewDetailPage } from './pages/ReviewDetailPage';
import { ExplorePage } from './pages/ExplorePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { MyPage } from './pages/MyPage';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Main Routed Page Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/write" element={<WriteReviewPage />} />
          <Route path="/review/:id" element={<ReviewDetailPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;
