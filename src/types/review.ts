export type SubReviewCategory = 'place' | 'item' | 'transport' | 'content';

export interface SponsoredInfo {
  title: string;
  price: string;
  originalPrice?: string;
  discountRate?: string;
  platform: string;
  url: string;
  badge?: string;
  ctaText?: string;
}

export interface SubReview {
  id: string;
  category: SubReviewCategory;
  name: string;
  rating: number; // 1 to 5
  comment: string;
  placeOrBrand?: string;
  verified: boolean; // 내돈내산 / 영수증 인증
  tags?: string[];
  sponsoredInfo?: SponsoredInfo;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  level: string;
  badge?: string;
}

export interface DailyReview {
  id: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  author: Author;
  overallRating: number; // 1 to 5
  summary: string;
  moodTags: string[];
  imagePlaceholder?: string;
  subReviews: SubReview[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  isToday?: boolean;
}

export interface CurationItem {
  id: string;
  category: SubReviewCategory;
  name: string;
  averageRating: number;
  reviewCount: number;
  trendBadge: string;
  highlightQuote: string;
  sponsoredInfo: SponsoredInfo;
  imagePlaceholder: string;
}
