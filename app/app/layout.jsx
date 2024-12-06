import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Box } from "@mui/material";

export const metadata = {
  title: "Inspi",
  description: "A simple form to collect user information",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.png" type="image/png" />
      <body>
        <AppRouterCacheProvider>
          <Box
            sx={{
              minHeight: "100vh",
              backgroundColor: "background.default",
            }}
          >
            {children}
          </Box>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
