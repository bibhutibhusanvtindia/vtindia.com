"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Employee,
  FinancialMetrics,
  ProjectHealth,
  AttentionItem,
  SocialLead,
  ProspectItem,
  ProofVaultItem,
  SubscriptionItem,
  AuditLog,
  PipelineDeal,
  OutreachTemplate,
  DealStage,
} from "./types";
import {
  INITIAL_EMPLOYEES,
  INITIAL_FINANCIALS,
  INITIAL_PROJECTS,
  INITIAL_ATTENTION_ITEMS,
  INITIAL_SOCIAL_LEADS,
  INITIAL_PROSPECTS,
  INITIAL_PROOF_VAULT,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_PIPELINE_DEALS,
  INITIAL_OUTREACH_TEMPLATES,
} from "./initialData";

const STORAGE_KEYS = {
  AUTH_SESSION: "vt_admin_auth_session_v8_dynamic",
  CURRENT_USER: "vt_admin_current_user_v8_dynamic",
  FINANCIALS: "vt_admin_financials_v8_dynamic",
  PROJECTS: "vt_admin_projects_v8_dynamic",
  ATTENTION: "vt_admin_attention_v8_dynamic",
  LEADS: "vt_admin_leads_v8_dynamic",
  PROSPECTS: "vt_admin_prospects_v8_dynamic",
  VAULT: "vt_admin_vault_v8_dynamic",
  SUBSCRIPTIONS: "vt_admin_subscriptions_v8_dynamic",
  AUDIT_LOGS: "vt_admin_audit_logs_v8_dynamic",
  DEALS: "vt_admin_deals_v8_dynamic",
  ACTIVE_TAB: "vt_admin_active_tab_v8_dynamic",
  SIDEBAR_COLLAPSED: "vt_admin_sidebar_collapsed_v8_dynamic",
};

