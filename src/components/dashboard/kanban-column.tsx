"use client";

import type { Application } from "@/types/application";
import ApplicationCard from "./application-card";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface KanbanColumnProps {
  title: string;
  applications: Application[];
  status: string;
  onStatusChange?: (id: string, newStatus: string) => void;
  color: string;
  onCardClick?: (app: Application) => void;
  onToggleFavorite?: (id: string) => void;
  onDelete?: (id: string) => void;
  delay?: number;
}

export default function KanbanColumn({
  title,
  applications,
  status,
  color,
  onCardClick,
  onToggleFavorite,
  onDelete,
  delay = 0,
}: KanbanColumnProps) {
  const { isOver, setNodeRef } = useDroppable({ id: status });

  return (
    <div
      className={`flex flex-col rounded-xl border transition-all duration-300 ${
        isOver
          ? "border-blue-300 dark:border-cyan-400/40 bg-blue-50/50 dark:bg-cyan-500/5 shadow-lg"
          : "border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#1e2028]"
      }`}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Column header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 dark:border-white/[0.08]">
        <div
          className="w-2.5 h-2.5 rounded-full ring-4"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}40`,
            ringColor: `${color}15`,
          }}
        />
        <h3 className="text-sm font-bold text-gray-900 dark:text-[#f5f1e8] tracking-wide">
          {title}
        </h3>
        <span
          className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{
            backgroundColor: `${color}15`,
            color: `${color}cc`,
          }}
        >
          {applications.length}
        </span>
      </div>

      {/* Card list */}
      <div
        ref={setNodeRef}
        className={`flex-1 p-3 space-y-2.5 min-h-[200px] transition-colors duration-300 ${
          isOver ? "bg-blue-50/30 dark:bg-cyan-500/5" : ""
        }`}
      >
        <SortableContext
          items={applications.map((a) => a.id)}
          strategy={verticalListSortingStrategy}
        >
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onClick={onCardClick}
              statusColor={color}
              onToggleFavorite={onToggleFavorite}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>

        {applications.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <div
              className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
              style={{ backgroundColor: `${color}10` }}
            >
              <svg
                className="w-5 h-5"
                style={{ color: `${color}80` }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Drag cards here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
