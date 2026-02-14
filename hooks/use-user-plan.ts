import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/components/providers/auth-provider";

export interface UserPlan {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  price_yearly?: number;
  features?: string[];
  current_plan?: boolean;
}

function titleCaseSlug(slug?: string) {
  if (!slug) return "";
  return slug
    .split(/[-_\s]+/)
    .map((s) => s[0]?.toUpperCase() + s.slice(1))
    .join(" ");
}

export function useUserPlan() {
  const { user } = useAuth();
  const [plan, setPlan] = useState<UserPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchUserPlan = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await api.get<UserPlan>("/payments/last-plan");
        if (mounted && response.status === "success" && response.data) {
          setPlan(response.data);
          return;
        }
      } catch (err: any) {
        // swallow 404 (no plan) and other errors — we'll fallback to user.current_plan
        if (err.status !== 404) {
          console.error("Failed to fetch user plan:", err);
          if (mounted) setError(err.message || "Failed to fetch plan");
        }
      }

      // Fallback: if authenticated user object has `current_plan`, use that
      if (mounted && user?.current_plan) {
        setPlan({
          id: 0,
          slug: user.current_plan,
          name: titleCaseSlug(user.current_plan),
          description: `${titleCaseSlug(user.current_plan)} plan`,
          price: 0,
          features: [],
          current_plan: true,
        });
      } else if (mounted) {
        setPlan(null);
      }

      if (mounted) setIsLoading(false);
    };

    fetchUserPlan();

    return () => {
      mounted = false;
    };
  }, [user?.current_plan]);

  return { plan, isLoading, error };
}
