import { signOut } from "@/auth";
import { IconLogout } from "@tabler/icons-react";
import { User } from "next-auth";
import { Button } from "../ui/button";

const LoggedInPage = ({ user }: { user: User }) => {
  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center">
      <div>
        <h2 className="text-xl font-semibold text-glow mb-1">Account</h2>
        <p className="mb-4 max-w-prose">
          You are currently logged in as {user.name} ({user.email})
        </p>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button
            type="submit"
            variant={"blue-primary"}
            className="font-semibold w-full"
          >
            <IconLogout className="icon-glow" />
            Sign out
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LoggedInPage;
