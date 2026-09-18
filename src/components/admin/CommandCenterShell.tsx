"use client";

import { useState } from "react";
import {
  Activity,
  Bot,
  Compass,
  CreditCard,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Flame,
  Globe2,
  LayoutDashboard,
  MessageSquareShare,
  Paperclip,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EmployeeSwitcherDialog } from "@/components/admin/EmployeeSwitcherDialog";
import { DashboardModule } from "@/components/admin/modules/DashboardModule";
import { ChiefOfStaffModule } from "@/components/admin/modules/ChiefOfStaffModule";
import { SocialLeadsModule } from "@/components/admin/modules/SocialLeadsModule";
import { ProspectorModule } from "@/components/admin/modules/ProspectorModule";
import { ProofVaultModule } from "@/components/admin/modules/ProofVaultModule";
import { SubscriptionManagerModule } from "@/components/admin/modules/SubscriptionManagerModule";
import { AuditTrailModule } from "@/components/admin/modules/AuditTrailModule";
import { ExecutiveBriefingModule } from "@/components/admin/modules/ExecutiveBriefingModule";
import { useAdminStore } from "@/data/admin/store";

export function CommandCenterShell() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isEmployeeSwitcherOpen, setIsEmployeeSwitcherOpen] = useState<boolean>(false);

  const {
    isHydrated,
    currentEmployee,
    employees,
    financials,
    projects,
    attentionItems,
    socialLeads,
    prospects,
    proofVault,
    subscriptions,
    auditLogs,
    setCurrentEmployee,
    updateLeadStatus,
    updateLeadSuggestedReply,
    updateProspectStatus,
    addProspect,
    addProofVaultItem,
    updateSubscriptionSeats,
    resolveAttentionItem,
    resetToDefaultData,
  } = useAdminStore();

  const navTabs = [
    { id: "dashboard", label: "Executive Command", icon: LayoutDashboard, badge: attentionItems.length > 0 ? `${attentionItems.length}` : undefined },
    { id: "chief_of_staff", label: "AI Chief of Staff", icon: Bot, isHighlight: true },
    { id: "social_leads", label: "Omnichannel Leads", icon: MessageSquareShare, badge: `${socialLeads.length}` },
    { id: "prospector", label: "B2B Maps Prospector", icon: Compass },
    { id: "vault", label: "Proof & Discussion Vault", icon: Paperclip, badge: `${proofVault.length}` },
    { id: "subscriptions", label: "AI & Subscriptions", icon: CreditCard },
    { id: "audit", label: "Audit Trail", icon: Activity },
    { id: "briefing", label: "Executive Briefings", icon: FileSpreadsheet },
  ];

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted text-xs">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Initializing Virtoy Executive Command Engine...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-white">
      {/* Header */}
      <AdminHeader
        currentEmployee={currentEmployee}
        onOpenEmployeeSwitcher={() => setIsEmployeeSwitcherOpen(true)}
        onResetData={resetToDefaultData}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Sub-Navigation Tabs Bar */}
      <div className="sticky top-16 z-30 border-b border-border/80 bg-surface/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 print:hidden">
        <div className="mx-auto max-w-7xl flex items-center gap-1 overflow-x-auto py-2.5 no-scrollbar">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? tab.isHighlight
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                      : "bg-primary text-white shadow-md shadow-primary/25"
                    : tab.isHighlight
                    ? "text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 font-bold"
                    : "text-muted hover:text-foreground hover:bg-surface-muted"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-surface-muted text-muted"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <DashboardModule
            financials={financials}
            projects={projects}
            attentionItems={attentionItems}
            socialLeads={socialLeads}
            prospects={prospects}
            onSelectTab={setActiveTab}
            onResolveAttentionItem={resolveAttentionItem}
          />
        )}

        {activeTab === "chief_of_staff" && (
          <ChiefOfStaffModule
            financials={financials}
            projects={projects}
            attentionItems={attentionItems}
            socialLeads={socialLeads}
            prospects={prospects}
            subscriptions={subscriptions}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === "social_leads" && (
          <SocialLeadsModule
            leads={socialLeads}
            onUpdateStatus={updateLeadStatus}
            onUpdateReply={updateLeadSuggestedReply}
          />
        )}

        {activeTab === "prospector" && (
          <ProspectorModule
            prospects={prospects}
            onUpdateStatus={updateProspectStatus}
            onAddProspect={addProspect}
          />
        )}

        {activeTab === "vault" && (
          <ProofVaultModule
            vaultItems={proofVault}
            onAddVaultItem={addProofVaultItem}
          />
        )}

        {activeTab === "subscriptions" && (
          <SubscriptionManagerModule
            subscriptions={subscriptions}
            onUpdateSeats={updateSubscriptionSeats}
          />
        )}

        {activeTab === "audit" && (
          <AuditTrailModule
            auditLogs={auditLogs}
            employees={employees}
          />
        )}

        {activeTab === "briefing" && (
          <ExecutiveBriefingModule
            financials={financials}
            projects={projects}
            attentionItems={attentionItems}
            socialLeads={socialLeads}
            prospects={prospects}
            subscriptions={subscriptions}
          />
        )}
      </main>

      {/* Employee Switcher Modal Dialog */}
      <EmployeeSwitcherDialog
        open={isEmployeeSwitcherOpen}
        onOpenChange={setIsEmployeeSwitcherOpen}
        employees={employees}
        currentEmployee={currentEmployee}
        onSelectEmployee={setCurrentEmployee}
      />
    </div>
  );
}
