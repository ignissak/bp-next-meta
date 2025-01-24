export interface Course {
  documentId?: string;
  title: string;
  description: string;
  estimateTime: string;
  image: string;
  link?: string;
  completed?: boolean;
  started?: boolean;
  course_chapters: CourseChapter[];
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
  onComplete?: () => void;
}

export interface StrapiFile {
  documentId: string;
  name: string;
  caption: string | null;
  formats: {
    [key in "thumbnail" | "large" | "medium" | "small"]?: StrapiFileFormat;
  };
  url: string;
  hash: string;
  mime: string;
}
export interface StrapiFileFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  url: string;
}
export interface ICoursePageContentComponent {
  __component: string;
  body?: string;
  file?: StrapiFile;
  title?: string;
  subtitle?: string;
  options?: QuizOptions;
  type?: "abcd" | "fill";
}

export interface ICoursePageContent {
  documentId: string;
  title: string;
  slug: string;
  type: "study" | "quiz" | "code";
  dynamic: ICoursePageContentComponent[];
}

export interface ICourseChapter {
  documentId: string;
  title: string;
  slug: string;
  course_chapter_entries: ICoursePageContent[];
}

export interface IAPICourse {
  documentId: string;
  title: string;
  description: string;
  estimateTime: string;
  image: string;
  link?: string;
  chapters: ICourseChapter[];
  completed?: boolean;
  started?: boolean;
  course_chapters?: ICourseChapter[];
}
