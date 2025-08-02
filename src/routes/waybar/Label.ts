import type { Module } from "./createModule";
import { clamp, replaceTextWithUnicode } from "./utils";
import { format as formatDate } from "date-fns";

interface LabelOpts {
  config?: {
    [key: string]: any;
    format?: string;
    states?: Record<string, number>;
    "format-icons"?: string[];
  };
  clickable?: boolean;
  defaultFormat?: string;
  module: Module;
  interval?: number;
  update: () => void;
}
export const createLabel = (opts: LabelOpts) => {
  let alt = false;
  let format = opts.defaultFormat || "";

  const getFormat = () => {
    if (!opts.config) return undefined;
    if (!format) {
      return opts.config?.format || undefined;
    }
    return format;
  };

  const setFormat = (value?: string) => (format = value || "");

  const element = document.createElement("span");
  if (opts.interval && opts.update) {
    setInterval(opts.update, opts.interval);
  }

  const set = (data: Record<string, any>) => {
    const format = getFormat() as string | undefined;
    if (!format) {
      console.error("No format found");
      return "N/A";
    }

    const regex = /\{(\w+)?\}|{:(.*?)}/g;
    const result = format.replace(regex, (match, key, dateFmt) => {
      if (match === "{}" || key !== undefined) {
        return data[key || ""] !== undefined ? data[key || ""] : match;
      }

      if (dateFmt !== undefined) {
        const now = new Date();

        const convertedFormat = dateFmt
          .replace(/%Y/g, "yyyy")
          .replace(/%m/g, "MM")
          .replace(/%d/g, "dd")
          .replace(/%H/g, "HH")
          .replace(/%M/g, "mm")
          .replace(/%S/g, "ss");

        return formatDate(now, convertedFormat);
      }

      return match;
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

  const getState = (value: number, lesser: boolean) => {
    const states = opts.config?.states;
    if (typeof states !== "object") {
      return "";
    }
    const entries = Object.entries(states) as unknown as [string, number][];

    entries.sort((a, b) => {
      if (lesser) {
        return a[1] - b[1];
      }
      return b[1] - a[1];
    });
    let valid_state = "";
    entries.forEach((state) => {
      if ((lesser ? value <= state[1] : value >= state[1]) && !valid_state) {
        opts.module.element.classList.add(state[0]);
        valid_state = state[0];
      } else {
        opts.module.element.classList.remove(state[0]);
      }
    });
    return valid_state;
  };

  if (opts.clickable) {
    element.style.cursor = "pointer";

    element.onclick = () => {
      alt = !alt;
      if (alt && opts.config?.["format-alt"]) {
        setFormat(opts.config?.["format-alt"]);
      } else {
        setFormat(opts.config?.format || opts.defaultFormat || "");
      }
      opts.update();
    };
  }

  return {
    element,
    set,
    getIcon,
    getState,
    setFormat,
  };
};
