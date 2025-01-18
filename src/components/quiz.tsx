"use client";

import { IQuiz } from "@/lib/types";
import { cn } from "@/lib/utils";
import { observer, useObservable } from "@legendapp/state/react";
import { IconSquare, IconSquareCheck, IconSquareX } from "@tabler/icons-react";

const Quiz: React.FC<IQuiz> = observer(
  ({ id, title, subtitle, options, type }) => {
    const clickedOptions$ = useObservable([] as string[]);

    const handleClickOption = (key: string) => {
      console.log("Clicked option", key);
      clickedOptions$.push(key);
    };

    const subtitleDOM: JSX.Element[] = [];
    let words = subtitle?.split(" ") || [];

    words.forEach((word, index) => {
      if (word.includes("_")) {
        const parts = word.split("_");
        parts.forEach((part, partIndex) => {
          subtitleDOM.push(<span key={`${index}-${partIndex}`}>{part}</span>);
          if (partIndex !== parts.length - 1) {
            Object.values(options).forEach((val) => val.value.length);
            const averageLength = Math.floor(
              Object.values(options).reduce(
                (acc, val) => acc + val.value.length,
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
      <section className="w-full">
        <section className="bg-card rounded-t-lg px-5 py-4">
          <h3 className="font-medium mb-2">{title}</h3>
          <div className="flex flex-wrap gap-[0.5ch]">{subtitleDOM}</div>
        </section>
        {Object.entries(options).map(([key, value]) => (
          <section
            key={key}
            className={cn(
              "border border-card px-5 py-4 flex items-center justify-between transition-all duration-200 last:rounded-bl-lg last:rounded-br-lg",
              clickedOptions$.get().includes(key)
                ? value.correct
                  ? "bg-gradient-green"
                  : "bg-gradient-red"
                : "cursor-pointer hover:opacity-80"
            )}
            onClick={() => {
              handleClickOption(key);
            }}
          >
            <p>{value.value}</p>
            {clickedOptions$.get().includes(key) ? (
              value.correct ? (
                <IconSquareCheck size={20} className="text-green-600" />
              ) : (
                <IconSquareX size={20} className="text-red-600" />
              )
            ) : (
              <IconSquare size={20} />
            )}
          </section>
        ))}
      </section>
    );
  }
);

export default Quiz;
