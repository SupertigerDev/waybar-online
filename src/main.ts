const pathname = location.pathname.endsWith("/")
  ? location.pathname.slice(0, -1)
  : location.pathname;

if (pathname === import.meta.env.BASE_URL + "/waybar") {
  import("./routes/waybar/waybar").then(({ createWaybarPage }) =>
    createWaybarPage()
  );
}

if (pathname === import.meta.env.BASE_URL) {
  import("./routes/root/root").then(({ createRootPage }) => createRootPage());
}
