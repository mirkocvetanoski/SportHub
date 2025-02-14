import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      className="bg-gradient-to-r from-[#22c1c3] via-[#22c1c3] to-[#fdbb2d] bg-clip-text text-3xl font-bold uppercase text-transparent"
    >
      SportsHub
    </Link>
  );
}
