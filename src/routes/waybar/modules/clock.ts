import type { WaybarConfig } from "../configParser";
import type { Module } from "../createModule";
import { createLabel } from "../Label";

export const createClockModule = (
  module: Module,
  config: WaybarConfig["clock"]
) => {
  const label = createLabel({
    config,
    module,
    clickable: true,
    update: () => update(),
    defaultFormat: "{:%H:%M}",
    interval: 1000,
  });

  module.element.appendChild(label.element);
  const update = () => {
    label.set({});
  };

  update();
  setInterval(update, 1000);
};
