"use client";
import ProgressDropdown from "@/components/progress/progress-dropdown";
import { Course } from "@/lib/types";
import { motion } from "motion/react";

const page = () => {
  const courses: Partial<Course>[] = [
    {
      title: "Introduction to AI",
      chapters: [
        { title: "Introduction", completed: true },
        { title: "What is AI?", completed: true },
        { title: "AI applications", completed: true },
        { title: "AI ethics", completed: true },
      ],
    },
    {
      title: "Linear regression",
      chapters: [
        { title: "Introduction", completed: true },
        { title: "Linear regression", completed: false },
        { title: "Loss", completed: false },
        { title: "Gradient descent", completed: false },
      ],
    },
    {
      title: "Classification algorithms",
      chapters: [
        { title: "Introduction", completed: true },
        { title: "K-nearest neighbors", completed: true },
        { title: "Decision trees", completed: false },
        { title: "Random forests", completed: false },
      ],
    },
    {
      title: "Decision Trees and Random Forests",
      chapters: [
        { title: "Introduction", completed: false },
        { title: "Decision trees", completed: false },
        { title: "Random forests", completed: false },
      ],
    },
    {
      title: "Neural Networks and Deep Learning",
      chapters: [
        { title: "Introduction", completed: false },
        { title: "Neural networks", completed: false },
        { title: "Deep learning", completed: false },
      ],
    },
  ];
  return (
    <main className="container mx-auto min-h-screen">
      <section className="pt-32 pb-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-bold text-2xl text-glow">Your progress</h1>
          <p>
            Here you can track your course progress and resume on specific parts
            of the course by clicking on their title.
          </p>
        </motion.div>
        {courses.map((course, index) => (
          <ProgressDropdown key={index} index={index} course={course} />
        ))}
      </section>
    </main>
  );
};

export default page;
