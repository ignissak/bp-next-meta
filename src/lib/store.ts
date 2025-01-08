// yipee legend state, the best library

import { getCoursesWithChapters, getUserProgress, insertUserProgress } from "@/actions";
import { observable } from "@legendapp/state";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { syncObservable } from "@legendapp/state/sync";
import { Progress } from "@prisma/client";
import { Course, CourseChapter } from "./types";


export const store$ = observable({
    _courses: [] as Course[],
    _progress: [] as Partial<Progress>[],
    getCourses: async () => {
        if (store$._courses.length === 0) {
            let x = [];
            const jsonResponse = await getCoursesWithChapters();
            for (const document of jsonResponse.data) {
                const course = {
                    documentId: document.documentId,
                    title: document.title,
                    description: document.description,
                    approximateTime: document.estimateTime,
                    image: process.env.NEXT_PUBLIC_STRAPI_BASE_URL + document.cover?.url,
                    chapters: [] as CourseChapter[],
                };
                x.push(course);
                for (const chapter of document.course_chapters) {
                    course.chapters.push({
                        documentId: chapter.documentId,
                        title: chapter.title,
                        slug: chapter.slug,
                    })
                }
            }
            store$._courses.set(x);
        }
        return store$._courses;
    },
    getProgress: async (userId?: string ) => {
        if (!userId) {
            console.debug("Returning locally stored progress...")
            // try to return locally stored progress
            return store$._progress;
        }
        // return progress from database
        return observable(await getUserProgress(userId));
    },
    setProgress: async (courseId: string, entryId: string, userId?: string) => {
        // TODO: Implement
        if (!userId) {
            console.debug("No user, setting progress locally...");
            store$._progress.set([...store$._progress.get(), { courseId, entryId }]);
            return;
        }
        console.debug("Setting progress in database...");
        await insertUserProgress(userId, courseId, entryId);
    }
});

syncObservable(store$, {
    persist: {
        name: "appStore",
        plugin: ObservablePersistLocalStorage
    }
})