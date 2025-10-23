import Link from 'next/link';
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Eba Adisu</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/#portfolio">Portfolio</Link>
            <Link href="/#experience">Experience</Link>
            <Link href="/#education">Education</Link>
            <Link href="/games">Games</Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;