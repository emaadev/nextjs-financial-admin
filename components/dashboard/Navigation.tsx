"use client";

import React from "react";
import Link from "next/link";

import { useActiveNav } from "@/context/ActiveNavbarContext";
import { accountLinks, navLinks } from "@/app/constants/data";

import { NavGroup, NavItem } from "@/components";

const Navigation = () => {
  const { active, setActive } = useActiveNav();

  return (
    <aside className="navigation-aside">
      <header className="navigation-header">
        <Link href="/dashboard">
          Financial <br /> Admin
        </Link>
      </header>

      <NavGroup title="GENERAL">
        {navLinks.map((link) => (
          <NavItem
            key={link.href}
            href={link.href}
            icon={React.createElement(link.icon)}
            isActive={active === link.href}
            setActive={setActive}
          >
            {link.label}
          </NavItem>
        ))}
      </NavGroup>

      <NavGroup title="ACCOUNT">
        {accountLinks.map((link) => (
          <NavItem
            key={link.href}
            href={link.href}
            icon={React.createElement(link.icon)}
            isActive={active === link.href}
            setActive={setActive}
          >
            {link.label}
          </NavItem>
        ))}
      </NavGroup>
    </aside>
  );
};

export default Navigation;
