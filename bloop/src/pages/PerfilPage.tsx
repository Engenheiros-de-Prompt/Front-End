import { useState } from 'react';
import { Box, Typography, Avatar, Divider, Paper, LinearProgress, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const ProfilePage = () => {
  // Dados do usuário (substitua pelos dados reais)
  const [user] = useState({
    name: 'Enzo Candiani',
    role: 'Desenvolvedor Full Stack',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQEKT0ArRdysEg/profile-displayphoto-shrink_800_800/B4DZWwk7d7HkAc-/0/1742424227176?e=1753920000&v=beta&t=vjBpBwymiwy-dCebyoDQmKxIV3GpOhnhORat6KSNVi8',
    points: 1250,
    level: 'Expert',
  });

  // Dados de feedback (médias)
  const [feedbackStats] = useState({
    hardSkills: 8.2,
    softSkills: 7.5,
    strengths: ['Comunicação clara', 'Organização', 'Trabalho em equipe'],
    improvements: ['Gestão de tempo', 'Documentação de código'],
  });

  // Badges do usuário
  const [badges] = useState([
    { id: 1, name: 'Feedback Master', image: 'https://via.placeholder.com/100?text=FM', description: 'Deu 50+ feedbacks' },
    { id: 2, name: 'Colaborador Ouro', image: 'https://via.placeholder.com/100?text=CO', description: 'Top 10% em avaliações' },
    { id: 3, name: 'Especialista React', image: 'https://via.placeholder.com/100?text=ER', description: 'Excelência técnica' },
    { id: 4, name: 'Mentor', image: 'https://via.placeholder.com/100?text=ME', description: 'Ajudou 10+ colegas' },
  ]);

  // Componente estilizado para a barra de habilidades
  const SkillBar = styled(LinearProgress)(({ theme, value = 0 }) => ({
    height: 20,
    borderRadius: 10,
    margin: '10px 0',
    '& .MuiLinearProgress-bar': {
      borderRadius: 10,
      backgroundColor: value >= 7 ? '#01a982' : '#f56565',
    },
    backgroundColor: theme.palette.grey[200],
  }));

  return (
    <Box sx={{
      maxWidth: 800,
      margin: '0 auto',
      p: 4,
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
    }}>
      {/* Cabeçalho do perfil */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Avatar
          src={user.avatar}
          sx={{
            width: 120,
            height: 120,
            margin: '0 auto',
            border: '4px solid #01a982',
          }}
        />
        <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold', color: '#2d3748' }}>
          {user.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#718096' }}>
          {user.role}
        </Typography>
        <Chip 
          label={`Nível ${user.level} • ${user.points} pontos`} 
          color="success" 
          sx={{ mt: 1, backgroundColor: '#01a982', color: 'white' }}
        />
      </Box>

      {/* Seção de Médias de Feedback */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2d3748' }}>
          Seu Desempenho
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>Habilidades Técnicas</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SkillBar variant="determinate" value={feedbackStats.hardSkills * 10} sx={{ flexGrow: 1 }} />
            <Typography sx={{ ml: 2, fontWeight: 'bold' }}>{feedbackStats.hardSkills}/10</Typography>
          </Box>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>Habilidades Comportamentais</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SkillBar variant="determinate" value={feedbackStats.softSkills * 10} sx={{ flexGrow: 1 }} />
            <Typography sx={{ ml: 2, fontWeight: 'bold' }}>{feedbackStats.softSkills}/10</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#01a982' }}>Pontos Fortes</Typography>
            <ul style={{ paddingLeft: 20, color: '#2d3748' }}>
              {feedbackStats.strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Box>
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#f56565' }}>Áreas para Melhorar</Typography>
            <ul style={{ paddingLeft: 20, color: '#2d3748' }}>
              {feedbackStats.improvements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Box>
        </Box>
      </Paper>

      {/* Seção de Badges */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2d3748' }}>
        Conquistas e Badges
      </Typography>
      
      <Carousel
        animation="slide"
        navButtonsAlwaysVisible
        indicators={false}
        NavButton={({
          onClick,
          className,
          style,
          next,
          prev,
        }: {
          onClick: Function;
          className: string;
          style: React.CSSProperties;
          next: boolean;
          prev: boolean;
        }) => (
          <Box
            onClick={(event) => onClick(event)}
            className={className}
            style={style}
            sx={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              cursor: 'pointer',
              backgroundColor: 'rgba(255,255,255,0.7)',
              borderRadius: '50%',
              p: 1,
              ...(next ? { right: 10 } : { left: 10 }),
              '&:hover': {
                backgroundColor: '#01a982',
                color: 'white',
              },
            }}
          >
            {next ? <ArrowForwardIos /> : <ArrowBackIos />}
          </Box>
        )}
      >
        {badges.map((badge) => (
          <Paper key={badge.id} elevation={2} sx={{ p: 3, textAlign: 'center', height: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box component="img" src={"https://cdn4.iconfinder.com/data/icons/game-ui-set-3/96/Medal_bronze-1024.png"} sx={{ width: 100, height: 100, margin: '0 auto' }} />
            <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>{badge.name}</Typography>
            <Typography variant="body2" sx={{ color: '#718096' }}>{badge.description}</Typography>
          </Paper>
        ))}
      </Carousel>

      {/* Seção de Feedback Recentes (opcional) */}
      <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#2d3748' }}>
          Feedback Recentes
        </Typography>
        <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#718096' }}>
          "Enzo demonstrou excelente habilidade técnica no último projeto, entregando componentes React de alta qualidade."
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'right', color: '#a0aec0' }}>
          - Colega de Time, 30/05/2024
        </Typography>
        
      </Paper>
      <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
        <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#718096' }}>
          "Baita pitch do Enzo!"
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'right', color: '#a0aec0' }}>
          - Colega de Time, Hackatona 30/05/2025
        </Typography>
        
      </Paper>
    </Box>
  );
};

export default ProfilePage;