"use client";
import { Button } from "@/components/ui/button";
import { observer } from "@legendapp/state/react";
import { motion } from "motion/react";
import Link from "next/link";

const Homepage = observer(() => {
  return (
    <>
      <div className="h-screen w-full bg-dot-white/[0.2] relative flex flex-col items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <motion.div
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-semibold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300 py-8 mx-4 text-center">
            Master{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text">
              Artificial Intelligence
            </span>
            <br />
            Through Interactive Learning
          </h1>
          <div className="flex items-center justify-center">
            <p className="max-w-[50ch] text-center relative z-20 text-neutral-300 mx-4">
              An interactive platform designed to make learning artificial
              intelligence accessible, engaging, and practical for everyone.
            </p>
          </div>
          <div className="mt-12 flex items-center justify-center gap-4 relative z-20">
            <Link href="/courses">
              <Button>Start learning</Button>
            </Link>
            <Button variant="outline">Why learn AI?</Button>
          </div>
        </motion.div>
      </div>
    </>
  );
});

export default Homepage;
