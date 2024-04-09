"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { accountLinks, navLinks } from "@/app/constants/data";
import { ComingSoon, NavGroup, NavItem } from "@/components";

import { BsBoxArrowInDownLeft, BsLayoutTextWindow } from "react-icons/bs";

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [openNav, setOpenNav] = useState<boolean>(false);

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  return (
    <aside
      className={`navigation-aside ${
        openNav ? "navigation-aside__open" : "navigation-aside__close"
      }`}
    >
      <header className="navigation-header transition-all duration-300 ease-in-out">
        <Link href="/dashboard/home">
          {openNav && (
            <span>
              Financial <br /> Admin
            </span>
          )}
        </Link>

        <div>
          {openNav ? (
            <button onClick={toggleNav}>
              <BsLayoutTextWindow className="toggle-nav__button" />
            </button>
          ) : (
            <button onClick={toggleNav}>
              <BsBoxArrowInDownLeft className="toggle-nav__button" />
            </button>
          )}
        </div>
      </header>

      <NavGroup title={openNav ? "GENERAL" : ""}>
        {navLinks.map((link) => (
          <NavItem
            key={link.href}
            href={link.href}
            icon={React.createElement(link.icon)}
            isActive={pathname === link.href}
            setActive={() => router.push(link.href)}
            isOpen={openNav}
          >
            {link.label}
          </NavItem>
        ))}
      </NavGroup>

      <NavGroup title={openNav ? "ACCOUNT" : ""}>
        {accountLinks.map((link) => (
          <NavItem
            key={link.href}
            href={link.href}
            icon={React.createElement(link.icon)}
            isActive={pathname === link.href}
            setActive={() => router.push(link.href)}
            isOpen={openNav}
          >
            {link.label}
            {link.comingSoon && <ComingSoon />}
          </NavItem>
        ))}
      </NavGroup>
    </aside>
  );
};

export default Navigation;
