import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const FeedbackSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        py: 4,
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 4,
          boxShadow: 3,
          width: "100%",
        }}
      >
        <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: "#01a982",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Feedback Enviado!
        </Typography>

        <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
          Obrigado por contribuir para um ambiente de trabalho mais
          colaborativo.
        </Typography>

        <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
          Seu feedback ajuda no desenvolvimento profissional dos seus colegas.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/")}
          sx={{
            py: 1.5,
            px: 4,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Voltar ao Início
        </Button>
      </Box>
    </Container>
  );
};

export default FeedbackSuccessPage;
