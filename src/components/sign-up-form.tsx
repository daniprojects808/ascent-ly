"use client";

import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { signUpAction } from "@/app/actions";
import { useState } from "react";

interface SignUpFormProps {
  message: Message;
}

export default function SignUpForm({ message }: SignUpFormProps) {
  const [isHumanVerified, setIsHumanVerified] = useState(false);

  if ("message" in message) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
        <form className="flex flex-col space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Sign up</h1>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                className="text-primary font-medium hover:underline transition-all"
                href="/sign-in"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="John Doe"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Your password"
                minLength={6}
                required
                className="w-full"
              />
            </div>

            <div className="flex items-center space-x-3 rounded-lg border border-border bg-muted/30 p-4">
              <Checkbox
                id="human-verify"
                checked={isHumanVerified}
                onCheckedChange={(checked) =>
                  setIsHumanVerified(checked === true)
                }
              />
              <Label
                htmlFor="human-verify"
                className="text-sm font-medium leading-none cursor-pointer select-none"
              >
                I'm not a robot
              </Label>
            </div>
          </div>

          <SubmitButton
            formAction={signUpAction}
            pendingText="Signing up..."
            className="w-full"
            disabled={!isHumanVerified}
          >
            Sign up
          </SubmitButton>

          {!isHumanVerified && (
            <p className="text-xs text-muted-foreground text-center">
              Please verify you are human to continue
            </p>
          )}

          <FormMessage message={message} />
        </form>
      </div>
    </div>
  );
}
