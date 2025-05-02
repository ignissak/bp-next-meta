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
      cover: {
        populate: "*",
      },
    },
    sort: "course_order:asc",
  });
};

/**
 * Does not include content
 */
export const qsEntriesInCourse = () => {
  return qs.stringify({
    populate: {
      course_chapters: {
        populate: ["course_chapter_entries"],
      },
    },
  });
};

/**
 * Includes content
 */
export const qsCourseEntriesContent = () => {
  return qs.stringify({
    populate: {
      course_chapters: {
        populate: {
          course_chapter_entries: {
            populate: {
              dynamic: {
                populate: "*",
              },
            },
          },
        },
      },
    },
  });
};

export const qsResources = () => {
  return qs.stringify({
    populate: ["thumbnail"],
  });
};
