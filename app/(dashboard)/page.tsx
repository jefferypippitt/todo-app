import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <section className="py-10">
      <div className="container">
        <h3 className="text-2xl font-bold tracking-tight">
          Welcome back! {user?.firstName}
        </h3>
        <p className="text-sm text-muted-foreground">
          Here&apos;s a list of your task
        </p>
      </div>
    </section>
  );
}
