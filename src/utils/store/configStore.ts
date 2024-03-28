import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initConfigs } from "public/generalConfigs";

export type ConfigState = typeof initConfigs;

export type ConfigActions = {
  setConfig: <Key extends keyof ConfigState>(
    config: Key,
    newValue: ConfigState[Key],
  ) => void;
  set: (state: ConfigState & ConfigActions) => void;
};

const configStore = create<ConfigState & ConfigActions>()(
  persist(
    (set, get) => ({
      set: (state) => set(() => ({ ...state })),

      ...initConfigs,
      setConfig: <Key extends keyof typeof initConfigs>(
        config: Key,
        newValue: (typeof initConfigs)[Key],
      ) => {
        let updatedConfigs = get();
        updatedConfigs = { ...updatedConfigs, [config]: newValue };
        set(() => ({ ...updatedConfigs }));
      },
    }),
    {
      name: "config-storage",
    },
  ),
);

export default configStore;
