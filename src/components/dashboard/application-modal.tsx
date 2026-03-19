'use client';

import { Application, ApplicationStatus, WorkType, ExperienceLevel } from '@/types/application';
import { useState, useEffect } from 'react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, MapPin, Briefcase, GraduationCap, DollarSign, Calendar, FileText, Clock, Trash2, Link, Pencil, X, Check } from 'lucide-react';
import { format } from 'date-fns';

interface ApplicationModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: (id: string) => void;
  onUpdate?: (updated: Application) => void;
}

export function ApplicationModal({ application, isOpen, onClose, onDelete, onUpdate }: ApplicationModalProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Application>>({});

  useEffect(() => {
    if (application) {
      setEditForm({ ...application });
      setIsEditMode(false);
    }
  }, [application]);

  if (!application) return null;

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Not specified';
    if (min && max) return `$${(min / 1000).toFixed(0)}k – $${(max / 1000).toFixed(0)}k`;
    if (min) return `$${(min / 1000).toFixed(0)}k+`;
    return `Up to $${(max! / 1000).toFixed(0)}k`;
  };

  const formatUrl = (url?: string) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://') ? url : 'https://' + url;
  };

  const statusConfig = {
    not_started: { label: 'Not Started', color: '#8b5cf6', bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
    in_progress: { label: 'In Progress', color: '#06b6d4', bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
    completed: { label: 'Completed', color: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  };

  const status = statusConfig[application.status] || statusConfig.not_started;
  const currentStatus = statusConfig[(editForm.status as ApplicationStatus) || application.status] || statusConfig.not_started;

  const handleDelete = () => {
    onDelete?.(application.id);
    setShowDeleteDialog(false);
    onClose();
  };

  const handleEditCancel = () => {
    setEditForm({ ...application });
    setIsEditMode(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { createClient } = await import('@/../supabase/client');
      const supabase = createClient();
      const updatePayload = {
        company_name: editForm.company_name,
        position_title: editForm.position_title,
        salary_min: editForm.salary_min ? Number(editForm.salary_min) : null,
        salary_max: editForm.salary_max ? Number(editForm.salary_max) : null,
        location: editForm.location || null,
        industry: editForm.industry || null,
        work_type: editForm.work_type || null,
        experience_level: editForm.experience_level || null,
        status: editForm.status,
        notes: editForm.notes || null,
        applied_date: editForm.applied_date || null,
        job_url: editForm.job_url || null,
        updated_at: new Date().toISOString(),
      };
      const { data, error } = await supabase
        .from('applications')
        .update(updatePayload)
        .eq('id', application.id)
        .select()
        .single();
      if (!error && data) {
        onUpdate?.(data as Application);
      }
      setIsEditMode(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1a1d24] border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-[#f5f1e8] rounded-xl shadow-2xl">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${currentStatus.color}15` }}>
                  <Building2 className="w-5 h-5" style={{ color: currentStatus.color }} />
                </div>
                <div>
                  {isEditMode ? (
                    <Input
                      value={editForm.company_name || ''}
                      onChange={e => setEditForm(f => ({ ...f, company_name: e.target.value }))}
                      className="text-xl font-display font-bold tracking-tight h-8 border-gray-300 dark:border-white/[0.12] bg-gray-50 dark:bg-white/5 mb-1"
                    />
                  ) : (
                    <DialogTitle className="text-xl font-display font-bold tracking-tight">
                      {application.company_name}
                    </DialogTitle>
                  )}
                  {isEditMode ? (
                    <Input
                      value={editForm.position_title || ''}
                      onChange={e => setEditForm(f => ({ ...f, position_title: e.target.value }))}
                      className="text-sm font-body h-7 border-gray-300 dark:border-white/[0.12] bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400"
                    />
                  ) : (
                    <p className="text-sm font-body text-gray-600 dark:text-gray-400 mt-0.5">{application.position_title}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {!isEditMode && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditMode(true)}
                    className="text-gray-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors rounded-lg"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Status badge / edit */}
            {isEditMode ? (
              <Select
                value={editForm.status || 'not_started'}
                onValueChange={v => setEditForm(f => ({ ...f, status: v as ApplicationStatus }))}
              >
                <SelectTrigger className="w-48 border-gray-300 dark:border-white/[0.12] bg-gray-50 dark:bg-white/5 font-body text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not_started">Not Started</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge
                variant="outline"
                className={`font-body text-xs border rounded-full px-3 py-1 ${status.bg} ${status.text} ${status.border}`}
              >
                <span className="w-1.5 h-1.5 rounded-full mr-2 inline-block" style={{ backgroundColor: status.color }} />
                {status.label}
              </Badge>
            )}

            {/* Details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08]">
                <DollarSign className="w-[18px] h-[18px] text-emerald-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Salary Range
                  </p>
                  {isEditMode ? (
                    <div className="flex gap-1.5">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={editForm.salary_min ?? ''}
                        onChange={e => setEditForm(f => ({ ...f, salary_min: e.target.value ? Number(e.target.value) : undefined }))}
                        className="h-7 text-xs border-gray-300 dark:border-white/[0.12] bg-white dark:bg-white/5"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={editForm.salary_max ?? ''}
                        onChange={e => setEditForm(f => ({ ...f, salary_max: e.target.value ? Number(e.target.value) : undefined }))}
                        className="h-7 text-xs border-gray-300 dark:border-white/[0.12] bg-white dark:bg-white/5"
                      />
                    </div>
                  ) : (
                    <p className="font-mono-data text-sm text-emerald-600">
                      {formatSalary(application.salary_min, application.salary_max)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08]">
                <MapPin className="w-[18px] h-[18px] text-violet-600 dark:text-[#8b5cf6] mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Location
                  </p>
                  {isEditMode ? (
                    <Input
                      value={editForm.location || ''}
                      onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))}
                      className="h-7 text-sm border-gray-300 dark:border-white/[0.12] bg-white dark:bg-white/5"
                    />
                  ) : (
                    <p className="font-body text-sm">{application.location || '—'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08]">
                <Briefcase className="w-[18px] h-[18px] text-violet-600 dark:text-[#8b5cf6] mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Work Type
                  </p>
                  {isEditMode ? (
                    <Select
                      value={editForm.work_type || ''}
                      onValueChange={v => setEditForm(f => ({ ...f, work_type: v as WorkType }))}
                    >
                      <SelectTrigger className="h-7 text-sm border-gray-300 dark:border-white/[0.12] bg-white dark:bg-white/5">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="onsite">Onsite</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="font-body text-sm capitalize">{application.work_type || '—'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08]">
                <GraduationCap className="w-[18px] h-[18px] text-violet-600 dark:text-[#8b5cf6] mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Experience Level
                  </p>
                  {isEditMode ? (
                    <Select
                      value={editForm.experience_level || ''}
                      onValueChange={v => setEditForm(f => ({ ...f, experience_level: v as ExperienceLevel }))}
                    >
                      <SelectTrigger className="h-7 text-sm border-gray-300 dark:border-white/[0.12] bg-white dark:bg-white/5">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry</SelectItem>
                        <SelectItem value="mid">Mid</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                        <SelectItem value="lead">Lead</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="font-body text-sm capitalize">{application.experience_level || '—'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08]">
                <FileText className="w-[18px] h-[18px] text-violet-600 dark:text-[#8b5cf6] mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Industry
                  </p>
                  {isEditMode ? (
                    <Input
                      value={editForm.industry || ''}
                      onChange={e => setEditForm(f => ({ ...f, industry: e.target.value }))}
                      className="h-7 text-sm border-gray-300 dark:border-white/[0.12] bg-white dark:bg-white/5"
                    />
                  ) : (
                    <p className="font-body text-sm">{application.industry || '—'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08]">
                <Calendar className="w-[18px] h-[18px] text-violet-600 dark:text-[#8b5cf6] mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Applied Date
                  </p>
                  {isEditMode ? (
                    <Input
                      type="date"
                      value={editForm.applied_date ? editForm.applied_date.slice(0, 10) : ''}
                      onChange={e => setEditForm(f => ({ ...f, applied_date: e.target.value }))}
                      className="h-7 text-sm border-gray-300 dark:border-white/[0.12] bg-white dark:bg-white/5"
                    />
                  ) : (
                    <p className="font-body text-sm">
                      {application.applied_date ? format(new Date(application.applied_date), 'MMM dd, yyyy') : '—'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Application Link */}
            {(isEditMode || application.job_url) && (
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08]">
                <Link className="w-[18px] h-[18px] text-violet-600 dark:text-[#8b5cf6] mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Application Link
                  </p>
                  {isEditMode ? (
                    <Input
                      value={editForm.job_url || ''}
                      onChange={e => setEditForm(f => ({ ...f, job_url: e.target.value }))}
                      placeholder="e.g. superhuman.com/careers"
                      className="h-7 text-sm border-gray-300 dark:border-white/[0.12] bg-white dark:bg-white/5"
                    />
                  ) : (
                    <a
                      href={formatUrl(application.job_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-body text-sm text-violet-600 dark:text-violet-400 hover:underline break-all"
                    >
                      {application.job_url}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08]">
              <h4 className="font-body text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-3">
                Notes
              </h4>
              {isEditMode ? (
                <Textarea
                  value={editForm.notes || ''}
                  onChange={e => setEditForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Add notes..."
                  className="font-body text-sm border-gray-300 dark:border-white/[0.12] bg-white dark:bg-white/5 min-h-[80px] resize-none"
                />
              ) : (
                <p className="font-body text-sm leading-relaxed text-gray-700 dark:text-[#f5f1e8]/70 whitespace-pre-wrap">
                  {application.notes || <span className="text-gray-400 dark:text-gray-500 italic">No notes</span>}
                </p>
              )}
            </div>

            {/* Edit mode save/cancel */}
            {isEditMode && (
              <div className="flex items-center gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEditCancel}
                  className="font-body text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  disabled={isSaving}
                >
                  <X className="w-3.5 h-3.5 mr-1.5" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="font-body text-sm bg-violet-600 hover:bg-violet-700 text-white"
                >
                  <Check className="w-3.5 h-3.5 mr-1.5" />
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
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
            <AlertDialogTitle className="text-xl font-display font-bold">Delete Application</AlertDialogTitle>
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
