import type { WaybarConfig } from "../configParser";
import type { Module } from "../createModule";
import { createLabel } from "../Label";

export const createBatteryModule = (
  module: Module,
  config: WaybarConfig["battery"]
) => {
  const label = createLabel({
    interval: 1000,
    update: () => update(),
    config: config!,
  });

  module.element.appendChild(label.element);

  const update = async () => {
    // const battery = await navigator.getBattery();

    const battery = {
      level: Math.random(),
      charging: Math.random() > 0.5,
    };

    let state = "Unknown";

    if (battery.charging && battery.level < 1) {
      state = "Charging";
    }
    if (battery.charging && battery.level === 1) {
      state = "Full";
    }

    const charging = battery.charging;
    const batteryPercent = Math.round(battery.level * 100);

    if (charging) {
      module.element.classList.add("charging");
    } else {
      module.element.classList.remove("charging");
    }

    label.set({
      capacity: batteryPercent,
      icon: label.getIcon(batteryPercent),
    });
  };

  update();
};
