import { supportedLocales } from "@arcgis/toolkit/intl";
import { locales as demoLocales } from "../_assets/locales";
import frameHtml from "./frame.html?raw";

const params = new URL(document.baseURI).searchParams;
const requestedLocales = (params.get("locales") ?? "").split(/[\s,]+/).filter(Boolean);
const date = params.get("date") || "2026-11-15";
const status = document.querySelector<HTMLParagraphElement>("#status")!;
let selectedLocales: string[] = [];

try {
  selectedLocales = Intl.getCanonicalLocales(requestedLocales.length ? requestedLocales : [...supportedLocales]);
} catch {
  status.textContent = "Invalid locale list. Provide BCP 47 locale codes, such as en, fr-CA, or ar.";
}

if (!document.querySelector("#pickers")) {
  document.querySelector<HTMLTextAreaElement>("#locales")!.value = requestedLocales.join(", ");
  document.querySelector<HTMLInputElement>("#date")!.value = date;
}

if (selectedLocales.length && document.querySelector("#pickers")) {
  void renderPickers().catch((error: unknown) => {
    status.textContent = `Unable to load date pickers: ${String(error)}`;
  });
} else if (selectedLocales.length) {
  status.textContent = `Comparing ${selectedLocales.length} locales using the same selected date.`;

  for (const build of ["latest", "current"]) {
    const frameParams = new URLSearchParams({
      build,
      locales: selectedLocales.join(","),
      date,
    });
    const frameUrl = new URL(`./frame.html?${frameParams}`, location.href);
    const frame = document.querySelector<HTMLIFrameElement>(`#${build}`)!;
    if (build === "latest") {
      // Raw srcdoc avoids Lumina's HTML transform registering local components in the CDN frame.
      frame.srcdoc = frameHtml.replace("<head>", `<head><base href="${frameUrl.href.replaceAll("&", "&amp;")}">`);
    } else {
      frame.src = frameUrl.href;
    }
  }
}

async function renderPickers(): Promise<void> {
  const isLatest = params.get("build") === "latest";
  const base = "https://cdn.jsdelivr.net/npm/@esri/calcite-components@latest/dist/cdn";

  if (isLatest) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = `${base}/main.css`;
    document.head.append(stylesheet);
  } else {
    await import("../../styles/global/index.scss");
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = isLatest ? `${base}/index.js` : "/src/components/date-picker/date-picker.tsx";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${isLatest ? "@latest from jsDelivr" : "branch source"}.`));
    document.head.append(script);
  });

  await customElements.whenDefined("calcite-date-picker");
  const pickers = document.querySelector<HTMLElement>("#pickers")!;

  for (const locale of selectedLocales) {
    const section = document.createElement("section");
    section.className = "picker";
    section.lang = locale;
    section.dir = demoLocales.find((entry) => entry.code === locale.split("-")[0])?.dir ?? "ltr";

    const heading = document.createElement("h2");
    heading.textContent = locale;

    const picker = document.createElement("calcite-date-picker");
    picker.setAttribute("value", date);
    picker.setAttribute("lang", locale);
    section.append(heading, picker);
    pickers.append(section);
  }

  status.textContent = `${isLatest ? "@latest" : "Current branch"}: ${selectedLocales.length} locales`;
}
