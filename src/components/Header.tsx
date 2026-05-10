import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { SiteHeader } from "@icco/react-common/SiteHeader";

export default function Header() {
  return (
    <SiteHeader
      links={[
        {
          name: "About",
          href: "/about",
          prefetch: false,
          icon: <InformationCircleIcon className="h-5 w-5" />,
        },
      ]}
    />
  );
}
