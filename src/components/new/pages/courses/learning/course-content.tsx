"use client";

import Note from "@/components/note";
import Quiz from "@/components/quiz";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { ICoursePageContent, ICoursePageContentComponent } from "@/lib/types";
import { observer, useObservable, useObserve } from "@legendapp/state/react";
import Markdown from "react-markdown";

const CoursePageContent = observer(
  ({
    content,
    onEntryComplete,
  }: {
    content: ICoursePageContent;
    onEntryComplete: () => boolean;
  }) => {
    const $completedQuizes = useObservable(new Set<number>());
    const $canTickOff = useObservable(false);
    const $completed = useObservable(content.completed || false);
    const quizes = content.dynamic
      ?.filter((component) => component.__component === "shared.quiz")
      .flatMap((quiz) => quiz.id);

    if (quizes?.length === 0) {
      $canTickOff.set(true);
    }

    const handleQuizComplete = (id?: number) => {
      if (!id) {
        console.error("There is a quiz without ID, cannot proceed.");
        return;
      }
      console.debug("Quiz was completed"); //TODO: Button does not vanish, if completed
      $completedQuizes.add(id);
    };

    const handleButtonComplete = () => {
      const result = onEntryComplete();
      $completed.set(result);
      content.completed = result;
      toast({
        title: "Congratulations!",
        description: "You have completed this chapter.",
      })
    };

    useObserve($completedQuizes, ({ value }) => {
      console.debug("Completed quizes", value);
      if (
        value?.size === quizes?.length &&
        quizes?.every((quiz) => value?.has(quiz))
      ) {
        console.debug("All quizes completed");
        $canTickOff.set(true);
      }
    });

    return (
      <section
        id="course-content"
        className="lg:grid grid-cols-[1fr_620px_1fr] lg:grid-cols[1fr_740px_1fr] [&>*]:col-start-2 px-6 mb-4"
      >
        {content.dynamic?.map(
          (component: ICoursePageContentComponent, index: number) => (
            <CoursePageContentComponent
              key={index}
              data={component}
              onQuizComplete={handleQuizComplete}
            />
          )
        )}
        <div className="flex items-center justify-end">
          {!$completed.get() && (
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button
                  disabled={!$canTickOff.get()}
                  className="!pointer-events-auto"
                  onClick={handleButtonComplete}
                >
                  Mark as completed
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {$canTickOff.get() ? (
                  <span>Mark this chapter as completed.</span>
                ) : (
                  <span>You must complete all quizes first.</span>
                )}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        {process.env.NODE_ENV === "development" && (
          <p className="my-4 text-sm text-neutral-700">
            {JSON.stringify(content)}
          </p>
        )}
      </section>
    );
  }
);

const CoursePageContentComponent = observer(
  ({
    data,
    onQuizComplete,
  }: {
    data: ICoursePageContentComponent;
    onQuizComplete: (id?: number) => void;
  }) => {
    console.debug(data);
    if (data.__component === "shared.rich-text") {
      return (
        <div className="md">
          <Markdown>{data.body}</Markdown>
        </div>
      );
    } else if (data.__component === "shared.media") {
      return (
        <div className="!col-start-1 col-span-3 lg:px-16 my-4 flex flex-col gap-1 items-center justify-center xl:!col-start-2 xl:col-span-1">
          <img
            src={process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL + data.file?.url!!}
            className="rounded-lg"
          />
          {data.file?.caption && (
            <p className="text-sm text-neutral-600">{data.file.caption}</p>
          )}
        </div>
      );
    } else if (data.__component === "shared.quiz") {
      return (
        <div>
          <Quiz
            id={data.id}
            title={data.title!!}
            subtitle={data.subtitle}
            type={data.type as "abcd" | "fill"}
            options={data.options!!}
            onComplete={onQuizComplete}
          />
        </div>
      );
    } else if (data.__component === "shared.note") {
      return (
        <div>
          <Note
            title={data.title!!}
            body={data.body!!}
            type={data.type!!}
            icon={data.icon!!}
          />
        </div>
      );
    }
  }
);

export default CoursePageContent;
