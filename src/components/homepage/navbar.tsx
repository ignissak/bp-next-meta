"use client";
import { cn } from "@/lib/utils";
import { observable } from "@legendapp/state";
import { observer, useMount } from "@legendapp/state/react";
import { IconMenu } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const isScrolled$ = observable(false);
const hash$ = observable("");

export const HomepageNavBar = observer(() => {
  useMount(() => {
    isScrolled$.set(window.scrollY > 100);
    window.addEventListener("scroll", () => {
      isScrolled$.set(window.scrollY > 100);
    });
    hash$.set(window.location.hash);
  });

  // get link query or path
  const path = usePathname();

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
        <Link
          href="/"
          className="font-semibold text-base hover:text-glow transition-all duration-200"
        >
          Learn AI
        </Link>
        <NavigationMenu className="hidden md:flex">
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
        </NavigationMenu>
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
