import React from 'react';
import { BreakType } from '../types/break';

interface BreakIconProps {
  type: BreakType;
  className?: string;
}

export const BreakIcon: React.FC<BreakIconProps> = ({ type, className = 'w-6 h-6' }) => {
  switch (type) {
    case 'Tea Break':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Steam wisps */}
          <path d="M6 2v2" />
          <path d="M10 1v3" />
          <path d="M14 2v2" />
          {/* Cup */}
          <path d="M18 8H4v7a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V8z" />
          {/* Handle */}
          <path d="M18 9h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2" />
          {/* Saucer */}
          <line x1="2" y1="21" x2="20" y2="21" />
        </svg>
      );

    case 'Lunch Break':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Food bowl */}
          <path d="M4 11h16a8 8 0 0 1-16 0z" />
          {/* Steam/food mound */}
          <path d="M7 11c0-2 2.2-3.5 5-3.5s5 1.5 5 3.5" />
          {/* Base */}
          <line x1="8" y1="19" x2="16" y2="19" />
          {/* Chopsticks angled */}
          <line x1="17" y1="4" x2="9" y2="10" />
        </svg>
      );

    case 'Snack Break':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Cookie outline with bite */}
          <path d="M12 2a10 10 0 1 0 10 10 3.5 3.5 0 0 1-3.5-3.5 3.5 3.5 0 0 1-3.5-3.5A3.5 3.5 0 0 1 12 2z" />
          {/* Chocolate chips / crumbs */}
          <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
          <circle cx="14" cy="15" r="1" fill="currentColor" />
          <circle cx="8" cy="14" r="1" fill="currentColor" />
          <circle cx="12" cy="11" r="0.75" fill="currentColor" />
        </svg>
      );

    case 'Smoke Break':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Cigarette base */}
          <rect x="2" y="15" width="16" height="4" rx="1" />
          <line x1="6" y1="15" x2="6" y2="19" />
          {/* Ash end */}
          <path d="M18 16h2v2h-2z" />
          {/* Rising smoke curls */}
          <path d="M19 12c1-2-1-3 0-5s2-1 2-2" />
          <path d="M22 13c1-2-1-3 0-5" />
        </svg>
      );

    case 'Meeting':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Center user */}
          <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="10" cy="7" r="3" />
          {/* Side users */}
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a3 3 0 0 1 0 5.75" />
        </svg>
      );

    default:
      return null;
  }
};
