"use client";
import { cn, MotionLink } from "@/lib/utils";
import { observer, useMount, useObservable } from "@legendapp/state/react";
import { IconMenu } from "@tabler/icons-react";
import clsx from "clsx";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

export const HomepageNavBar = observer(() => {
  const isScrolled$ = useObservable(false);
  const hash$ = useObservable("");
  const path = usePathname();
  useMount(() => {
    isScrolled$.set(window.scrollY > 100);
    window.addEventListener("scroll", () => {
      isScrolled$.set(window.scrollY > 100);
    });
    hash$.set(window.location.hash);
  });

  useEffect(() => {
    const tab = tabs.find((tab) => path === tab.href);
    if (tab) {
      setActiveTab(tab.tab);
    }
  }, [path]);

  // get link query or path
  const getCurrentTab = () => {
    if (path === "/") {
      return "courses";
    }
    if (path.startsWith("/glossary")) {
      return "glossary";
    }
    if (path.startsWith("/progress")) {
      return "progress";
    }
    if (path.startsWith("/account")) {
      return "account";
    }
    return null;
  };
  const [activeTab, setActiveTab] = useState<string | null>(getCurrentTab());

  const tabs = [
    {
      title: "Homepage",
      tab: "courses",
      href: "/",
    },
    {
      title: "Glossary",
      tab: "glossary",
      href: "/glossary",
    },
    {
      title: "Your progress",
      tab: "progress",
      href: "/progress",
    },
    {
      title: "Account",
      tab: "account",
      href: "/account",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={
        cn("fixed inset-x-0 z-50 transition-all duration-300") +
        (isScrolled$.get() ? " backdrop-blur" : "")
      }
    >
      <div className="flex items-center justify-between container my-4 mx-auto relative z-50">
        <Link href="/" className="font-medium text-bg-transparent">
          Learn AI
        </Link>
        <ul
          onMouseLeave={() => setActiveTab(getCurrentTab())}
          className="flex items-center justify-center gap-12 font-medium text-base"
        >
          {tabs.map((tab) => (
            <MotionLink
              layout
              key={tab.tab}
              href={tab.href}
              scroll={false}
              passHref
              tabIndex={0}
              onMouseOver={() => setActiveTab(tab.tab)}
              onFocus={() => setActiveTab(tab.tab)}
              onClick={() => setActiveTab(tab.tab)}
              className={clsx(
                "relative outline-none py-2.5 px-5 transition-all active:scale-[.97]",
                activeTab === tab.tab ? "text-neutral-100" : "text-neutral-400"
              )}
            >
              {activeTab === tab.tab ? (
                <motion.div
                  layoutId="highlight"
                  className="absolute inset-0 rounded-lg backdrop-blur bg-neutral-900/50 z-0"
                  style={{ originY: "0px" }}
                />
              ) : null}
              <span className="relative text-inherit z-50">{tab.title}</span>
            </MotionLink>
          ))}
        </ul>
        {/* <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/#courses" passHref legacyBehavior>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={path === "/" && hash$.get() === "#courses"}
                >
                  Browse courses
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/glossary" passHref legacyBehavior>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={path.startsWith("/glossary")}
                >
                  Glossary
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/progress" passHref legacyBehavior>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={path.startsWith("/progress")}
                >
                  Your progress
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/account" passHref legacyBehavior>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={path.startsWith("/account")}
                >
                  Account
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
        <Drawer
          preventScrollRestoration={true}
          noBodyStyles
          disablePreventScroll
        >
          <DrawerTrigger className="md:hidden">
            <IconMenu className="text-primary hover:text-secondary transition-colors duration-200" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="hidden">
              <DrawerTitle></DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <NavigationMenu className="p-6 mb-4 overflow-auto">
              <NavigationMenuList className="flex-col items-start space-x-0 space-y-0">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/#courses"
                    className={navigationMenuTriggerStyle()}
                    active={path === "/" && hash$.get() === "#courses"}
                  >
                    Browse courses
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/glossary"
                    className={navigationMenuTriggerStyle()}
                    active={path.startsWith("/glossary")}
                  >
                    Glossary
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/progress"
                    className={navigationMenuTriggerStyle()}
                    active={path.startsWith("/progress")}
                  >
                    Your progress
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/account"
                    className={navigationMenuTriggerStyle()}
                    active={path.startsWith("/account")}
                  >
                    Account
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </DrawerContent>
        </Drawer>
      </div>
    </motion.section>
  );
});
