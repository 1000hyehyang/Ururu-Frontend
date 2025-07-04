import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'in_progress' | 'confirmed' | 'failed';
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  let icon, text, bg, textColor;

  if (status === 'in_progress') {
    icon = <Clock className="mr-1 h-4 w-4 text-primary-300" />;
    text = '공구 진행중';
    bg = 'bg-primary-100';
    textColor = 'text-primary-300';
  } else if (status === 'confirmed') {
    icon = <CheckCircle className="mr-1 h-4 w-4 text-primary-300" />;
    text = '공구 확정';
    bg = 'bg-primary-100';
    textColor = 'text-primary-300';
  } else {
    icon = <XCircle className="mr-1 h-4 w-4 text-text-300" />;
    text = '공구 실패';
    bg = 'bg-bg-200';
    textColor = 'text-text-300';
  }

  return (
    <span
      className={`flex items-center rounded-lg px-3 py-1.5 text-xs font-medium ${bg} ${textColor} ${className}`}
    >
      {icon}
      {text}
    </span>
  );
}
