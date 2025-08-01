if (location.pathname === import.meta.env.BASE_URL + "/waybar") {
  import("./routes/waybar/waybar").then(({ createWaybarPage }) =>
    createWaybarPage()
  );
}

if (location.pathname === import.meta.env.BASE_URL) {
  import("./routes/root/root").then(({ createRootPage }) => createRootPage());
}
