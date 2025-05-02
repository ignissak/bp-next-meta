"use client";
import { Resource } from "@/lib/types";
import { MotionLink } from "@/lib/utils";
import {
  observer,
  useMountOnce,
  useObservable,
  useObserveEffect,
} from "@legendapp/state/react";
import Link from "next/link";

const ResourcesCatalog = observer(({ data }: { data: Resource[] }) => {
  const $toggledCategory = useObservable(null as string | null);
  const $filtered = useObservable([] as Resource[]);
  let categories = Array.from(new Set(data.map((item) => item.category))).map(
    (category) => category.charAt(0).toUpperCase() + category.slice(1)
  );

  useMountOnce(() => {
    $filtered.set(data);
  });

  useObserveEffect($toggledCategory, () => {
    if ($toggledCategory.get() === null) {
      $filtered.set(data);
    } else {
      $filtered.set(
        data.filter(
          (item) =>
            item.category.toLowerCase() ===
            $toggledCategory.get()?.toLowerCase()
        )
      );
    }
  });

  return (
    <>
      <section className="flex flex-col gap-6 mb-6">
        <div id="resources-filters" className="flex gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              data-active={$toggledCategory.get() === category}
              className="rounded-full bg-neutral-900 text-neutral-400 px-4 py-1 transition-all duration-200 ease-in-out hover:text-neutral-100 data-[active=true]:bg-neutral-100 data-[active=true]:text-neutral-900"
              onClick={() => {
                if ($toggledCategory.get() === category) {
                  $toggledCategory.set(null);
                } else {
                  $toggledCategory.set(category);
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <div
          id="resources-catalog"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {$filtered.map(($item, index) => (
            <ResourceCard data={$item.get()} key={index} />
          ))}
        </div>
      </section>
    </>
  );
});

const ResourceCard = observer(({ data }: { data: Resource }) => {
  return (
    <MotionLink
      href={data.link}
      target="_blank"
      className="flex flex-col gap-4 p-3 bg-neutral-900 group rounded-lg hover:bg-neutral-800/60 transition-all duration-200 ease-in-out"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="">
        <img
          alt={data.title}
          src={process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL + data.thumbnail.url}
          className="max-h-40 w-full object-cover aspect-video rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-base text-neutral-100">{data.title}</h4>
        <p className="text-sm text-neutral-400">{data.subtitle}</p>
      </div>
    </MotionLink>
  );
});

export default ResourcesCatalog;
