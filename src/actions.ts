"use server";

import {
  qsChapterEntry,
  qsCoursesWithChapters,
  qsEntriesInCourse,
} from "./lib/query";

export const getCoursesWithChapters = () => {
  return fetch(
    process.env.STRAPI_BASE_URL + "/api/courses" + qsCoursesWithChapters(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
};

export const getEntryInCourse = (entryId: string) => {
  return fetch(
    process.env.STRAPI_BASE_URL +
      "/api/course-chapter-entries/" +
      entryId +
      qsChapterEntry(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
};

export const getAllEntriesInCourse = (courseId: string) => {
  return fetch(
    process.env.STRAPI_BASE_URL +
      "/api/courses/" +
      courseId +
      qsEntriesInCourse(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
};
