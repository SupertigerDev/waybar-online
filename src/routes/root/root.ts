import "./root.css";
const appElement = document.getElementById("app")!;

export const createRootPage = async () => {
  appElement.innerHTML = `
    <iframe id="waybar-iframe" src="/waybar"></iframe>
  `;
};
