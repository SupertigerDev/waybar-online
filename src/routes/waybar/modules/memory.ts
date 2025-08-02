import type { WaybarConfig } from "../configParser";
import type { Module } from "../createModule";
import { createLabel } from "../Label";

export const createMemoryModule = (
  module: Module,
  config: WaybarConfig["memory"]
) => {
  const label = createLabel({
    interval: 1000,
    update: () => update(),
    config: config!,
    module,
  });

  module.element.appendChild(label.element);

  const update = async () => {
    const usage = Math.round(Math.random() * 100);

    label.set({
      "": usage,
    });
  };

  update();
};
