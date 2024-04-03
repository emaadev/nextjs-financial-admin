import Link from "next/link";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
  setActive: (active: string) => void;
}

const NavItem = ({
  href,
  icon,
  children,
  isActive,
  setActive,
}: NavItemProps) => {
  return (
    <li className={`${isActive ? "active" : ""}`}>
      <Link onClick={() => setActive(href)} href={href}>
        {icon} {children}
      </Link>
    </li>
  );
};

export default NavItem;
