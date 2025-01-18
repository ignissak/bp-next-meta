"use client";

import { observable } from "@legendapp/state";
import { observer } from "@legendapp/state/react";
import { IconBrandGithub, IconLoader } from "@tabler/icons-react";
import { motion } from "motion/react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const loadingSign$ = observable(false);

const LoggedOutPage = observer(() => {
  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center">
      <motion.div
        animate={{ opacity: 1, y: -8 }}
        initial={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-1">Account</h2>
        <p>
          You can freely learn without logging in, but you will not be able to:
        </p>
        <ul className="list-disc ml-4 mb-4">
          <li>save and share your progress across multiple devices</li>
          <li>make edits in the glossary</li>
        </ul>
        <Button
          disabled={loadingSign$.get()}
          variant={"blue-primary"}
          className="font-semibold w-full"
          onClick={() => {
            loadingSign$.set(true);
            signIn("github");
          }}
        >
          {loadingSign$.get() ? (
            <>
              <IconLoader className="animate-spin" />
              Please wait...
            </>
          ) : (
            <>
              <IconBrandGithub  />
              Login with GitHub
            </>
          )}
        </Button>
      </motion.div>
    </main>
  );
});

export default LoggedOutPage;
