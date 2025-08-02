export type Modules = keyof typeof modules;
export type ModuleArray = Array<keyof typeof modules>;

export const modules = {
  clock: () =>
    import("./modules/clock").then(
      ({ createClockModule }) => createClockModule
    ),
  battery: () =>
    import("./modules/battery").then(
      ({ createBatteryModule }) => createBatteryModule
    ),
  temperature: () =>
    import("./modules/temperature").then(
      ({ createTemperatureModule }) => createTemperatureModule
    ),
  cpu: () =>
    import("./modules/cpu").then(({ createCpuModule }) => createCpuModule),
  memory: () =>
    import("./modules/memory").then(
      ({ createMemoryModule }) => createMemoryModule
    ),
};
