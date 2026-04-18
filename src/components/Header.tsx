import { SiteHeader } from "@icco/react-common/SiteHeader";

export default function Header() {
  return (
    <SiteHeader links={[{ name: "About", href: "/about", prefetch: false }]} />
  );
}
