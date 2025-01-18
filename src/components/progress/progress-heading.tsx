import { motion } from "motion/react";

const ProgressHeading = () => {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-bold text-lg  mb-1">Your progress</h1>
      <p className="">
        Here you can track your course progress and resume on specific parts of
        the course by clicking on their title.
      </p>
    </motion.div>
  );
};

export default ProgressHeading;
