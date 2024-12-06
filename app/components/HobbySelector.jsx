import React, { useState } from "react";
import { Chip, Box, Typography, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import hobbyCategories from "../data/Hobbies";

export default function HobbySelector({ selectedHobbies, onChange }) {
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleHobby = (hobbyName) => {
    const updatedHobbies = selectedHobbies.includes(hobbyName)
      ? selectedHobbies.filter((h) => h !== hobbyName)
      : [...selectedHobbies, hobbyName];
    onChange(updatedHobbies);
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Your selected hobbies:
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        {selectedHobbies.map((hobbyName) => {
          const hobbyInfo = hobbyCategories
            .flatMap((cat) => cat.hobbies)
            .find((h) => h.name === hobbyName);

          return (
            <Chip
              key={hobbyName}
              label={`${hobbyInfo?.emoji || ""} ${hobbyName}`}
              onDelete={() => toggleHobby(hobbyName)}
              sx={{
                backgroundColor: hobbyInfo?.color || "gray",
                color: "white",
                "&:hover": {
                  backgroundColor: hobbyInfo?.color || "gray",
                  filter: "brightness(90%)",
                },
              }}
            />
          );
        })}
      </Box>
      {hobbyCategories.map((category) => (
        <Box key={category.name} sx={{ mb: 2 }}>
          <Box
            display="flex"
            alignItems="center"
            onClick={() => toggleCategory(category.name)}
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
            }}
          >
            <IconButton size="small">
              {expandedCategories.includes(category.name) ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
            <Typography variant="subtitle2">{category.name}</Typography>
          </Box>
          <Collapse in={expandedCategories.includes(category.name)}>
            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
              {category.hobbies.map((hobby) => (
                <Chip
                  key={hobby.name}
                  label={`${hobby.emoji} ${hobby.name}`}
                  onClick={() => toggleHobby(hobby.name)}
                  sx={{
                    backgroundColor: selectedHobbies.includes(hobby.name)
                      ? hobby.color
                      : "default",
                    color: selectedHobbies.includes(hobby.name)
                      ? "white"
                      : "inherit",
                    "&:hover": {
                      backgroundColor: hobby.color,
                      filter: "brightness(90%)",
                    },
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
}
