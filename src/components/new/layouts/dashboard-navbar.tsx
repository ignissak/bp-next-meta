"use client";
import { Button } from "@/components/ui/button";
import { observer, useObservable } from "@legendapp/state/react";
import { IconLoader } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export type DashboardNavbarItem = {
  title: string;
  href: string;
};

const loginButtonStates = {
  loading: (
    <>
      <IconLoader className="animate-spin inline mr-2" />
      Please wait...
    </>
  ),
  default: <>Sign in</>,
};

const DashboardNavbar = observer(
  ({ items }: { items: DashboardNavbarItem[] }) => {
    const { data: session } = useSession();
    const $loginLoading = useObservable(false);
    const [loginButtonState, setLoginButtonState] = useState<keyof typeof loginButtonStates>("default");

    return (
      <>
        <div className="px-8 flex items-center justify-between pt-4 relative z-50">
          <Link href="/" className="text-xl font-semibold">
            Learn AI
          </Link>
          <div className="flex items-center justify-center gap-5">
            <div>
              <Button variant="outline">Submit feedback</Button>
            </div>
            <div>
              {session ? (
                <></>
              ) : (
                <>
                  <Button
                    className="w-36"
                    disabled={$loginLoading.get()}
                    onClick={() => {
                      // $loginLoading.set(true);
                      // //signIn("github");
                      // setTimeout(() => $loginLoading.set(false), 2000);
                      setLoginButtonState("loading");

                      setTimeout(() => setLoginButtonState("default"), 2000);
                    }}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        transition={{
                          type: "spring",
                          duration: 1,
                          bounce: 0,
                        }}
                        initial={{ opacity: 0, y: -32 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 32 }}
                      >
                        {loginButtonStates[loginButtonState]}
                      </motion.span>
                    </AnimatePresence>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default DashboardNavbar;
