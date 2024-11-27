"use client";
import { Course } from "@/lib/types"
import { motion } from "motion/react"
import ProgressDropdown from "./progress/progress-dropdown"

const ProgressPage = ({courses}: {courses: Partial<Course>[]}) => {
  return (
    <main className="container mx-auto min-h-screen">
      <section className="pt-16 md:pt-32 pb-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-bold text-lg text-glow mb-1">Your progress</h1>
          <p className="">
            Here you can track your course progress and resume on specific parts
            of the course by clicking on their title.
          </p>
        </motion.div>
        {courses.map((course, index) => (
          <ProgressDropdown key={index} index={index} course={course} />
        ))}
      </section>
    </main>
  )
}
export default ProgressPage;