export function useAdminStore() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentEmployee, setCurrentEmployeeState] = useState<Employee>(INITIAL_EMPLOYEES[0]);
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [financials, setFinancials] = useState<FinancialMetrics>(INITIAL_FINANCIALS);
  const [projects, setProjects] = useState<ProjectHealth[]>(INITIAL_PROJECTS);
  const [attentionItems, setAttentionItems] = useState<AttentionItem[]>(INITIAL_ATTENTION_ITEMS);
  const [socialLeads, setSocialLeads] = useState<SocialLead[]>(INITIAL_SOCIAL_LEADS);
  const [prospects, setProspects] = useState<ProspectItem[]>(INITIAL_PROSPECTS);
  const [proofVault, setProofVault] = useState<ProofVaultItem[]>(INITIAL_PROOF_VAULT);
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(INITIAL_SUBSCRIPTIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [pipelineDeals, setPipelineDeals] = useState<PipelineDeal[]>(INITIAL_PIPELINE_DEALS);
  const [outreachTemplates, setOutreachTemplates] = useState<OutreachTemplate[]>(INITIAL_OUTREACH_TEMPLATES);
  const [activeTab, setActiveTabState] = useState<string>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsedState] = useState<boolean>(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const authSession = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
      if (authSession === "true") {
        setIsAuthenticated(true);
      }

      const savedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (savedUser) {
        const found = INITIAL_EMPLOYEES.find((e) => e.id === savedUser);
        if (found) setCurrentEmployeeState(found);
      }

      const savedTab = localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB);
      if (savedTab) setActiveTabState(savedTab);

      const savedCollapsed = localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED);
      if (savedCollapsed) setSidebarCollapsedState(savedCollapsed === "true");

      const savedFinancials = localStorage.getItem(STORAGE_KEYS.FINANCIALS);
      if (savedFinancials) setFinancials(JSON.parse(savedFinancials));

      const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (savedProjects) setProjects(JSON.parse(savedProjects));

      const savedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);
      if (savedLeads) setSocialLeads(JSON.parse(savedLeads));

      const savedProspects = localStorage.getItem(STORAGE_KEYS.PROSPECTS);
      if (savedProspects) setProspects(JSON.parse(savedProspects));

      const savedVault = localStorage.getItem(STORAGE_KEYS.VAULT);
      if (savedVault) setProofVault(JSON.parse(savedVault));

      const savedSubs = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTIONS);
      if (savedSubs) setSubscriptions(JSON.parse(savedSubs));

      const savedLogs = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (savedLogs) setAuditLogs(JSON.parse(savedLogs));

      const savedAttention = localStorage.getItem(STORAGE_KEYS.ATTENTION);
      if (savedAttention) setAttentionItems(JSON.parse(savedAttention));

      const savedDeals = localStorage.getItem(STORAGE_KEYS.DEALS);
      if (savedDeals) setPipelineDeals(JSON.parse(savedDeals));
    } catch {
      // fallback to initial data if parse fails
    }
    setIsHydrated(true);
  }, []);

  const addAuditLog = useCallback(
    (action: string, module: string, details: string, emp?: Employee) => {
      const actor = emp || currentEmployee;
      const newLog: AuditLog = {
        id: `log-${Date.now()}`,
        employeeId: actor.id,
        employeeName: actor.name,
        employeeRole: actor.role.toUpperCase(),
        action,
        module,
        details,
        timestamp: "Just now",
      };
      setAuditLogs((prev) => {
        const updated = [newLog, ...prev];
        try {
          localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(updated));
        } catch {}
        return updated;
      });
    },
    [currentEmployee]
  );

  const login = useCallback(
    (employeeId: string, pin: string): { success: boolean; error?: string } => {
      const emp = INITIAL_EMPLOYEES.find((e) => e.id === employeeId);
      if (!emp) {
        return { success: false, error: "Employee account not found." };
      }
      // PIN check (allows employee specific PIN or master passcode "2026")
      if (emp.pin !== pin && pin !== "2026") {
        return { success: false, error: "Invalid Security PIN. Please try again." };
      }

      setCurrentEmployeeState(emp);
      setIsAuthenticated(true);
      try {
        localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, "true");
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, emp.id);
      } catch {}

      addAuditLog("Signed In to Command Portal", "Authentication", `Employee ${emp.name} (${emp.title}) authenticated.`, emp);
      return { success: true };
    },
    [addAuditLog]
  );

  const logout = useCallback(() => {
    addAuditLog("Signed Out of Command Portal", "Authentication", `Employee ${currentEmployee.name} signed out.`);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    } catch {}
  }, [addAuditLog, currentEmployee]);

  const setActiveTab = useCallback((tab: string) => {
    setActiveTabState(tab);
    setMobileDrawerOpen(false);
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, tab);
    } catch {}
  }, []);

  const setSidebarCollapsed = useCallback((collapsed: boolean | ((prev: boolean) => boolean)) => {
    setSidebarCollapsedState((prev) => {
      const val = typeof collapsed === "function" ? collapsed(prev) : collapsed;
      try {
        localStorage.setItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, String(val));
      } catch {}
      return val;
    });
  }, []);

  const setCurrentEmployee = useCallback(
    (emp: Employee) => {
      setCurrentEmployeeState(emp);
      try {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, emp.id);
      } catch {}
      addAuditLog("Switched Active User Profile", "Authentication", `Switched to ${emp.name} (${emp.title})`);
    },
    [addAuditLog]
  );

  const updateLeadStatus = useCallback(
    (leadId: string, newStatus: SocialLead["status"]) => {
      setSocialLeads((prev) => {
        const updated = prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead));
        try {
          localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updated));
        } catch {}
        return updated;
      });
      addAuditLog("Updated Social Lead Status", "Social Lead Capture", `Lead #${leadId} moved to status '${newStatus}'`);
    },
    [addAuditLog]
  );

  const updateLeadSuggestedReply = useCallback(
    (leadId: string, reply: string) => {
      setSocialLeads((prev) => {
        const updated = prev.map((lead) => (lead.id === leadId ? { ...lead, suggestedReply: reply } : lead));
        try {
          localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updated));
        } catch {}
        return updated;
      });
    },
    []
  );

  const addSocialLead = useCallback(
    (lead: Omit<SocialLead, "id" | "timestamp">) => {
      const newLead: SocialLead = {
        ...lead,
        id: `lead-${Date.now()}`,
        timestamp: "Just now",
      };
      setSocialLeads((prev) => {
        const updated = [newLead, ...prev];
        try {
          localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updated));
        } catch {}
        return updated;
      });
      addAuditLog("Captured Inbound Lead", "Social Lead Capture", `Captured inquiry from ${newLead.senderName} (${newLead.platform})`);
    },
    [addAuditLog]
  );

  const updateProspectStatus = useCallback(
    (prospectId: string, newStatus: ProspectItem["status"]) => {
      setProspects((prev) => {
        const updated = prev.map((p) => (p.id === prospectId ? { ...p, status: newStatus } : p));
        try {
          localStorage.setItem(STORAGE_KEYS.PROSPECTS, JSON.stringify(updated));
        } catch {}
        return updated;
      });
      addAuditLog("Updated Prospect Status", "B2B Maps Prospector", `Prospect #${prospectId} status set to '${newStatus}'`);
    },
    [addAuditLog]
  );

  const addProspect = useCallback(
    (item: Omit<ProspectItem, "id">) => {
      const newItem: ProspectItem = {
        ...item,
        id: `prosp-${Date.now()}`,
      };
      setProspects((prev) => {
        const updated = [newItem, ...prev];
        try {
          localStorage.setItem(STORAGE_KEYS.PROSPECTS, JSON.stringify(updated));
        } catch {}
        return updated;
      });
      addAuditLog("Added New B2B Prospect", "B2B Maps Prospector", `Discovered ${newItem.companyName} in ${newItem.location}`);
    },
    [addAuditLog]
  );

  const deleteProspect = useCallback(
    (prospectId: string) => {
      setProspects((prev) => {
        const updated = prev.filter((p) => p.id !== prospectId);
        try {
          localStorage.setItem(STORAGE_KEYS.PROSPECTS, JSON.stringify(updated));
        } catch {}
        return updated;
      });
      addAuditLog("Deleted Prospect Record", "B2B Maps Prospector", `Removed prospect #${prospectId}`);
    },
    [addAuditLog]
  );

  const clearProspects = useCallback(() => {
    setProspects([]);
    try {
      localStorage.setItem(STORAGE_KEYS.PROSPECTS, JSON.stringify([]));
    } catch {}
    addAuditLog("Cleared All Prospect Records", "B2B Maps Prospector", "All discovered enterprise leads cleared.");
  }, [addAuditLog]);

  const addProofVaultItem = useCallback(
    (item: Omit<ProofVaultItem, "id" | "timestamp" | "uploadedBy" | "uploadedByRole">) => {
      const newItem: ProofVaultItem = {
        ...item,
        id: `vault-${Date.now()}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
        uploadedBy: currentEmployee.name,
        uploadedByRole: currentEmployee.title,
      };
      setProofVault((prev) => {
        const updated = [newItem, ...prev];
        try {
          localStorage.setItem(STORAGE_KEYS.VAULT, JSON.stringify(updated));
        } catch {}
        return updated;
      });
      addAuditLog("Uploaded Discussion Proof", "Proof Vault", `Added proof record for deal: ${newItem.dealTitle}`);
    },
    [currentEmployee, addAuditLog]
  );

  const updateSubscriptionSeats = useCallback(
    (subId: string, seatCount: number, activeSeats: number) => {
      setSubscriptions((prev) => {
        const updated = prev.map((s) => (s.id === subId ? { ...s, seatCount, activeSeats } : s));
        try {
          localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(updated));
        } catch {}
        return updated;
      });
      addAuditLog("Optimized Subscription Seats", "Subscription Manager", `Subscription #${subId} updated to ${seatCount} seats (${activeSeats} active)`);
    },
    [addAuditLog]
  );

  const resolveAttentionItem = useCallback(
    (itemId: string) => {
      setAttentionItems((prev) => {
        const updated = prev.filter((item) => item.id !== itemId);
        try {
          localStorage.setItem(STORAGE_KEYS.ATTENTION, JSON.stringify(updated));
        } catch {}
        return updated;
      });
      addAuditLog("Resolved Attention Item", "AI Attention Matrix", `Marked item #${itemId} as resolved`);
    },
    [addAuditLog]
  );

  const updateDealStage = useCallback(
    (dealId: string, newStage: DealStage) => {
      setPipelineDeals((prev) => {
        const updated = prev.map((d) => (d.id === dealId ? { ...d, stage: newStage, lastActivity: "Just now" } : d));
        try {
          localStorage.setItem(STORAGE_KEYS.DEALS, JSON.stringify(updated));
        } catch {}
        return updated;
      });
      addAuditLog("Updated Deal Pipeline Stage", "Deal Matrix", `Moved deal #${dealId} to stage '${newStage}'`);
    },
    [addAuditLog]
  );

  const addDeal = useCallback(
    (deal: Omit<PipelineDeal, "id" | "lastActivity">) => {
      const newDeal: PipelineDeal = {
        ...deal,
        id: `deal-${Date.now()}`,
        lastActivity: "Just now",
      };
      setPipelineDeals((prev) => {
        const updated = [newDeal, ...prev];
        try {
          localStorage.setItem(STORAGE_KEYS.DEALS, JSON.stringify(updated));
        } catch {}
        return updated;
      });
      addAuditLog("Created New Pipeline Deal", "Deal Matrix", `Added ${newDeal.title} (${newDeal.company})`);
    },
    [addAuditLog]
  );

  const deleteDeal = useCallback(
    (dealId: string) => {
      setPipelineDeals((prev) => {
        const target = prev.find((d) => d.id === dealId);
        const updated = prev.filter((d) => d.id !== dealId);
        try {
          localStorage.setItem(STORAGE_KEYS.DEALS, JSON.stringify(updated));
        } catch {}
        if (target) {
          addAuditLog("Deleted Pipeline Deal", "Deal Matrix", `Removed deal ${target.title} (${target.company})`);
        }
        return updated;
      });
    },
    [addAuditLog]
  );

  const exportDataSnapshot = useCallback(() => {
    const snapshot = {
      timestamp: new Date().toISOString(),
      version: "6.0",
      company: "Virtoy Technologies Private Limited",
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
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `virtoy-command-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addAuditLog("Exported Enterprise Backup", "System Administration", "Full workspace JSON backup snapshot downloaded.");
  }, [
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
    addAuditLog,
  ]);

  const resetToDefaultData = useCallback(() => {
    try {
      localStorage.clear();
    } catch {}
    setCurrentEmployeeState(INITIAL_EMPLOYEES[0]);
    setFinancials(INITIAL_FINANCIALS);
    setProjects(INITIAL_PROJECTS);
    setAttentionItems(INITIAL_ATTENTION_ITEMS);
    setSocialLeads(INITIAL_SOCIAL_LEADS);
    setProspects(INITIAL_PROSPECTS);
    setProofVault(INITIAL_PROOF_VAULT);
    setSubscriptions(INITIAL_SUBSCRIPTIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setPipelineDeals(INITIAL_PIPELINE_DEALS);
    setOutreachTemplates(INITIAL_OUTREACH_TEMPLATES);
    setActiveTabState("dashboard");
    addAuditLog("Reset Store Data", "System Administration", "Workspace records refreshed to clean baseline.");
  }, [addAuditLog]);

  return {
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
    addAuditLog,
    resetToDefaultData,
  };
}
