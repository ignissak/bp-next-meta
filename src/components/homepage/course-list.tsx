import { getCoursesWithChapters } from "@/actions";
import { Course } from "@/lib/types";
import { observable } from "@legendapp/state";
import { observer, useMount } from "@legendapp/state/react";
import { CourseCard } from "../course_list/course-card";
import CourseListHeading from "./course-list-heading";

const courses$ = observable<Course[]>([]);
const loading$ = observable(true);
const errored$ = observable(false);

const CourseList = observer(() => {
  /* const courses: Course[] = [
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
  ]; */

  useMount(async () => {
    try {
      const jsonResponse = await getCoursesWithChapters();
      for (const document of jsonResponse.data) {
        const course = {
          id: document.documentId,
          title: document.title,
          description: document.description,
          approximateTime: document.estimateTime,
          image: process.env.NEXT_PUBLIC_STRAPI_BASE_URL + document.cover?.url,
          chapters: [],
        };
        courses$.push(course);
        console.log(course);
      }
      loading$.set(false);
    } catch (e) {
      console.error(e);
      errored$.set(true);
    }
  });

  return (
    <section className="container mx-auto mb-32" id="courses">
      <CourseListHeading />
      <section className="flex items-row flex-wrap gap-4 items-start justify-center">
        {courses$.map((course, index) => (
          <CourseCard course={course.get()} index={index} key={index} />
        ))}
      </section>
    </section>
  );
});

export default CourseList;
