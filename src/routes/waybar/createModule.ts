export type Module = ReturnType<typeof createModule>;

export const createModule = (name: string) => {
  const element = document.createElement("div");
  element.id = name;
  element.className = "module";

  return {
    element,
  };
};
