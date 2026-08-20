import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReviewContext } from '../context/ReviewContext';
import { useAuthContext } from '../context/AuthContext';
import { SubReview, SubReviewCategory } from '../types/review';
import { StarRating } from '../components/common/StarRating';
import { SubReviewCard } from '../components/review/SubReviewCard';
import { PlaceholderBox } from '../components/common/PlaceholderBox';
import { SAMPLE_SPONSORED_PRESETS } from '../data/mockData';
import { 
  Calendar, 
  Sparkles, 
  Plus, 
  Layers, 
  Check, 
  Coffee, 
  Laptop, 
  Car, 
  Clapperboard, 
  Tag, 
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

const POPULAR_MOOD_TAGS = [
  '생산적인하루',
  '카페투어',
  '오운완',
  '재택근무',
  '힐링성공',
  '야근',
  '드라이브',
  '장비빨',
  '미라클모닝',
  '소소한행복'
];

export const WriteReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { addDailyReview, findSponsoredForKeyword } = useReviewContext();

  // Main Daily Review Form State
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [overallRating, setOverallRating] = useState<number>(4.5);
  const [summary, setSummary] = useState<string>('');
  const [moodTags, setMoodTags] = useState<string[]>(['생산적인하루', '힐링성공']);
  const [customTagInput, setCustomTagInput] = useState<string>('');
  const [imagePlaceholder, setImagePlaceholder] = useState<string>('[오늘 하루 대표 이미지]');

  // Sub-reviews (1:N)
  const [subReviews, setSubReviews] = useState<SubReview[]>([
    {
      id: 'initial-sub-1',
      category: 'item',
      name: '소니 WH-1000XM5',
      rating: 5.0,
      comment: '노이즈 캔슬링 성능이 뛰어나 카페 작업 몰입도 최상이었음.',
      placeOrBrand: '소니 코리아',
      verified: true,
      tags: ['#노이즈캔슬링', '#재택필수템'],
      sponsoredInfo: SAMPLE_SPONSORED_PRESETS['소니 WH-1000XM5']
    }
  ]);

  // Sub-review Builder Modal/Form State
  const [showSubForm, setShowSubForm] = useState<boolean>(false);
  const [subCategory, setSubCategory] = useState<SubReviewCategory>('place');
  const [subName, setSubName] = useState<string>('');
  const [subRating, setSubRating] = useState<number>(4.0);
  const [subComment, setSubComment] = useState<string>('');
  const [subPlaceOrBrand, setSubPlaceOrBrand] = useState<string>('');
  const [subVerified, setSubVerified] = useState<boolean>(true);
  const [subTags, setSubTags] = useState<string[]>([]);
  const [subTagInput, setSubTagInput] = useState<string>('');

  // Live Matched Sponsored Info for current subReview input
  const matchedSponsored = findSponsoredForKeyword(subName);

  // Auto calculate Day of week
  const getDayOfWeekName = (dateStr: string) => {
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? '목요일' : days[d.getDay()];
  };

  const handleToggleTag = (tag: string) => {
    if (moodTags.includes(tag)) {
      setMoodTags(moodTags.filter((t) => t !== tag));
    } else {
      setMoodTags([...moodTags, tag]);
    }
  };

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customTagInput.trim().replace(/^#/, '');
    if (clean && !moodTags.includes(clean)) {
      setMoodTags([...moodTags, clean]);
      setCustomTagInput('');
    }
  };

  const handleAddSubTag = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = subTagInput.trim().replace(/^#/, '');
    if (clean && !subTags.includes(clean)) {
      setSubTags([...subTags, clean]);
      setSubTagInput('');
    }
  };

  const handleAddSubReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName.trim()) {
      alert('서브 리뷰 항목명을 입력해주세요.');
      return;
    }

    const newSub: SubReview = {
      id: `sub-${Date.now()}`,
      category: subCategory,
      name: subName.trim(),
      rating: subRating,
      comment: subComment.trim() || '세부 평가 코멘트가 작성되지 않았습니다.',
      placeOrBrand: subPlaceOrBrand.trim(),
      verified: subVerified,
      tags: subTags.length > 0 ? subTags : [`#${subCategory}`],
      sponsoredInfo: matchedSponsored
    };

    setSubReviews([...subReviews, newSub]);

    // Reset sub-form
    setSubName('');
    setSubComment('');
    setSubPlaceOrBrand('');
    setSubRating(4.0);
    setSubTags([]);
    setShowSubForm(false);
  };

  const handleDeleteSubReview = (index: number) => {
    setSubReviews(subReviews.filter((_, idx) => idx !== index));
  };

  const { user } = useAuthContext();

  const handleSubmitDailyReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) {
      alert('오늘 하루 총평을 입력해주세요.');
      return;
    }

    const authorInfo = user
      ? {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          level: user.level,
          badge: `🔥 ${user.streakDays}일차 기록`
        }
      : {
          id: 'guest',
          name: '익명 기록러',
          avatar: 'G',
          level: 'Lv.1 일상 기록러',
          badge: 'NEW'
        };

    const created = addDailyReview({
      date,
      dayOfWeek: getDayOfWeekName(date),
      author: authorInfo,
      overallRating,
      summary: summary.trim(),
      moodTags: moodTags.length > 0 ? moodTags : ['#일상'],
      imagePlaceholder,
      subReviews,
      isToday: date === new Date().toISOString().split('T')[0]
    });

    alert('하루 리뷰가 성공적으로 등록되었습니다!');
    navigate(`/review/${created.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Back & Title */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-dashed border-slate-300">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 mb-1 font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>돌아가기</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>오늘의 하루 리뷰 작성</span>
            <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-normal">
              1:N 서브 리뷰 시스템
            </span>
          </h1>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 font-mono">
            {getDayOfWeekName(date)} 기록
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmitDailyReview} className="space-y-8">
        {/* ========================================================================= */}
        {/* SECTION 1: Main Daily Review (메인 하루 총평 & 별점) */}
        {/* ========================================================================= */}
        <section className="border-2 border-dashed border-slate-300 rounded-2xl bg-white p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                1
              </span>
              <h2 className="font-bold text-base text-slate-900">
                메인 데일리 리뷰 (오늘 하루 종합)
              </h2>
            </div>
            <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              필수 입력
            </span>
          </div>

          {/* Date & Overall Score */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>리뷰 일자</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-dashed border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:border-slate-800 bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>오늘 하루 종합 평점 (별점 클릭)</span>
              </label>
              <div className="flex items-center gap-3 p-2 bg-amber-50/50 border border-dashed border-amber-300 rounded-lg">
                <StarRating
                  rating={overallRating}
                  size="md"
                  interactive
                  onChange={(r) => setOverallRating(r)}
                  showScoreText
                />
              </div>
            </div>
          </div>

          {/* Mood / Tag Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span>오늘의 기분 / 상황 태그</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_MOOD_TAGS.map((tag) => {
                const active = moodTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleToggleTag(tag)}
                    className={`text-xs px-2.5 py-1 rounded-md border font-mono transition-colors ${
                      active
                        ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-xs'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>

            {/* Custom Tag Input */}
            <div className="flex gap-2 pt-1 max-w-sm">
              <input
                type="text"
                placeholder="직접 태그 입력 (예: 개발몰입)"
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs border border-dashed border-slate-300 rounded-md bg-slate-50 focus:outline-none focus:border-slate-800"
              />
              <button
                type="button"
                onClick={handleAddCustomTag}
                className="px-3 py-1.5 bg-slate-800 text-white rounded-md text-xs font-semibold hover:bg-slate-900"
              >
                + 추가
              </button>
            </div>
          </div>

          {/* Daily Summary Textarea */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              오늘 하루 총평 <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="오늘 하루 있었던 주요 일과와 총평을 일기처럼 자유롭게 적어주세요. (예: 오전엔 카페에서 생산적인 코딩, 오후엔 새로운 헤드폰 테스트와 저녁 드라이브...)"
              required
              className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg text-sm focus:outline-none focus:border-slate-800 bg-slate-50/50 leading-relaxed font-sans"
            />
          </div>

          {/* Representative Image Placeholder Box */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>대표 이미지 영역 (와이어프레임)</span>
              <span className="text-[10px] text-slate-400 font-mono">Placeholder</span>
            </label>
            <div className="p-3 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 space-y-2">
              <PlaceholderBox
                label={imagePlaceholder}
                height="h-28"
                subText="클릭하여 대표 사진 교체 또는 텍스트 라벨 변경"
              />
              <input
                type="text"
                value={imagePlaceholder}
                onChange={(e) => setImagePlaceholder(e.target.value)}
                placeholder="대표 사진 설명 (예: [대표 사진: 한강 야경 & 카페 작업 샷])"
                className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded bg-white text-slate-600 font-mono"
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: Sub-Reviews System (1 : N 세부 리뷰 카드) */}
        {/* ========================================================================= */}
        <section className="border-2 border-dashed border-blue-300 rounded-2xl bg-blue-50/30 p-6 space-y-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-blue-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <h2 className="font-bold text-base text-slate-900">
                  서브 리뷰 시스템 (1 : N 세부 리뷰)
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                오늘 하루 동안 경험한 장소, 사용한 제품, 이동수단 등을 개별 카드로 추가하세요.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowSubForm(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ 서브 리뷰 추가</span>
            </button>
          </div>

          {/* Current Sub-reviews List */}
          <div className="space-y-4">
            {subReviews.length > 0 ? (
              subReviews.map((sub, idx) => (
                <SubReviewCard
                  key={sub.id || idx}
                  subReview={sub}
                  isEditing
                  onDelete={() => handleDeleteSubReview(idx)}
                />
              ))
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-blue-200 rounded-xl bg-white/60 p-6 text-slate-400">
                <Layers className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                <p className="text-xs font-bold text-slate-600">등록된 서브 리뷰가 없습니다</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  상단의 '+ 서브 리뷰 추가' 버튼을 눌러 첫 번째 세부 리뷰를 작성해보세요.
                </p>
              </div>
            )}
          </div>

          {/* Sub Review Builder Modal / Form */}
          {showSubForm && (
            <div className="border-2 border-dashed border-blue-400 rounded-xl bg-white p-5 space-y-4 shadow-lg animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  새 서브 리뷰 작성
                </span>
                <button
                  type="button"
                  onClick={() => setShowSubForm(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-mono"
                >
                  닫기 ✕
                </button>
              </div>

              {/* Category Selector Tabs */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  카테고리 선택
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'place', label: '☕ 장소/식당', icon: <Coffee className="w-3.5 h-3.5" /> },
                    { id: 'item', label: '💻 아이템/기기', icon: <Laptop className="w-3.5 h-3.5" /> },
                    { id: 'transport', label: '🚗 이동수단', icon: <Car className="w-3.5 h-3.5" /> },
                    { id: 'content', label: '🎬 미디어/콘텐츠', icon: <Clapperboard className="w-3.5 h-3.5" /> }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSubCategory(cat.id as SubReviewCategory)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                        subCategory === cat.id
                          ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {cat.icon}
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Item Name with Quick Preset suggestions */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  항목 이름 / 모델명 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 성수 어니언 카페, 소니 WH-1000XM5, 쏘카 아이오닉 5, 로지텍 마우스"
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-dashed border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 bg-slate-50"
                />

                {/* Preset suggestions */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 font-mono">빠른 입력 예시:</span>
                  {['소니 WH-1000XM5', '성수 어니언 카페', '쏘카 아이오닉 5', '로지텍 MX Master 3S', '스타벅스 아메리카노', '넷플릭스 삼체'].map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setSubName(name)}
                      className="text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 px-2 py-0.5 rounded border border-slate-200 transition-colors"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location or Brand / Store */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    위치 / 브랜드 / 구매처
                  </label>
                  <input
                    type="text"
                    placeholder="예: 서울 성동구 성수동, 공식 스토어, 넷플릭스"
                    value={subPlaceOrBrand}
                    onChange={(e) => setSubPlaceOrBrand(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs bg-slate-50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    세부 별점
                  </label>
                  <div className="p-1.5 bg-slate-50 border border-slate-300 rounded-md flex items-center">
                    <StarRating
                      rating={subRating}
                      size="sm"
                      interactive
                      onChange={(r) => setSubRating(r)}
                      showScoreText
                    />
                  </div>
                </div>
              </div>

              {/* Sub Comment */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  세부 리뷰 한줄평 / 후기
                </label>
                <textarea
                  rows={2}
                  placeholder="이 장소나 아이템에 대한 솔직한 평을 적어주세요."
                  value={subComment}
                  onChange={(e) => setSubComment(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-md text-xs bg-slate-50 focus:outline-none"
                />
              </div>

              {/* Sub Tags */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  서브 리뷰 태그
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="태그 입력 (예: 노이즈캔슬링, 작업하기좋은)"
                    value={subTagInput}
                    onChange={(e) => setSubTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSubTag(e);
                      }
                    }}
                    className="flex-1 px-3 py-1.5 border border-slate-300 rounded-md text-xs bg-slate-50 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubTag}
                    className="px-3 py-1.5 bg-slate-800 text-white rounded-md text-xs font-semibold hover:bg-slate-900"
                  >
                    + 태그 추가
                  </button>
                </div>
                {subTags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {subTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 font-mono"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => setSubTags(subTags.filter((_, i) => i !== idx))}
                          className="text-blue-400 hover:text-blue-700 font-bold ml-0.5"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Verified Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={subVerified}
                    onChange={(e) => setSubVerified(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-0"
                  />
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    내돈내산 / 영수증 인증 뱃지 표시
                  </span>
                </label>
              </div>

              {/* Live BM Sponsored Preview */}
              {matchedSponsored && (
                <div className="p-3 bg-amber-50 border-2 border-dashed border-amber-300 rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      BM 실시간 제휴 링크 자동 연동 성공!
                    </span>
                    <span className="text-[10px] text-amber-700 font-mono">
                      {matchedSponsored.platform}
                    </span>
                  </div>
                  <p className="text-xs text-amber-800">
                    입력하신 <strong>'{subName}'</strong> 키워드와 연동된 제휴 최저가({matchedSponsored.price}) 박스가 리뷰에 자동 생성됩니다.
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowSubForm(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleAddSubReview}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  서브 리뷰 카드 등록
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Submit Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-dashed border-slate-300">
          <p className="text-xs text-slate-500 font-mono">
            * 등록 시 메인 데일리 리뷰 1건과 서브 리뷰 {subReviews.length}건이 발행됩니다.
          </p>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>하루 리뷰 발행 완료</span>
          </button>
        </div>
      </form>
    </div>
  );
};
