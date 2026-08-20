import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, BarChart as BarChartIcon, CircleDot, Globe2, Sparkles } from "lucide-react";
import { supabase, SUPABASE_URL, SUPABASE_KEY } from "@/lib/supabase";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const statusClasses: Record<string, string> = {
  new: "bg-sky-100 text-sky-700",
  contacted: "bg-orange-100 text-orange-700",
  converted: "bg-emerald-100 text-emerald-700",
  "follow-up": "bg-violet-100 text-violet-700",
  lost: "bg-rose-100 text-rose-700",
};

const colorPalette = ["#2563EB", "#7C3AED", "#F97316", "#14B8A6", "#DB2777", "#0EA5E9", "#22C55E", "#F59E0B"];

type Lead = {
  id?: number | string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  interested_country?: string | null;
  service?: string | null;
  status?: string | null;
  created_at?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "KITE International Admin Dashboard" },
      { name: "description", content: "Admin dashboard for Kite International leads and analytics." },
      { property: "og:title", content: "KITE International Admin Dashboard" },
      { property: "og:description", content: "View leads, analytics, and conversion statistics for Kite International." },
    ],
  }),
  component: AdminRoute,
});

function AdminRoute() {
  // eslint-disable-next-line no-console
  console.error("[admin] component mounted");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<any | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [updatingLeadId, setUpdatingLeadId] = useState<string | number | null>(null);
  const [statusUpdateError, setStatusUpdateError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // Check Supabase auth session. Redirect to OAuth sign-in if unauthenticated.
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const sess = data?.session ?? null;
        if (!mounted) return;
        if (!sess) {
          // No session — show email/password login overlay instead of redirecting to OAuth
          setShowLogin(true);
        } else {
          setSession(sess);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[admin] auth check failed:", err);
      } finally {
        setAuthChecked(true);
      }
    })();

    const { data: { subscription } = {} as any } = supabase.auth.onAuthStateChange((_, newSession) => {
      setSession(newSession ?? null);
      if (newSession) setShowLogin(false);
    });

    return () => {
      mounted = false;
      try {
        subscription?.unsubscribe?.();
      } catch {}
    };
  }, []);

  // Only run lead-fetching logic after auth check completes and a session exists
  useEffect(() => {
    if (!authChecked) return;
    if (!session) return;
    let isActive = true;
    setIsLoading(true);
    setError(null);

    async function fetchLeads() {
      try {
        // Log current auth session and user for debugging
        let sessionResp: any = null;
        try {
          sessionResp = await supabase.auth.getSession();
            // eslint-disable-next-line no-console
            console.error("[admin] auth.getSession:", sessionResp);
          // eslint-disable-next-line no-console
          console.error("[admin] session check", session?.user?.id);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error("[admin] auth.getSession failed:", e);
        }

        const uid = sessionResp?.data?.session?.user?.id ?? session?.user?.id ?? null;
        // eslint-disable-next-line no-console
        console.error("[admin] before fetchLeads - user:", uid);
        // Request exact count along with rows for debugging
        const result = await supabase
          .from<Lead>("leads")
          .select(
            "id, first_name, last_name, email, phone, interested_country, service, status, created_at, city, state, country",
            { count: "exact" }
          )
          .order("created_at", { ascending: false });

        // Log the full result for diagnosis
        // eslint-disable-next-line no-console
        console.error("[admin] fetchLeads result:", result);

        if (!isActive) return;

        const { data, error, count } = result as {
          data: Lead[] | null;
          error: any;
          count: number | null;
        };

        if (error) {
          // eslint-disable-next-line no-console
          console.error("[admin] supabase error fetching leads:", {
            code: error?.code ?? null,
            message: error?.message ?? null,
            details: error?.details ?? null,
            hint: error?.hint ?? null,
            fullError: error,
          });
          setError(error.message || "Unable to load leads.");
          setLeads([]);
          return;
        }

        const rows = Array.isArray(data) ? data : [];
        // eslint-disable-next-line no-console
        console.error(`[admin] fetched leads count (rows.length): ${rows.length}`, { rowsCount: rows.length, reportedCount: count });
        // eslint-disable-next-line no-console
        console.error("[admin] after fetchLeads - user:", uid, "rows:", rows.length, "error:", error, "reportedCount:", count);

        setLeads(rows);

        // If supabase client returned zero rows, attempt a direct REST fetch for debugging
        if (rows.length === 0) {
          (async () => {
            try {
              // eslint-disable-next-line no-console
              console.error("[admin] rows empty — attempting REST debug fetch to Supabase REST endpoint using session token if available");
              const sess = (await supabase.auth.getSession()).data?.session ?? null;
              const bearer = sess?.access_token ?? SUPABASE_KEY ?? "";
              const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=*`, {
                headers: {
                  apikey: SUPABASE_KEY ?? "",
                  Authorization: `Bearer ${bearer}`,
                  Accept: "application/json",
                },
              });

              const text = await res.text();
              // eslint-disable-next-line no-console
              console.error("[admin] REST fallback status/body:", {
                status: res.status,
                statusText: res.statusText,
                ok: res.ok,
                body: text.slice(0, 2000),
              });
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error("[admin] REST debug fetch failed:", err);
            }
          })();
        }
      } catch (fetchError) {
        if (!isActive) return;
        // eslint-disable-next-line no-console
        console.error("[admin] unexpected fetch error:", fetchError);
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load leads. Please try again."
        );
        setLeads([]);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    fetchLeads();

    const handleVisibilityChange = () => {
      if (!isActive || document.visibilityState !== "visible") return;
      setIsLoading(true);
      setError(null);
      fetchLeads();
    };

    window.addEventListener("focus", handleVisibilityChange);

    const leadId = (lead: Partial<Lead> | null | undefined) => {
      if (lead?.id == null) return null;
      return String(lead.id);
    };

    const sortLeadsByNewest = (list: Lead[]) =>
      [...list].sort((a, b) => {
        const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
        const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
        return bTime - aTime;
      });

    const channel = supabase
      .channel("leads_live_updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "leads" },
        (payload) => {
          // eslint-disable-next-line no-console
          console.error("[admin] realtime payload:", payload);
          if (!isActive) return;

          const newLead = payload.new as Lead | null;
          const oldLead = payload.old as Lead | null;

          setLeads((currentLeads) => {
            const normalizedOldId = leadId(oldLead);
            const normalizedNewId = leadId(newLead);

            switch (payload.eventType) {
              case "INSERT": {
                if (!newLead) return currentLeads;
                const nextLeads = [...currentLeads];
                const existingIndex = nextLeads.findIndex((lead) => leadId(lead) === normalizedNewId);

                if (existingIndex >= 0) {
                  nextLeads[existingIndex] = { ...nextLeads[existingIndex], ...newLead };
                } else {
                  nextLeads.unshift(newLead);
                }

                return sortLeadsByNewest(nextLeads);
              }
              case "UPDATE": {
                if (!normalizedNewId) return currentLeads;
                const nextLeads = currentLeads.map((lead) =>
                  leadId(lead) === normalizedNewId ? { ...lead, ...newLead } : lead
                );
                return sortLeadsByNewest(nextLeads);
              }
              case "DELETE": {
                if (!normalizedOldId) return currentLeads;
                return currentLeads.filter((lead) => leadId(lead) !== normalizedOldId);
              }
              default:
                return currentLeads;
            }
          });
        }
      );

    channel.subscribe((status) => {
      // eslint-disable-next-line no-console
      console.error("[admin] realtime subscription status:", status);
    });

    return () => {
      isActive = false;
      window.removeEventListener("focus", handleVisibilityChange);
      channel.unsubscribe();
    };
  }, [authChecked, session]);

  async function handleEmailSignIn(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      const res = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
      if (res.error) {
        setLoginError(res.error.message || "Sign-in failed");
        return;
      }
      // On success, onAuthStateChange will set session and close the login overlay
    } catch (err: any) {
      setLoginError(err?.message || "Sign-in failed");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleStatusChange(leadId: string | number | undefined, newStatus: string) {
    if (!leadId) return;
    setStatusUpdateError(null);
    setUpdatingLeadId(leadId);
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", leadId);

      if (error) {
        // eslint-disable-next-line no-console
        console.error("[admin] status update error:", error);
        const errorMsg = error.message || error.hint || "Failed to update status. Please check the Supabase RLS policies.";
        setStatusUpdateError(`Error: ${errorMsg}`);
        // Auto-clear error after 8 seconds
        setTimeout(() => setStatusUpdateError(null), 8000);
        return;
      }
      // On success, realtime subscription will update the UI and recalculate metrics
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error("[admin] status update exception:", err);
      const errorMsg = err?.message || "Unknown error occurred";
      setStatusUpdateError(`Error: ${errorMsg}`);
      // Auto-clear error after 8 seconds
      setTimeout(() => setStatusUpdateError(null), 8000);
    } finally {
      setUpdatingLeadId(null);
    }
  }

  const safeString = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  const safeDate = (value: unknown) => {
    if (typeof value !== "string") return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const summary = useMemo(() => {
    const allLeads = leads;
    const total = allLeads.length;
    const newLeads = allLeads.filter((lead) => safeString(lead.status).toLowerCase() === "new").length;
    const contactedLeads = allLeads.filter((lead) => safeString(lead.status).toLowerCase() === "contacted").length;
    const convertedLeads = allLeads.filter((lead) => safeString(lead.status).toLowerCase() === "converted").length;
    const conversionRate = total > 0 ? Math.round((convertedLeads / total) * 100) : 0;

    return { total, newLeads, contactedLeads, convertedLeads, conversionRate };
  }, [leads]);

  const timeSummary = useMemo(() => {
    const allLeads = leads;
    const now = new Date();
    const todayKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    const thisMonthKey = `${now.getFullYear()}-${now.getMonth()}`;
    const thisYear = now.getFullYear();

    let leadsToday = 0;
    let leadsMonth = 0;
    let leadsYear = 0;

    for (const lead of allLeads) {
      const createdAt = safeDate(lead.created_at);
      if (!createdAt) continue;

      const createdKey = `${createdAt.getFullYear()}-${createdAt.getMonth()}-${createdAt.getDate()}`;
      const createdMonthKey = `${createdAt.getFullYear()}-${createdAt.getMonth()}`;

      if (createdKey === todayKey) leadsToday += 1;
      if (createdMonthKey === thisMonthKey) leadsMonth += 1;
      if (createdAt.getFullYear() === thisYear) leadsYear += 1;
    }

    return { leadsToday, leadsMonth, leadsYear };
  }, [leads]);

  const countryAnalytics = useMemo(() => {
    const counts = new Map<string, number>();
    leads.forEach((lead) => {
      const country = safeString(lead.interested_country) || "Unknown";
      counts.set(country, (counts.get(country) ?? 0) + 1);
    });

    return [...counts.entries()]
      .map(([country, value]) => ({ country, value }))
      .sort((a, b) => b.value - a.value);
  }, [leads]);

  const monthlyAnalytics = useMemo(() => {
    const monthCounts = new Array(12).fill(0);
    const year = new Date().getFullYear();

    leads.forEach((lead) => {
      const createdAt = safeDate(lead.created_at);
      if (!createdAt || createdAt.getFullYear() !== year) return;
      monthCounts[createdAt.getMonth()] += 1;
    });

    return monthCounts.map((value, index) => ({ month: MONTH_LABELS[index], value }));
  }, [leads]);

  const serviceAnalytics = useMemo(() => {
    const counts = new Map<string, number>();
    leads.forEach((lead) => {
      const service = safeString(lead.service) || "Unknown";
      counts.set(service, (counts.get(service) ?? 0) + 1);
    });

    return [...counts.entries()]
      .map(([service, value]) => ({ service, value }))
      .sort((a, b) => b.value - a.value);
  }, [leads]);

  const recentLeads = useMemo(() => {
    return (leads ?? []).slice(0, 10);
  }, [leads]);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      {authChecked && !session && showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">Admin sign in</h2>
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
              {loginError && <p className="text-sm text-rose-600">{loginError}</p>}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="rounded-md bg-sky-600 px-4 py-2 text-white disabled:opacity-50"
                >
                  {loginLoading ? "Signing in…" : "Sign in"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="text-sm text-slate-600 underline"
                >
                  Cancel
                </button>
              </div>
            </form>
            <p className="mt-3 text-xs text-slate-500">You will be returned to this dashboard after signing in.</p>
          </div>
        </div>
      )}
      <div className="container-page space-y-8">
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-8 py-10 text-white shadow-2xl shadow-slate-900/20 ring-1 ring-white/10">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr] lg:items-end">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">KITE International</p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Admin Dashboard</h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300">
                View live lead insights, conversion performance, and enquiry trends for the KITE
                International pipeline.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-slate-800/90 p-5 shadow-lg shadow-slate-900/30 ring-1 ring-white/10">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Status</p>
                <p className="mt-4 text-3xl font-semibold">Read-only</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-800/90 p-5 shadow-lg shadow-slate-900/30 ring-1 ring-white/10">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Source</p>
                <p className="mt-4 text-3xl font-semibold">public.leads</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            {renderStatCard("Total Leads", summary.total, BarChartIcon, "from-sky-500 to-cyan-500")}
            {renderStatCard("New Leads", summary.newLeads, Sparkles, "from-violet-500 to-fuchsia-500")}
            {renderStatCard("Contacted Leads", summary.contactedLeads, Activity, "from-orange-500 to-amber-500")}
            {renderStatCard("Converted Leads", summary.convertedLeads, CircleDot, "from-emerald-500 to-teal-500")}
            {renderStatCard("Conversion Rate", `${summary.conversionRate}%`, Globe2, "from-rose-500 to-pink-500")}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {renderTimeCard("Leads Today", timeSummary.leadsToday, "from-cyan-500 to-sky-500")}
            {renderTimeCard("Leads This Month", timeSummary.leadsMonth, "from-indigo-500 to-violet-500")}
            {renderTimeCard("Leads This Year", timeSummary.leadsYear, "from-teal-500 to-emerald-500")}
          </div>
        </section>

        {isLoading ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-10 text-center text-slate-700 shadow-xl shadow-slate-900/5">
            Loading dashboard data...
          </div>
        ) : error ? (
          <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-10 text-center text-rose-700 shadow-xl shadow-rose-200/20">
            <p className="font-semibold">Unable to load admin data</p>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Country analytics</p>
                    <p className="mt-1 text-sm text-slate-500">Leads by interested country.</p>
                  </div>
                </div>
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={countryAnalytics} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="country" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={60} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#6366F1">
                        {countryAnalytics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Monthly analytics</p>
                    <p className="mt-1 text-sm text-slate-500">Leads created this year, month by month.</p>
                  </div>
                </div>
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyAnalytics} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#22C55E" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Service analytics</p>
                    <p className="mt-1 text-sm text-slate-500">Leads categorized by service.</p>
                  </div>
                </div>
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip />
                      <Pie
                        data={serviceAnalytics}
                        dataKey="value"
                        nameKey="service"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        fill="#6366F1"
                        label={(entry) => `${entry.service}: ${entry.value}`}
                      >
                        {serviceAnalytics.map((entry, index) => (
                          <Cell key={`slice-${index}`} fill={colorPalette[index % colorPalette.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
                <div className="mb-5">
                  <p className="text-sm font-medium text-slate-900">Recent leads</p>
                  <p className="mt-1 text-sm text-slate-500">Most recent enquiries from the leads table.</p>
                </div>
                {statusUpdateError && (
                  <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                    {statusUpdateError}
                  </div>
                )}
                {recentLeads.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                    No recent leads available.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                      <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.16em] text-slate-500">
                        <tr>
                          <th className="px-3 py-3">Name</th>
                          <th className="px-3 py-3">Email</th>
                          <th className="px-3 py-3">Phone</th>
                          <th className="px-3 py-3">Interested Country</th>
                          <th className="px-3 py-3">Service</th>
                          <th className="px-3 py-3">Status</th>
                          <th className="px-3 py-3">Created</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {recentLeads.map((lead, index) => (
                          <tr key={`${lead.id ?? index}-${lead.email ?? index}`}>
                            <td className="whitespace-nowrap px-3 py-4 text-slate-900">
                              {[lead.first_name, lead.last_name].filter(Boolean).join(" ") || "—"}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-slate-700">{lead.email ?? "—"}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-slate-700">{lead.phone ?? "—"}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-slate-700">
                              {lead.interested_country ?? "—"}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-slate-700">{lead.service ?? "—"}</td>
                            <td className="whitespace-nowrap px-3 py-4">
                              <div className="relative group">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.currentTarget.nextElementSibling?.classList.toggle("hidden");
                                  }}
                                  disabled={updatingLeadId === lead.id}
                                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold cursor-pointer transition-opacity ${
                                    updatingLeadId === lead.id ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
                                  } ${
                                    statusClasses[String(lead.status ?? "").toLowerCase()] ??
                                    "bg-slate-100 text-slate-700"
                                  }`}
                                >
                                  {updatingLeadId === lead.id ? "Updating..." : safeString(lead.status) || "Unknown"}
                                </button>
                                <div className="hidden absolute top-full mt-1 left-0 z-10 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-max">
                                  {["New", "Contacted", "Follow-up", "Converted", "Lost"].map((status) => (
                                    <button
                                      key={status}
                                      type="button"
                                      onClick={(e) => {
                                        e.currentTarget.closest(".group")?.querySelector("button:first-child")?.click();
                                        handleStatusChange(lead.id, status);
                                      }}
                                      disabled={updatingLeadId === lead.id}
                                      className={`block w-full text-left px-3 py-2 text-xs hover:bg-slate-50 transition-colors disabled:opacity-50 ${
                                        String(lead.status ?? "").toLowerCase() === status.toLowerCase()
                                          ? "font-semibold text-sky-700 bg-sky-50"
                                          : "text-slate-700"
                                      }`}
                                    >
                                      {status}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-slate-500">
                              {lead.created_at ? formatDate(lead.created_at) : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function renderStatCard(title: string, value: number | string, Icon: typeof BarChartIcon, gradient: string) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{title}</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
        </div>
        <div className={`grid h-14 w-14 place-items-center rounded-3xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function renderTimeCard(title: string, value: number, gradient: string) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{title}</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
        </div>
        <div className={`rounded-3xl px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white bg-gradient-to-br ${gradient}`}>
          Live
        </div>
      </div>
    </div>
  );
}

function formatDate(value: unknown) {
  if (typeof value !== "string") return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
