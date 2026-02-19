"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { getRecaptchaToken } from "@/components/providers/recaptcha-provider";
import { AuthBackButton } from "@/components/shared/back-to-home";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { register, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirm_password: "",
  });

  const hashPassword = async (pwd: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(pwd);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setError(null);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Please enter your full name.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      errors.email = "Please enter a valid email address.";
    if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters.";
    if (formData.password !== formData.confirm_password)
      errors.confirm_password = "Passwords do not match";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFormErrors({});

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const captcha_token = await getRecaptchaToken("signup");
      const names = formData.name.split(" ");
      const first_name = names[0] || "";
      const last_name = names.slice(1).join(" ");
      const username =
        formData.email.split("@")[0] + Math.floor(Math.random() * 1000);

      const password_hash = await hashPassword(formData.password);

      await register(
        {
          username,
          first_name,
          last_name,
          email: formData.email,
          password_hash,
          password_hash_confirmation: password_hash,
          meta: { company: formData.company },
        },
        captcha_token,
      );

      router.push("/dashboard");
    } catch (err: any) {
      // Map API errors to user-friendly messages
      if (err && err.code === 409) {
        setFormErrors((prev) => ({
          ...prev,
          email: "An account with that email already exists.",
        }));
        setError(
          'An account with that email already exists. Try signing in or use "Forgot password".',
        );
      } else if (err && err.code === 422 && err.errors) {
        // validation errors from backend
        const backendErrors: Record<string, string> = {};
        Object.entries(err.errors).forEach(([key, val]) => {
          const message = Array.isArray(val) ? (val[0] as string) : String(val);
          // map backend field names to form field keys
          if (key === "password_hash") backendErrors["password"] = message;
          else if (key === "password_hash_confirmation")
            backendErrors["confirm_password"] = message;
          else if (key === "first_name" || key === "last_name")
            backendErrors["name"] = message;
          else backendErrors[key] = message;
        });
        setFormErrors((prev) => ({ ...prev, ...backendErrors }));
        setError("Please fix the highlighted fields.");
      } else if (
        err &&
        typeof err.message === "string" &&
        /already exists|taken|duplicate/i.test(err.message)
      ) {
        setError("An account with that email already exists. Try signing in.");
      } else if (
        err &&
        (err.code === 500 ||
          /smtp|mailer|transportexception|Failed to authenticate on SMTP/i.test(
            err.message || "",
          ))
      ) {
        setError(
          "Registration failed because the email service is unavailable. Your account may or may not have been created — please try again later or contact support@visionspeakai.com.",
        );
      } else {
        setError(err?.message || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://api.visionspeakai.com/auth/google/redirect";
  };

  const handleGithubLogin = () => {
    window.location.href = "https://api.visionspeakai.com/auth/github/redirect";
  };

  const passwordStrength =
    formData.password.length >= 12
      ? "strong"
      : formData.password.length >= 8
        ? "medium"
        : "weak";

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4 py-12 relative overflow-hidden'>
      {/* Back to home button + logo */}
      <AuthBackButton />

      {/* Animated Background Gradients */}
      <div className='absolute inset-0 -z-10'>
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className='absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-transparent rounded-full blur-3xl'
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className='absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-gradient-to-tl from-cyan-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl'
        />
      </div>

      {/* Large 3D Text BEHIND everything */}
      <div className='absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden'>
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1 }}
          className='text-[180px] md:text-[250px] lg:text-[320px] font-black uppercase leading-none select-none'
          style={{
            background:
              "linear-gradient(135deg, #8b5cf6 0%, #00f2ff 50%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 100px rgba(139, 92, 246, 0.4)",
            letterSpacing: "-0.05em",
          }}
        >
          SIGNUP
        </motion.h1>
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='w-full max-w-md relative z-10'
      >
        {/* Form Card - elevated above the text */}
        <div className='relative'>
          {/* Dramatic glow behind card */}
          <div className='absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl scale-105' />

          <div className='relative glass-effect-strong border-2 border-white/10 p-10 rounded-3xl shadow-[0_0_80px_rgba(139,92,246,0.2)]'>
            <div className='mb-8'>
              <h1 className='text-4xl font-black uppercase tracking-tight mb-2 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent'>
                Create Account
              </h1>
              <p className='text-slate-400 text-sm'>
                Join the future of AI-powered communication
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-5'>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-xl font-medium backdrop-blur-sm'
                >
                  {error}
                </motion.div>
              )}

              {/* Name */}
              <div className='space-y-2'>
                <label
                  htmlFor='name'
                  className='block text-xs font-black uppercase tracking-widest text-slate-400'
                >
                  Full Name
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Enter your full name'
                  required
                  className='w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all hover:bg-white/[0.07]'
                />
                {formErrors.name && (
                  <p className='text-red-400 text-xs mt-1'>{formErrors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className='space-y-2'>
                <label
                  htmlFor='email'
                  className='block text-xs font-black uppercase tracking-widest text-slate-400'
                >
                  Email Address
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='you@visionspeakai.com'
                  required
                  className='w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all hover:bg-white/[0.07]'
                />
                {formErrors.email && (
                  <p className='text-red-400 text-xs mt-1'>
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Company */}
              <div className='space-y-2'>
                <label
                  htmlFor='company'
                  className='block text-xs font-black uppercase tracking-widest text-slate-400'
                >
                  Company <span className='text-slate-600'>(Optional)</span>
                </label>
                <input
                  id='company'
                  name='company'
                  type='text'
                  value={formData.company}
                  onChange={handleChange}
                  placeholder='Your Company'
                  className='w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all hover:bg-white/[0.07]'
                />
              </div>

              {/* Password */}
              <div className='space-y-2'>
                <label
                  htmlFor='password'
                  className='block text-xs font-black uppercase tracking-widest text-slate-400'
                >
                  Password
                </label>
                <div className='relative'>
                  <input
                    id='password'
                    name='password'
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='••••••••••••'
                    required
                    className='w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all hover:bg-white/[0.07]'
                  />
                  {formErrors.password && (
                    <p className='text-red-400 text-xs mt-1'>
                      {formErrors.password}
                    </p>
                  )}
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1'
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Password Strength */}
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className='space-y-2 pt-2'
                  >
                    <div className='flex gap-1'>
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            (passwordStrength === "strong" && i <= 3) ||
                            (passwordStrength === "medium" && i <= 2) ||
                            (passwordStrength === "weak" && i <= 1)
                              ? i <= 1
                                ? "bg-red-400"
                                : i <= 2
                                  ? "bg-yellow-400"
                                  : "bg-lime-400"
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                    <p className='text-xs text-slate-400 font-semibold'>
                      {passwordStrength === "strong"
                        ? "✓ Strong password"
                        : passwordStrength === "medium"
                          ? "⚡ Medium strength"
                          : "⚠ Weak password"}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Confirm Password */}
              <div className='space-y-2'>
                <label
                  htmlFor='confirm_password'
                  className='block text-xs font-black uppercase tracking-widest text-slate-400'
                >
                  Confirm Password
                </label>
                <input
                  id='confirm_password'
                  name='confirm_password'
                  type='password'
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder='••••••••••••'
                  required
                  className='w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/20 transition-all hover:bg-white/[0.07]'
                />
                {formErrors.confirm_password && (
                  <p className='text-red-400 text-xs mt-1'>
                    {formErrors.confirm_password}
                  </p>
                )}
              </div>

              {/* Terms */}
              <label className='flex items-start gap-3 cursor-pointer group pt-2'>
                <input
                  type='checkbox'
                  required
                  className='w-5 h-5 rounded bg-white/10 border border-white/20 checked:bg-cyan-500 checked:border-cyan-500 transition-colors mt-0.5'
                />
                <span className='text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors'>
                  I agree to the{" "}
                  <a
                    href='/terms'
                    className='text-cyan-400 hover:text-cyan-300 font-semibold'
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href='/privacy'
                    className='text-cyan-400 hover:text-cyan-300 font-semibold'
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>

              {/* Submit */}
              <button
                type='submit'
                className='w-full glow-button disabled:opacity-50 flex items-center justify-center gap-2 group py-4 text-base font-black uppercase tracking-wider'
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className='w-5 h-5 animate-spin' />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className='my-8 flex items-center gap-4'>
              <div className='flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />
              <span className='text-xs text-slate-500 font-bold uppercase tracking-widest'>
                OR
              </span>
              <div className='flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />
            </div>

            {/* OAuth Buttons */}
            <div className='grid grid-cols-2 gap-3'>
              <button
                type='button'
                onClick={handleGoogleLogin}
                className='flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass-effect border border-white/10 hover:border-cyan-400/30 hover:bg-white/5 transition-all text-white font-semibold text-sm group'
              >
                <svg
                  className='w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
                  <path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
                  <path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' />
                  <path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' />
                </svg>
                Google
              </button>
              <button
                type='button'
                onClick={handleGithubLogin}
                className='flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass-effect border border-white/10 hover:border-cyan-400/30 hover:bg-white/5 transition-all text-white font-semibold text-sm group'
              >
                <svg
                  className='w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
                </svg>
                GitHub
              </button>
            </div>

            {/* Sign In Link */}
            <p className='text-center text-slate-400 text-sm mt-8'>
              Already have an account?{" "}
              <Link
                href='/auth/login'
                className='text-cyan-400 hover:text-cyan-300 font-bold transition-colors'
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
