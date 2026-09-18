"use client";

import { useState } from "react";
import {
  Activity,
  Award,
  Clock,
  Filter,
  Layers,
  Search,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/Card";
import { Button } from "@/components/admin/ui/Button";
import { Badge } from "@/components/admin/ui/Badge";
import { Input } from "@/components/admin/ui/Input";
import { Select } from "@/components/admin/ui/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/Table";
import { AuditLog, Employee } from "@/data/admin/types";

export function AuditTrailModule({
  auditLogs,
  employees,
}: {
  auditLogs: AuditLog[];
  employees: Employee[];
}) {
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [selectedModule, setSelectedModule] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = auditLogs.filter((log) => {
    const matchesEmp = selectedEmployee === "all" || log.employeeId === selectedEmployee || log.employeeName.includes(selectedEmployee);
    const matchesMod = selectedModule === "all" || log.module.toLowerCase().includes(selectedModule.toLowerCase());
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEmp && matchesMod && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">👥 Multi-Rep Tracking &amp; Audit Trail</h2>
            <Badge variant="brand" size="xs">
              Immutable System Logs
            </Badge>
          </div>
          <p className="text-xs text-rose-200/60">
            Transparent activity stream tracking every deal creation, pitch generation, discussion proof upload, and status transition.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#3D1E30] bg-[#12070E] p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Employee Filter */}
          <div className="w-52">
            <Select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              options={[
                { value: "all", label: "All Team Members" },
                ...employees.map((emp) => ({ value: emp.id, label: `${emp.name} (${emp.role.toUpperCase()})` })),
              ]}
            />
          </div>

          {/* Module Filter */}
          <div className="w-48">
            <Select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              options={[
                { value: "all", label: "All Modules" },
                { value: "Social Lead Capture", label: "Social Lead Capture" },
                { value: "B2B Maps Prospector", label: "B2B Maps Prospector" },
                { value: "Proof Vault", label: "Proof Vault" },
                { value: "Subscription Manager", label: "Subscription Manager" },
                { value: "Executive Briefings", label: "Executive Briefings" },
                { value: "Authentication", label: "Authentication" },
              ]}
            />
          </div>

          {/* Search Input */}
          <div className="relative w-56">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Filter actions or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="text-xs text-slate-400">
          <span>
            Total: <strong className="text-white font-mono">{filteredLogs.length}</strong> activity records
          </span>
        </div>
      </div>

      {/* Audit Stream Table */}
      <Card className="border-[#3D1E30] bg-[#10070D]/90 shadow-lg">
        <CardHeader className="pb-3 border-b border-[#2A1322]">
          <CardTitle className="text-sm font-bold text-white">Verified Activity Stream</CardTitle>
          <CardDescription className="text-xs text-rose-200/60">
            Chronological sequence of all administrative, sales, and engineering actions.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <Table>
            <TableHeader>
              <TableRow className="border-[#2A1322]">
                <TableHead className="text-rose-300/70">Timestamp</TableHead>
                <TableHead className="text-rose-300/70">Team Member</TableHead>
                <TableHead className="text-rose-300/70">Role</TableHead>
                <TableHead className="text-rose-300/70">Action</TableHead>
                <TableHead className="text-rose-300/70">Module</TableHead>
                <TableHead className="text-rose-300/70">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="border-[#2A1322]/60 hover:bg-[#1A0B16]/50">
                  <TableCell className="font-mono text-[11px] text-slate-400 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-[#FF4D8D]" />
                      <span>{log.timestamp}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-white whitespace-nowrap">{log.employeeName}</TableCell>
                  <TableCell>
                    <Badge variant="brand" size="xs" className="uppercase font-mono">
                      {log.employeeRole}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-[#FF4D8D]">{log.action}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" size="xs">
                      {log.module}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-300 max-w-md">{log.details}</TableCell>
                </TableRow>
              ))}

              {filteredLogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="p-8 text-center text-xs text-slate-400">
                    No activity logs match the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
