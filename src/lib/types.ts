export interface Course {
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