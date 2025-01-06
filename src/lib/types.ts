export interface Course {
  id?: string;
  title: string;
  description: string;
  approximateTime: string;
  image: string;
  link?: string;
  chapters: CourseChapter[];
}

export interface CourseChapter {
  title: string;
  completed?: boolean;
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
