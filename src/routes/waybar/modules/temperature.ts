import type { WaybarConfig } from "../configParser";
import type { Module } from "../createModule";
import { createLabel } from "../Label";

export const createTemperatureModule = (
  module: Module,
  config: WaybarConfig["temperature"]
) => {
  const label = createLabel({
    interval: 1000,
    update: () => update(),
    config: config!,
    module,
  });

  module.element.appendChild(label.element);

  const update = async () => {
    const temperatureC = Math.round(Math.random() * 90);
    const temperatureF = Math.round(temperatureC * (9 / 5) + 32);

    const criticalThreshold = config["critical-threshold"];

    if (temperatureC >= criticalThreshold) {
      module.element.classList.add("critical");
    } else {
      module.element.classList.remove("critical");
    }

    const maxTemp = criticalThreshold !== undefined ? criticalThreshold : 0;

    label.set({
      temperatureC,
      temperatureF,
      icon: label.getIcon(temperatureC, "", maxTemp),
    });
  };

  update();
};
