import { clamp, replaceTextWithUnicode } from "./utils";

interface LabelOpts {
  config?: {
    [key: string]: any;
    format?: string;
    "format-icons"?: string[];
  };
  interval?: number;
  update: () => void;
}
export const createLabel = (opts: LabelOpts) => {
  let format = "";

  const getMarkup = () => {
    if (!opts.config) return undefined;
    if (!format) {
      return opts.config?.format || undefined;
    }
    return opts.config["format-" + format] || undefined;
  };

  const element = document.createElement("span");
  if (opts.interval && opts.update) {
    setInterval(opts.update, opts.interval);
  }

  const set = (data: Record<string, any>) => {
    const markup = getMarkup() as string | undefined;
    if (!markup) {
      console.error("No format found");
      return "N/A";
    }
    const result = markup.replace(/\{(\w+)\}/g, (match, key) => {
      return data[key] !== undefined ? data[key] : match;
    });

    element.innerHTML = replaceTextWithUnicode(result);
  };

  const getIcon = (percentage: number, icon?: string, max: number = 0) => {
    const icons = opts.config?.["format-icons"];
    const iconCount = icons?.length || 0;
    const index = clamp(
      percentage / ((max == 0 ? 100 : max) / iconCount),
      0,
      iconCount - 1
    );

    const resIcon = icons?.[Math.round(index)];
    if (!resIcon) return "";

    return resIcon;
  };

  return {
    element,
    set,
    getIcon,
  };
};
