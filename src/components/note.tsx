import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Markdown from "react-markdown";
import DynamicIcon from "./ui/dynamic-icon";

const Note = ({
  title,
  body,
  type,
  icon,
}: {
  title: string;
  body: string;
  type: string;
  icon: string;
}) => {
  return (
    <div
      className={cn("flex flex-col gap-2 px-6 py-4 rounded-lg border mb-4", {
        "bg-rose-950/15 border-rose-950/75": type === "red",
        "bg-blue-950/15 border-blue-950/75": type === "blue",
        "bg-green-950/15 border-green-950/75": type === "green",
      })}
    >
      <motion.div className="gap-2 flex items-center">
        <DynamicIcon icon={icon} />
        <h5 className="font-medium text-inherit">{title}</h5>
      </motion.div>
      <div className="md">
        <Markdown>{body}</Markdown>
      </div>
    </div>
  );
};

export default Note;
