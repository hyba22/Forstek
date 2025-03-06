import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

const ActivityModal = ({ open, handleClose, isEditing, newActivity, handleChange, handleSave }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
        {isEditing ? 'Modifier l\'Activité' : 'Ajouter une Nouvelle Activité'}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="aspect">Aspect</InputLabel>
        <Input
          id="aspect"
          name="aspect"
          value={newActivity.aspect || ''}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="name">Domaine</InputLabel>
        <Input
          id="name"
          name="name"
          value={newActivity.name}
          onChange={handleChange}
        />
      </FormControl>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button onClick={handleClose} color="secondary" sx={{ mr: 2 }}>
          Annuler
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Sauvegarder
        </Button>
      </Box>
    </Box>
  </Modal>
);

const ActivityTable = ({ activities, handleOpen, handleDelete }) => (
  <TableContainer component={Paper} sx={{ mt: 4, border: '1px solid #ddd', borderRadius: 2, boxShadow: 4 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="center" sx={{ bgcolor: '#3f51b5', color: 'white' }}>ID</TableCell>
          <TableCell align="center" sx={{ bgcolor: '#3f51b5', color: 'white' }}>Aspect</TableCell>
          <TableCell align="center" sx={{ bgcolor: '#3f51b5', color: 'white' }}>Domaine</TableCell>
          <TableCell align="center" sx={{ bgcolor: '#3f51b5', color: 'white' }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {activities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell align="center">{activity.id}</TableCell>
            <TableCell align="center">{activity.aspect}</TableCell>
            <TableCell align="center">{activity.name}</TableCell>
            <TableCell align="center">
              <IconButton onClick={() => handleOpen(activity)} color="primary" sx={{ mr: 1 }}>
                <MdEdit />
              </IconButton>
              <IconButton onClick={() => handleDelete(activity.id)} color="error">
                <MdDelete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const DomainActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [newActivity, setNewActivity] = useState({ aspect: '', name: '' });

  useEffect(() => {
    axios.get('http://localhost:8085/domain-activity')
      .then((response) => setActivities(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des données:", error));
  }, []);

  const handleOpen = (activity) => {
    setIsEditing(!!activity);
    setCurrentActivity(activity);
    setNewActivity(activity || { aspect: '', name: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (isEditing) {
      axios.put(`http://localhost:8085/domain-activity/${currentActivity.id}`, newActivity)
        .then(() => axios.get('http://localhost:8085/domain-activity'))
        .then((response) => setActivities(response.data))
        .catch((error) => console.error("Erreur lors de la mise à jour:", error));
    } else {
      axios.post('http://localhost:8085/domain-activity', newActivity)
        .then(() => axios.get('http://localhost:8085/domain-activity'))
        .then((response) => setActivities(response.data))
        .catch((error) => console.error("Erreur lors de l'ajout:", error));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8085/domain-activity/${id}`)
      .then(() => axios.get('http://localhost:8085/domain-activity'))
      .then((response) => setActivities(response.data))
      .catch((error) => console.error("Erreur lors de la suppression:", error));
  };

  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
        Gestion des Domaines d'Activité
      </Typography>

      <ActivityTable activities={activities} handleOpen={handleOpen} handleDelete={handleDelete} />

      <Grid container justifyContent="center" sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
          Ajouter une Nouvelle Activité
        </Button>
      </Grid>

      <ActivityModal
        open={open}
        handleClose={handleClose}
        isEditing={isEditing}
        newActivity={newActivity}
        handleChange={handleChange}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default DomainActivityPage;

