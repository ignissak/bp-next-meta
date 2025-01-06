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

    return (
      <section className="w-full">
        <section className="bg-card rounded-t-lg  px-5 py-4">
          <h3 className="font-medium mb-2">{title}</h3>
          <p>
            {subtitle} {clickedOptions$.get()}
          </p>
        </section>
        {Object.entries(options).map(([key, value]) => (
          <section
            key={key}
            className={cn(
              "border border-card px-5 py-4 flex items-center justify-between cursor-pointer hover:opacity-80 transition-all duration-200 last:rounded-bl-lg last:rounded-br-lg",
              clickedOptions$.get().includes(key) &&
                (value.correct ? "bg-gradient-green" : "bg-gradient-red")
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
