import { getCoursesWithChapters } from "@/actions";
import { Course } from "@/lib/types";
import { observer, useMountOnce, useObservable } from "@legendapp/state/react";
import { CourseCard } from "../course_list/course-card";
import CourseListHeading from "./course-list-heading";

const CourseList = observer(() => {

  const courses$ = useObservable<Course[]>([]);
  const loading$ = useObservable(true);
  const errored$ = useObservable(false);

  useMountOnce(async () => {
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
