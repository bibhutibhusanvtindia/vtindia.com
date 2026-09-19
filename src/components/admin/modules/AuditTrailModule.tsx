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
      <div className="relative overflow-hidden rounded-3xl border-2 border-pink-200/90 bg-gradient-to-br from-white via-[#FFF5F8] to-[#FCE7F3]/70 p-6 sm:p-7 shadow-sm">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-[#F0186C]/15 to-[#FF4D8D]/5 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-sm shadow-[#F0186C]/25">
                <Users className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Multi-Rep Tracking &amp;{" "}
                <span className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] bg-clip-text text-transparent">
                  Audit Trail
                </span>
              </h2>
              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#D6135F] border border-pink-200">
                Immutable System Logs
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Transparent activity stream tracking every deal creation, pitch generation, discussion proof upload, and status transition.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-pink-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Employee Filter */}
          <div className="w-52">
            <Select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="bg-white border-2 border-pink-100 text-slate-800 text-xs rounded-xl focus:border-[#F0186C]"
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
              className="bg-white border-2 border-pink-100 text-slate-800 text-xs rounded-xl focus:border-[#F0186C]"
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
          <div className="relative w-60">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#D6135F]" />
            <Input
              type="text"
              placeholder="Filter actions or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-2 border-pink-100 text-slate-800 text-xs rounded-xl placeholder:text-slate-400 focus:border-[#F0186C]"
            />
          </div>
        </div>

        <div className="text-xs text-slate-600 font-semibold px-2">
          <span>
            Total: <strong className="text-[#D6135F] font-black">{filteredLogs.length}</strong> activity records
          </span>
        </div>
      </div>

      {/* Audit Stream Table */}
      <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
        <div className="flex flex-row items-center justify-between pb-4 border-b border-pink-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Verified Activity Stream</h3>
            <p className="text-xs text-slate-500">
              Chronological sequence of all administrative, sales, and engineering actions.
            </p>
          </div>
        </div>
        <div className="pt-2 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-pink-100 bg-pink-50/30">
                <TableHead className="text-slate-700 font-bold">Timestamp</TableHead>
                <TableHead className="text-slate-700 font-bold">Team Member</TableHead>
                <TableHead className="text-slate-700 font-bold">Role</TableHead>
                <TableHead className="text-slate-700 font-bold">Action</TableHead>
                <TableHead className="text-slate-700 font-bold">Module</TableHead>
                <TableHead className="text-slate-700 font-bold">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="border-slate-100 hover:bg-pink-50/20 transition-colors">
                  <TableCell className="font-mono text-[11px] text-slate-500 whitespace-nowrap font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#D6135F]" />
                      <span>{log.timestamp}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-slate-900 whitespace-nowrap">{log.employeeName}</TableCell>
                  <TableCell>
                    <Badge variant="brand" size="xs" className="uppercase font-mono font-bold">
                      {log.employeeRole}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-[#D6135F]">{log.action}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" size="xs" className="font-semibold">
                      {log.module}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-700 max-w-md font-medium">{log.details}</TableCell>
                </TableRow>
              ))}

              {filteredLogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="p-8 text-center text-xs text-slate-400 font-medium">
                    No activity logs match the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
