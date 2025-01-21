"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FeedbackPopover from "@/components/ui/feedback-popover";
import { MotionLink } from "@/lib/utils";
import { observer, useObservable } from "@legendapp/state/react";
import { IconLoader } from "@tabler/icons-react";
import clsx from "clsx";
import { motion } from "motion/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export type DashboardNavbarItem = {
  title: string;
  href: string;
};

const loginButtonStates = {
  loading: (
    <>
      <IconLoader className="inline mr-2 animate-spin" />
      Please wait...
    </>
  ),
  default: <>Sign in</>,
};

const DashboardNavbar = observer(
  ({ items }: { items: DashboardNavbarItem[] }) => {
    const { data: session } = useSession();
    const path = usePathname();
    const $loginButtonState =
      useObservable<keyof typeof loginButtonStates>("default");
    const $hoverItem = useObservable<string | null>(null);
    const $activeItem = useObservable<string | null>(null);

    // listen to location changes
    useEffect(() => {
      const item = items.find((item) => path.startsWith(item.href));
      if (item) {
        $activeItem.set(item.title);
      } else {
        $activeItem.set(null);
      }
    }, [path]);

    return (
      <>
        <nav className="flex flex-col gap-3 relative">
          <div
            id="upperNav"
            className="relative z-50 flex items-center justify-between w-screen px-3 md:px-8 pt-4"
          >
            <Link href="/" className="text-xl font-semibold">
              Learn AI
            </Link>
            <div className="flex items-center justify-center gap-3">
              <div className="hidden md:block">
                <FeedbackPopover />
              </div>
              <div>
                {session ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="active:scale-[.97]">
                        <div className="flex justify-center items-center gap-2 hover:bg-accent/20 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200">
                          <p className="text-neutral-100 hidden md:block">
                            {session.user!!.name!!}
                          </p>
                          <Image
                            src={session.user!!.image!!}
                            className="rounded-lg"
                            alt="Profile picture"
                            width={24}
                            height={24}
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                        className="block md:hidden"
                          onClick={() => {
                            // TODO: Implement
                          }}
                        >
                          Feedback
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            signOut();
                          }}
                        >
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <>
                    <Button
                      className="md:w-36"
                      disabled={$loginButtonState.get() === "loading"}
                      onClick={() => {
                        $loginButtonState.set("loading");
                        signIn("github");
                      }}
                    >
                      {loginButtonStates[$loginButtonState.get()]}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div
            id="bottomNav"
            className="w-screen px-3 md:px-8 py-1.5 bg-neutral-925 flex items-center justify-between relative overflow-x-auto md:overflow-visible no-scroll-bar"
          >
            <div
              className="flex items-center gap-2"
              onMouseLeave={() => $hoverItem.set(null)}
            >
              {items.map((item, index) => (
                <MotionLink
                  layout
                  key={index}
                  href={item.href}
                  passHref
                  tabIndex={0}
                  onMouseOver={() => $hoverItem.set(item.title)}
                  onFocus={() => $hoverItem.set(item.title)}
                  onClick={() => $hoverItem.set(item.title)}
                  className={clsx(
                    "relative outline-none px-5 py-1.5 transition-all active:scale-[.97] font-medium",
                    $hoverItem.get() === item.title ||
                      $activeItem.get() === item.title
                      ? "text-neutral-100"
                      : "text-neutral-400"
                  )}
                >
                  {$hoverItem.get() === item.title && (
                    <motion.div
                      layoutId="hoverItem"
                      className="absolute inset-0 rounded-lg backdrop-blur bg-neutral-900 z-0"
                      style={{ originY: "0px" }}
                    ></motion.div>
                  )}
                  <span className="relative text-inherit z-50">
                    {item.title}
                  </span>
                  {$activeItem.get() === item.title && (
                    <motion.div
                      layoutId="activeItem"
                      className="absolute left-0 -bottom-1.5 rounded-lg backdrop-blur h-[2px] w-full bg-neutral-100 z-0"
                      style={{ originY: "0px" }}
                    ></motion.div>
                  )}
                </MotionLink>
              ))}
            </div>
          </div>
        </nav>
      </>
    );
  }
);

export default DashboardNavbar;
