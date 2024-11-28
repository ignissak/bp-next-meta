"use server";

import {
  qsChapterEntry,
  qsCoursesWithChapters,
  qsEntriesInCourse,
} from "./lib/query";

export const getCoursesWithChapters = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_BASE_URL + "/api/courses?" + qsCoursesWithChapters(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return await response.json();
};

export const getEntryInCourse = async (entryId: string) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_BASE_URL +
      "/api/course-chapter-entries/" +
      entryId +
      "?" +
      qsChapterEntry(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  return await response.json();
};

export const getAllEntriesInCourse = async (courseId: string) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_BASE_URL +
      "/api/courses/" +
      courseId +
      "?" +
      qsEntriesInCourse(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
    }
  );
  return await response.json();
};
