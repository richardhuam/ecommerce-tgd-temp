import { Star } from 'lucide-react';

type StarRatingStaticProps = {
  ratingValue: number;
};

export default function StarRatingStatic({ ratingValue }: StarRatingStaticProps) {
  const stars = Array(5).fill(0);
  return (
    <div className="flex items-center justify-start">
      {stars.map((_, index) => {
        return (
          <Star
            key={index}
            size={20}
            className={`text-base ${ratingValue > index ? 'text-primary' : 'text-gray-300'}`}
          />
        );
      })}
    </div>
  );
}
