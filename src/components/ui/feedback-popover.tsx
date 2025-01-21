"use client";

import { insertProgress } from "@/actions";
import { observer, useObservable } from "@legendapp/state/react";
import { IconCheck, IconLoader } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Form from "next/form";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Textarea } from "./textarea";

const buttonStates = {
  idle: <span>Submit</span>,
  loading: (
    <span>
      <IconLoader className="inline mr-2 animate-spin" />
      Please wait...
    </span>
  ),
  success: (
    <span>
      <IconCheck className="inline mr-2" />
      Submitted!
    </span>
  ),
  error: "Error",
};

const FeedbackPopover = observer(() => {
  const $formStatus = useObservable<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const $feedback = useObservable("");
  const $open = useObservable(false);
  const path = usePathname();
  const { data: session } = useSession();

  const submit = async () => {
    if ($formStatus.get() === "loading") return;
    $formStatus.set("loading");
    $formStatus.set(
      await insertProgress($feedback.get(), path, session?.user?.id)
    );
    if ($formStatus.get() === "success") {
      setTimeout(() => {
        $formStatus.set("idle");
        $open.set(false);
      }, 2000);
    }
  };

  return (
    <Dialog open={$open.get()} onOpenChange={(v) => $open.set(v)}>
      <DialogTrigger
        asChild
        onClick={() => {
          $formStatus.set("idle");
        }}
      >
        <Button variant="outline" className="text-neutral-400">
          <span>Feedback</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
        </DialogHeader>
        <Form action={submit}>
          <Textarea
            required
            id="feedback"
            placeholder="What's on your mind?"
            onChange={(e) => $feedback.set(e.target.value)}
          />
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={$formStatus.get() === "loading"}>
              {buttonStates[$formStatus.get()]}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

export default FeedbackPopover;
