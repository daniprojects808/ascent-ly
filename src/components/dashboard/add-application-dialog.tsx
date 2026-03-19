"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Application, ApplicationStatus } from "@/types/application";
import {
  Building2,
  Briefcase,
  DollarSign,
  MapPin,
  Loader2,
  Link,
} from "lucide-react";

const inputClass =
  "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-lg h-11 text-sm font-body text-gray-900 dark:text-[#f5f1e8] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-violet-500 dark:focus:border-[#8b5cf6] focus:ring-1 focus:ring-violet-500 dark:focus:ring-[#8b5cf6] transition-colors";

const labelClass =
  "text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 block font-mono-data font-semibold";

interface AddApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<Application>) => Promise<void>;
}

export default function AddApplicationDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddApplicationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<{
    company_name: string;
    position_title: string;
    salary_min: number | undefined;
    salary_max: number | undefined;
    location: string;
    status: ApplicationStatus;
    work_type: string;
    experience_level: string;
    industry: string;
    notes: string;
    job_url: string;
  }>({
    company_name: "",
    position_title: "",
    salary_min: undefined,
    salary_max: undefined,
    location: "",
    status: "not_started",
    work_type: "",
    experience_level: "",
    industry: "",
    notes: "",
    job_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const submitData: Partial<Application> = {
        ...formData,
        work_type: formData.work_type || undefined,
        experience_level: formData.experience_level || undefined,
        industry: formData.industry || undefined,
        notes: formData.notes || undefined,
        job_url: formData.job_url || undefined,
      } as Partial<Application>;
      await onSubmit(submitData);
      setFormData({
        company_name: "",
        position_title: "",
        salary_min: undefined,
        salary_max: undefined,
        location: "",
        status: "not_started" as ApplicationStatus,
        work_type: "",
        experience_level: "",
        industry: "",
        notes: "",
        job_url: "",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-lg mx-auto bg-white dark:bg-[#1a1d24] text-gray-900 dark:text-[#f5f1e8] border-gray-200 dark:border-white/[0.08] rounded-2xl shadow-2xl p-0 overflow-hidden max-h-[95dvh] flex flex-col gap-0">
        {/* Header */}
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-gray-100 dark:border-white/[0.06] shrink-0">
          <DialogTitle className="text-lg sm:text-xl flex items-center gap-3 font-display font-bold">
            <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-[#8b5cf6]/15 flex items-center justify-center shrink-0">
              <Briefcase className="w-4 h-4 text-violet-600 dark:text-[#8b5cf6]" />
            </div>
            Add New Application
          </DialogTitle>
          <p className="text-xs font-body text-gray-400 dark:text-gray-500 mt-1 pl-12">
            Fields marked with <span className="text-red-400">*</span> are required
          </p>
        </DialogHeader>

        {/* Scrollable Body */}
        <form id="add-application-form" onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-5 py-5 space-y-5">

          {/* ── Core Details ── */}
          <SectionDivider label="Core Details" />

          {/* Company */}
          <div>
            <Label htmlFor="company" className={labelClass}>
              Company Name <span className="text-red-400">*</span>
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <Input
                id="company"
                value={formData.company_name}
                onChange={(e) =>
                  setFormData({ ...formData, company_name: e.target.value })
                }
                required
                placeholder="e.g., Google"
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          {/* Position */}
          <div>
            <Label htmlFor="position" className={labelClass}>
              Position Title <span className="text-red-400">*</span>
            </Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <Input
                id="position"
                value={formData.position_title}
                onChange={(e) =>
                  setFormData({ ...formData, position_title: e.target.value })
                }
                required
                placeholder="e.g., Senior Frontend Engineer"
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          {/* Application Link */}
          <div>
            <Label htmlFor="job_url" className={labelClass}>
              Application Link
            </Label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <Input
                id="job_url"
                type="url"
                value={formData.job_url}
                onChange={(e) =>
                  setFormData({ ...formData, job_url: e.target.value })
                }
                placeholder="https://..."
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          {/* ── Compensation & Location ── */}
          <SectionDivider label="Compensation & Location" />

          {/* Salary Range */}
          <div>
            <Label className={labelClass}>Salary Range</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 dark:text-emerald-400 pointer-events-none" />
                <Input
                  type="text"
                  inputMode="numeric"
                  value={formData.salary_min ? formData.salary_min.toLocaleString() : ""}
                  onChange={(e) => {
                    const numValue = e.target.value.replace(/,/g, "");
                    setFormData({ ...formData, salary_min: numValue ? Number(numValue) : undefined });
                  }}
                  placeholder="Min"
                  className={`${inputClass} pl-10 font-mono`}
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 dark:text-emerald-400 pointer-events-none" />
                <Input
                  type="text"
                  inputMode="numeric"
                  value={formData.salary_max ? formData.salary_max.toLocaleString() : ""}
                  onChange={(e) => {
                    const numValue = e.target.value.replace(/,/g, "");
                    setFormData({ ...formData, salary_max: numValue ? Number(numValue) : undefined });
                  }}
                  placeholder="Max"
                  className={`${inputClass} pl-10 font-mono`}
                />
              </div>
            </div>
          </div>

          {/* Location & Work Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="location" className={labelClass}>Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State or Remote"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>
            <div>
              <Label className={labelClass}>Work Type</Label>
              <Select
                value={formData.work_type}
                onValueChange={(value) => setFormData({ ...formData, work_type: value })}
              >
                <SelectTrigger className={`${inputClass} w-full`}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1e2028] border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-[#f5f1e8] rounded-xl">
                  <SelectItem value="remote">🌐 Remote</SelectItem>
                  <SelectItem value="hybrid">🏢 Hybrid</SelectItem>
                  <SelectItem value="onsite">📍 On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ── Classification ── */}
          <SectionDivider label="Classification" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className={labelClass}>Experience Level</Label>
              <Select
                value={formData.experience_level}
                onValueChange={(value) => setFormData({ ...formData, experience_level: value })}
              >
                <SelectTrigger className={`${inputClass} w-full`}>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1e2028] border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-[#f5f1e8] rounded-xl">
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className={labelClass}>Industry</Label>
              <Input
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="e.g., Technology"
                className={inputClass}
              />
            </div>
          </div>

          {/* Status — visual toggle buttons */}
          <div>
            <Label className={labelClass}>Application Status</Label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  {
                    value: "not_started",
                    label: "Not Started",
                    dot: "bg-violet-400",
                    active: "bg-violet-50 dark:bg-violet-500/10 border-violet-300 dark:border-violet-500/40 text-violet-700 dark:text-violet-300",
                    inactive: "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.08]",
                  },
                  {
                    value: "in_progress",
                    label: "In Progress",
                    dot: "bg-cyan-400",
                    active: "bg-cyan-50 dark:bg-cyan-500/10 border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300",
                    inactive: "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.08]",
                  },
                  {
                    value: "completed",
                    label: "Completed",
                    dot: "bg-emerald-400",
                    active: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
                    inactive: "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.08]",
                  },
                ] as const
              ).map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, status: s.value })}
                  className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    formData.status === s.value ? s.active : s.inactive
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                  <span className="leading-tight text-center">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Notes ── */}
          <SectionDivider label="Notes" />

          <Textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add any notes, contacts, or next steps…"
            rows={3}
            className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-lg text-sm font-body text-gray-900 dark:text-[#f5f1e8] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-violet-500 dark:focus:border-[#8b5cf6] focus:ring-1 focus:ring-violet-500 dark:focus:ring-[#8b5cf6] resize-none transition-colors w-full"
          />

          {/* spacer so last field isn't hidden under sticky footer */}
          <div className="h-1" />
        </form>

        {/* Sticky Footer */}
        <div className="px-5 py-4 border-t border-gray-100 dark:border-white/[0.06] flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 shrink-0 bg-white dark:bg-[#1a1d24]">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="w-full sm:w-auto rounded-full border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 h-11 text-sm font-medium"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-application-form"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full sm:w-auto rounded-full bg-violet-600 hover:bg-violet-700 dark:bg-[#8b5cf6] dark:hover:bg-[#7c3aed] text-white text-sm px-6 h-11 font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding…
              </>
            ) : (
              <>
                <Briefcase className="w-4 h-4 mr-2" />
                Add Application
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 pt-1">
      <span className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-600 font-mono-data font-bold whitespace-nowrap">
        {label}
      </span>
      <span className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
    </div>
  );
}
