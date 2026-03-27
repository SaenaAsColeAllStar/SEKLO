import { auth } from "@/lib/auth";
import { AppLayout } from "@/components/layout/AppLayout";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.role) {
    redirect("/login");
  }

  return <AppLayout userRole={session.user.role}>{children}</AppLayout>;
}
