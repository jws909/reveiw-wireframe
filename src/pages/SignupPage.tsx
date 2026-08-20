import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  ArrowLeft, 
  Tag, 
  CheckCircle2
} from 'lucide-react';

const LIFESTYLE_INTEREST_TAGS = [
  '재택근무',
  '카페투어',
  '오운완/운동',
  '테크/데스크셋업',
  '전기차/모빌리티',
  '미라클모닝',
  '맛집탐방',
  'OTT/콘텐츠'
];

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuthContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['재택근무', '테크/데스크셋업']);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    if (!email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (password && confirmPassword && password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!agreeTerms) {
      alert('이용약관에 동의해주세요.');
      return;
    }

    signup(name.trim(), email.trim(), selectedTags);
    alert(`환영합니다, ${name}님! RE:VIEW 회원가입이 완료되었습니다.`);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      {/* Back link */}
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-mono"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>메인 피드로 돌아가기</span>
      </button>

      {/* Main Signup Card */}
      <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white font-mono font-bold text-lg mx-auto shadow-sm">
            RE
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            RE:VIEW 회원가입
          </h1>
          <p className="text-xs text-slate-500">
            나만의 하루를 1:N 서브 리뷰로 기록하고 트렌드를 시작하세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 닉네임 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>활동 닉네임</span>
            </label>
            <input
              type="text"
              placeholder="예: 루틴러_민, 테크리뷰어"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:border-slate-800"
            />
          </div>

          {/* 이메일 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>이메일 주소</span>
            </label>
            <input
              type="email"
              placeholder="example@review.app"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:border-slate-800 font-mono"
            />
          </div>

          {/* 비밀번호 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>비밀번호</span>
            </label>
            <input
              type="password"
              placeholder="8자 이상 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:border-slate-800"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
              <span>비밀번호 확인</span>
            </label>
            <input
              type="password"
              placeholder="비밀번호 재입력"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:border-slate-800"
            />
          </div>

          {/* 관심 라이프스타일 태그 선택 */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              <span>관심 라이프스타일 키워드 (다중 선택)</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {LIFESTYLE_INTEREST_TAGS.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleToggleTag(tag)}
                    className={`text-[11px] px-2.5 py-1 rounded-md border font-mono transition-colors ${
                      active
                        ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 약관 동의 */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-600">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-0"
              />
              <span>[필수] 서비스 이용약관 및 개인정보 처리방침 동의</span>
            </label>
          </div>

          {/* 가입 버튼 */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>회원가입 완료 & 1일차 시작</span>
          </button>
        </form>

        {/* Login link */}
        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="text-slate-900 hover:underline font-bold ml-1">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
};
