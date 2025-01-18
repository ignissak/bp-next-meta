"use client";
import { motion } from "motion/react";

const CourseListHeading = () => {
  return (
    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="font-semibold text-xl mb-8 text-center"
    >
      Courses
    </motion.h2>
  );
};

export default CourseListHeading;
