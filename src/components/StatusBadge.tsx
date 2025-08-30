'use client';

import { getStatusColor, getStatusIcon } from '@/utils/formatters';
import {
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusIcons = {
  clock: ClockIcon,
  'check-circle': CheckCircleIcon,
  'exclamation-triangle': ExclamationTriangleIcon,
  'x-circle': XCircleIcon,
  'question-mark-circle': QuestionMarkCircleIcon,
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const iconName = getStatusIcon(status);
  const IconComponent = statusIcons[iconName as keyof typeof statusIcons] || QuestionMarkCircleIcon;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        getStatusColor(status),
        className
      )}
    >
      <IconComponent className="w-3 h-3" />
      {status}
    </span>
  );
}
