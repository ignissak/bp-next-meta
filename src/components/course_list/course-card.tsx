import { Course } from "@/lib/types";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export const CourseCard = ({
  course,
  index,
}: {
  course: Course;
  index: number;
}) => {
  return (
    <Link
      href={course.link || ""}
      className="hover:opacity-80 transition-opacity"
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index }}
        viewport={{ once: true }}
      >
        <Card className="max-w-80 border-0 cursor-pointer">
          <div>
            <Image
              src={course.image}
              width={344}
              height={160}
              alt={course.title}
              className="max-h-40 aspect-auto object-cover rounded-tr-md rounded-tl-md"
            />
          </div>
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
            <p className="text-accent text-xs">{course.approximateTime}</p>
          </CardHeader>
        </Card>
      </motion.div>
    </Link>
  );
};
