import React, { createContext, useContext, useState, useEffect } from 'react';
import { DailyReview, SubReview } from '../types/review';
import { INITIAL_DAILY_REVIEWS, SAMPLE_SPONSORED_PRESETS } from '../data/mockData';

interface ReviewContextType {
  dailyReviews: DailyReview[];
  addDailyReview: (review: Omit<DailyReview, 'id' | 'createdAt' | 'likesCount' | 'commentsCount'>) => DailyReview;
  deleteDailyReview: (id: string) => void;
  getDailyReviewById: (id: string) => DailyReview | undefined;
  toggleLike: (id: string) => void;
  likedReviews: Record<string, boolean>;
  findSponsoredForKeyword: (keyword: string) => typeof SAMPLE_SPONSORED_PRESETS[string] | undefined;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

const STORAGE_KEY = 'daily_review_posts_v1';

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dailyReviews, setDailyReviews] = useState<DailyReview[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_DAILY_REVIEWS;
  });

  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dailyReviews));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [dailyReviews]);

  const findSponsoredForKeyword = (keyword: string) => {
    const cleanKey = keyword.trim().toLowerCase();
    for (const [key, val] of Object.entries(SAMPLE_SPONSORED_PRESETS)) {
      if (cleanKey.includes(key.toLowerCase()) || key.toLowerCase().includes(cleanKey)) {
        return val;
      }
    }
    // Generic fallback if matched category keyword
    if (cleanKey.includes('카페') || cleanKey.includes('커피') || cleanKey.includes('식당')) {
      return SAMPLE_SPONSORED_PRESETS['성수 어니언 카페'];
    }
    if (cleanKey.includes('헤드폰') || cleanKey.includes('이어폰') || cleanKey.includes('소니')) {
      return SAMPLE_SPONSORED_PRESETS['소니 WH-1000XM5'];
    }
    if (cleanKey.includes('마우스') || cleanKey.includes('키보드') || cleanKey.includes('로지텍')) {
      return SAMPLE_SPONSORED_PRESETS['로지텍 MX Master 3S'];
    }
    if (cleanKey.includes('차') || cleanKey.includes('드라이브') || cleanKey.includes('쏘카')) {
      return SAMPLE_SPONSORED_PRESETS['쏘카 아이오닉 5'];
    }
    if (cleanKey.includes('넷플릭스') || cleanKey.includes('영화') || cleanKey.includes('책')) {
      return SAMPLE_SPONSORED_PRESETS['넷플릭스 삼체'];
    }
    return undefined;
  };

  const addDailyReview = (
    reviewData: Omit<DailyReview, 'id' | 'createdAt' | 'likesCount' | 'commentsCount'>
  ): DailyReview => {
    const newId = `rev-${Date.now()}`;
    // enrich subReviews with sponsoredInfo if not provided
    const enrichedSubReviews: SubReview[] = reviewData.subReviews.map((sub, idx) => {
      const sponsored = sub.sponsoredInfo || findSponsoredForKeyword(sub.name);
      return {
        ...sub,
        id: sub.id || `sub-${Date.now()}-${idx}`,
        sponsoredInfo: sponsored
      };
    });

    const newReview: DailyReview = {
      ...reviewData,
      id: newId,
      subReviews: enrichedSubReviews,
      likesCount: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString()
    };

    setDailyReviews(prev => [newReview, ...prev]);
    return newReview;
  };

  const deleteDailyReview = (id: string) => {
    setDailyReviews(prev => prev.filter(r => r.id !== id));
  };

  const getDailyReviewById = (id: string): DailyReview | undefined => {
    return dailyReviews.find(r => r.id === id);
  };

  const toggleLike = (id: string) => {
    const isLiked = !!likedReviews[id];
    setLikedReviews(prev => ({ ...prev, [id]: !isLiked }));
    setDailyReviews(prev =>
      prev.map(r => {
        if (r.id === id) {
          return {
            ...r,
            likesCount: isLiked ? Math.max(0, r.likesCount - 1) : r.likesCount + 1
          };
        }
        return r;
      })
    );
  };

  return (
    <ReviewContext.Provider
      value={{
        dailyReviews,
        addDailyReview,
        deleteDailyReview,
        getDailyReviewById,
        toggleLike,
        likedReviews,
        findSponsoredForKeyword
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviewContext must be used within a ReviewProvider');
  }
  return context;
};
