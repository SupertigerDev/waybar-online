import type { WaybarConfig } from "../configParser";
import type { Module } from "../createModule";

export const createClockModule = (
  module: Module,
  config: WaybarConfig["clock"]
) => {
  const update = () => {
    const date = new Date();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    module.element.innerHTML = `${hours}:${minutes}`;
  };

  update();
  setInterval(update, 1000);
};
