import React, { useEffect, useState } from "react"
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  LinearProgress,
  Button
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  Store as EditStoreIcon,
  Apps as AppStoreIcon,
  ContentCopy as CopyIcon,
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  ExpandMore as ExpandMoreIcon
} from "@mui/icons-material"
import api from "../../services/api"

const Sidebar = () => {
  const menuItems = [
    { icon: <DashboardIcon />, text: "Dashboard", active: false },
    { icon: <ProductsIcon />, text: "Products", active: false },
    { icon: <EditStoreIcon />, text: "Edit store", active: false },
    { icon: <AppStoreIcon />, text: "App store", active: false }
  ]

  const [user, setUser] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getUserProfile()
        setUser(res.user)
      } catch (e) {
        // silently ignore if not logged in
      }
    }
    load()
  }, [])

  const displayName = user?.firstName || user?.email?.split("@")[0] || "User"
  const initial = (user?.firstName?.[0] || user?.email?.[0] || "U").toUpperCase()

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        backgroundColor: "#1a1a1a",
        borderRight: "1px solid #333",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: "1px solid #333" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%)",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Box sx={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              {initial}
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
              {displayName}
            </Typography>
            
          </Box>
         
        </Box>
      </Box>

      {/* Empty Area */}
      <Box sx={{ paddingTop: 13,paddingLeft:20, borderBottom: "1px solid #333" }}>
      <Button 
            startIcon={<CopyIcon />}
            variant="outlined"
            sx={{
              color: "#999",
              borderColor: "#333",
              textTransform: "none",
              "&:hover": {
                borderColor: "#555",
                backgroundColor: "rgba(255, 255, 255, 0.05)"
              }
            }}
          >
            Copy link
          </Button>
      </Box>

      {/* Admin Area */}
      <Box sx={{ p: 2 }}>
        <Typography
          variant="caption"
          sx={{ color: "#666", mb: 2, display: "block" }}
        >
          ADMIN AREA
        </Typography>
        <List sx={{ p: 0 }}>
          {menuItems.map((item, index) => (
            <ListItem key={index} sx={{ p: 0, mb: 1 }}>
              <ListItemButton
                sx={{
                  borderRadius: 1,
                  color: item.active ? "white" : "#999",
                  backgroundColor: item.active ? "#333" : "transparent",
                  "&:hover": {
                    backgroundColor: "#333"
                  }
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Setup Guide */}
      <Box sx={{ mt: "auto", p: 2 }}>
        <Box
          sx={{
            backgroundColor: "#2d3748",
            borderRadius: 2,
            p: 2
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "white", fontWeight: 600, mb: 1 }}
          >
            Setup guide
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#999", mb: 2, display: "block" }}
          >
            Create product
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Typography variant="body2" sx={{ color: "white" }}>
              2/4 complete
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={50}
            sx={{
              backgroundColor: "#4a5568",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#3b82f6"
              }
            }}
          />
        </Box>
      </Box>

      {/* Bottom Icon */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #333",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            backgroundColor: "#3b82f6",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "white", fontWeight: "bold" }}
          >
            {initial}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
