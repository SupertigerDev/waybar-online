import "./root.css";
const appElement = document.getElementById("app")!;

export const createRootPage = async () => {
  appElement.innerHTML = `
    <iframe id="waybar-iframe" src="${
      import.meta.env.BASE_URL
    }/waybar"></iframe>
  `;
};
