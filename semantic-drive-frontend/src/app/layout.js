import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import SearchBar from "@/components/SearchBar";
import { LayoutRegistry, FilesRegistry } from "@/components/Contexts";
import LeftBar from "@/components/LeftBar";

export const metadata = {
  title: "Semantic Drive",
  description: "Semantic Drive",
};

export const DRAWER_WIDTH = 240;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <LayoutRegistry>
            <FilesRegistry>
              <Drawer
                sx={{
                  width: DRAWER_WIDTH,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: DRAWER_WIDTH,
                    boxSizing: "border-box",
                    top: ["48px", "56px", "64px"],
                    height: "auto",
                    bottom: 0,
                  },
                }}
                variant="permanent"
                anchor="left"
              >
                <SearchBar drawerWidth={DRAWER_WIDTH} />
                <Divider />
                <LeftBar />
              </Drawer>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.default",
                  ml: `${DRAWER_WIDTH}px`,
                  mt: ["48px", "56px", "64px"],
                  p: 3,
                }}
              >
                {children}
              </Box>
            </FilesRegistry>
          </LayoutRegistry>
        </ThemeRegistry>
      </body>
    </html>
  );
}
