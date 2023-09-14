export const DASHBOARD_LAYOUT_SIZES = {
  height: {
    navbar: 70,
    footer: 70,
  },
  width: {
    sidebar: 280,
  },
};

export const DASHBOARD_NAVBAR_HEIGHT = `${DASHBOARD_LAYOUT_SIZES.height.navbar}px`;
export const DASHBOARD_FOOTER_HEIGHT = `${DASHBOARD_LAYOUT_SIZES.height.footer}px`;
export const DASHBOARD_SIDEBAR_WIDTH = `${DASHBOARD_LAYOUT_SIZES.width.sidebar}px`;
export const DASHBOARD_CONTENT_HEIGHT = `calc(100vh - ${
  DASHBOARD_LAYOUT_SIZES.height.navbar + DASHBOARD_LAYOUT_SIZES.height.footer
}px)`;
