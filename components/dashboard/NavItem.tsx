import Link from "next/link";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
  setActive: (active: string) => void;
  isOpen: boolean;
}

const NavItem = ({
  href,
  icon,
  children,
  isActive,
  setActive,
  isOpen,
}: NavItemProps) => {
  return (
    <li
      className={`transition-all duration-300 ease-in-out ${
        isActive ? "active" : ""
      }`}
    >
      <Link onClick={() => setActive(href)} href={href}>
        {icon} {isOpen && children}
      </Link>
    </li>
  );
};

export default NavItem;
