import { Course } from "@/lib/types";
import { motion } from "motion/react";
import { CourseCard } from "./course_list/course-card";

export const CourseList = () => {
  const courses: Course[] = [
    {
      title: "Introduction to AI",
      description:
        "Discover the fundamentals of artificial intelligence and its impact on our world.",
      approximateTime: "20 minutes",
      image: "/images/course_img1.jpg",
      chapters: [],
    },
    {
      title: "Linear regression",
      description:
        "Explore how linear regression models find patterns and make predictions in data.",
      approximateTime: "1 hour",
      image: "/images/course_img2.jpg",
      chapters: [],
    },
    {
      title: "Classification algorithms",
      description:
        "Dive into algorithms that categorize data, from logistic regression to support vector machines.",
      approximateTime: "2 hours",
      image: "/images/course_img3.jpg",
      chapters: [],
    },
    {
      title: "Decision Trees and Random Forests",
      description:
        "Understand how decision trees and random forests make complex decisions by splitting data.",
      approximateTime: "2 hours",
      image: "/images/course_img4.jpg",
      chapters: [],
    },
    {
      title: "Neural Networks and Deep Learning",
      description:
        "Uncover the power of neural networks and how they mimic the human brain to learn patterns.",
      approximateTime: "2 hours",
      image: "/images/course_img5.jpg",
      chapters: [],
    },
  ];
  return (
    <section className="container mx-auto mb-32" id="courses">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="font-semibold text-xl text-glow mb-8 text-center"
      >
        Courses
      </motion.h2>
      <section className="flex items-row flex-wrap gap-4 items-start justify-center">
        {courses.map((course, index) => (
          <CourseCard course={course} index={index} key={index} />
        ))}
      </section>
    </section>
  );
};
