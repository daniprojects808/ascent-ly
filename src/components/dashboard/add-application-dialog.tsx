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
} from "lucide-react";

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
      <DialogContent className="max-w-lg bg-white dark:bg-[#1a1d24] text-gray-900 dark:text-[#f5f1e8] border-gray-200 dark:border-white/[0.08] rounded-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-3 font-bold">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-cyan-500/15 flex items-center justify-center">
              <Briefcase className="w-4.5 h-4.5 text-blue-600 dark:text-cyan-400" />
            </div>
            Add New Application
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Company & Position */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label
                htmlFor="company"
                className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5 block font-medium"
              >
                Company Name *
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <Input
                  id="company"
                  value={formData.company_name}
                  onChange={(e) =>
                    setFormData({ ...formData, company_name: e.target.value })
                  }
                  required
                  placeholder="e.g., Google"
                  className="pl-10 bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-lg h-11 font-body text-sm text-gray-900 dark:text-[#f5f1e8] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-blue-500 dark:focus:ring-cyan-500"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="position"
                className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5 block font-medium"
              >
                Position Title *
              </Label>
              <Input
                id="position"
                value={formData.position_title}
                onChange={(e) =>
                  setFormData({ ...formData, position_title: e.target.value })
                }
                required
                placeholder="e.g., Senior Frontend Engineer"
                className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-lg h-11 font-body text-sm text-gray-900 dark:text-[#f5f1e8] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-blue-500 dark:focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <Label className="font-body text-xs uppercase tracking-wider text-gray-900/40 dark:text-gray-400 mb-1.5 block">
              Salary Range
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <Input
                  type="text"
                  inputMode="numeric"
                  value={formData.salary_min ? formData.salary_min.toLocaleString() : ""}
                  onChange={(e) => {
                    const numValue = e.target.value.replace(/,/g, "");
                    setFormData({
                      ...formData,
                      salary_min: numValue ? Number(numValue) : undefined,
                    });
                  }}
                  placeholder="Min"
                  className="pl-10 bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-lg h-11 font-mono-data text-sm text-gray-900 dark:text-[#f5f1e8] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-emerald-500/40 focus:ring-emerald-500/20"
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <Input
                  type="text"
                  inputMode="numeric"
                  value={formData.salary_max ? formData.salary_max.toLocaleString() : ""}
                  onChange={(e) => {
                    const numValue = e.target.value.replace(/,/g, "");
                    setFormData({
                      ...formData,
                      salary_max: numValue ? Number(numValue) : undefined,
                    });
                  }}
                  placeholder="Max"
                  className="pl-10 bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-lg h-11 font-mono-data text-sm text-gray-900 dark:text-[#f5f1e8] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-emerald-500/40 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          </div>

          {/* Location & Work Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label
                htmlFor="location"
                className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5 block font-medium"
              >
                Location
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="City, State"
                  className="pl-10 bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-lg h-11 font-body text-sm text-gray-900 dark:text-[#f5f1e8] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-blue-500 dark:focus:ring-cyan-500"
                />
              </div>
            </div>
            <div>
              <Label className="font-body text-xs uppercase tracking-wider text-gray-900/40 dark:text-gray-400 mb-1.5 block">
                Work Type
              </Label>
              <Select
                value={formData.work_type}
                onValueChange={(value) =>
                  setFormData({ ...formData, work_type: value })
                }
              >
                <SelectTrigger className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-lg h-11 font-body text-sm text-gray-900 dark:text-[#f5f1e8] focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-blue-500 dark:focus:ring-cyan-500">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1e2028] border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-[#f5f1e8] rounded-xl">
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Experience & Industry */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="font-body text-xs uppercase tracking-wider text-gray-900/40 dark:text-gray-400 mb-1.5 block">
                Experience Level
              </Label>
              <Select
                value={formData.experience_level}
                onValueChange={(value) =>
                  setFormData({ ...formData, experience_level: value })
                }
              >
                <SelectTrigger className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-lg h-11 font-body text-sm text-gray-900 dark:text-[#f5f1e8] focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-blue-500 dark:focus:ring-cyan-500">
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
              <Label className="font-body text-xs uppercase tracking-wider text-gray-900/40 dark:text-gray-400 mb-1.5 block">
                Industry
              </Label>
              <Input
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                placeholder="e.g., Tech"
                className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-lg h-11 font-body text-sm text-gray-900 dark:text-[#f5f1e8] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-blue-500 dark:focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <Label className="font-body text-xs uppercase tracking-wider text-gray-900/40 dark:text-gray-400 mb-1.5 block">
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value: ApplicationStatus) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-lg h-11 font-body text-sm text-gray-900 dark:text-[#f5f1e8] focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-blue-500 dark:focus:ring-cyan-500">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#1e2028] border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-[#f5f1e8] rounded-xl">
                <SelectItem value="not_started">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Not Started
                  </span>
                </SelectItem>
                <SelectItem value="in_progress">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    In Progress
                  </span>
                </SelectItem>
                <SelectItem value="completed">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Completed
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div>
            <Label className="font-body text-xs uppercase tracking-wider text-gray-900/40 dark:text-gray-400 mb-1.5 block">
              Notes
            </Label>
            <Textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Add any notes about this application..."
              rows={3}
              className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-lg font-body text-sm text-gray-900 dark:text-[#f5f1e8] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-blue-500 dark:focus:ring-cyan-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-lg border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white text-sm px-6 transition-all duration-200 hover:shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Application"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
