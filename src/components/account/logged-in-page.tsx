"use client";
import { IconLogout } from "@tabler/icons-react";
import { motion } from "motion/react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const LoggedInPage = ({ user }: { user: User }) => {
  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center">
      <motion.div
        animate={{ opacity: 1, y: -8 }}
        initial={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-glow mb-1">Account</h2>
        <p className="mb-4 max-w-prose">
          You are currently logged in as {user.name} ({user.email})
        </p>
        <Button
          variant={"blue-primary"}
          className="font-semibold w-full"
          onClick={() => {
            signOut();
          }}
        >
          <IconLogout className="icon-glow" />
          Sign out
        </Button>
      </motion.div>
    </main>
  );
};

export default LoggedInPage;
