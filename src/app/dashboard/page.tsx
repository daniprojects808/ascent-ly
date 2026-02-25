import { createClient } from "@/../supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/dashboard/dashboard-client";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <DashboardClient 
      userId={user.id} 
      userEmail={user.email}
      userName={user.user_metadata?.full_name}
    />
  );
}
