"use server";

import prisma from "./lib/prisma";
import {
  qsChapterEntry,
  qsCourseEntriesContent,
  qsCoursesWithChapters,
  qsEntriesInCourse,
} from "./lib/query";
import { Course, CourseChapter, CourseChapterEntry } from "./lib/types";

export const _getCoursesWithChapters = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_BASE_URL +
    "/api/courses?" +
    qsCoursesWithChapters(),
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

export const getCoursesWithChapters = async () => {
  const json = await _getCoursesWithChapters();
  let courses = [] as Course[];
  for (const document of json.data) {
    const course = {
      documentId: document.documentId,
      title: document.title,
      description: document.description,
      approximateTime: document.estimateTime,
      image: process.env.NEXT_PUBLIC_STRAPI_BASE_URL + document.cover?.url,
      chapters: [] as CourseChapter[],
    };
    courses.push(course);
    for (const chapter of document.course_chapters) {
      let chapterObj: CourseChapter = {
        documentId: chapter.documentId,
        title: chapter.title,
        slug: chapter.slug,
        course_chapter_entries: [] as CourseChapterEntry[],
      };
      for (const chapterEntry of chapter.course_chapter_entries) {
        chapterObj.course_chapter_entries?.push({
          documentId: chapterEntry.documentId,
          title: chapterEntry.title,
          slug: chapterEntry.slug,
          type: chapterEntry.type,
          completed: false,
        });
      }
      course.chapters.push(chapterObj);
    }
  }
  return courses;
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

/**
 *
 */
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

export const getCourseAllContent = async (courseId: string) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_BASE_URL +
    "/api/courses/" +
    courseId +
    "?" +
    qsCourseEntriesContent(),
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

export const getUserProgress = async (userId: string) => {
  return await prisma.progress.findMany({
    where: {
      userId,
    },
  });
};

export const upsertUserProgress = async (
  userId: string,
  courseId: string,
  entryId: string
) => {
  return prisma.progress.upsert({
    where: {
      userId_courseId_entryId: {
        userId,
        courseId,
        entryId,
      },
    },
    create: {
      userId,
      courseId,
      entryId,
    },
    update: {},
  });
};


export const insertProgress = async (feedback: string, href: string, userId?: string, ipAddress?: string) => {
  console.log("insertProgress", feedback, href, userId, ipAddress);
  try {
    await prisma.feedback.create({
      data: {
        userId,
        ipAddress,
        href,
        feedback
      }
    })
    return "success";
  } catch (e) {
    console.error(e);
    return "error";
  }
}

