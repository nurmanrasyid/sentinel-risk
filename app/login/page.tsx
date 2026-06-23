"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { mockLogin } from "@/lib/mock/auth";

export default function LoginPage() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setGlobalError(null);
    try {
      const result = await mockLogin(data.identifier, data.password);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setGlobalError(result.error || "Login failed");
      }
    } catch {
      setGlobalError("An unexpected error occurred. Please try again.");
    }
  };

  const handleSSO = () => {
    console.log("SSO integration coming soon");
    alert("SSO integration coming soon");
  };

  return (
    <div className="flex h-full w-full">
      <section className="hidden lg:flex w-1/2 mesh-gradient relative overflow-hidden p-md lg:p-lg flex-col justify-between">
        <div className="pattern-bg absolute inset-0 z-0"></div>

        <div className="relative z-10 flex flex-col gap-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="PT PNM Logo"
            className="h-10 w-auto object-contain self-start bg-white p-xs rounded"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7NDUVH_q70osfILgNZZLGPxcCKTYEgB_MFbrXqyqQdwPfR4NK-GP347MpvTY5wT7bD1TT5qLp193bM1Z9szVQ-cMQFc8pK5h8BKXWdQVWi1SEsr1F9TIcY1SkuzcDneJf5KU_4mncGp-H9zkH35d7LgJFVd-9hDGWFPC8o6YZCnlpAhRxaKmSB0joGPD-amWrGoXFipwMknzwWEuCb5Od_5-JMqsey266DtMv1l9Yw5u_38n9AiMHoYi_GqgAMSrKSdpN0G_oDP4"
          />
          <div className="mt-xs">
            <h1 className="font-display-lg text-[24px] leading-tight text-on-primary tracking-tight">
              SentinelRisk PNM
            </h1>
            <p className="font-headline-sm text-[13px] leading-snug text-secondary-fixed/80 max-w-lg mt-xs">
              Integrated platform for IT Risk Assessment, Risk Register, Controls, Action Plan Monitoring, and Risk Reporting.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center scale-90 origin-center">
          <div className="bg-white/5 backdrop-blur-md p-md rounded-xl border border-white/10 shadow-2xl">
            <div className="flex items-center gap-sm mb-sm border-b border-white/10 pb-sm">
              <span
                className="material-symbols-outlined text-secondary-fixed text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield
              </span>
              <span className="font-label-md text-[11px] text-on-primary uppercase tracking-widest">
                IT Risk Overview
              </span>
            </div>
            <div className="grid grid-cols-5 gap-xs w-48 lg:w-60">
              <div className="risk-grid-item bg-risk-low rounded-sm"></div>
              <div className="risk-grid-item bg-risk-low rounded-sm"></div>
              <div className="risk-grid-item bg-risk-medium rounded-sm"></div>
              <div className="risk-grid-item bg-risk-high rounded-sm"></div>
              <div className="risk-grid-item bg-risk-very-high rounded-sm"></div>
              <div className="risk-grid-item bg-risk-low rounded-sm"></div>
              <div className="risk-grid-item bg-risk-low rounded-sm"></div>
              <div className="risk-grid-item bg-risk-medium rounded-sm"></div>
              <div className="risk-grid-item bg-risk-high rounded-sm"></div>
              <div className="risk-grid-item bg-risk-high rounded-sm"></div>
              <div className="risk-grid-item bg-risk-low rounded-sm"></div>
              <div className="risk-grid-item bg-risk-medium rounded-sm"></div>
              <div className="risk-grid-item bg-risk-medium rounded-sm"></div>
              <div className="risk-grid-item bg-risk-medium rounded-sm"></div>
              <div className="risk-grid-item bg-risk-high rounded-sm"></div>
              <div className="risk-grid-item bg-risk-low rounded-sm"></div>
              <div className="risk-grid-item bg-risk-low rounded-sm"></div>
              <div className="risk-grid-item bg-risk-low rounded-sm"></div>
              <div className="risk-grid-item bg-risk-medium rounded-sm"></div>
              <div className="risk-grid-item bg-risk-medium rounded-sm"></div>
              <div className="risk-grid-item bg-risk-low rounded-sm"></div>
              <div className="risk-grid-item bg-risk-low rounded-sm"></div>
              <div className="risk-grid-item bg-risk-low rounded-sm"></div>
              <div className="risk-grid-item bg-risk-low rounded-sm"></div>
              <div className="risk-grid-item bg-risk-low rounded-sm"></div>
            </div>
            <div className="flex justify-between mt-sm text-[9px] text-white/60 font-bold uppercase tracking-tighter">
              <span className="">Likelihood →</span>
              <span className="">Impact ↑</span>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-sm">
            <div className="h-px w-6 bg-secondary-fixed"></div>
            <span className="font-label-md text-[11px] text-on-primary">
              Divisi Manajemen Risiko Operasional dan Korporasi
            </span>
          </div>
        </div>

        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      </section>

      <main className="w-full lg:w-1/2 flex items-center justify-center p-sm lg:p-md bg-surface-bg relative">
        <div className="w-full max-w-md flex flex-col justify-center max-h-full">
          <div className="lg:hidden flex flex-col items-center mb-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="PT PNM Logo"
              className="h-8 w-auto mb-xs"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7NDUVH_q70osfILgNZZLGPxcCKTYEgB_MFbrXqyqQdwPfR4NK-GP347MpvTY5wT7bD1TT5qLp193bM1Z9szVQ-cMQFc8pK5h8BKXWdQVWi1SEsr1F9TIcY1SkuzcDneJf5KU_4mncGp-H9zkH35d7LgJFVd-9hDGWFPC8o6YZCnlpAhRxaKmSB0joGPD-amWrGoXFipwMknzwWEuCb5Od_5-JMqsey266DtMv1l9Yw5u_38n9AiMHoYi_GqgAMSrKSdpN0G_oDP4"
            />
            <h1 className="font-display-lg-mobile text-[20px] text-primary leading-none">
              SentinelRisk PNM
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-[0px_4px_24px_rgba(26,31,38,0.06)] border border-border-soft p-md lg:px-lg lg:py-md">
            <div className="mb-md text-center lg:text-left">
              <h2 className="font-headline-md text-[20px] text-text-primary mb-1">
                Sign in to your account
              </h2>
              <p className="font-body-sm text-[13px] text-on-surface-variant">
                Enter your credentials to access the IT Risk Portal.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-sm">
              <div className="space-y-1">
                <label
                  className="font-label-md text-[12px] text-text-primary"
                  htmlFor="identifier"
                >
                  Username or Email
                </label>
                <div className="relative group">
                  <span
                    className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors"
                    style={{ fontSize: "18px" }}
                  >
                    person
                  </span>
                  <input
                    id="identifier"
                    placeholder="e.g. risk_officer_01"
                    type="text"
                    disabled={isSubmitting}
                    className="w-full pl-[36px] pr-sm py-1.5 bg-white border border-border-soft rounded-lg font-body-md text-[14px] focus:ring-1 focus:ring-secondary focus:border-secondary transition-all outline-none"
                    {...register("identifier")}
                  />
                </div>
                {errors.identifier && (
                  <p className="text-sm font-medium text-error mt-1">
                    {errors.identifier.message}
                  </p>
                )}
              </div>

              <div className="space-y-1 mt-sm">
                <div className="flex justify-between items-center">
                  <label
                    className="font-label-md text-[12px] text-text-primary"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Link
                    className="font-label-sm text-[11px] text-secondary hover:underline"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <span
                    className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors"
                    style={{ fontSize: "18px" }}
                  >
                    lock
                  </span>
                  <input
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    disabled={isSubmitting}
                    className="w-full pl-[36px] pr-[36px] py-1.5 bg-white border border-border-soft rounded-lg font-body-md text-[14px] focus:ring-1 focus:ring-secondary focus:border-secondary transition-all outline-none"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-sm top-1/2 -translate-y-1/2 text-outline hover:text-text-primary transition-colors"
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "18px" }}
                    >
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm font-medium text-error mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center mt-sm">
                <input
                  id="remember-me"
                  type="checkbox"
                  disabled={isSubmitting}
                  className="w-3.5 h-3.5 text-primary-container border-border-soft rounded focus:ring-primary-container transition-all"
                  {...register("rememberMe")}
                />
                <label
                  className="ml-xs font-body-sm text-[12px] text-on-surface-variant select-none cursor-pointer"
                  htmlFor="remember-me"
                >
                  Remember this device
                </label>
              </div>

              {globalError && (
                <div className="p-3 rounded-md bg-error-container text-on-error-container text-sm font-medium">
                  {globalError}
                </div>
              )}

              <div className="flex flex-col gap-xs pt-xs">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-primary-container text-on-primary font-label-md text-[13px] py-1.5 rounded-lg shadow-sm hover:bg-primary transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span
                      className="material-symbols-outlined animate-spin mr-2"
                      style={{ fontSize: "18px" }}
                    >
                      sync
                    </span>
                  ) : null}
                  Sign In
                </button>
                <div className="relative flex items-center py-1">
                  <div className="flex-grow border-t border-border-soft"></div>
                  <span className="flex-shrink mx-sm font-label-sm text-[9px] text-outline uppercase tracking-wider">
                    OR CONTINUE WITH
                  </span>
                  <div className="flex-grow border-t border-border-soft"></div>
                </div>
                <button
                  type="button"
                  onClick={handleSSO}
                  disabled={isSubmitting}
                  className="w-full bg-white text-secondary border border-secondary font-label-md text-[13px] py-1.5 rounded-lg hover:bg-risk-low-tint transition-all duration-200 flex items-center justify-center gap-xs group active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span
                    className="material-symbols-outlined group-hover:rotate-12 transition-transform"
                    style={{ fontVariationSettings: "'FILL' 1", fontSize: "18px" }}
                  >
                    corporate_fare
                  </span>
                  Sign in with Corporate SSO
                </button>
              </div>
            </form>

            <div className="mt-sm p-xs bg-risk-very-high-tint rounded-md border border-risk-very-high/10 flex gap-xs items-start">
              <span
                className="material-symbols-outlined text-risk-very-high flex-shrink-0"
                style={{ fontSize: "16px" }}
              >
                gavel
              </span>
              <p className="font-label-sm text-[10px] text-risk-very-high leading-tight">
                <strong>Security Notice:</strong> Authorized users only. All activities are monitored and logged. Unauthorized access attempts are subject to legal action under Corporate Governance Policy.
              </p>
            </div>
          </div>

          <footer className="mt-sm text-center">
            <p className="font-label-sm text-[11px] text-on-surface-variant/60 m-0">
              © 2026 PNM IT Risk and Digital.
            </p>
            <div className="text-[10px] text-on-surface-variant/60 mt-0.5">
              All rights reserved. <br className="lg:hidden" />
              <Link className="hover:text-secondary mx-xs transition-colors" href="#">
                Privacy Policy
              </Link>{" "}
              •{" "}
              <Link className="hover:text-secondary mx-xs transition-colors" href="#">
                Terms of Service
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
