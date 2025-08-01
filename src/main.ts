if (location.pathname === "/waybar") {
  import("./routes/waybar/waybar").then(({ createWaybarPage }) =>
    createWaybarPage()
  );
}

if (location.pathname === "/") {
  import("./routes/root/root").then(({ createRootPage }) => createRootPage());
}
