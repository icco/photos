import { SiteHeader } from "@icco/react-common/SiteHeader";
import { Info } from "lucide-react";

export default function Header() {
  return (
    <SiteHeader
      links={[
        {
          name: "About",
          href: "/about",
          prefetch: false,
          icon: <Info className="h-5 w-5" />,
        },
      ]}
    />
  );
}
