"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Lock,
  ArrowRight,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Building,
  UserCheck,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/admin/ui/Button";
import { Input } from "@/components/admin/ui/Input";
import { Badge } from "@/components/admin/ui/Badge";
import { Employee } from "@/data/admin/types";

export function AdminSignIn({
  employees,
  onLogin,
  logoutMessage,
}: {
  employees: Employee[];
  onLogin: (employeeId: string, pin: string) => { success: boolean; error?: string };
  logoutMessage?: string | null;
}) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(employees[0]?.id || "emp-1");
  const [pin, setPin] = useState<string>("");
  const [showPin, setShowPin] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectedEmployee = employees.find((e) => e.id === selectedEmployeeId) || employees[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      setErrorMsg("Please enter your 4-digit Security PIN.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    setTimeout(() => {
      const res = onLogin(selectedEmployeeId, pin);
      if (!res.success) {
        setErrorMsg(res.error || "Authentication failed. Incorrect PIN.");
        setIsLoading(false);
      }
    }, 400);
  };

  const handleQuickLogin = (emp: Employee) => {
    setSelectedEmployeeId(emp.id);
    setPin(emp.pin);
    setErrorMsg(null);
    setIsLoading(true);
    setTimeout(() => {
      onLogin(emp.id, emp.pin);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#FCF9FA] bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(240,24,108,0.08),rgba(255,255,255,0))] flex flex-col justify-center items-center p-4 sm:p-6 font-sans text-slate-900 selection:bg-[#F0186C] selection:text-white">
      {/* Background glowing ambient elements */}
      <div className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-tr from-[#F0186C]/10 to-[#FF4D8D]/5 blur-3xl" />

      <div className="w-full max-w-xl relative z-10 space-y-4">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center p-0.5 transition-transform hover:scale-[1.02]"
            title="Virtoy Technologies"
          >
            <Logo priority className="h-10 sm:h-12 w-auto drop-shadow-xs" />
          </Link>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50/80 px-3 py-0.5 text-[10.5px] font-black uppercase tracking-wider text-[#D6135F]">
              <Shield className="h-3 w-3 text-[#F0186C]" />
              <span>AI Executive Command Center</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Secure Sign In
            </h1>
            <p className="text-xs text-slate-600 max-w-md">
              Virtoy Technologies Private Limited leadership authentication gate.
            </p>
          </div>
        </div>

        {/* Optional Logout Notification Banner */}
        {logoutMessage && (
          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/90 p-3 text-xs text-emerald-800 font-bold flex items-center gap-2.5 shadow-xs animate-fadeIn">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{logoutMessage}</span>
          </div>
        )}

        {/* Authentication Card */}
        <div className="rounded-3xl border-2 border-pink-200/90 bg-white/95 backdrop-blur-md p-5 sm:p-6 shadow-xl shadow-pink-500/5 space-y-4">
          {errorMsg && (
            <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3 text-xs text-rose-900 font-bold flex items-center gap-2.5 animate-shake">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Employee Selector - All 8 Officers Visible (Non-Scrollable) */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Select Executive Account</span>
                <span className="text-[10px] text-[#D6135F] font-bold">8 Officers Active</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-1.5 p-1.5 border border-pink-100 rounded-2xl bg-pink-50/20">
                {employees.map((emp) => {
                  const isSelected = selectedEmployeeId === emp.id;
                  return (
                    <button
                      key={emp.id}
                      type="button"
                      onClick={() => {
                        setSelectedEmployeeId(emp.id);
                        setErrorMsg(null);
                      }}
                      className={`flex items-center gap-2 p-1.5 rounded-xl text-left transition-all text-xs ${
                        isSelected
                          ? "bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-[#F0186C] ring-2 ring-[#F0186C]/20 text-slate-900 font-bold shadow-xs"
                          : "border border-pink-100/80 bg-white hover:bg-pink-50/50 text-slate-600 hover:border-pink-200"
                      }`}
                    >
                      <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-lg bg-pink-100 border border-pink-200">
                        {emp.avatar ? (
                          <Image src={emp.avatar} alt={emp.name} fill className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-bold text-[#D6135F] text-xs">
                            {emp.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-black text-[11px] leading-tight text-slate-900">{emp.name}</div>
                        <div className="text-[9px] uppercase font-bold text-[#D6135F] truncate">{emp.role}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Profile Banner */}
            {selectedEmployee && (
              <div className="rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50/70 to-rose-50/40 p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-pink-300 bg-white shadow-xs">
                    {selectedEmployee.avatar ? (
                      <Image src={selectedEmployee.avatar} alt={selectedEmployee.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-bold text-[#D6135F]">
                        {selectedEmployee.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-black text-xs text-slate-900">{selectedEmployee.name}</div>
                    <div className="text-[10px] text-slate-600 font-medium">{selectedEmployee.title}</div>
                  </div>
                </div>
                <span className="rounded-md bg-[#D6135F] px-2 py-0.5 text-[9px] font-black uppercase text-white">
                  {selectedEmployee.department}
                </span>
              </div>
            )}

            {/* Security PIN Input */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Security PIN / Access Key
                </label>
                <span className="text-[10px] text-slate-400 font-medium">Default: Employee PIN (e.g. 1111)</span>
              </div>

              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D6135F]" />
                <Input
                  type={showPin ? "text" : "password"}
                  maxLength={10}
                  placeholder="Enter 4-digit PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="pl-10 pr-10 bg-white border-2 border-pink-200 text-slate-900 font-mono text-sm tracking-widest rounded-xl focus:border-[#F0186C]"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#D6135F]"
                >
                  {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#D6135F] to-[#F0186C] hover:from-[#B00D4D] hover:to-[#D6135F] text-white font-black py-2.5 rounded-2xl shadow-lg shadow-[#F0186C]/25 text-sm gap-2 transition-all hover:scale-[1.01]"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Authorize &amp; Enter Command Center</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </form>

          {/* Quick Demo 1-Click Access Badges */}
          <div className="pt-2 border-t border-pink-100 space-y-1.5">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 text-center">
              Quick 1-Click Executive Access (Demo)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin(employees[0])}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-pink-200 bg-pink-50/50 hover:bg-pink-100/60 p-2 text-xs font-bold text-slate-800 transition-colors"
              >
                <Zap className="h-3.5 w-3.5 text-[#F0186C]" />
                <span>CEO (Mr. Pritiranjan)</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin(employees[1])}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-pink-200 bg-pink-50/50 hover:bg-pink-100/60 p-2 text-xs font-bold text-slate-800 transition-colors"
              >
                <Zap className="h-3.5 w-3.5 text-[#F0186C]" />
                <span>Co-Founder (Mr. Anup)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-500 font-medium">
          <Link href="/" className="text-[#D6135F] hover:underline font-bold">
            &larr; Return to Public Website (vtindia.com)
          </Link>
        </div>
      </div>
    </div>
  );
}
