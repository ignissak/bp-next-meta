import { getCoursesWithChapters } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import { Course } from "@/lib/types";
import { observer, useMountOnce, useObservable } from "@legendapp/state/react";
import { CourseCard } from "../course_list/course-card";
import { ToastAction } from "../ui/toast";
import CourseListHeading from "./course-list-heading";

const CourseList = observer(() => {
  const courses$ = useObservable<Course[]>([]);
  const loading$ = useObservable(true);
  const errored$ = useObservable(false);
  const { toast } = useToast();

  const loadCourseList = async () => {
    try {
      courses$.set([]);
      loading$.set(true);
      errored$.set(false);
      courses$.set(await getCoursesWithChapters());
      loading$.set(false);
    } catch (e) {
      console.error(e);
      errored$.set(true);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "We couldn't load the course list.",
        action: (
          <ToastAction onClick={loadCourseList} altText="Try again">
            Try again
          </ToastAction>
        ),
      });
    }
  };

  useMountOnce(() => {
    loadCourseList();
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
