import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GenderFemalePage = () => {
  const [data, setData] = useState([]);
  const [newYear, setNewYear] = useState('');
  const [newPercentage, setNewPercentage] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8085/gender-female')
      .then((response) => setData(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des données:", error));
  }, []);

  const handleAdd = () => {
    const newData = {
      annee: newYear,
      pourcentage: parseInt(newPercentage, 10),
    };

    axios.post('http://localhost:8085/gender-female', newData)
      .then(() => axios.get('http://localhost:8085/gender-female'))
      .then((response) => setData(response.data))
      .catch((error) => console.error("Erreur lors de l'ajout des données:", error));

    setNewYear('');
    setNewPercentage('');
  };

  const handleEdit = (index) => {
    setEditId(data[index].id);
    setNewYear(data[index].annee);
    setNewPercentage(data[index].pourcentage);
  };

  const handleUpdate = () => {
    const updatedData = {
      annee: newYear,
      pourcentage: parseInt(newPercentage, 10),
    };

    axios.put(`http://localhost:8085/gender-female/${editId}`, updatedData)
      .then(() => axios.get('http://localhost:8085/gender-female'))
      .then((response) => setData(response.data))
      .catch((error) => console.error("Erreur lors de la mise à jour des données:", error));

    setEditId(null);
    setNewYear('');
    setNewPercentage('');
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8085/gender-female/${id}`)
      .then(() => axios.get('http://localhost:8085/gender-female'))
      .then((response) => setData(response.data))
      .catch((error) => console.error("Erreur lors de la suppression des données:", error));
  };

  const getChartData = () => ({
    labels: data.map((item) => item.annee),
    datasets: [
      {
        label: "Proportion des femmes bénéficiant d'une formation",
        data: data.map((item) => item.pourcentage),
        backgroundColor: 'rgba(255, 99, 132, 0.2)', 
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Année',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Pourcentage',
        },
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <Box sx={{ padding: 12 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Proportion des femmes bénéficiant d'une formation
      </Typography>

      <Box sx={{ mt: 3, height: '500px' }}>
        <Bar data={getChartData()} options={chartOptions} />
      </Box>

      <Box sx={{ mt: 12 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Année</TableCell>
                <TableCell>Pourcentage</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{item.annee}</TableCell>
                  <TableCell>{item.pourcentage}%</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(index)}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <TextField
            label="Année"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
          />
          <TextField
            label="Pourcentage"
            value={newPercentage}
            onChange={(e) => setNewPercentage(e.target.value)}
          />
          {editId ? (
            <Button variant="contained" color="secondary" onClick={handleUpdate}>
              Modifier
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Ajouter
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GenderFemalePage;
