import { parse } from "jsonc-parser";

/**
 * A general interface for icon mappings, where a key maps to a single icon string or an array of icon strings.
 */
interface IconMap {
  [key: string]: string | string[];
}

/**
 * Common configuration properties for many Waybar modules.
 */
interface BaseModule {
  format?: string;
  "format-icons"?: IconMap;
  tooltip?: boolean;
}

/**
 * Defines the states and icons for a module.
 */
interface ModuleWithStates extends BaseModule {
  states?: {
    [state: string]: number;
  };
  "format-critical"?: string;
  "format-alt"?: string;
}

/**
 * Interface for the `sway/workspaces` module.
 * Note: This module is commented out in the original JSON, but the interface is included for completeness.
 */
interface SwayWorkspacesModule extends BaseModule {
  "disable-scroll"?: boolean;
  "all-outputs"?: boolean;
  "warp-on-scroll"?: boolean;
  "format-icons"?: {
    [key: string]: string;
  };
}

/**
 * Interface for the `keyboard-state` module.
 */
interface KeyboardStateModule extends BaseModule {
  numlock?: boolean;
  capslock?: boolean;
  "format-icons"?: {
    locked: string;
    unlocked: string;
  };
}

/**
 * Interface for the `sway/mode` module.
 */
interface SwayModeModule {
  format?: string;
}

/**
 * Interface for the `sway/scratchpad` module.
 */
interface SwayScratchpadModule extends BaseModule {
  "show-empty"?: boolean;
  "format-icons"?: string[];
  "tooltip-format"?: string;
}

/**
 * Interface for the `mpd` module.
 */
interface MpdModule extends BaseModule {
  "format-disconnected"?: string;
  "format-stopped"?: string;
  "unknown-tag"?: string;
  interval?: number;
  "consume-icons"?: {
    on: string;
  };
  "random-icons"?: {
    on: string;
    off: string;
  };
  "repeat-icons"?: {
    on: string;
  };
  "single-icons"?: {
    on: string;
  };
  "state-icons"?: {
    paused: string;
    playing: string;
  };
  "tooltip-format"?: string;
  "tooltip-format-disconnected"?: string;
}

/**
 * Interface for the `idle_inhibitor` module.
 */
interface IdleInhibitorModule extends BaseModule {
  "format-icons"?: {
    activated: string;
    deactivated: string;
  };
}

/**
 * Interface for the `tray` module.
 */
interface TrayModule {
  "icon-size"?: number;
  spacing?: number;
  icons?: {
    [appName: string]: string;
  };
}

/**
 * Interface for the `clock` module.
 */
interface ClockModule {
  timezone?: string;
  "tooltip-format"?: string;
  "format-alt"?: string;
}

/**
 * Interface for the `cpu` module.
 */
interface CpuModule extends BaseModule {
  tooltip?: boolean;
}

/**
 * Interface for the `memory` module.
 */
interface MemoryModule extends BaseModule {}

/**
 * Interface for the `temperature` module.
 */
interface TemperatureModule extends ModuleWithStates {
  "thermal-zone"?: number;
  "hwmon-path"?: string;
  "critical-threshold"?: number;
  "format-icons"?: string[];
}

/**
 * Interface for the `backlight` module.
 */
interface BacklightModule extends BaseModule {
  device?: string;
  "format-icons"?: string[];
}

/**
 * Interface for the `battery` module.
 */
interface BatteryModule extends ModuleWithStates {
  bat?: string; // Used for battery#bat2
  "format-full"?: string;
  "format-charging"?: string;
  "format-plugged"?: string;
  "format-good"?: string;
  "format-icons"?: string[];
}

/**
 * Interface for the `power-profiles-daemon` module.
 */
interface PowerProfilesDaemonModule extends BaseModule {
  tooltip?: boolean;
  "tooltip-format"?: string;
  "format-icons"?: {
    default: string;
    performance: string;
    balanced: string;
    "power-saver": string;
  };
}

/**
 * Interface for the `network` module.
 */
interface NetworkModule {
  interface?: string;
  "format-wifi"?: string;
  "format-ethernet"?: string;
  "tooltip-format"?: string;
  "format-linked"?: string;
  "format-disconnected"?: string;
  "format-alt"?: string;
}

/**
 * Interface for the `pulseaudio` module.
 */
interface PulseaudioModule extends BaseModule {
  "scroll-step"?: number;
  "format-bluetooth"?: string;
  "format-bluetooth-muted"?: string;
  "format-muted"?: string;
  "format-source"?: string;
  "format-source-muted"?: string;
  "format-icons"?: {
    headphone: string;
    "hands-free": string;
    headset: string;
    phone: string;
    portable: string;
    car: string;
    default: string[];
  };
  "on-click"?: string;
}

/**
 * Interface for the `custom/media` module.
 */
interface CustomMediaModule extends BaseModule {
  "return-type"?: "json" | "text";
  "max-length"?: number;
  "format-icons"?: {
    [key: string]: string;
  };
  escape?: boolean;
  exec?: string;
}

/**
 * Interface for the `custom/power` module.
 */
interface CustomPowerModule extends BaseModule {
  menu?: string;
  "menu-file"?: string;
  "menu-actions"?: {
    shutdown: string;
    reboot: string;
    suspend: string;
    hibernate: string;
  };
}

/**
 * The main interface for the entire Waybar configuration file.
 * It combines the main settings with a generic index signature for module configurations.
 */
export interface WaybarConfig {
  layer?: "top" | "bottom" | "overlay";
  position?: "top" | "bottom" | "left" | "right";
  height?: number;
  width?: number;
  spacing?: number;
  "modules-left"?: string[];
  "modules-center"?: string[];
  "modules-right"?: string[];

  // Module-specific configurations
  "sway/workspaces"?: SwayWorkspacesModule;
  "sway/mode"?: SwayModeModule;
  "sway/scratchpad"?: SwayScratchpadModule;
  "keyboard-state"?: KeyboardStateModule;
  mpd?: MpdModule;
  idle_inhibitor?: IdleInhibitorModule;
  tray?: TrayModule;
  clock?: ClockModule;
  cpu?: CpuModule;
  memory?: MemoryModule;
  temperature?: TemperatureModule;
  backlight?: BacklightModule;
  battery?: BatteryModule;
  "battery#bat2"?: BatteryModule;
  "power-profiles-daemon"?: PowerProfilesDaemonModule;
  network?: NetworkModule;
  pulseaudio?: PulseaudioModule;
  "custom/media"?: CustomMediaModule;
  "custom/power"?: CustomPowerModule;
}

export const parseConfig = async () => {
  const response = await fetch("/resources/config.jsonc");
  const jsoncString = await response.text();
  return parse(jsoncString) as WaybarConfig;
};
