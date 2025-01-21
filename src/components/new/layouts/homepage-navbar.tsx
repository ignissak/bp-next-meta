"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { observer, useObservable } from "@legendapp/state/react";
import Link from "next/link";

const HomepageNavbar = observer(({}: {}) => {
  const $scrolled = useObservable(false);
  return (
    <>
      <section
        className={cn(
          "fixed inset-x-0 z-50 transition-all duration-200",
          $scrolled.get() ? "backdrop-blur" : ""
        )}
      >
        <nav className="px-8 flex items-center justify-between py-4 relative z-50">
          <Link href="/" className="text-xl font-semibold">
            Learn AI
          </Link>
          <ul>
            <li>
              <Link href="/courses">
                <Button>Start learning</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
});

export default HomepageNavbar;
