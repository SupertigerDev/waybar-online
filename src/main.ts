import { createRootPage } from "./routes/root";
import { createWaybarPage } from "./routes/waybar";

if (location.pathname === "/waybar") {
  createWaybarPage();
}

if (location.pathname === "/") {
  createRootPage();
}
