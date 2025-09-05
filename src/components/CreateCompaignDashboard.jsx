import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import Sidebar from "./layout/Sidebar"
import Header from "./layout/Header"
import EmptyState from "./dashboard/EmptyState"
import CreateCompaignModal from "./dashboard/CreateCompaignModal"
import api from "../services/api"

const CreateCompaignDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [contentRewards, setContentRewards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await api.getCampaigns()
        setContentRewards(res.campaigns || [])
      } catch (e) {
        console.error("Failed to load campaigns", e)
      } finally {
        setLoading(false)
      }
    }
    fetchCampaigns()
  }, [])

  const handleCreateReward = async data => {
    try {
      const res = await api.createCampaign(data)
      const created = res.campaign
      setContentRewards(prev => [created, ...prev])
    } catch (e) {
      console.error("Create campaign failed", e)
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <Box
      sx={{ display: "flex", backgroundColor: "#0a0a0a", minHeight: "100vh" }}
    >
      <Sidebar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header onCreateRewardClick={handleOpenModal} />
        <Box sx={{ flex: 1, p: 3 }}>
          {loading ? (
            <div style={{ color: "#999" }}>Loading campaigns...</div>
          ) : contentRewards.length === 0 ? (
            <EmptyState />
          ) : (
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2 }}>
              {contentRewards.map(c => (
                <Box key={c._id} sx={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: 2, p: 2 }}>
                  <div style={{ fontWeight: 600 }}>{c.campaignName}</div>
                  <div style={{ color: "#999", fontSize: 12, marginTop: 4 }}>
                    {c.type} • {c.category}
                  </div>
                  <div style={{ color: "#999", fontSize: 12, marginTop: 8 }}>
                    Budget: {c.currency || "USD"} {c.budget}
                  </div>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      <CreateCompaignModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateReward}
      />
    </Box>
  )
}

export default CreateCompaignDashboard
