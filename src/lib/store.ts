// yipee legend state, the best library

import { upsertUserProgress } from "@/actions";
import { observable } from "@legendapp/state";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { syncObservable } from "@legendapp/state/sync";
import { Progress } from "@prisma/client";

export const store$ = observable({
  progress: [] as Partial<Progress>[],
  setProgress: async (courseId: string, entryId: string, userId?: string) => {
    // TODO: Implement
    if (!userId) {
      console.debug("No user, setting progress locally...");
      store$.progress.set([...store$.progress.get(), { courseId, entryId }]);
      return;
    }
    console.debug("Setting progress in database...");
    await upsertUserProgress(userId, courseId, entryId);
  },
});

syncObservable(store$, {
  persist: {
    name: "appStore",
    plugin: ObservablePersistLocalStorage,
  },
});
