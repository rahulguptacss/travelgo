import React from 'react';
import { Star } from 'lucide-react';
import type { RatingStarsProps } from '../types';

export default function RatingStars({
  rating = 5,
  size = 'w-4 h-4',
  className = '',
}: RatingStarsProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${size} ${
            i < rating
              ? 'fill-[#f38f1d] text-[#f38f1d]'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}
