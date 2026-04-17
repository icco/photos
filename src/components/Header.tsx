import Logo from "@icco/react-common/Logo";
import ThemeToggle from "@icco/react-common/ThemeToggle";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="flex py-8">
      <div className="flex-none">
        <Link href="/">
          <Logo size={50} className="px-8 logo stroke-current" />
        </Link>
      </div>
      <div className="grow"></div>
      <div className="flex-none">
        <ThemeToggle />

        <Link href="/about" prefetch={false} className="m-8">
          About
        </Link>
      </div>
    </nav>
  );
}
