"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/validations/auth";
import { mockForgotPassword } from "@/lib/mock/auth";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      identifier: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setGlobalError(null);
    try {
      const result = await mockForgotPassword(data.identifier);
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setGlobalError("Failed to submit request.");
      }
    } catch {
      setGlobalError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center relative overflow-hidden mesh-gradient p-sm">
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px), radial-gradient(#ffffff 0.5px, #0B2A4A 0.5px)', 
          backgroundSize: '20px 20px', 
          backgroundPosition: '0 0, 10px 10px' 
        }}
      />
      
      <main className="relative z-10 w-full max-w-[440px] flex flex-col items-center">
        <header className="mb-md text-center">
          <div className="flex flex-col items-center gap-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              alt="SentinelRisk PNM Logo" 
              className="h-10 w-auto object-contain mb-xs" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU00mzNIL3QJgGX21zq7wwnW4PfwMoTzH1ZAEQ9MNr1z6oPSrbFX6CKlrQaVgX09xBgJrxp0wmb3ketaRxhSIgG5-FghwdUno9WjuK04_eNHYDnpHTGy9pyANn7XyCV7hdWHya51f-lSd9eT-0hFnG2OXmO2o9KKX0t9l9cSLOCC5ox93bq8WnTmppw8b8XOryoBTCk8gMEOTyJ-PnlwH-sdce2_yisBdJG9O9OuDSd107aR-L9HgngeG_A0wnMe6KMKCH4Bwz0hg" 
            />
            <h1 className="font-display-lg text-[24px] text-white font-bold tracking-tight">
              SentinelRisk PNM
            </h1>
          </div>
        </header>

        <div className="w-full rounded-xl p-md lg:p-lg bg-white border border-border-soft shadow-[0px_2px_4px_rgba(26,31,38,0.05),0px_12px_24px_rgba(0,0,0,0.1)]">
          {isSubmitted ? (
            <div className="text-center py-4">
              <div className="mx-auto w-12 h-12 bg-risk-low-tint rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-risk-low" style={{ fontSize: "24px" }}>
                  check_circle
                </span>
              </div>
              <h2 className="font-headline-md text-[20px] text-text-primary mb-2">
                Request submitted
              </h2>
              <p className="font-body-md text-[13px] text-on-surface-variant mb-6 leading-snug">
                Check your email or wait for admin approval.
              </p>
              <div className="mt-md flex flex-col items-center gap-sm">
                <Link
                  href="/login"
                  className="font-label-md text-[13px] text-secondary hover:underline flex items-center gap-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-md">
                <h2 className="font-headline-md text-[20px] text-text-primary mb-1">
                  Reset your password
                </h2>
                <p className="font-body-md text-[13px] text-on-surface-variant leading-snug">
                  Enter your registered email or username. Password reset instructions will be sent according to internal security policy.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-md">
                <div className="space-y-1">
                  <label
                    className="font-label-md text-[12px] text-on-surface-variant block"
                    htmlFor="identifier"
                  >
                    Username or Email
                  </label>
                  <div className="relative">
                    <span
                      className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline"
                      style={{ fontSize: "20px" }}
                    >
                      person
                    </span>
                    <input
                      id="identifier"
                      placeholder="e.g. risk_officer_01"
                      type="text"
                      disabled={isSubmitting}
                      className="w-full pl-[36px] pr-sm py-2 bg-white border border-border-soft rounded-lg font-body-md text-[14px] text-text-primary placeholder:text-outline/60 outline-none focus:border-[#0E7C86] focus:ring-2 focus:ring-[#0E7C86]/10 transition-all"
                      {...register("identifier")}
                    />
                  </div>
                  {errors.identifier && (
                    <p className="text-sm font-medium text-error mt-1">
                      {errors.identifier.message}
                    </p>
                  )}
                </div>

                {globalError && (
                  <div className="p-3 rounded-md bg-error-container text-on-error-container text-sm font-medium">
                    {globalError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-container text-white font-label-md text-[14px] py-2 px-md rounded-lg flex items-center justify-center gap-xs hover:opacity-90 shadow-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span
                      className="material-symbols-outlined animate-spin"
                      style={{ fontSize: "18px" }}
                    >
                      progress_activity
                    </span>
                  ) : null}
                  {isSubmitting ? "Processing..." : "Submit Request"}
                  {!isSubmitting && (
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  )}
                </button>
              </form>

              <div className="mt-md flex flex-col items-center gap-sm">
                <Link
                  href="/login"
                  className="font-label-md text-[13px] text-secondary hover:underline flex items-center gap-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  Back to Sign In
                </Link>
              </div>

              <div className="mt-md pt-sm border-t border-border-soft">
                <div className="flex gap-xs p-sm bg-surface-container-low rounded-lg border border-outline-variant/30 items-start">
                  <span
                    className="material-symbols-outlined text-secondary text-[18px] flex-shrink-0"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    gpp_maybe
                  </span>
                  <p className="font-label-sm text-[11px] text-on-surface-variant italic leading-tight mt-0.5">
                    For security reasons, password reset requests may require administrator approval.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <footer className="mt-md text-center">
          <p className="font-label-sm text-[11px] text-white/70">
            © 2026 PNM IT Risk and Digital. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
