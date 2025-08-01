import { parseConfig } from "./configParser";
import { createModule } from "./createModule";
import { modules, type ModuleArray, type Modules } from "./modules";

import "./waybar.css";

const appElement = document.getElementById("app")!;

export const createWaybarPage = async () => {
  const styleElement = document.createElement("link");
  styleElement.rel = "stylesheet";
  styleElement.href = import.meta.env.BASE_URL + "/resources/style.css";
  document.head.appendChild(styleElement);

  const config = await parseConfig();

  appElement.innerHTML = `
  <window id="waybar" style="height: ${config.height}px;">
    <div class="modules" id="modules-left" style="gap: ${config.spacing}px;"></div>
    <div class="modules" id="modules-center" style="gap: ${config.spacing}px;"></div>
    <div class="modules" id="modules-right" style="gap: ${config.spacing}px;"></div>
  </window>`;

  const modulesLeftElement = document.getElementById("modules-left")!;
  const modulesCenterElement = document.getElementById("modules-center")!;
  const modulesRightElement = document.getElementById("modules-right")!;

  const moduleLeft = (config["modules-left"] as ModuleArray) || [];
  const moduleCenter = (config["modules-center"] as ModuleArray) || [];
  const moduleRight = (config["modules-right"] as ModuleArray) || [];

  const loadModules = async (
    enabledModules: ModuleArray,
    modulesElement: HTMLElement
  ) => {
    enabledModules.forEach(async (moduleName) => {
      if (moduleName === "battery") {
        console.log(moduleName);
        const module = createModule("battery");
        modulesElement.appendChild(module.element);
        const createBatteryModule = await modules.battery();
        createBatteryModule(module, config.battery);
      }
      if (moduleName === "clock") {
        console.log(moduleName);
        const module = createModule("clock");
        modulesElement.appendChild(module.element);
        const createClockModule = await modules.clock();
        createClockModule(module, config.clock);
      }
    });
  };
  loadModules(moduleLeft, modulesLeftElement);
  loadModules(moduleCenter, modulesCenterElement);
  loadModules(moduleRight, modulesRightElement);
};
