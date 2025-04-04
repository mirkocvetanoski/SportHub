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
      className={`bg-gradient-to-r from-[#22c1c3] via-[#22c1c3] to-[#fdbb2d] bg-clip-text ${getTextSize(size)} font-bold uppercase text-transparent`}
    >
      SportsHub
    </Link>
  );
};

export default Logo;
