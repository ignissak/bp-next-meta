export interface Course {
  documentId?: string;
  title: string;
  description: string;
  estimateTime: string;
  image: string;
  link?: string;
  completed?: boolean;
  started?: boolean;
  course_chapters: ICourseChapter[];
}

export interface QuizOption {
  Id: number;
  text: string;
  isCorrect: boolean;
}

export interface IQuiz {
  id?: number;
  title: string;
  subtitle?: string;
  type?: any;
  options: QuizOption[];
  requireAllCorrect: boolean;
  onComplete?: (id?: number) => void;
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
  id: number;
  body?: string;
  file?: StrapiFile;
  title?: string;
  description?: string;
  answers?: QuizOption[];
  requireAllCorrect?: boolean;
  type?: "red" | "blue" | "green" | "yellow";
  icon?: string;
}

export interface ICoursePageContent {
  documentId: string;
  title: string;
  slug: string;
  type: "study" | "quiz" | "code";
  dynamic?: ICoursePageContentComponent[];
  completed?: boolean;
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

export interface Resource {
  documentId: string;
  title: string;
  subtitle: string;
  link: string;
  category: string;
  thumbnail: StrapiFile;
}

export interface IGlossaryItem {
  documentId: string;
  term: string;
  definition: string;
}