"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/data/admin/store";

export default function AdminLogoutPage() {
  const router = useRouter();
  const { logout, isHydrated } = useAdminStore();

  useEffect(() => {
    if (isHydrated) {
      logout();
      router.push("/admin/login?logged_out=true");
    }
  }, [isHydrated, logout, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF8FA]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-200 border-t-[#F0186C]" />
        <p className="text-xs font-mono font-bold text-[#D6135F]">
          Signing out safely...
        </p>
      </div>
    </div>
  );
}
