"use client";

import { useState, useEffect, useRef } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HobbySelector from "./HobbySelector";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
];

export default function UserInfoForm() {
  const [hobbies, setHobbies] = useState([]);
  const [age, setAge] = useState("22");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("female");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [language, setLanguage] = useState("English");
  const [output, setOutput] = useState("");
  const [displayedOutput, setDisplayedOutput] = useState("");
  const [openHobbies, setOpenHobbies] = useState(false);
  const [copied, setCopied] = useState(false);
  const [words, setWords] = useState(5);
  const [name, setName] = useState("");
  const outputRef = useRef(null);

  useEffect(() => {
    if (output) {
      setDisplayedOutput(""); // Réinitialiser l'affichage précédent
      let index = 0;
      const interval = setInterval(() => {
        if (index < output.length) {
          setDisplayedOutput((prev) => prev + output[index]);
          index++;
        } else {
          clearInterval(interval); // Arrêter l'intervalle lorsque tout le texte est affiché
        }
      }, 2);

      return () => clearInterval(interval); // Nettoyer l'intervalle lors du changement de l'effet
    }
  }, [output]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/process-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hobbies,
          age,
          city,
          gender,
          additionalInfo,
          language,
          words,
          name,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur dans la réponse de l'API");
      }

      let data = await response.text();
      if (!data) {
        throw new Error("Réponse vide");
      }

      data = data
        .replaceAll("\\n", "")
        .replaceAll('"', "")
        .replaceAll("\\", "");
      setOutput(data);
      setDisplayedOutput("");
    } catch (error) {
      console.error("Erreur:", error);
      setOutput("Une erreur s'est produite, veuillez réessayer.");
      setDisplayedOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {output && (
            <Box
              ref={outputRef}
              onClick={copyToClipboard}
              sx={{
                position: "relative",
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                backgroundColor: "background.paper",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <Typography
                variant="body1"
                component="pre"
                sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {displayedOutput}
              </Typography>
              <Tooltip
                title={copied ? "Copied!" : "Click to copy"}
                placement="top"
              >
                <ContentCopyIcon
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    fontSize: "1rem",
                    color: copied ? "success.main" : "action.active",
                  }}
                />
              </Tooltip>
            </Box>
          )}

          <Button
            variant="outlined"
            onClick={() => setOpenHobbies(true)}
            sx={{ alignSelf: "flex-start" }}
          >
            Select Hobbies
          </Button>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="age-label">Age</InputLabel>
                <Select
                  labelId="age-label"
                  value={age}
                  label="Age"
                  onChange={(e) => setAge(e.target.value)}
                  MenuProps={{ disableScrollLock: true }}
                >
                  {Array.from({ length: 100 - 18 + 1 }, (_, i) => i + 18).map(
                    (num) => (
                      <MenuItem key={num} value={num.toString()}>
                        {num}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="words-label">Length</InputLabel>
                <Select
                  labelId="words-label"
                  value={words}
                  label="Length"
                  onChange={(e) => setWords(e.target.value)}
                  MenuProps={{ disableScrollLock: true }}
                >
                  {[
                    { name: "Short", words: 5 },
                    { name: "Mid", words: 20 },
                    { name: "Long", words: 40 },
                  ].map((num) => (
                    <MenuItem key={num.name} value={num.words}>
                      {num.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  value={gender}
                  label="Gender"
                  onChange={(e) => setGender(e.target.value)}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
          />

          <TextField
            label="Additional Information"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="language-label">Language</InputLabel>
                <Select
                  labelId="language-label"
                  value={language}
                  label="Language"
                  onChange={(e) => setLanguage(e.target.value)}
                  MenuProps={{ disableScrollLock: true }}
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.name}>
                      <Box component="span" mr={1}>
                        {lang.flag}
                      </Box>
                      {lang.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </form>

      <Dialog
        open={openHobbies}
        onClose={() => setOpenHobbies(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Select Your Hobbies</DialogTitle>
        <DialogContent>
          <HobbySelector selectedHobbies={hobbies} onChange={setHobbies} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenHobbies(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
