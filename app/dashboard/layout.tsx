"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Key,
  Cpu,
  Settings,
  Book,
  LogOut,
  Menu,
  X,
  User,
  Bell,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Key, label: "API Keys", href: "/dashboard/api-keys" },
  { icon: Cpu, label: "Integrations", href: "/dashboard/integrations" },
  { icon: Book, label: "Documentation", href: "/dashboard/documentation" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
  });

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  const handleUpdateProfile = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setIsProfileModalOpen(false);
    }, 1500);
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${(firstName || "U")[0]}${(lastName || "")[0] || ""}`.toUpperCase();
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // prevent body scroll when mobile menu is open
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <div className='min-h-screen bg-background'>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen glass-effect border-r border-white/10 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } flex flex-col z-50`}
      >
        {/* Logo */}
        <div className='h-20 flex items-center justify-between px-4 border-b border-white/10'>
          <Logo
            showText={sidebarOpen}
            src='/images/favicon.webp'
            imageClassName='w-16'
          />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400'
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* User Profile Summary */}
        <div className='px-4 py-6 border-b border-white/5'>
          <div
            className={`flex items-center gap-3 ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <div
              className='relative group cursor-pointer'
              onClick={() => setIsProfileModalOpen(true)}
            >
              <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-electric to-purple-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-cyan-electric/20 border border-white/10 group-hover:scale-105 transition-transform'>
                {getInitials(user?.first_name, user?.last_name)}
              </div>
              <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-obsidian rounded-full' />
            </div>
            {sidebarOpen && (
              <div className='flex-1 min-w-0'>
                <p className='text-xs font-black text-white uppercase tracking-wider truncate'>
                  {user?.first_name} {user?.last_name}
                </p>
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className='text-[10px] font-bold text-cyan-electric/80 hover:text-cyan-electric uppercase tracking-widest block mt-0.5'
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5'
              title={!sidebarOpen ? item.label : ""}
            >
              <item.icon className='w-5 h-5 text-slate-400 group-hover:text-cyan-electric transition-colors' />
              {sidebarOpen && (
                <span className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white'>
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* System Health Snapshot */}
        {sidebarOpen && (
          <div className='px-6 py-4 mx-3 mb-4 rounded-xl bg-white/[0.02] border border-white/5'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-[8px] font-black text-slate-500 uppercase tracking-widest'>
                Neural Load
              </span>
              <span className='text-[8px] font-black text-cyan-electric uppercase tracking-widest'>
                Optimal
              </span>
            </div>
            <div className='h-1 bg-white/5 rounded-full overflow-hidden'>
              <div className='h-full w-2/3 bg-cyan-electric shadow-[0_0_5px_rgba(0,242,255,0.5)]' />
            </div>
          </div>
        )}

        {sidebarOpen && (
          <div className='px-6 py-2 mx-3 mt-auto mb-4 rounded-xl bg-white/[0.02] border border-white/5 text-center'>
            <span className='text-[8px] font-black text-slate-500  tracking-widest'>
              VSpeakX 1.0
            </span>
          </div>
        )}

        {/* Logout */}
        <div className='border-t border-white/5 p-4'>
          <button
            onClick={handleLogout}
            className='w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-500/5 text-slate-500 hover:text-red-400 transition-all group'
          >
            <LogOut className='w-5 h-5 group-hover:scale-110 transition-transform' />
            {sidebarOpen && (
              <span className='text-[10px] font-black uppercase tracking-[0.2em]'>
                Terminate Session
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}
      >
        {/* Top Bar */}
        <header className='sticky top-0 z-40 glass-effect border-b border-white/10 h-20'>
          <div className='h-full px-6 flex items-center justify-between'>
            {/* Mobile menu button (top-left) — hidden on md+ */}
            <div className='flex items-center gap-3'>
              {!mobileMenuOpen && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileMenuOpen(true)}
                  className='md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors relative z-50'
                  aria-label='Open menu'
                >
                  <Menu size={20} />
                </motion.button>
              )}

              {/* keep header spacing on larger screens */}
              <div className='hidden md:block' />
            </div>

            {/* Right Actions */}
            <div className='flex items-center gap-4'>
              {/* Notifications */}
              <button className='p-2 hover:bg-white/10 rounded-lg transition-colors relative'>
                <Bell size={20} className='text-slate-400 hover:text-white' />
                <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full' />
              </button>

              {/* User Menu */}
              <div className='flex items-center gap-3 pl-4 border-l border-white/10'>
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className='w-10 h-10 rounded-full border border-white/20 object-cover'
                  />
                ) : (
                  <div className='w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-bold'>
                    {getInitials(user?.first_name, user?.last_name)}
                  </div>
                )}
                <div className='hidden md:block'>
                  <p className='text-sm font-semibold text-white'>
                    {user?.first_name} {user?.last_name || ""}
                  </p>
                  <p className='text-xs text-slate-400 uppercase'>
                    {user?.current_plan || "Free Plan"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile floating menu overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className='fixed inset-0 z-50 md:hidden'
                style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className='absolute left-4 top-4 right-4 mx-auto max-w-md rounded-xl bg-sidebar p-4 border border-white/6 shadow-2xl'
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                      <Logo imageClassName='w-28' />
                      <div className='text-sm'>
                        <p className='font-semibold text-white'>
                          {user?.first_name} {user?.last_name || ""}
                        </p>
                        <p className='text-xs text-slate-400 uppercase'>
                          {user?.current_plan || "Free Plan"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className='p-2 rounded-lg hover:bg-white/5 text-slate-300'
                      aria-label='Close menu'
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <nav className='flex flex-col gap-2'>
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className='flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-white font-semibold'
                      >
                        <item.icon className='w-5 h-5 text-slate-400' />
                        <span className='text-sm uppercase tracking-wider'>
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </nav>

                  <div className='mt-4 border-t border-white/6 pt-4 flex gap-2'>
                    <Link
                      href='/dashboard'
                      onClick={() => setMobileMenuOpen(false)}
                      className='flex-1 py-2 text-center rounded-lg glow-button text-sm font-bold'
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className='flex-1 py-2 rounded-lg border border-white/10 text-sm font-bold hover:bg-white/5'
                    >
                      Log out
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Page Content */}
        <main className='p-6 md:p-8'>{children}</main>
      </div>

      {/* Profile Edit Modal */}
      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className='sm:max-w-[425px] glass-effect-strong border-white/10 bg-obsidian-dark text-white'>
          <DialogHeader>
            <DialogTitle className='text-xl font-bold flex items-center gap-3'>
              <div className='w-8 h-8 rounded-lg bg-cyan-electric/20 flex items-center justify-center text-cyan-electric'>
                <User size={18} />
              </div>
              Quick Profile Update
            </DialogTitle>
            <DialogDescription className='text-slate-400'>
              Update your basic information. For more settings, visit the
              settings page.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-6 py-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label
                  htmlFor='firstName'
                  className='text-[10px] font-black tracking-widest text-slate-500 uppercase'
                >
                  First Name
                </Label>
                <Input
                  id='firstName'
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  className='bg-white/5 border-white/10 focus:border-cyan-electric transition-all text-white'
                />
              </div>
              <div className='grid gap-2'>
                <Label
                  htmlFor='lastName'
                  className='text-[10px] font-black tracking-widest text-slate-500 uppercase'
                >
                  Last Name
                </Label>
                <Input
                  id='lastName'
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  className='bg-white/5 border-white/10 focus:border-cyan-electric transition-all text-white'
                />
              </div>
            </div>
          </div>

          <DialogFooter className='gap-3'>
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className='px-6 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-xs font-black uppercase tracking-widest text-slate-400 transition-all'
            >
              Close
            </button>
            <button
              disabled={isUpdating}
              onClick={handleUpdateProfile}
              className='glow-button flex-1 flex items-center justify-center gap-2'
            >
              {isUpdating ? (
                <Loader2 className='animate-spin' size={18} />
              ) : null}
              Update Identity
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
