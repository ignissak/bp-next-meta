import qs from "qs";

export const qsChapterEntry = () => {
  return qs.stringify({
    populate: {
      dynamic: {
        populate: "*",
      },
    },
  });
};

export const qsCoursesWithChapters = () => {
  return qs.stringify({
    populate: {
      course_chapters: {
        populate: "*",
      },
    },
    sort: "course_order:asc",
  });
};

export const qsEntriesInCourse = () => {
  return qs.stringify({
    populate: {
      course_chapters: {
        populate: ["course_chapter_entries"],
      },
    },
  });
};
