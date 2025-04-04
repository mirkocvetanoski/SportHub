import {
  GRADIENT_COLOR1,
  GRADIENT_COLOR2,
  GRADIENT_COLOR3,
} from '@/lib/constants';
import Link from 'next/link';

interface ChildComponentProps {
  size: number;
}

const getTextSize = (size: number) => {
  const sizes = {
    1: 'text-xl',
    2: 'text-2xl',
    3: 'text-3xl',
    4: 'text-4xl',
    5: 'text-5xl',
    6: 'text-6xl',
  };
  return sizes[size as keyof typeof sizes] || 'text-2xl';
};

const Logo: React.FC<ChildComponentProps> = ({ size }) => {
  return (
    <Link
      href="/"
      className={`bg-gradient-to-r from-${GRADIENT_COLOR1} via-${GRADIENT_COLOR2} to-${GRADIENT_COLOR3} bg-clip-text ${getTextSize(size)} font-bold uppercase text-transparent`}
    >
      SportsHub
    </Link>
  );
};

export default Logo;
