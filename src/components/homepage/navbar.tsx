"use client";
import { cn } from "@/lib/utils";
import { observable } from "@legendapp/state";
import { observer, useEffectOnce } from "@legendapp/state/react";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
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

export const HomepageNavBar = observer(() => {
  useEffectOnce(() => {
    window.addEventListener("scroll", () => {
      console.debug(window.scrollY);
      isScrolled$.set(window.scrollY > 200);
    });
  }, []);

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
        <h1 className="font-semibold text-base">Learn AI</h1>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="#courses" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Browse courses
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/glossary" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Glossary
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/progress" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Your progress
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/account" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
          {" "}
          {/* 👈 TODO: (FIX) Closing drawer jumps back to trigger */}
          <DrawerTrigger className="md:hidden">
            <Menu className="text-secondary hover:text-primary transition-colors duration-200" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="hidden">
              <DrawerTitle></DrawerTitle>
            </DrawerHeader>
            <NavigationMenu className="p-6 overflow-auto">
              <NavigationMenuList className="flex-col items-start space-x-0 space-y-0">
                <NavigationMenuItem>
                  <Link href="/#courses" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle(), "text-xl")}
                    >
                      Browse courses
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/glossary" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle(), "text-xl")}
                    >
                      Glossary
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/progress" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle(), "text-xl")}
                    >
                      Your progress
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/account" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle(), "text-xl")}
                    >
                      Account
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </DrawerContent>
        </Drawer>
      </div>
    </motion.section>
  );
});
