import { ReactNode } from "react";

interface NavGroupProps {
  title: string;
  children: ReactNode;
}

const NavGroup = ({ title, children }: NavGroupProps) => {
  return (
    <div className="navigation-links__container transition-all duration-300 ease-in-out">
      <span>{title}</span>
      <ul>{children}</ul>
    </div>
  );
};

export default NavGroup;
