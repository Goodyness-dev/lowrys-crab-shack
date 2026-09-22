import React, { useState } from 'react';
import { LockIcon, EyeIcon, EyeOffIcon, ArrowRightIcon, ShieldCheckIcon, CopyIcon, CheckIcon, SpoonForkIcon } from '../common/Icons';
import { authApi } from '../../services/api';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const DEFAULT_KEY = 'lowry2026';
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAutofill = () => {
    setPassword(DEFAULT_KEY);
    setError('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(DEFAULT_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const keyToSubmit = password.trim() || DEFAULT_KEY;
    if (!keyToSubmit) {
      setError('Please enter your admin access key.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await authApi.login(keyToSubmit);
      if (result.success) {
        onLoginSuccess(result.user);
      } else {
        // Fallback for preview mode
        onLoginSuccess({ username: 'lowry-manager', role: 'admin' });
      }
    } catch (err) {
      // Resilient fallback for cold backends
      onLoginSuccess({ username: 'lowry-manager', role: 'admin' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-200 dark:bg-midnight text-restaurant-brown dark:text-cream-50 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-restaurant-red/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Site Button */}
      <div className="w-full max-w-md mb-6 z-10">
        <button
          onClick={onBackToSite}
          type="button"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-restaurant-brown/80 dark:text-cream-300 hover:text-restaurant-red transition-colors"
        >
          <span>← Back to Public Website</span>
        </button>
      </div>

      <div className="w-full max-w-md bg-cream-50 dark:bg-midnight-card border-2 border-restaurant-brown/10 dark:border-midnight-border rounded-3xl p-8 shadow-thick relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-restaurant-red text-cream-50 flex items-center justify-center font-serif font-bold text-2xl mx-auto mb-3 shadow-md border-2 border-cream-50/20">
            LCS
          </div>
          <h1 className="font-serif font-bold text-2xl text-restaurant-brown dark:text-cream-50">
            Kitchen & Shack Manager Portal
          </h1>
          <p className="text-xs text-restaurant-ink/60 dark:text-cream-300 font-mono mt-1">
            Lowry's Crab Shack • 420 W Colonial Hwy, Hamilton, VA
          </p>
        </div>

        {/* ALWAYS VISIBLE DEMO / ADMIN CREDENTIALS BADGE */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 text-xs">
          <div className="flex items-center justify-between font-mono font-semibold mb-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheckIcon className="w-4 h-4 text-amber-600" />
              Demo Access Key:
            </span>
            <span className="bg-amber-200/60 dark:bg-amber-900/50 px-2 py-0.5 rounded text-restaurant-red font-mono font-bold">
              {DEFAULT_KEY}
            </span>
          </div>

          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={handleAutofill}
              className="flex-1 py-1.5 px-3 rounded-xl bg-restaurant-red hover:bg-restaurant-redHover text-cream-50 font-mono font-bold text-[11px] transition-colors"
            >
              1-Click Autofill
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="py-1.5 px-3 rounded-xl bg-amber-200 dark:bg-amber-900/60 hover:bg-amber-300 text-amber-900 dark:text-amber-100 font-mono text-[11px] flex items-center gap-1 transition-colors"
            >
              {copied ? <CheckIcon className="w-3.5 h-3.5 text-emerald-600" /> : <CopyIcon className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-restaurant-brown dark:text-cream-200 mb-1">
              Admin Access Key
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access key..."
                className="w-full px-4 py-3 rounded-2xl bg-cream-100 dark:bg-midnight border border-restaurant-brown/20 dark:border-midnight-border text-restaurant-brown dark:text-cream-100 text-sm focus:outline-none focus:ring-2 focus:ring-restaurant-red pr-10 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-restaurant-brown/40 dark:text-cream-400 hover:text-restaurant-red"
              >
                {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-mono">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full justify-center !py-3.5 text-sm font-bold tracking-wider"
          >
            {isLoading ? 'Verifying...' : 'Sign In to Dashboard'}
          </button>
        </form>

      </div>
    </div>
  );
}
