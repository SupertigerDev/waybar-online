import { parseConfig, type WaybarConfig } from "./configParser";
import { createModule, type Module } from "./createModule";
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

  const loadModule = async (
    name: string,
    createModuleBase: (name: string) => any,
    loadIntoElement: HTMLElement,
    config: WaybarConfig
  ) => {
    if (!modules[name as Modules]) {
      console.error(`Module ${name} not found`);
      return;
    }
    const module = createModuleBase(name);
    loadIntoElement.appendChild(module.element);
    const createModule = await modules[name as Modules]?.();

    createModule(module, (config as any)[name]);
    console.log(`Loaded module ${name}`);
  };

  const loadModules = async (
    enabledModules: ModuleArray,
    modulesElement: HTMLElement
  ) => {
    enabledModules.forEach(async (moduleName) => {
      loadModule(moduleName, createModule, modulesElement, config);
    });
  };
  loadModules(moduleLeft, modulesLeftElement);
  loadModules(moduleCenter, modulesCenterElement);
  loadModules(moduleRight, modulesRightElement);
};
