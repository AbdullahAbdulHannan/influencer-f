import React, { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel,
  Chip,
  InputAdornment,
  Grid,
  Divider,
  Input
} from "@mui/material"
import {
  Close as CloseIcon,
  Upload as UploadIcon,
  Add as AddIcon,
  Instagram,
  YouTube,
  X as TwitterIcon,
  Info as InfoIcon
} from "@mui/icons-material"

const CreateCompaignModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    campaignName: "",
    type: "",
    category: "",
    budget: "",
    currency: "USD",
    rewardRate: "",
    views: "",
    minimumPayout: "",
    maximumPayout: "",
    flatFeeBonus: "",
    platforms: [],
    availableContent: "",
    contentRequirements: [],
    thumbnailUrl: ""
  })

  const [newRequirement, setNewRequirement] = useState("")
  const [thumbnailPreview, setThumbnailPreview] = useState("")

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setThumbnailPreview(reader.result)
      setFormData(prev => ({ ...prev, thumbnailUrl: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    const toNumber = v => (v === "" || v === null || v === undefined ? undefined : Number(v))
    const payload = {
      ...formData,
      budget: toNumber(formData.budget),
      rewardRate: toNumber(formData.rewardRate),
      views: toNumber(formData.views),
      minimumPayout: toNumber(formData.minimumPayout),
      maximumPayout: toNumber(formData.maximumPayout),
      flatFeeBonus: toNumber(formData.flatFeeBonus),
      thumbnailUrl: thumbnailPreview || formData.thumbnailUrl
    }
    onSubmit(payload)
    onClose()
  }

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData({
        ...formData,
        contentRequirements: [
          ...formData.contentRequirements,
          newRequirement.trim()
        ]
      })
      setNewRequirement("")
    }
  }

  const togglePlatform = platform => {
    const platforms = formData.platforms.includes(platform)
      ? formData.platforms.filter(p => p !== platform)
      : [...formData.platforms, platform]

    setFormData({ ...formData, platforms })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#1a1a1a",
          color: "white",
          minHeight: "80vh"
        }
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #333",
          color: "white"
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Create Compaign
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#999" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Grid container sx={{ height: "100%", flexWrap: "nowrap" }}>
          {/* Left Panel - Form */}
          <Grid
            item
            xs={7}
            sx={{
              p: 3,
              borderRight: "1px solid #333",
              overflowY: "auto"
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}
              >
                Compaign setup
                <InfoIcon sx={{ fontSize: 16, color: "#999" }} />
              </Typography>
            </Box>

            {/* Campaign Name */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: "#999", mb: 1 }}>
                Campaign name *
              </Typography>
              <TextField
                fullWidth
                value={formData.campaignName}
                onChange={e =>
                  setFormData({ ...formData, campaignName: e.target.value })
                }
                placeholder="e.g. Fanatics UGC - $3 per 1,000 views"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#2a2a2a",
                    color: "white",
                    "& fieldset": { borderColor: "#444" },
                    "&:hover fieldset": { borderColor: "#666" },
                    "&.Mui-focused fieldset": { borderColor: "#3b82f6" }
                  }
                }}
              />
            </Box>

            {/* Type and Category */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: "#999", mb: 1 }}>
                  Type *
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.type}
                    onChange={e =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    sx={{
                      backgroundColor: "#2a2a2a",
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#444"
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#666"
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#3b82f6"
                      }
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select type
                    </MenuItem>
                    <MenuItem value="UGC">UGC</MenuItem>
                    <MenuItem value="Sponsored">Sponsored</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: "#999", mb: 1 }}>
                  Category *
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={formData.category}
                    onChange={e =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    sx={{
                      backgroundColor: "#2a2a2a",
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#444"
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#666"
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#3b82f6"
                      }
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select category
                    </MenuItem>
                    <MenuItem value="Personal brand">Personal brand</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Campaign Budget */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: "#999", mb: 1 }}>
                Campaign budget *
              </Typography>
              <TextField
                fullWidth
                type="number"
                value={formData.budget}
                onChange={e =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Select
                        value={formData.currency}
                        onChange={e =>
                          setFormData({ ...formData, currency: e.target.value })
                        }
                        sx={{
                          color: "white",
                          border: "none",
                          "& .MuiSelect-select": { p: 0 }
                        }}
                        variant="standard"
                        disableUnderline
                      >
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="EUR">EUR</MenuItem>
                      </Select>
                    </InputAdornment>
                  )
                }}
                placeholder="$ 10,000"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#2a2a2a",
                    color: "white",
                    "& fieldset": { borderColor: "#444" },
                    "&:hover fieldset": { borderColor: "#666" },
                    "&.Mui-focused fieldset": { borderColor: "#3b82f6" }
                  }
                }}
              />
            </Box>

            {/* Reward Rate */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: "#999", mb: 1 }}>
                Reward rate *
              </Typography>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={4}>
                  <TextField
                    label="Rate"
                    type="number"
                    value={formData.rewardRate}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        rewardRate: e.target.value
                      })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      )
                    }}
                    placeholder="3"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#2a2a2a",
                        color: "white",
                        "& fieldset": { borderColor: "#444" },
                        "&:hover fieldset": { borderColor: "#666" },
                        "&.Mui-focused fieldset": { borderColor: "#3b82f6" }
                      },
                      "& .MuiInputLabel-root": { color: "#999" }
                    }}
                  />
                </Grid>
                <Grid item xs={2} sx={{ textAlign: "center" }}>
                  <Typography variant="body2" sx={{ color: "#999" }}>
                    per
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Views"
                    type="number"
                    value={formData.views}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        views: e.target.value
                      })
                    }
                    placeholder="1000"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#2a2a2a",
                        color: "white",
                        "& fieldset": { borderColor: "#444" },
                        "&:hover fieldset": { borderColor: "#666" },
                        "&.Mui-focused fieldset": { borderColor: "#3b82f6" }
                      },
                      "& .MuiInputLabel-root": { color: "#999" }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Min/Max Payout */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#999",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                  }}
                >
                  Minimum payout
                  <InfoIcon sx={{ fontSize: 14, color: "#999" }} />
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.minimumPayout}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      minimumPayout: e.target.value
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    )
                  }}
                  placeholder="3"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#2a2a2a",
                      color: "white",
                      "& fieldset": { borderColor: "#444" },
                      "&:hover fieldset": { borderColor: "#666" },
                      "&.Mui-focused fieldset": { borderColor: "#3b82f6" }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#999",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                  }}
                >
                  Maximum payout
                  <InfoIcon sx={{ fontSize: 14, color: "#999" }} />
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={formData.maximumPayout}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      maximumPayout: e.target.value
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    )
                  }}
                  placeholder="100"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#2a2a2a",
                      color: "white",
                      "& fieldset": { borderColor: "#444" },
                      "&:hover fieldset": { borderColor: "#666" },
                      "&.Mui-focused fieldset": { borderColor: "#3b82f6" }
                    }
                  }}
                />
              </Grid>
            </Grid>

            {/* Flat Fee Bonus */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#999",
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}
              >
                Flat fee bonus
                <InfoIcon sx={{ fontSize: 14, color: "#999" }} />
              </Typography>
              <TextField
                fullWidth
                type="number"
                value={formData.flatFeeBonus}
                onChange={e =>
                  setFormData({
                    ...formData,
                    flatFeeBonus: e.target.value
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}
                placeholder="10"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#2a2a2a",
                    color: "white",
                    "& fieldset": { borderColor: "#444" },
                    "&:hover fieldset": { borderColor: "#666" },
                    "&.Mui-focused fieldset": { borderColor: "#3b82f6" }
                  }
                }}
              />
            </Box>

            {/* Platforms */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: "#999", mb: 2 }}>
                Platforms *
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.platforms.includes("instagram")}
                      onChange={() => togglePlatform("instagram")}
                      sx={{ color: "#e1306c" }}
                    />
                  }
                  label={<Instagram sx={{ color: "#e1306c" }} />}
                />
                {/* <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.platforms.includes("tiktok")}
                      onChange={() => togglePlatform("tiktok")}
                      sx={{ color: "#000" }}
                    />
                  }
                  label={
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        backgroundColor: "#000",
                        borderRadius: "50%"
                      }}
                    />
                  }
                /> */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.platforms.includes("twitter")}
                      onChange={() => togglePlatform("twitter")}
                      sx={{ color: "#1da1f2" }}
                    />
                  }
                  label={<TwitterIcon sx={{ color: "#1da1f2" }} />}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.platforms.includes("youtube")}
                      onChange={() => togglePlatform("youtube")}
                      sx={{ color: "#ff0000" }}
                    />
                  }
                  label={<YouTube sx={{ color: "#ff0000" }} />}
                />
              </Box>
            </Box>

            {/* Available Content */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                Available content
              </Typography>
              <Typography variant="body2" sx={{ color: "#999", mb: 2 }}>
                We recommend you add guides and raw footage here
              </Typography>
              <TextField
                fullWidth
                value={formData.availableContent}
                onChange={e =>
                  setFormData({ ...formData, availableContent: e.target.value })
                }
                placeholder="https://drive.google.com/drive/folders/12345678"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton sx={{ color: "#999" }}>
                        {/* <AddIcon /> */}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#2a2a2a",
                    color: "white",
                    "& fieldset": { borderColor: "#444" },
                    "&:hover fieldset": { borderColor: "#666" },
                    "&.Mui-focused fieldset": { borderColor: "#3b82f6" }
                  }
                }}
              />
            </Box>

            {/* Content Requirements */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                Content requirements
              </Typography>
              <Typography variant="body2" sx={{ color: "#999", mb: 2 }}>
                Add content guidelines for users to follow
              </Typography>

              {formData.contentRequirements.map((req, index) => (
                <Chip
                  key={index}
                  label={req}
                  sx={{
                    backgroundColor: "#333",
                    color: "white",
                    mb: 1,
                    mr: 1
                  }}
                />
              ))}

              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <TextField
                  fullWidth
                  value={newRequirement}
                  onChange={e => setNewRequirement(e.target.value)}
                  placeholder="e.g. Must tag in the description"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#2a2a2a",
                      color: "white",
                      "& fieldset": { borderColor: "#444" },
                      "&:hover fieldset": { borderColor: "#666" },
                      "&.Mui-focused fieldset": { borderColor: "#3b82f6" }
                    }
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={addRequirement}
                  sx={{
                    borderColor: "#444",
                    color: "#999",
                    "&:hover": {
                      borderColor: "#666",
                      backgroundColor: "rgba(255, 255, 255, 0.05)"
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
            </Box>

            <Typography
              variant="body2"
              sx={{ color: "#666", fontSize: "0.75rem", mb: 3 }}
            >
              By creating this Compaign, you grant full usage rights for
              submissions and agree to follow the FTC guidelines and the Content
              Rewards Terms.
            </Typography>
          </Grid>

          {/* Right Panel - Preview */}
          <Grid
            item
            xs={5}
            sx={{
              p: 3,
              backgroundColor: "#0f0f0f",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Box sx={{ mb: 3, flex: 1, overflowY: "auto" }}>
              <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                Tutorial
              </Typography>
              <Typography variant="h5" sx={{ color: "white", mb: 3 }}>
                Fanatics UGC - $3 per 1,000 views
              </Typography>

              <Box
                sx={{
                  border: "2px dashed #333",
                  borderRadius: 2,
                  p: 4,
                  textAlign: "center",
                  mb: 3
                }}
              >
                {thumbnailPreview ? (
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <img src={thumbnailPreview} alt="thumbnail preview" style={{ width: "100%", maxWidth: 360, borderRadius: 8, objectFit: "cover" }} />
                    <Button variant="outlined" component="label" sx={{ borderColor: "#444", color: "#999", textTransform: "none" }}>
                      Change thumbnail
                      <Input type="file" accept="image/*" onChange={handleThumbnailChange} sx={{ display: "none" }} />
                    </Button>
                  </Box>
                ) : (
                  <>
                    <UploadIcon sx={{ fontSize: 48, color: "#666", mb: 2 }} />
                    <Button variant="outlined" component="label" sx={{ borderColor: "#444", color: "#999", textTransform: "none", "&:hover": { borderColor: "#666", backgroundColor: "rgba(255, 255, 255, 0.05)" } }}>
                      Upload thumbnail
                      <Input type="file" accept="image/*" onChange={handleThumbnailChange} sx={{ display: "none" }} />
                    </Button>
                  </>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                  PAID OUT
                </Typography>
                <Typography variant="h6" sx={{ color: "white" }}>
                  $0 of $0 paid out
                  <span style={{ color: "#666", marginLeft: 8 }}>0%</span>
                </Typography>
              </Box>

              <Divider sx={{ borderColor: "#333", my: 3 }} />

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                    REWARD
                  </Typography>
                  <Chip
                    label="$3.00 / 1K"
                    sx={{
                      backgroundColor: "#3b82f6",
                      color: "white",
                      fontWeight: 600
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                    TYPE
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    UGC
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                    CATEGORY
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    Personal brand
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                    MINIMUM PAYOUT
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    -
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                    MAXIMUM PAYOUT
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    -
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                  PLATFORMS
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Instagram sx={{ color: "#e1306c", fontSize: 20 }} />
                  
                  <TwitterIcon sx={{ color: "#1da1f2", fontSize: 20 }} />
                  <YouTube sx={{ color: "#ff0000", fontSize: 20 }} />
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                  AVAILABLE CONTENT
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  -
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                  CONTENT REQUIREMENTS
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  -
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: "auto", pt: 3 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#333",
                  color: "white",
                  textTransform: "none",
                  py: 1.5,
                  mb: 2,
                  "&:hover": {
                    backgroundColor: "#444"
                  }
                }}
              >
                Continue
              </Button>
              <Typography
                variant="body2"
                sx={{ color: "#666", fontSize: "0.75rem", textAlign: "center" }}
              >
                All submissions will be auto-approved after 48 hours if still
                pending.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCompaignModal
