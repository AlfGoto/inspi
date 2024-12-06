"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const UserInfoForm = dynamic(() => import("../components/UserInfoForm.jsx"), {
  ssr: false,
});

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        maxWidth: 600,
        mx: "auto",
        my: 4,
        p: 3,
      }}
    >
      <UserInfoForm />
    </Box>
  );
}
