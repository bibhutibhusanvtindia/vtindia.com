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
  CURRENT_USER: "vt_admin_current_user_v3",
  FINANCIALS: "vt_admin_financials_v3",
  PROJECTS: "vt_admin_projects_v3",
  ATTENTION: "vt_admin_attention_v3",
  LEADS: "vt_admin_leads_v3",
  PROSPECTS: "vt_admin_prospects_v3",
  VAULT: "vt_admin_vault_v3",
  SUBSCRIPTIONS: "vt_admin_subscriptions_v3",
  AUDIT_LOGS: "vt_admin_audit_logs_v3",
  DEALS: "vt_admin_deals_v3",
  ACTIVE_TAB: "vt_admin_active_tab_v3",
  SIDEBAR_COLLAPSED: "vt_admin_sidebar_collapsed_v3",
};

export function useAdminStore() {
  const [isHydrated, setIsHydrated] = useState(false);
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
      const savedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (savedUser) {
        const found = INITIAL_EMPLOYEES.find((e) => e.id === savedUser);
        if (found) setCurrentEmployeeState(found);
      }

      const savedTab = localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB);
      if (savedTab) setActiveTabState(savedTab);

      const savedCollapsed = localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED);
      if (savedCollapsed) setSidebarCollapsedState(savedCollapsed === "true");

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

  const addAuditLog = useCallback(
    (action: string, module: string, details: string) => {
      const newLog: AuditLog = {
        id: `log-${Date.now()}`,
        employeeId: currentEmployee.id,
        employeeName: currentEmployee.name,
        employeeRole: currentEmployee.role.toUpperCase(),
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

  const setCurrentEmployee = useCallback(
    (emp: Employee) => {
      setCurrentEmployeeState(emp);
      try {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, emp.id);
      } catch {}
      addAuditLog("Switched Active User Profile", "Authentication", `Logged in as ${emp.name} (${emp.title})`);
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

  const resetToDefaultData = useCallback(() => {
    localStorage.clear();
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
    addAuditLog("Reset Store Data", "System Administration", "Restored all initial seed records.");
  }, [addAuditLog]);

  return {
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
    pipelineDeals,
    outreachTemplates,
    activeTab,
    sidebarCollapsed,
    mobileDrawerOpen,
    setActiveTab,
    setSidebarCollapsed,
    setMobileDrawerOpen,
    setCurrentEmployee,
    updateLeadStatus,
    updateLeadSuggestedReply,
    updateProspectStatus,
    addProspect,
    addProofVaultItem,
    updateSubscriptionSeats,
    resolveAttentionItem,
    updateDealStage,
    addDeal,
    addAuditLog,
    resetToDefaultData,
  };
}
