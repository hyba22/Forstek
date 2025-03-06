import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Divider, FormControl, Grid, Input, InputLabel, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const getChartData = (maturityLevels) => {
  return {
    labels: maturityLevels.map(level => level.name),
    datasets: [{
      label: 'Niveau de Maturité',
      data: maturityLevels.map(level => level.pourcentage),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };
};

const chartOptions = {
  plugins: {
    legend: {
      display: true,
    },
    datalabels: {
      color: '#000',
      display: true,
      formatter: (value) => `${value}%`, 
      font: {
        weight: 'bold',
        size: 12
      },
      padding: {
        bottom: 4
      }
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Niveau de Maturité'
      }
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Pourcentage'
      }
    }
  }
};

const MaturityLevelModal = ({ open, handleClose, isEditing, level, handleChange, handleSave }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 400, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4
      }}>
        <Typography variant="h6" gutterBottom>
          {isEditing ? 'Modifier le Niveau' : 'Ajouter un Nouveau Niveau'}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="name">Nom</InputLabel>
          <Input id="name" name="name" value={level?.name || ''} onChange={handleChange} />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="pourcentage">Pourcentage (%)</InputLabel>
          <Input id="pourcentage" name="pourcentage" type="number" value={level?.pourcentage || ''} onChange={handleChange} />
        </FormControl>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button onClick={handleClose} color="secondary" sx={{ mr: 2 }}>Annuler</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Sauvegarder</Button>
        </Box>
      </Box>
    </Modal>
  );
};

const MaturityLevelPage = () => {
  const [maturityLevels, setMaturityLevels] = useState([
    { id: 1, name: 'Création des infrastructures', pourcentage: 20 },
    { id: 2, name: 'Croissance : Expansion des réseaux', pourcentage: 30 },
    { id: 3, name: 'Maturité : Maintenance et optimisation', pourcentage: 25 },
    { id: 4, name: 'Initial : Incubation et validation', pourcentage: 25 }
  ]);

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [newActivity, setNewActivity] = useState({ name: '', pourcentage: '' });

  useEffect(() => {
    axios.get('http://localhost:8085/maturity-level')
      .then((response) => setMaturityLevels(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des données:", error));
  }, []);

  const handleOpen = (activity) => {
    setIsEditing(!!activity);
    setCurrentActivity(activity);
    setNewActivity(activity || { name: '', pourcentage: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    handleClose();
  };

  const handleDelete = (id) => {
    setMaturityLevels(maturityLevels.filter(level => level.id !== id));
  };

  return (
    <Box sx={{ padding: 14 }}>
      <Box sx={{ mt: 3, height: '550px' }}>
        <Bar data={getChartData(maturityLevels)} options={chartOptions} />
      </Box>

      <MaturityLevelTable maturityLevels={maturityLevels} handleOpen={handleOpen} handleDelete={handleDelete} />

      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Button onClick={() => handleOpen(null)} variant="contained" color="primary">
          Ajouter un Niveau
        </Button>
      </Grid>

      <MaturityLevelModal
        open={open}
        handleClose={handleClose}
        isEditing={isEditing}
        level={currentActivity}
        handleChange={handleChange}
        handleSave={handleSave}
      />
    </Box>
  );
};

const MaturityLevelTable = ({ maturityLevels, handleOpen, handleDelete }) => {
  return (
    <Box sx={{ mt: 14, maxWidth: 800 }}>
      <Typography variant="h6" gutterBottom>Liste des Niveaux de Maturité</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Pourcentage</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maturityLevels.map(activity => (
              <TableRow key={activity.id}>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{activity.pourcentage}%</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(activity)}><EditIcon /></Button>
                  <Button onClick={() => handleDelete(activity.id)}><DeleteIcon /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MaturityLevelPage;


