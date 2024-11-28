"use client";

import { IconBrandGithub } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const LoggedOutPage = () => {
  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center">
      <div>
        <h2 className="text-xl font-semibold text-glow mb-1">Account</h2>
        <p>
          You can freely learn without logging in, but you will not be able to:
        </p>
        <ul className="list-disc ml-4 mb-4">
          <li>save and share your progress across multiple devices</li>
          <li>make edits in the glossary</li>
        </ul>
        <Button
          variant={"blue-primary"}
          className="font-semibold w-full"
          onClick={() => {
            signIn("github");
          }}
        >
          <IconBrandGithub className="icon-glow" />
          Login with GitHub
        </Button>
      </div>
    </main>
  );
};

export default LoggedOutPage;
