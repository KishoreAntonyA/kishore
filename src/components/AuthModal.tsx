import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, userProfile, signInWithGoogle, signOut, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#111111] border border-[#f2ca50]/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#d0c5af] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {user ? (
          <div className="space-y-6 text-center">
            <div className="relative inline-block">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-20 h-20 rounded-full border-2 border-[#f2ca50] mx-auto object-cover shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#f2ca50]/20 border-2 border-[#f2ca50] mx-auto flex items-center justify-center text-[#f2ca50] text-2xl font-bold">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
              )}
              {isAdmin && (
                <span className="absolute bottom-0 right-0 bg-[#f2ca50] text-[#1a1c1c] text-[10px] font-['JetBrains_Mono'] font-bold px-1.5 py-0.5 rounded-full border border-black">
                  ADMIN
                </span>
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold text-white font-['Montserrat']">
                {user.displayName || 'Studio Member'}
              </h3>
              <p className="text-xs text-[#d0c5af] font-['JetBrains_Mono'] mt-1">
                {user.email}
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/30 text-xs font-['JetBrains_Mono'] text-[#f2ca50]">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Role: {userProfile?.role === 'admin' ? 'Administrator' : 'Client Account'}</span>
              </div>
            </div>

            <div className="p-3 bg-[#181818] rounded-xl border border-white/10 text-left text-xs font-['JetBrains_Mono'] space-y-1.5 text-[#d0c5af]">
              <div className="flex justify-between">
                <span>Account Status:</span>
                <span className="text-emerald-400 font-bold">Verified (Firebase)</span>
              </div>
              <div className="flex justify-between">
                <span>Cloud Persistence:</span>
                <span className="text-white">Firestore Realtime</span>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full py-3 bg-white/5 hover:bg-red-500/20 text-white hover:text-red-400 border border-white/10 hover:border-red-500/30 rounded-xl font-['JetBrains_Mono'] text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              Sign Out from AK Studio
            </button>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f2ca50] to-[#d4af37] flex items-center justify-center text-[#2a2000] mx-auto shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              <span className="material-symbols-outlined text-[30px] font-bold">lock_open</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-['JetBrains_Mono'] text-[#f2ca50] uppercase tracking-widest font-semibold">
                AK MODERN CREATING
              </span>
              <h3 className="text-2xl font-extrabold text-white font-['Montserrat']">
                Account Sign In
              </h3>
              <p className="text-xs text-[#d0c5af] max-w-sm mx-auto leading-relaxed">
                Sign in with Google using Firebase Authentication to synchronize your order history, live briefs, deliverables, and private consultations across devices.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400 text-left">
                {error}
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3.5 px-4 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-['Montserrat'] font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              {loading ? 'Connecting with Google...' : 'Continue with Google'}
            </button>

            <p className="text-[11px] text-[#a89f91] font-['JetBrains_Mono']">
              Secure authentication powered by Firebase Auth &amp; Google Cloud.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
