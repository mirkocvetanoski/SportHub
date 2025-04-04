import {
  GRADIENT_COLOR1,
  GRADIENT_COLOR2,
  GRADIENT_COLOR3,
} from '@/lib/constants';
import Link from 'next/link';

interface ChildComponentProps {
  size: number;
}

const Logo: React.FC<ChildComponentProps> = ({ size }) => {
  return (
    <Link
      href="/"
      className={`bg-gradient-to-r from-[${GRADIENT_COLOR1}] via-[${GRADIENT_COLOR2}] to-[${GRADIENT_COLOR3}] bg-clip-text text-${size}xl font-bold uppercase text-transparent`}
    >
      SportsHub
    </Link>
  );
};

export default Logo;
