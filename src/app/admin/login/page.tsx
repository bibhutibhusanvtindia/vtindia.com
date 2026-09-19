"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AdminSignIn } from "@/components/admin/auth/AdminSignIn";
import { useAdminStore } from "@/data/admin/store";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const logoutParam = searchParams.get("logged_out");
  const { isHydrated, isAuthenticated, employees, login } = useAdminStore();

  useEffect(() => {
    if (isHydrated && isAuthenticated && !logoutParam) {
      router.push("/admin");
    }
  }, [isHydrated, isAuthenticated, logoutParam, router]);

  const handleLogin = (employeeId: string, pin: string) => {
    const res = login(employeeId, pin);
    if (res.success) {
      router.push("/admin");
    }
    return res;
  };

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF8FA]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-200 border-t-[#F0186C]" />
      </div>
    );
  }

  return (
    <AdminSignIn
      employees={employees}
      onLogin={handleLogin}
      logoutMessage={logoutParam ? "You have securely signed out of Virtoy Command Center." : null}
    />
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#FFF8FA]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-200 border-t-[#F0186C]" />
        </div>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}
