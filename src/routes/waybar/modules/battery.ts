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
    module,
  });

  module.element.appendChild(label.element);

  const getState = (battery: {level: number, charging: boolean}) => {
    let status = "Unknown";

    if (battery.charging && battery.level < 1) {
      status = "Charging";
    }
    if (!battery.charging && battery.level === 1) {
      status = "Full";
    }

    if (battery.charging && battery.level === 1) {
      status = "Plugged"
    }
    if (!battery.charging && battery.level < 1) {
      status = "Discharging"
    }
    return status;
  }

  let lastStatus = "Unknown"
  const update = async () => {
    // const battery = await navigator.getBattery();

    const battery = {
      level: Math.random(),
      charging: Math.random() > 0.5,
    };
    const batteryPercent = Math.round(battery.level * 100);


    const status = getState(battery);

    
    module.element.classList.remove(lastStatus.toLowerCase());
    module.element.classList.add(status.toLowerCase())
    lastStatus = status;
    module.element.title = status;
    const state = label.getState(batteryPercent, true);
    console.log(state)

    label.set({
      capacity: batteryPercent,
      icon: label.getIcon(batteryPercent),
    });
  };

  update();
};
