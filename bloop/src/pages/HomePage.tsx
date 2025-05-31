import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from "@mui/material/IconButton";


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 4,
        textAlign: "center",
        position: 'relative', // Adicionado para posicionamento absoluto do ícone
      }}
    >
      {/* Ícone de perfil no canto superior direito */}
      <IconButton
        aria-label="perfil"
        onClick={() => navigate("/perfil")}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: '#01a982',
          transition: 'all 0.2s ease',
        }}
      >
        <AccountCircleIcon fontSize="large" />
        <p>Meu Perfil</p>
      </IconButton>

      <h1
        className="text-5xl font-bold mb-6"
        style={{
          color: "#01a982",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Bem-vindo ao FeedBadger
      </h1>

      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          mb: 4,
        }}
      >
        <p className="text-lg font-medium text-gray-700 mb-4">
          Dê feedbacks rápidos e ganhe badges exclusivas!
        </p>
        <p className="text-gray-600">
          Avalie colegas de forma anônima ou identificada
        </p>
        <p className="text-gray-600">
          cada contribuição ajuda no crescimento da equipe.
        </p>
      </Box>

      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={() => navigate("/chooseUser")}
        sx={{
          py: 1.5,
          px: 6,
          fontSize: "1.1rem",
          fontWeight: "bold",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 6px 8px -1px rgba(0, 0, 0, 0.1)",
          },
          transition: "all 0.2s ease",
        }}
      >
        Começar Agora
      </Button>
    </Box>
  );
};

export default HomePage;