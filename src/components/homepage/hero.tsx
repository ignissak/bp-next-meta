"use client";
import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "../ui/button";

export const HeroHomepage = () => {
  return (
    <motion.section
      className="h-screen w-screen bg-cover bg-no-repeat relative z-10 flex flex-col"
      style={{
        background:
          "linear-gradient(180deg, rgba(10, 10, 10, 0.00) 63%, #0A0A0A 87.5%), linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.75)), url('./images/homepage_title.jpg') lightgray 50% / cover no-repeat",
      }}
      initial={{
        background:
          "linear-gradient(180deg, rgba(10, 10, 10, 0.00) 63%, #0A0A0A 87.5%), linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0)), url('./images/homepage_title.jpg') lightgray 50% / cover no-repeat",
      }}
      animate={{
        background:
          "linear-gradient(180deg, rgba(10, 10, 10, 0.00) 63%, #0A0A0A 87.5%), linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.75)), url('./images/homepage_title.jpg') lightgray 50% / cover no-repeat",
      }}
      transition={{ duration: 0.75 }}
    >
      <motion.section
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center justify-start container mx-auto flex-grow mb-20"
      >
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-2xl md:text-4xl text-glow max-w-[36rem]">
            Unleash the power of AI—learn, code, and master machine learning
            hands-on.
          </h1>
          <Link
            href="#courses"
            scroll={false}
            onClick={(e) => {
              e.preventDefault();
              // TODO: Fix smooth scroll
              document
                .querySelector("#courses")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Button variant={"blue-primary"} className="font-semibold max-w-64">
              Browse courses
              <IconArrowRight className="icon-glow" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </motion.section>
  );
};
