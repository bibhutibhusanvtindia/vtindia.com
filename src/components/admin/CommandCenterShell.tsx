"use client";

import * as React from "react";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminTopBar } from "@/components/admin/layout/AdminTopBar";
import { AdminSignIn } from "@/components/admin/auth/AdminSignIn";
import { EmployeeSwitcherDialog } from "@/components/admin/EmployeeSwitcherDialog";
import { DashboardModule } from "@/components/admin/modules/DashboardModule";
import { ChiefOfStaffModule } from "@/components/admin/modules/ChiefOfStaffModule";
import { SocialLeadsModule } from "@/components/admin/modules/SocialLeadsModule";
import { ProspectorModule } from "@/components/admin/modules/ProspectorModule";
import { PipelineDealMatrixModule } from "@/components/admin/modules/PipelineDealMatrixModule";
import { ColdOutreachStudioModule } from "@/components/admin/modules/ColdOutreachStudioModule";
import { ProofVaultModule } from "@/components/admin/modules/ProofVaultModule";
import { SubscriptionManagerModule } from "@/components/admin/modules/SubscriptionManagerModule";
import { AuditTrailModule } from "@/components/admin/modules/AuditTrailModule";
import { ExecutiveBriefingModule } from "@/components/admin/modules/ExecutiveBriefingModule";
import { useAdminStore } from "@/data/admin/store";
import { cn } from "@/lib/utils";

export function CommandCenterShell() {
  const [isEmployeeSwitcherOpen, setIsEmployeeSwitcherOpen] = React.useState<boolean>(false);

  const {
    isHydrated,
    isAuthenticated,
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
    pipelineDeals,
    outreachTemplates,
    activeTab,
    sidebarCollapsed,
    mobileDrawerOpen,
    login,
    logout,
    setActiveTab,
    setSidebarCollapsed,
    setMobileDrawerOpen,
    setCurrentEmployee,
    updateLeadStatus,
    updateLeadSuggestedReply,
    addSocialLead,
    updateProspectStatus,
    addProspect,
    deleteProspect,
    clearProspects,
    addProofVaultItem,
    updateSubscriptionSeats,
    resolveAttentionItem,
    updateDealStage,
    addDeal,
    deleteDeal,
    exportDataSnapshot,
    resetToDefaultData,
  } = useAdminStore();

  // Keyboard shortcut: Ctrl + B to toggle sidebar
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarCollapsed((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSidebarCollapsed]);

  const handleLogout = () => {
    logout();
  };

  // If not hydrated on client yet, show a clean loading screen
  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF8FA]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-200 border-t-[#F0186C]" />
          <p className="text-xs font-mono font-bold text-[#D6135F] tracking-wide">
            Initializing Virtoy Command Systems...
          </p>
        </div>
      </div>
    );
  }

  // If not authenticated, render the secure Sign In gate
  if (!isAuthenticated) {
    return <AdminSignIn employees={employees} onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-[#FCF9FA] bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(240,24,108,0.05),rgba(255,255,255,0))] text-slate-900 selection:bg-[#F0186C] selection:text-white flex antialiased">
      {/* 1. Left Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        currentEmployee={currentEmployee}
        onOpenEmployeeSwitcher={() => setIsEmployeeSwitcherOpen(true)}
        mobileOpen={mobileDrawerOpen}
        onCloseMobile={() => setMobileDrawerOpen(false)}
        onLogout={handleLogout}
        attentionCount={attentionItems.length}
        leadsCount={socialLeads.length}
        dealsCount={pipelineDeals.length}
        dealsTotal={pipelineDeals.reduce((sum, d) => sum + d.dealValue, 0)}
        vaultCount={proofVault.length}
      />

      {/* 2. Main Content Container */}
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-72"
        )}
      >
        {/* Sticky Admin Top Bar */}
        <AdminTopBar
          onOpenMobileSidebar={() => setMobileDrawerOpen(true)}
          currentEmployee={currentEmployee}
          onOpenEmployeeSwitcher={() => setIsEmployeeSwitcherOpen(true)}
          attentionItems={attentionItems}
          onSelectTab={setActiveTab}
          onResolveAttentionItem={resolveAttentionItem}
          onResetData={resetToDefaultData}
          onExportData={exportDataSnapshot}
          onLogout={handleLogout}
        />

        {/* Dynamic Module Viewport */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto">
          {activeTab === "dashboard" && (
            <DashboardModule
              financials={financials}
              projects={projects}
              attentionItems={attentionItems}
              socialLeads={socialLeads}
              prospects={prospects}
              deals={pipelineDeals}
              subscriptions={subscriptions}
              onSelectTab={setActiveTab}
              onResolveAttentionItem={resolveAttentionItem}
            />
          )}

          {activeTab === "chief-of-staff" && (
            <ChiefOfStaffModule
              financials={financials}
              projects={projects}
              attentionItems={attentionItems}
              socialLeads={socialLeads}
              prospects={prospects}
              subscriptions={subscriptions}
              deals={pipelineDeals}
              onSelectTab={setActiveTab}
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
              deals={pipelineDeals}
            />
          )}

          {activeTab === "social-leads" && (
            <SocialLeadsModule
              leads={socialLeads}
              onUpdateStatus={updateLeadStatus}
              onUpdateReply={updateLeadSuggestedReply}
              onAddLead={addSocialLead}
              onAddDeal={addDeal}
              onSelectTab={setActiveTab}
            />
          )}

          {activeTab === "prospector" && (
            <ProspectorModule
              prospects={prospects}
              onUpdateStatus={updateProspectStatus}
              onAddProspect={addProspect}
              onDeleteProspect={deleteProspect}
              onClearProspects={clearProspects}
              onAddDeal={addDeal}
              onSelectTab={setActiveTab}
            />
          )}

          {activeTab === "deals" && (
            <PipelineDealMatrixModule
              deals={pipelineDeals}
              onUpdateDealStage={updateDealStage}
              onAddDeal={addDeal}
              onDeleteDeal={deleteDeal}
            />
          )}

          {activeTab === "cold-outreach" && (
            <ColdOutreachStudioModule
              templates={outreachTemplates}
              prospects={prospects}
            />
          )}

          {activeTab === "proof-vault" && (
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

          {activeTab === "audit-trail" && (
            <AuditTrailModule
              auditLogs={auditLogs}
              employees={employees}
            />
          )}
        </main>
      </div>

      {/* Employee Role Switcher Dialog */}
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
