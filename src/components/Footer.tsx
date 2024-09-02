import {
  CodeBracketIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="divider" />
      <footer className="footer items-center p-4">
        <aside className="items-center grid-flow-col">
          <p>
            &copy; 2011 - {format(new Date(), "yyyy")} Nat Welch. All rights
            reserved.
          </p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <Link
            className="blue ms-2"
            href="https://github.com/icco/photos"
            title="Source Code"
          >
            <CodeBracketIcon className="inline-block w-4 h-4" />
          </Link>
          <Link
            className="blue ms-2"
            href="https://natwelch.com/privacy"
            title="Privacy Policy"
          >
            <DocumentCheckIcon className="inline-block w-4 h-4" />
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
