import React from "react"
import { Box, Typography, IconButton, Button, Tabs, Tab } from "@mui/material"
import {
  ContentCopy as CopyIcon,
  Info as InfoIcon,
  AccountCircle as AccountIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Add as AddIcon
} from "@mui/icons-material"

const Header = ({ onCreateRewardClick }) => {
  const [activeTab, setActiveTab] = React.useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{ backgroundColor: "#1a1a1a", borderBottom: "1px solid #333" }}>
      {/* Top Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: "1px solid #333"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 24,
              height: 24,
              backgroundColor: "#4ade80",
              borderRadius: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: "white",
                borderRadius: "50%"
              }}
            />
          </Box>
          <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
            Compaigns
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton sx={{ color: "#999" }}>
            <InfoIcon />
          </IconButton>
          <IconButton sx={{ color: "#999" }}>
            <AccountIcon />
          </IconButton>
          <IconButton sx={{ color: "#999" }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton sx={{ color: "#999" }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Content Header */}
      <Box sx={{ p: 2, pb: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              "& .MuiTab-root": {
                color: "#999",
                textTransform: "none",
                fontWeight: 500,
                "&.Mui-selected": {
                  color: "white"
                }
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#3b82f6"
              }
            }}
          >
            <Tab label="Compaigns" />
            <Tab label="Analytics" />
          </Tabs>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="text"
              sx={{
                color: "#999",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)"
                }
              }}
            >
              What is a Compaign?
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onCreateRewardClick}
              sx={{
                backgroundColor: "#3b82f6",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#2563eb"
                }
              }}
            >
              Create Compaign
            </Button>
          </Box>
        </Box>

        
      </Box>
    </Box>
  )
}

export default Header
