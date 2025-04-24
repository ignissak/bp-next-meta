"use client";

import { IQuiz } from "@/lib/types";
import { cn } from "@/lib/utils";
import { observer, useObservable } from "@legendapp/state/react";
import { IconSquare, IconSquareCheck, IconSquareX } from "@tabler/icons-react";
import { motion } from "motion/react";

const Quiz: React.FC<IQuiz> = observer(
  ({ id, title, subtitle, options, requireAllCorrect, onComplete }) => {
    const clickedOptions$ = useObservable([] as number[]);
    const completed$ = useObservable(false);

    const handleClickOption = (key: number) => {
      if (completed$.get()) return;
      console.debug("Clicked option", key);
      clickedOptions$.push(key);
      if (options[key].isCorrect) {
        if (requireAllCorrect) {
          // check if every correct option is clicked
          const allCorrect = options.every((option, index) => {
            if (option.isCorrect) {
              return clickedOptions$.get().includes(index);
            }
            return true; // if the option is not correct, we don't care about it
          });
          if (allCorrect) {
            completed$.set(true);
            onComplete?.(id);
          }
        } else {
          completed$.set(true);
          onComplete?.(id);
        }
        // if (
        //   requireAllCorrect &&
        //   clickedOptions$.get().length ===
        //     options.filter((option) => option.isCorrect).length
        // ) {
        //   completed$.set(true);
        //   onComplete?.(id);
        // } else {
        //   completed$.set(true);
        //   onComplete?.(id);
        // }
      }
    };

    const subtitleDOM: JSX.Element[] = [];
    let words = subtitle?.split(" ") || [];

    words.forEach((word, index) => {
      if (word.includes("_")) {
        const parts = word.split("_");
        parts.forEach((part, partIndex) => {
          subtitleDOM.push(<span key={`${index}-${partIndex}`}>{part}</span>);
          if (partIndex !== parts.length - 1) {
            const averageLength = Math.floor(
              Object.values(options).reduce(
                (acc, val) => acc + val.text.length,
                0
              ) / Object.values(options).length
            );
            subtitleDOM.push(
              <span
                key={`${index}-${partIndex}-empty`}
                className="h-6 bg-neutral-800 rounded-lg"
                style={{ width: averageLength / 1.3 + "rem" }}
              />
            );
          }
        });
      } else {
        subtitleDOM.push(<span key={index}>{word}</span>);
      }
    });

    return (
      <section className="w-full pb-4">
        <section className="bg-card rounded-t-lg px-5 py-4">
          <h3 className="font-medium mb-2">{title}</h3>
          <div className="flex flex-wrap gap-[0.5ch]">{subtitleDOM}</div>
        </section>
        {options.map((value, index) => (
          <section
            key={index}
            className={cn(
              "border border-card px-5 py-4 flex items-center justify-between transition-all duration-200 last:rounded-bl-lg last:rounded-br-lg",
              clickedOptions$.get().includes(index)
                ? value.isCorrect
                  ? "bg-gradient-green"
                  : "bg-gradient-red"
                : completed$.get()
                ? ""
                : "cursor-pointer hover:opacity-80"
            )}
            onClick={() => {
              handleClickOption(index);
            }}
          >
            <p>{value.text}</p>
            {clickedOptions$.get().includes(index) ? (
              value.isCorrect ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconSquareCheck size={20} className="text-green-600" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconSquareX size={20} className="text-red-600" />
                </motion.div>
              )
            ) : (
              <IconSquare
                size={20}
                className={`${
                  completed$.get() &&
                  "text-neutral-600 transition-colors duration-200"
                }`}
              />
            )}
          </section>
        ))}
      </section>
    );
  }
);

export default Quiz;
