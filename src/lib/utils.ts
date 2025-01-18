import { clsx, type ClassValue } from "clsx";
import { motion } from "motion/react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const snakeCase = (input: string) => {
  return input
    .replace(/\d+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("_");
};

export const MotionLink = motion.create(Link);

export const isNaNor = (value: any, fallback: any) => {
  return isNaN(value) ? fallback : value;
};
