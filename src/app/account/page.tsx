import { auth } from "@/auth";
import LoggedInPage from "@/components/account/logged-in-page";
import LoggedOutPage from "@/components/account/logged-out-page";

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    console.log("User is not logged in");
    return (
      <>
        <LoggedOutPage />
      </>
    );
  }

  console.log("User is logged in");
  return (
    <>
      <LoggedInPage user={session.user} />
    </>
  )
};

export default page;
