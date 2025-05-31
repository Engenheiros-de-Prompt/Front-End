import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Slider,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Container,
} from "@mui/material";

const FeedbackForm = () => {
  const navigate = useNavigate();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [hardSkillsRating, setHardSkillsRating] = useState(5);
  const [softSkillsRating, setSoftSkillsRating] = useState(5);
  const [comments, setComments] = useState("");

  const handleSubmit = () => {
    console.log("Feedback enviado:", {
      hardSkillsRating,
      softSkillsRating,
      comments,
      isAnonymous,
    });
    navigate("/feedback-succes"); // Redireciona para página de sucesso
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            color: "#01a982",
            fontWeight: "bold",
            textAlign: "center",
            mb: 3,
          }}
        >
          Seu Feedback
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          sx={{ mb: 4, textAlign: "center" }}
        >
          Avalie seu colega de 1 a 10, sendo 1 muito ruim e 10 excelente
        </Typography>

        {/* Hard Skills Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Habilidades Técnicas
          </Typography>
          <Slider
            value={hardSkillsRating}
            onChange={(e, val) => setHardSkillsRating(val as number)}
            aria-label="Avaliação de Habilidades Técnicas"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
            sx={{
              mb: 2,
              color: "#01a982",
              "& .MuiSlider-thumb": {
                color: "#01a982",
              },
              "& .MuiSlider-track": {
                color: "#01a982",
              },
              "& .MuiSlider-rail": {
                color: "#a2e2d4",
              },
            }}
          />
          <Typography variant="body2" color="text.secondary">
            "Excelente domínio técnico no projeto Alpha, entregou soluções
            robustas e bem estruturadas."
          </Typography>
        </Box>

        {/* Soft Skills Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Habilidades Comportamentais
          </Typography>
          <Slider
            value={softSkillsRating}
            onChange={(e, val) => setSoftSkillsRating(val as number)}
            aria-label="Avaliação de Habilidades Comportamentais"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
            sx={{
              mb: 2,
              color: "#01a982",
              "& .MuiSlider-thumb": {
                color: "#01a982",
              },
              "& .MuiSlider-track": {
                color: "#01a982",
              },
              "& .MuiSlider-rail": {
                color: "#a2e2d4",
              },
            }}
          />
          <Typography variant="body2" color="text.secondary">
            "Comunicação excepcional durante as reuniões do projeto, sempre
            claro e objetivo nas explicações."
          </Typography>
        </Box>

        <TextField
          label="Comentários adicionais"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Ex: Gostaria de destacar como o João foi colaborativo durante todo o sprint..."
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              sx={{
                color: "#01a982",
                "&.Mui-checked": {
                  color: "#01a982",
                },
              }}
            />
          }
          label="Enviar como anônimo"
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          color="success"
          size="large"
          fullWidth
          onClick={handleSubmit}
          sx={{
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: "bold",
            boxShadow: 2,
            "&:hover": {
              boxShadow: 4,
            },
          }}
        >
          Enviar Feedback
        </Button>
      </Box>
    </Container>
  );
};

export default FeedbackForm;
