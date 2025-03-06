import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const GenderMale = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ annee: '', pourcentage: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [editYear, setEditYear] = useState('');
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8085/gender-male')
      .then((response) => setData(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des données:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      annee: formData.annee,
      pourcentage: parseInt(formData.pourcentage),
    };

    if (editIndex !== null) {
      const idToEdit = data[editIndex].idmale;
      axios.put(`http://localhost:8085/gender-male/${idToEdit}`, newData)
        .then(() => axios.get('http://localhost:8085/gender-male'))
        .then((response) => {
          setData(response.data);
          setEditIndex(null);
          setEditYear('');
          setEditValue('');
        })
        .catch((error) => console.error("Erreur lors de la mise à jour des données:", error));
    } else {
      axios.post('http://localhost:8085/gender-male', newData)
        .then(() => axios.get('http://localhost:8085/gender-male'))
        .then((response) => setData(response.data))
        .catch((error) => console.error("Erreur lors de l'ajout des données:", error));
    }
    setFormData({ annee: '', pourcentage: '' });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditYear(data[index].annee);
    setEditValue(data[index].pourcentage);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8085/gender-male/${id}`)
      .then(() => axios.get('http://localhost:8085/gender-male'))
      .then((response) => setData(response.data))
      .catch((error) => console.error("Erreur lors de la suppression des données:", error));
  };

  const chartOptions = {
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: 'Année' } },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Pourcentage' },
        ticks: { callback: (value) => `${value}%` },
      },
    },
  };

  const getChartData = () => ({
    labels: data.map((item) => item.annee),
    datasets: [
      {
        label: 'Pourcentage',
        data: data.map((item) => item.pourcentage),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Page des Hommes
      </Typography>

      <Box sx={{ mt: 6, height: '500px' }}>
        <Bar data={getChartData()} options={chartOptions} />
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Ajouter ou Modifier des Données
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Année" name="annee" value={formData.annee} onChange={handleChange} sx={{ mr: 2 }} />
          <TextField label="Pourcentage" name="pourcentage" type="number" value={formData.pourcentage} onChange={handleChange} sx={{ mr: 2 }} />
          <Button variant="contained" color="primary" type="submit">
            {editIndex !== null ? 'Modifier' : 'Ajouter'}
          </Button>
        </form>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Liste des Données
        </Typography>
        <List>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={`${item.annee}: ${item.pourcentage}%`} />
                <IconButton onClick={() => handleEdit(index)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(item.idmale)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default GenderMale;