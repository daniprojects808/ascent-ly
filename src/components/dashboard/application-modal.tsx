'use client';

import { Application } from '@/types/application';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, MapPin, Briefcase, GraduationCap, DollarSign, Calendar, FileText, Clock, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface ApplicationModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export function ApplicationModal({ application, isOpen, onClose, onDelete }: ApplicationModalProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  if (!application) return null;

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Not specified';
    if (min && max) return `$${(min / 1000).toFixed(0)}k – $${(max / 1000).toFixed(0)}k`;
    if (min) return `$${(min / 1000).toFixed(0)}k+`;
    return `Up to $${(max! / 1000).toFixed(0)}k`;
  };

  const statusConfig = {
    not_started: { label: 'Not Started', color: '#f59e0b', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    in_progress: { label: 'In Progress', color: '#2563eb', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    completed: { label: 'Completed', color: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  };

  const status = statusConfig[application.status] || statusConfig.not_started;

  const handleDelete = () => {
    onDelete?.(application.id);
    setShowDeleteDialog(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1a1d24] border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-[#f5f1e8] rounded-xl shadow-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${status.color}15` }}>
                <Building2 className="w-5 h-5" style={{ color: status.color }} />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold tracking-tight">
                  {application.company_name}
                </DialogTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{application.position_title}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDeleteDialog(true)}
              className="text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Status badge */}
          <Badge
            variant="outline"
            className={`font-body text-xs border rounded-full px-3 py-1 ${status.bg} ${status.text} ${status.border}`}
          >
            <span className="w-1.5 h-1.5 rounded-full mr-2 inline-block" style={{ backgroundColor: status.color }} />
            {status.label}
          </Badge>

          {/* Details grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08]">
              <DollarSign className="w-4.5 h-4.5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                  Salary Range
                </p>
                <p className="font-mono-data text-sm text-emerald-600">
                  {formatSalary(application.salary_min, application.salary_max)}
                </p>
              </div>
            </div>

            {application.location && (
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08]">
                <MapPin className="w-4.5 h-4.5 text-blue-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Location
                  </p>
                  <p className="font-body text-sm">{application.location}</p>
                </div>
              </div>
            )}

            {application.work_type && (
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08]">
                <Briefcase className="w-4.5 h-4.5 text-blue-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Work Type
                  </p>
                  <p className="font-body text-sm capitalize">{application.work_type}</p>
                </div>
              </div>
            )}

            {application.experience_level && (
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08]">
                <GraduationCap className="w-4.5 h-4.5 text-blue-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Experience Level
                  </p>
                  <p className="font-body text-sm capitalize">{application.experience_level}</p>
                </div>
              </div>
            )}

            {application.industry && (
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08]">
                <FileText className="w-4.5 h-4.5 text-blue-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Industry
                  </p>
                  <p className="font-body text-sm">{application.industry}</p>
                </div>
              </div>
            )}

            {application.applied_date && (
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08]">
                <Calendar className="w-4.5 h-4.5 text-blue-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Applied Date
                  </p>
                  <p className="font-body text-sm">
                    {format(new Date(application.applied_date), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          {application.notes && (
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08]">
              <h4 className="font-body text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-3">
                Notes
              </h4>
              <p className="font-body text-sm leading-relaxed text-gray-700 dark:text-[#f5f1e8]/70 whitespace-pre-wrap">
                {application.notes}
              </p>
            </div>
          )}

          {/* Timeline / Timestamps */}
          <div className="pt-4 border-t border-gray-200 dark:border-white/[0.06]">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-[#f5f1e8]/20" />
              <span className="font-body text-[10px] text-gray-400 dark:text-[#f5f1e8]/25 uppercase tracking-[0.15em]">
                Timeline
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-body text-[10px] text-gray-400 dark:text-[#f5f1e8]/25 uppercase tracking-wider">Created</p>
                <p className="font-mono-data text-xs text-gray-500 dark:text-[#f5f1e8]/50 mt-1">
                  {format(new Date(application.created_at), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
              <div>
                <p className="font-body text-[10px] text-gray-400 dark:text-[#f5f1e8]/25 uppercase tracking-wider">Updated</p>
                <p className="font-mono-data text-xs text-gray-500 dark:text-[#f5f1e8]/50 mt-1">
                  {format(new Date(application.updated_at), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent className="bg-white dark:bg-[#1a1d24] border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-[#f5f1e8]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">Delete Application</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete the application for <span className="font-semibold">{application.company_name}</span>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border-gray-200 dark:border-white/[0.08]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
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
