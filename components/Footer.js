import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "../utils/constants";
import StyledLink from "./shared/StyledLink";

// TODO: Who We Are and Leadership links are comment out in case of future implementation
const FOOTER_LINKS = [
  { name: "About Us", href: "/our-organization" },
  // { name: "Who We Are", href: "/about" },
  // { name: "Leadership", href: "/about" },
  { name: "Contact Us", href: "/contact-us" },
];

const Footer = () => {
  return (
    <footer className="bg-neutral_0 text-primary_50 text-xs py-6 md:px-8 px-4 ">
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row justify-between md:justify-normal md:items-start ">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between my-3 md:mb-3 md:my-0 md:items-start md:justify-normal">
              <span className="font-bold">
                Families for Safe Streets <br />
                <span className="font-normal">Portland</span>
              </span>
            </div>

            <div className="flex space-x-2 my-4">
              {SOCIAL_LINKS.map((link) => (
                <Link
                  href={link.href}
                  className="hover:underline"
                  key={link.name}
                >
                  <Image src={link.src} alt={link.alt} width={18} height={18} />
                </Link>
              ))}
            </div>
          </div>

          <div className="my-2 space-y-3 flex flex-col text-white md:ml-8 md:my-0 ">
            {FOOTER_LINKS.map((link) => (
              <div key={link.name}>
                <Link className="footer-link" href={link.href}>{link.name}</Link>
              </div>
            ))}
          </div>
        </div>
        <div className="my-3 md:my-0">
          <StyledLink href="/donate" size="small">
            Donate
          </StyledLink>
        </div>
      </div>
      <div className="text-neutral_100 mt-4 md:mt-8 lg:mt-12 ">
        © 2025 Families for Safe Streets, Portland
      </div>
    </footer>
  );
};

export default Footer;
