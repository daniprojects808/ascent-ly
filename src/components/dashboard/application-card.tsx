"use client";

import type { Application } from "@/types/application";
import { MapPin, DollarSign, Briefcase, GraduationCap, Building2, Heart, Trash2, Archive, ArchiveRestore } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface ApplicationCardProps {
  application: Application;
  onClick?: (app: Application) => void;
  statusColor?: string;
  onToggleFavorite?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleArchive?: (id: string) => void;
}

const workTypeLabels: Record<string, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
};

const expLabels: Record<string, string> = {
  entry: "Entry",
  mid: "Mid",
  senior: "Senior",
  lead: "Lead",
};

function formatSalary(min?: number, max?: number) {
  if (!min && !max) return null;
  const fmtMin = min ? `$${(min / 1000).toFixed(0)}k` : "";
  const fmtMax = max ? `$${(max / 1000).toFixed(0)}k` : "";
  if (min && max) return `${fmtMin} – ${fmtMax}`;
  if (min) return `${fmtMin}+`;
  return `Up to ${fmtMax}`;
}

export default function ApplicationCard({
  application,
  onClick,
  statusColor = "#f59e0b",
  onToggleFavorite,
  onDelete,
  onToggleArchive,
}: ApplicationCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: application.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const salary = formatSalary(application.salary_min, application.salary_max);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(application.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleArchiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleArchive?.(application.id);
  };

  const handleConfirmDelete = () => {
    onDelete?.(application.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => onClick?.(application)}
        className={`group relative cursor-grab active:cursor-grabbing rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#1a1d24] p-4 transition-all duration-200 hover:border-gray-300 dark:hover:border-white/[0.15] hover:scale-[1.02] hover:shadow-lg ${
          isDragging
            ? "opacity-50 scale-105 shadow-2xl z-50 border-blue-300 dark:border-cyan-400/40"
            : application.is_archived
            ? "opacity-60"
            : ""
        }`}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
          style={{ backgroundColor: statusColor }}
        />

        <div className="pl-3">
          {/* Company and position */}
          <div className="mb-3">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Building2 className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
                <h4 className="text-sm font-bold text-gray-900 dark:text-[#f5f1e8] truncate">
                  {application.company_name}
                </h4>
              </div>
              {/* Action buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={handleFavoriteClick}
                  className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 transition-colors group/heart"
                  title={application.is_favorited ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    className={`w-4 h-4 transition-all duration-200 ${
                      application.is_favorited
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400 dark:text-gray-500 group-hover/heart:text-red-400 dark:group-hover/heart:text-red-400"
                    }`}
                  />
                </button>
                <button
                  onClick={handleArchiveClick}
                  className="p-1 rounded-md hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors group/archive"
                  title={application.is_archived ? "Unarchive application" : "Archive application"}
                >
                  {application.is_archived ? (
                    <ArchiveRestore className="w-4 h-4 text-amber-500 dark:text-amber-400 transition-colors" />
                  ) : (
                    <Archive className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover/archive:text-amber-500 dark:group-hover/archive:text-amber-400 transition-colors" />
                  )}
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors group/delete"
                  title="Delete application"
                >
                  <Trash2 className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover/delete:text-red-500 dark:group-hover/delete:text-red-400 transition-colors" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate pl-[22px]">
              {application.position_title}
            </p>
          </div>

          {/* Salary */}
          {salary && (
            <div className="flex items-center gap-1.5 mb-2.5">
              <DollarSign className="w-3 h-3 text-emerald-600" />
              <span className="text-xs text-emerald-600 font-semibold">
                {salary}
              </span>
            </div>
          )}

          {/* Tags row */}
          <div className="flex flex-wrap gap-1.5">
            {application.location && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] text-[10px] text-gray-600 dark:text-gray-400">
                <MapPin className="w-2.5 h-2.5" />
                {application.location}
              </span>
            )}
            {application.work_type && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] text-[10px] text-gray-600 dark:text-gray-400">
                <Briefcase className="w-2.5 h-2.5" />
                {workTypeLabels[application.work_type] || application.work_type}
              </span>
            )}
            {application.experience_level && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] text-[10px] text-gray-600 dark:text-gray-400">
                <GraduationCap className="w-2.5 h-2.5" />
                {expLabels[application.experience_level] || application.experience_level}
              </span>
            )}
            {application.industry && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium"
                style={{
                  backgroundColor: `${statusColor}10`,
                  color: statusColor,
                  borderColor: `${statusColor}30`,
                  borderWidth: "1px",
                }}
              >
                {application.industry}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-white dark:bg-[#1a1d24] border-gray-200 dark:border-white/[0.08]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-[#f5f1e8]">
              Delete Application
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              Are you sure you want to delete the application for <strong>{application.company_name}</strong> - {application.position_title}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
