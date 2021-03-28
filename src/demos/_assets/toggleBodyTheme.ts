function toggleBodyTheme(body: HTMLBodyElement): void {
  if (!body.hasAttribute("theme")) {
    body.setAttribute("theme", "dark");
  } else {
    if (body.getAttribute("theme") === "dark") {
      body.setAttribute("theme", "light");
    } else {
      body.setAttribute("theme", "dark");
    }
  }
}
