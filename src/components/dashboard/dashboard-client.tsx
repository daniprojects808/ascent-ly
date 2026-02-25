"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "../../../supabase/client";
import {
  Plus,
  Search,
  LayoutGrid,
  Briefcase,
  Target,
  CheckCircle2,
  Trophy,
  X,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MetricCard from "./metric-card";
import KanbanColumn from "./kanban-column";
import AddApplicationDialog from "./add-application-dialog";
import { ApplicationModal } from "./application-modal";
import CollapsibleSidebar from "./collapsible-sidebar";
import type { Application } from "@/types/application";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";

const FILTER_OPTIONS = {
  workType: [
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "onsite", label: "On-site" },
  ],
  experience: [
    { value: "entry", label: "Entry" },
    { value: "mid", label: "Mid" },
    { value: "senior", label: "Senior" },
    { value: "lead", label: "Lead" },
  ],
};

export default function DashboardClient({ 
  userId, 
  userEmail, 
  userName 
}: { 
  userId: string; 
  userEmail?: string; 
  userName?: string; 
}) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    workType: string[];
    experience: string[];
  }>({
    workType: [],
    experience: [],
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const supabase = createClient();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    const { data } = await supabase
      .from("applications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) setApplications(data);
    setLoading(false);
  }

  // Filter applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      // Favorites filter
      if (showFavoritesOnly && !app.is_favorited) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          app.company_name.toLowerCase().includes(query) ||
          app.position_title.toLowerCase().includes(query) ||
          (app.location && app.location.toLowerCase().includes(query)) ||
          (app.industry && app.industry.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Work type filter
      if (
        activeFilters.workType.length > 0 &&
        (!app.work_type || !activeFilters.workType.includes(app.work_type))
      ) {
        return false;
      }

      // Experience filter
      if (
        activeFilters.experience.length > 0 &&
        (!app.experience_level ||
          !activeFilters.experience.includes(app.experience_level))
      ) {
        return false;
      }

      return true;
    });
  }, [applications, searchQuery, activeFilters, showFavoritesOnly]);

  const notStarted = filteredApplications.filter(
    (a) => a.status === "not_started"
  );
  const inProgress = filteredApplications.filter(
    (a) => a.status === "in_progress"
  );
  const completed = filteredApplications.filter(
    (a) => a.status === "completed"
  );

  function toggleFilter(type: "workType" | "experience", value: string) {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  }

  function clearFilters() {
    setActiveFilters({ workType: [], experience: [] });
    setSearchQuery("");
    setShowFavoritesOnly(false);
  }

  const hasActiveFilters =
    searchQuery ||
    activeFilters.workType.length > 0 ||
    activeFilters.experience.length > 0 ||
    showFavoritesOnly;

  async function handleStatusChange(id: string, newStatus: string) {
    await supabase
      .from("applications")
      .update({ status: newStatus })
      .eq("id", id);

    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  }

  async function handleAddApplication(data: Partial<Application>) {
    const { data: newApp, error } = await supabase
      .from("applications")
      .insert([{ ...data, user_id: userId }])
      .select()
      .single();

    if (error) {
      console.error("Error adding application:", error);
      throw error;
    }

    if (newApp) {
      setApplications((prev) => [newApp, ...prev]);
    }
  }

  async function handleToggleFavorite(id: string) {
    const app = applications.find((a) => a.id === id);
    if (!app) return;

    const newFavoritedState = !app.is_favorited;

    await supabase
      .from("applications")
      .update({ is_favorited: newFavoritedState })
      .eq("id", id);

    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, is_favorited: newFavoritedState } : a))
    );
  }

  async function handleDelete(id: string) {
    await supabase
      .from("applications")
      .delete()
      .eq("id", id);

    setApplications((prev) => prev.filter((a) => a.id !== id));
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const draggedAppId = active.id as string;
    const targetColumn = over.id as string;

    // Check if dropped on a column
    if (["not_started", "in_progress", "completed"].includes(targetColumn)) {
      const app = applications.find((a) => a.id === draggedAppId);
      if (app && app.status !== targetColumn) {
        handleStatusChange(draggedAppId, targetColumn);
      }
    }
  }

  const activeApplication = activeId
    ? applications.find((a) => a.id === activeId)
    : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-[#1a1d24] dark:to-[#12141a]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-700" />
            <div className="absolute inset-0 rounded-full border-2 border-blue-600 dark:border-cyan-400 border-t-transparent animate-spin" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Loading your applications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#1a1d24] dark:to-[#12141a]">
      <CollapsibleSidebar userEmail={userEmail} userName={userName} />
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LayoutGrid className="w-4 h-4 text-blue-600/60 dark:text-cyan-400/60" />
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-medium">
                Dashboard
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-[#f5f1e8]">
              Application Tracker
            </h1>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white text-sm h-11 px-6 transition-all duration-200 hover:shadow-lg gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Application
          </Button>
        </div>

        {/* Bento Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <MetricCard
            label="Total"
            value={applications.length}
            color="#1f2937"
            icon={<Briefcase className="w-4 h-4" />}
            delay={0}
            size="default"
          />
          <MetricCard
            label="Not Started"
            value={
              applications.filter((a) => a.status === "not_started").length
            }
            color="#f59e0b"
            icon={<Target className="w-4 h-4" />}
            delay={100}
          />
          <MetricCard
            label="In Progress"
            value={
              applications.filter((a) => a.status === "in_progress").length
            }
            color="#2563eb"
            icon={<CheckCircle2 className="w-4 h-4" />}
            delay={200}
          />
          <MetricCard
            label="Completed"
            value={
              applications.filter((a) => a.status === "completed").length
            }
            color="#10b981"
            icon={<Trophy className="w-4 h-4" />}
            delay={300}
          />
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company, position, location..."
                className="pl-10 bg-white dark:bg-[#1e2028] border-gray-200 dark:border-white/10 rounded-lg h-10 text-sm text-gray-900 dark:text-[#f5f1e8] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-blue-500 dark:focus:ring-cyan-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mr-1 font-medium">
              Filters:
            </span>
            {/* Favorites filter */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 border flex items-center gap-1.5 ${
                showFavoritesOnly
                  ? "bg-red-50 border-red-500 text-red-700 font-medium dark:bg-red-500/15 dark:border-red-500 dark:text-red-300"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:bg-white/5 dark:border-white/10 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-200"
              }`}
            >
              <Heart
                className={`w-3 h-3 ${
                  showFavoritesOnly ? "fill-current" : ""
                }`}
              />
              Favorites
            </button>
            <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-1" />
            {FILTER_OPTIONS.workType.map((opt) => (
              <button
                key={opt.value}
                onClick={() => toggleFilter("workType", opt.value)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 border ${
                  activeFilters.workType.includes(opt.value)
                    ? "bg-blue-50 border-blue-500 text-blue-700 font-medium dark:bg-cyan-500/15 dark:border-cyan-500 dark:text-cyan-300"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:bg-white/5 dark:border-white/10 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
            <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-1" />
            {FILTER_OPTIONS.experience.map((opt) => (
              <button
                key={opt.value}
                onClick={() => toggleFilter("experience", opt.value)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 border ${
                  activeFilters.experience.includes(opt.value)
                    ? "bg-purple-50 border-purple-500 text-purple-700 font-medium dark:bg-purple-500/15 dark:border-purple-400 dark:text-purple-300"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:bg-white/5 dark:border-white/10 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-2 px-3 py-1.5 rounded-full text-xs bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 dark:bg-red-500/10 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/20 transition-all duration-200"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Kanban Board with DnD */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <KanbanColumn
              title="Not Started"
              applications={notStarted}
              status="not_started"
              onStatusChange={handleStatusChange}
              color="#f59e0b"
              onCardClick={setSelectedApp}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDelete}
              delay={400}
            />
            <KanbanColumn
              title="In Progress"
              applications={inProgress}
              status="in_progress"
              onStatusChange={handleStatusChange}
              color="#2563eb"
              onCardClick={setSelectedApp}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDelete}
              delay={500}
            />
            <KanbanColumn
              title="Completed"
              applications={completed}
              status="completed"
              onStatusChange={handleStatusChange}
              color="#10b981"
              onCardClick={setSelectedApp}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDelete}
              delay={600}
            />
          </div>

          <DragOverlay>
            {activeApplication ? (
              <div className="opacity-90 rotate-2 scale-105">
                <div className="bg-white dark:bg-[#1e2028] p-4 rounded-xl border border-gray-300 dark:border-white/10 shadow-2xl">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-[#f5f1e8]">
                    {activeApplication.company_name}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {activeApplication.position_title}
                  </p>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* Floating add button (mobile) */}
        <div className="fixed bottom-8 right-8 md:hidden">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            size="icon"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        <AddApplicationDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleAddApplication}
        />

        <ApplicationModal
          application={selectedApp}
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
