import { parse } from "jsonc-parser";

export interface WaybarConfig {
  height: number;
  spacing: number;
  "modules-left": string[];
  "modules-center": string[];
  "modules-right": string[];
  "keyboard-state": KeyboardState;
  "sway/mode": Memory;
  "sway/scratchpad": SwayScratchpad;
  mpd: Mpd;
  idle_inhibitor: IdleInhibitor;
  tray: Tray;
  clock: Clock;
  cpu: CPU;
  memory: Memory;
  temperature: Temperature;
  backlight: Backlight;
  battery: Battery;
  "battery#bat2": BatteryBat2;
  "power-profiles-daemon": PowerProfilesDaemon;
  network: Network;
  pulseaudio: Pulseaudio;
  "custom/media": CustomMedia;
  "custom/power": CustomPower;
}
interface Backlight {
  format: string;
  "format-icons": string[];
}
interface Battery {
  states: States;
  format: string;
  "format-full": string;
  "format-charging": string;
  "format-plugged": string;
  "format-alt": string;
  "format-icons": string[];
  [key: string]: any; // Allow additional properties
}
interface States {
  warning: number;
  critical: number;
  [key: string]: number; // Allow additional properties
}
interface BatteryBat2 {
  bat: string;
}
interface Clock {
  "tooltip-format": string;
  "format-alt": string;
}
interface CPU {
  format: string;
  tooltip: boolean;
}
interface CustomMedia {
  format: string;
  "return-type": string;
  "max-length": number;
  "format-icons": CustomMediaFormatIcons;
  escape: boolean;
  exec: string;
}
interface CustomMediaFormatIcons {
  spotify: string;
  default: string;
}
interface CustomPower {
  format: string;
  tooltip: boolean;
  menu: string;
  "menu-file": string;
  "menu-actions": MenuActions;
}
interface MenuActions {
  shutdown: string;
  reboot: string;
  suspend: string;
  hibernate: string;
}

interface IdleInhibitor {
  format: string;
  "format-icons": IdleInhibitorFormatIcons;
}

interface IdleInhibitorFormatIcons {
  activated: string;
  deactivated: string;
}

interface KeyboardState {
  numlock: boolean;
  capslock: boolean;
  format: string;
  "format-icons": KeyboardStateFormatIcons;
}

interface KeyboardStateFormatIcons {
  locked: string;
  unlocked: string;
}

interface Memory {
  format: string;
}

interface Mpd {
  format: string;
  "format-disconnected": string;
  "format-stopped": string;
  "unknown-tag": string;
  interval: number;
  "consume-icons": Icons;
  "random-icons": RandomIcons;
  "repeat-icons": Icons;
  "single-icons": Icons;
  "state-icons": StateIcons;
  "tooltip-format": string;
  "tooltip-format-disconnected": string;
}

interface Icons {
  on: string;
}

interface RandomIcons {
  off: string;
  on: string;
}

interface StateIcons {
  paused: string;
  playing: string;
}

interface Network {
  "format-wifi": string;
  "format-ethernet": string;
  "tooltip-format": string;
  "format-linked": string;
  "format-disconnected": string;
  "format-alt": string;
}

interface PowerProfilesDaemon {
  format: string;
  "tooltip-format": string;
  tooltip: boolean;
  "format-icons": PowerProfilesDaemonFormatIcons;
}

interface PowerProfilesDaemonFormatIcons {
  default: string;
  performance: string;
  balanced: string;
  "power-saver": string;
}

interface Pulseaudio {
  format: string;
  "format-bluetooth": string;
  "format-bluetooth-muted": string;
  "format-muted": string;
  "format-source": string;
  "format-source-muted": string;
  "format-icons": PulseaudioFormatIcons;
  "on-click": string;
}

interface PulseaudioFormatIcons {
  headphone: string;
  "hands-free": string;
  headset: string;
  phone: string;
  portable: string;
  car: string;
  default: string[];
}

interface SwayScratchpad {
  format: string;
  "show-empty": boolean;
  "format-icons": string[];
  tooltip: boolean;
  "tooltip-format": string;
}

interface Temperature {
  "critical-threshold": number;
  format: string;
  "format-icons": string[];
}

interface Tray {
  spacing: number;
}

export const parseConfig = async () => {
  const response = await fetch(
    import.meta.env.BASE_URL + "/resources/config.jsonc"
  );
  const jsoncString = await response.text();
  return parse(jsoncString) as WaybarConfig;
};
