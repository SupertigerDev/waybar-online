import { CssTypes, parse, stringify } from "@adobe/css-tools";

export const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const fetchFontAwesomeStylesheet = async () => {
  const raw = await fetch("/fontawesome/css/fontawesome.min.css").then((res) =>
    res.text()
  );
  return raw;
};

export const tryCatch = (tryTo: () => string, ifCatch: string) => {
  try {
    return tryTo();
  } catch (e) {
    return ifCatch;
  }
};
const css = await fetchFontAwesomeStylesheet();

function unicodeToHexMap() {
  const map = new Map<string, string>();

  const parsed = parse(css);
  parsed.stylesheet.rules.forEach((rule) => {
    if (rule.type === CssTypes.rule) {
      const declaration = rule.declarations[0];
      if (declaration.type === CssTypes.declaration) {
        if (declaration.property !== "--fa") return;
        const selector = rule.selectors[0];
        const value = declaration.value.slice(1, -1);

        try {
          const unicodeChar = String.fromCodePoint(
            parseInt(value.slice(1), 16)
          );
          if (!Number.isNaN(parseInt(unicodeChar))) return;
          map.set(unicodeChar, value);
        } catch {}
      }
    }
  });

  return map;
}
const unicodeArray = [...unicodeToHexMap().keys()];

const unicodeRegex = new RegExp(
  unicodeArray.map((x) => `\\${x}`).join("|"),
  "g"
);

export const replaceTextWithUnicode = (text: string) => {
  let newText = text.replace(
    unicodeRegex,
    (char) => `<span class="fa">${char}</span>`
  );
  return newText;
};
