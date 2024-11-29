import ProgressPage from "@/components/progress-page";
import { Course } from "@/lib/types";

export const metadata = {
  title: "Your progress",
  description:
    "Track your course progress and resume on specific parts of the course by clicking on their title.",
};

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
  return <ProgressPage courses={courses} />;
};

export default page;
