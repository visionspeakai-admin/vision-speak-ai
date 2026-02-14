import { useEffect, useState } from "react";
import { api } from "@/lib/api";

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

export function useUserPlan() {
  const [plan, setPlan] = useState<UserPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const response = await api.get<UserPlan>("/payments/last-plan");
        if (response.status === "success" && response.data) {
          setPlan(response.data);
        }
      } catch (err: any) {
        console.error("Failed to fetch user plan:", err);
        // Don't set error if user doesn't have a plan yet
        if (err.status !== 404) {
          setError(err.message || "Failed to fetch plan");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPlan();
  }, []);

  return { plan, isLoading, error };
}
