export interface Course {
  documentId?: string;
  title: string;
  description: string;
  approximateTime: string;
  image: string;
  link?: string;
  chapters: CourseChapter[];
  completed?: boolean;
}

export interface CourseChapter {
  documentId: string;
  title: string;
  slug: string;
  course_chapter_entries: CourseChapterEntry[];
}

export interface CourseChapterEntry {
  documentId: string;
  title: string;
  slug: string;
  type: "study" | "quiz" | "code";
  completed: boolean;
}

export interface QuizOptions {
  [key: string]: {
    value: string;
    correct: boolean;
  };
}

export interface IQuiz {
  id?: number;
  title: string;
  subtitle?: string;
  options: QuizOptions;
  type: "abcd" | "fill";
}
