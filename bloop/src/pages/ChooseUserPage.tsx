import React, { useState } from "react";
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

// ==============================================

// Tipos para projetos e colaboradores
type Project = {
  id: number;
  name: string;
};

type Employee = {
  id: number;
  name: string;
  role: string;
};
// DADOS MOCKADOS (substituir por chamadas API)
// ==============================================
const mockProjects = [
  { id: 1, name: "Projeto Alpha" },
  { id: 2, name: "Projeto Beta" },
  { id: 3, name: "Projeto Gamma" },
];

const mockEmployeesByProject: {
  [key: string]: { id: number; name: string; role: string }[];
} = {
  "1": [
    { id: 101, name: "João Silva", role: "Desenvolvedor Front-end" },
    { id: 102, name: "Maria Souza", role: "UX Designer" },
    { id: 103, name: "Carlos Mendes", role: "Product Owner" },
  ],
  "2": [
    { id: 201, name: "Ana Oliveira", role: "Back-end Developer" },
    { id: 202, name: "Pedro Costa", role: "QA Engineer" },
  ],
  "3": [
    { id: 301, name: "Luiza Fernandes", role: "Scrum Master" },
    { id: 302, name: "Rafael Pereira", role: "Full-stack Developer" },
    { id: 303, name: "Fernanda Lima", role: "Product Manager" },
  ],
};

// Simulação de loading
const mockFetchProjects = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProjects), 500);
  });
};

const mockFetchEmployees = (projectId: string | number) => {
  return new Promise((resolve) => {
    const idStr = String(projectId);
    setTimeout(() => resolve(mockEmployeesByProject[idStr] || []), 500);
  });
};
// ==============================================

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

  // ==============================================
  // INTEGRAÇÃO REAL (substituir pelos seus endpoints)
  // ==============================================
  React.useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        // Substituir por: const response = await fetch('/api/projects');
        // const data = await response.json();
        const data = await mockFetchProjects();
        setProjects(data as Project[]);
      } catch (error) {
        console.error("Erro ao carregar projetos:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectChange = async (_event: any, newValue: Project | null) => {
    setSelectedProject(newValue);
    setSelectedEmployee(null);

    if (!newValue) {
      setAvailableEmployees([]);
      return;
    }

    setLoadingEmployees(true);
    try {
      // Substituir por: const response = await fetch(`/api/projects/${newValue.id}/employees`);
      // const data = await response.json();
      const data = await mockFetchEmployees(newValue.id);
      setAvailableEmployees(data as Employee[]);
    } catch (error) {
      console.error("Erro ao carregar colaboradores:", error);
    } finally {
      setLoadingEmployees(false);
    }
  };
  // ==============================================

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
            noOptionsText="Nenhum projeto encontrado"
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
                      {loadingProjects ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
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
                : "Selecione um funcionário primeiro"
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
                      {loadingEmployees ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
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
                  <div style={{ fontSize: "0.8rem", color: "#666" }}></div>
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
