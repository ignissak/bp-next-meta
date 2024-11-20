"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Metadata } from "next";
import { CourseList } from "./course-list";
import { HeroHomepage } from "./homepage/hero";
import { HomepageNavBar } from "./homepage/navbar";
import { Button } from "./ui/button";

export const metadata: Metadata = {
  title: "Learn AI",
};

export default function HomePage() {
  return (
    <>
      <HeroHomepage>
        <HomepageNavBar />
        <motion.section
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-start container mx-auto flex-grow mb-20"
        >
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-4xl text-glow max-w-[36rem]">
              Unleash the power of AI—learn, code, and master machine learning
              hands-on.
            </h1>
            <Button variant={"blue-primary"} className="font-semibold max-w-64">
              Browse courses
              <ArrowRight className="icon-glow" />
            </Button>
          </div>
        </motion.section>
      </HeroHomepage>
      <section className="">
        <CourseList />
      </section>
    </>
  );
}
