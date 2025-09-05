import React from "react"
import { Box, Typography } from "@mui/material"

const EmptyState = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        textAlign: "center"
      }}
    >
      {/* Coin/Medal Illustration */}
      <Box sx={{ mb: 4 }}>
        <svg width="200" height="150" viewBox="0 0 200 150">
          {/* Stack of coins */}
          <ellipse cx="100" cy="130" rx="50" ry="12" fill="#e5e7eb" />
          <ellipse cx="100" cy="125" rx="50" ry="12" fill="#f3f4f6" />
          <ellipse cx="100" cy="120" rx="50" ry="12" fill="#e5e7eb" />

          {/* Main coin */}
          <ellipse cx="100" cy="70" rx="45" ry="45" fill="#a3e635" />
          <ellipse cx="100" cy="65" rx="40" ry="40" fill="#84cc16" />
          <ellipse cx="100" cy="60" rx="35" ry="35" fill="#65a30d" />

          {/* Red stripe */}
          <rect x="85" y="45" width="30" height="30" fill="#ef4444" rx="3" />

          {/* Highlight circles */}
          <circle cx="120" cy="50" r="3" fill="#ffffff" opacity="0.6" />
          <circle cx="85" cy="75" r="2" fill="#ffffff" opacity="0.4" />
        </svg>
      </Box>

      <Typography
        variant="h4"
        sx={{
          color: "white",
          fontWeight: 600,
          mb: 2
        }}
      >
        No active <span style={{ color: "#84cc16" }}>Compaigns</span>
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "#999",
          maxWidth: 500
        }}
      >
        You don't have any active Compaigns. Create one to start paying
        out users.
      </Typography>
    </Box>
  )
}

export default EmptyState
