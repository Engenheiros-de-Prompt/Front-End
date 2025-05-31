import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Autocomplete,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";

// Tipos para projetos (times) e funcionários
type Project = {
  id: number;
  name: string;
};

type Employee = {
  id: number;
  name: string;
  role: string;
};

const ChooseUserPage = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [availableEmployees, setAvailableEmployees] = useState<Employee[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  // Buscar times do backend
  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        const response = await fetch("http://localhost:3000/team");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Erro ao carregar times:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // Buscar colaboradores de um time
  const fetchEmployees = async (teamId: number) => {
    setLoadingEmployees(true);
    try {
      const response = await fetch(
        `http://localhost:3000/user/getUsersByteamId/${teamId}`,
      );
      const data = await response.json();
      setAvailableEmployees(data);
    } catch (error) {
      console.error("Erro ao carregar colaboradores:", error);
      setAvailableEmployees([]);
    } finally {
      setLoadingEmployees(false);
    }
  };

  const handleProjectChange = async (_event: any, newValue: Project | null) => {
    setSelectedProject(newValue);
    setSelectedEmployee(null);

    if (!newValue) {
      setAvailableEmployees([]);
      return;
    }

    await fetchEmployees(newValue.id);
  };

  const handleSubmit = () => {
    if (selectedProject && selectedEmployee) {
      navigate("/feedback", {
        state: {
          project: selectedProject,
          employee: selectedEmployee,
        },
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        p: 4,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "#01a982",
            mb: 4,
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Escolha o Funcionário
        </Typography>

        <Box sx={{ width: "100%", mb: 3 }}>
          <Autocomplete
            options={projects}
            loading={loadingProjects}
            getOptionLabel={(option: Project) => option.name}
            value={selectedProject}
            onChange={handleProjectChange}
            noOptionsText="Nenhum time encontrado"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Selecione o Time"
                variant="outlined"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingProjects && (
                        <CircularProgress color="inherit" size={20} />
                      )}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Box>

        <Box sx={{ width: "100%", mb: 4 }}>
          <Autocomplete
            options={availableEmployees}
            loading={loadingEmployees}
            getOptionLabel={(option: Employee) => option.name}
            value={selectedEmployee}
            onChange={(_event, newValue) => setSelectedEmployee(newValue)}
            disabled={!selectedProject}
            noOptionsText={
              selectedProject
                ? "Nenhum funcionário encontrado"
                : "Selecione um time primeiro"
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Selecione o Funcionário"
                variant="outlined"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingEmployees && (
                        <CircularProgress color="inherit" size={20} />
                      )}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderOption={(props, option: Employee) => (
              <li {...props} key={option.id}>
                <div>
                  <strong>{option.name}</strong>
                  <div style={{ fontSize: "0.8rem", color: "#666" }}>
                    {option.role}
                  </div>
                </div>
              </li>
            )}
          />
        </Box>

        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleSubmit}
          disabled={!selectedProject || !selectedEmployee}
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
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
            display: "block",
          }}
        >
          Dar Feedback
        </Button>
      </Container>
    </Box>
  );
};

export default ChooseUserPage;
