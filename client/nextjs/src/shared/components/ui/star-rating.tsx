import { RiStarFill } from 'react-icons/ri';

interface StarRatingProps {
  ratingValue: number;
  isStatic?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ ratingValue }) => {
  const stars = Array(5).fill(0);

  return (
    <div className="flex items-center justify-start">
      {stars.map((_, index) => {
        return <RiStarFill key={index} className={`text-base md:text-17 ${ratingValue > index ? 'text-primary-600' : 'text-gray-300'}`} />;
      })}
    </div>
  );
};
export default StarRating;
