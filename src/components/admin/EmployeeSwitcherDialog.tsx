"use client";

import { useState } from "react";
import { Check, Lock, ShieldCheck, UserCheck, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/admin/ui/Dialog";
import { Button } from "@/components/admin/ui/Button";
import { Badge } from "@/components/admin/ui/Badge";
import { Avatar } from "@/components/admin/ui/Avatar";
import { Employee } from "@/data/admin/types";

export function EmployeeSwitcherDialog({
  open,
  onOpenChange,
  employees,
  currentEmployee,
  onSelectEmployee,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employees: Employee[];
  currentEmployee: Employee;
  onSelectEmployee: (emp: Employee) => void;
}) {
  const [selectedEmp, setSelectedEmp] = useState<Employee>(currentEmployee);
  const [pinInput, setPinInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSwitch = (emp: Employee) => {
    setSelectedEmp(emp);
    setPinInput("");
    setErrorMsg("");
  };

  const handleConfirm = () => {
    // Check PIN or allow executive 1-click bypass
    if (pinInput.trim() && pinInput.trim() !== selectedEmp.pin) {
      setErrorMsg("Incorrect PIN. Please check your credentials.");
      return;
    }
    onSelectEmployee(selectedEmp);
    onOpenChange(false);
  };

  const roleBadges: Record<string, { label: string; variant: "default" | "success" | "warning" | "indigo" | "secondary" }> = {
    ceo: { label: "Chief Executive", variant: "indigo" },
    cofounder: { label: "Co-Founder", variant: "indigo" },
    coo: { label: "Chief Operations", variant: "success" },
    consultant: { label: "Sr. Consultant", variant: "warning" },
    tech_lead: { label: "Tech Pod Lead", variant: "default" },
    developer: { label: "Engineer", variant: "secondary" },
    sales: { label: "Growth Executive", variant: "warning" },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle>Switch Employee Profile</DialogTitle>
              <DialogDescription>
                Select your verified Virtoy Technologies employee identity to access role-specific workflows and action audits.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Employee Grid */}
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 max-h-[380px] overflow-y-auto pr-1">
          {employees.map((emp) => {
            const isSelected = selectedEmp.id === emp.id;
            const isCurrent = currentEmployee.id === emp.id;
            const badge = roleBadges[emp.role] || { label: emp.role, variant: "secondary" };

            return (
              <div
                key={emp.id}
                onClick={() => handleSwitch(emp)}
                className={`group relative flex items-start gap-3 rounded-2xl border p-3.5 cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary/[0.04] shadow-sm ring-1 ring-primary"
                    : "border-border/80 bg-surface hover:border-border hover:bg-surface-muted/60"
                }`}
              >
                <Avatar src={emp.avatar} alt={emp.name} fallback={emp.name} size="default" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-foreground truncate">{emp.name}</h4>
                    {isCurrent && (
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted truncate">{emp.title}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge variant={badge.variant} size="xs">
                      {badge.label}
                    </Badge>
                    <span className="font-mono text-[10px] text-muted">PIN: {emp.pin}</span>
                  </div>
                </div>
                {isSelected && (
                  <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Profile Action Card */}
        <div className="mt-5 rounded-2xl border border-border/90 bg-surface-muted/60 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar src={selectedEmp.avatar} alt={selectedEmp.name} size="sm" />
              <div>
                <p className="text-xs font-bold text-foreground">
                  Switching to: <span className="text-primary">{selectedEmp.name}</span>
                </p>
                <p className="text-[11px] text-muted">Department: {selectedEmp.department} · Role: {selectedEmp.role.toUpperCase()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button variant="default" size="sm" onClick={handleConfirm}>
                <ShieldCheck className="h-3.5 w-3.5" />
                Confirm Switch
              </Button>
            </div>
          </div>
          {errorMsg && <p className="mt-2 text-xs font-medium text-destructive">{errorMsg}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
