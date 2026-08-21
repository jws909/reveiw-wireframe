import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { 
  LogIn, 
  Mail, 
  Lock, 
  ArrowLeft, 
  Sparkles
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }
    login(email.trim());
    alert('로그인되었습니다!');
    navigate('/');
  };

  const handleSocialLogin = (provider: string) => {
    login(`${provider.toLowerCase()}_user@reday.app`, `${provider} 사용자`);
    alert(`[와이어프레임] ${provider} 소셜 계정으로 로그인되었습니다.`);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      {/* Back to feed */}
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-mono"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>메인 피드로 돌아가기</span>
      </button>

      {/* Main Login Card */}
      <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white font-mono font-bold text-lg mx-auto shadow-sm">
            RE
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            RE:DAY 로그인
          </h1>
          <p className="text-xs text-slate-500">
            나의 하루를 기록하고 라이프 트렌드를 함께 나눠보세요.
          </p>
        </div>

        {/* Social Login Wireframe Slots */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleSocialLogin('카카오')}
            className="w-full py-2.5 px-4 bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border border-amber-300 shadow-xs"
          >
            <span className="w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">K</span>
            <span>카카오로 1초 만에 시작하기</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin('구글')}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-300 shadow-xs"
          >
            <span className="font-mono font-bold text-slate-800">G</span>
            <span>Google 계정으로 계속하기</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-dashed border-slate-200" />
          <span className="text-[11px] font-mono text-slate-400">또는 이메일로 로그인</span>
          <div className="flex-1 border-t border-dashed border-slate-200" />
        </div>

        {/* Email Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>이메일 주소</span>
            </label>
            <input
              type="email"
              placeholder="example@reday.app"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:border-slate-800 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>비밀번호</span>
              </label>
              <button
                type="button"
                onClick={() => alert('비밀번호 재설정 링크가 발송되었습니다 (와이어프레임).')}
                className="text-[11px] text-slate-400 hover:text-slate-700 underline"
              >
                비밀번호 찾기
              </button>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:border-slate-800"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-slate-900 focus:ring-0"
              />
              <span>로그인 상태 유지</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>이메일로 로그인</span>
          </button>
        </form>

        {/* Demo Fast Login Preset */}
        <div className="p-3 bg-blue-50/60 border border-dashed border-blue-200 rounded-xl space-y-1.5 text-xs text-blue-900">
          <div className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>와이어프레임 빠른 체험 계정</span>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                login('jacob@example.com', '리뷰어_제이콥');
                navigate('/');
              }}
              className="flex-1 py-1.5 bg-white hover:bg-blue-100 text-blue-800 border border-blue-300 rounded-lg text-[11px] font-semibold"
            >
              제이콥 (Lv.4) 로그인
            </button>
            <button
              type="button"
              onClick={() => {
                login('hana@example.com', '루틴러_하나');
                navigate('/');
              }}
              className="flex-1 py-1.5 bg-white hover:bg-blue-100 text-blue-800 border border-blue-300 rounded-lg text-[11px] font-semibold"
            >
              하나 (28일 스트릭) 로그인
            </button>
          </div>
        </div>

        {/* Signup Link */}
        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          아직 RE:DAY 회원이 아니신가요?{' '}
          <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-bold underline underline-offset-2 ml-1">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};
