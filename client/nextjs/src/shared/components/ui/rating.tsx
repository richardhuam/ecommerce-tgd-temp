import React, { useState } from 'react';
import { RiStarFill } from 'react-icons/ri';

interface RatingProps {
  selectedValue: number;
  onChange: (newValue: number) => void;
  starSize?: 'sm' | 'md' | 'lg';
}

export default function Rating({ selectedValue = 0, onChange, starSize = 'sm' }: RatingProps) {
  const [value, setValue] = useState<number>(selectedValue);
  const [hover, setHover] = useState<number | null>(null);

  const handleRatingChange = (newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center justify-start">
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              className="hidden"
              checked={currentRating === value}
              onChange={() => handleRatingChange(currentRating)}
            />
            <RiStarFill
              className={`${starSize === 'sm' ? 'text-18' : starSize === 'md' ? 'text-24' : 'text-30'} hover:scale-110 cursor-pointer ${
                currentRating <= (hover || value) ? 'text-primary' : 'text-gray-300'
              }`}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}
