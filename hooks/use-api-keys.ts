import { useState, useEffect } from "react";

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  fullKey: string;
  created: string;
  lastUsed: string;
  calls: string;
  status: "active" | "inactive";
}

const STORAGE_KEY = "vision_speak_api_keys";
const NEWLY_GENERATED_KEY = "vision_speak_new_api_key";

export function useApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [newlyGeneratedKey, setNewlyGeneratedKey] = useState<ApiKey | null>(
    null,
  );
  const [isHydrated, setIsHydrated] = useState(false);

  // Load keys from session storage on mount
  useEffect(() => {
    const storedKeys = sessionStorage.getItem(STORAGE_KEY);
    const storedNewKey = sessionStorage.getItem(NEWLY_GENERATED_KEY);

    if (storedKeys) {
      try {
        setKeys(JSON.parse(storedKeys));
      } catch (error) {
        console.error("Failed to parse stored keys:", error);
      }
    }

    if (storedNewKey) {
      try {
        setNewlyGeneratedKey(JSON.parse(storedNewKey));
      } catch (error) {
        console.error("Failed to parse new key:", error);
      }
    }

    setIsHydrated(true);
  }, []);

  // Save keys to session storage whenever they change
  const updateKeys = (newKeys: ApiKey[]) => {
    setKeys(newKeys);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newKeys));
  };

  // Save newly generated key to session storage
  const saveNewGeneratedKey = (key: ApiKey) => {
    setNewlyGeneratedKey(key);
    sessionStorage.setItem(NEWLY_GENERATED_KEY, JSON.stringify(key));
  };

  // Clear newly generated key from storage and state
  const clearNewGeneratedKey = () => {
    setNewlyGeneratedKey(null);
    sessionStorage.removeItem(NEWLY_GENERATED_KEY);
  };

  // Add key to the list
  const addKey = (key: ApiKey) => {
    const newKeys = [key, ...keys];
    updateKeys(newKeys);
  };

  // Remove key from the list
  const removeKey = (keyId: string) => {
    const newKeys = keys.filter((k) => k.id !== keyId);
    updateKeys(newKeys);
  };

  return {
    keys,
    newlyGeneratedKey,
    isHydrated,
    updateKeys,
    addKey,
    removeKey,
    saveNewGeneratedKey,
    clearNewGeneratedKey,
  };
}
