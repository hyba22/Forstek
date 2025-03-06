const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const XLSX = require('xlsx');
const bodyParser = require('body-parser');

const app = express();
const port = 8085;
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard'
});

app.post('/signup', (req, res) => {
    const sql = 'INSERT INTO users (`name`, `email`, `password`) VALUES (?)';
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        return res.status(200).json({ message: 'User registered successfully', data });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Erreur lors de la requête:', err);
            res.status(500).json({ message: 'Erreur serveur.' });
            return;
        }

        if (results.length > 0) {
            res.status(200).json({ message: 'Connexion réussie.', fn: results[0].fonction });
        } else {
            res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
        }
    });
});


//ANAM

// Récupérer les données
app.get('/gender-male', (req, res) => {
    const sql = "SELECT * FROM gendermale";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la récupération des données" });
        return res.status(200).json(result);
    });
});

// Ajouter une nouvelle donnée
app.post('/gender-male', (req, res) => {
    const sql = 'INSERT INTO gendermale (annee, pourcentage) VALUES (?)';
    const values = [req.body.annee, req.body.pourcentage];
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout des données :', err);
            return res.status(500).json({ error: 'Erreur base de données' });
        }
        return res.status(200).json({ message: 'Enregistrement réussi' });
    });
});

// Mettre à jour une donnée
app.put('/gender-male/:idmale', (req, res) => {
    const sql = 'UPDATE gendermale SET annee = ?, pourcentage = ? WHERE idmale = ?';
    const values = [req.body.annee, req.body.pourcentage]; // Utiliser annee et pourcentage comme dans les champs de base de données
    const idmale = req.params.idmale;
    db.query(sql, [...values, idmale], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erreur lors de la mise à jour' });
        return res.status(200).json({ message: 'Données mises à jour avec succès' });
    });
});

// Supprimer une donnée
app.delete('/gender-male/:idmale', (req, res) => {
    const sql = "DELETE FROM gendermale WHERE idmale = ?";
    const idmale = req.params.idmale;
    db.query(sql, [idmale], (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la suppression des données" });
        return res.status(200).json({ message: 'Données supprimées avec succès' });
    });
});






//DGPC

app.get('/gender-female', (req, res) => {
    const sql = "SELECT * FROM genderfemale";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la récupération des données" });
        return res.status(200).json(result);
    });
});

// Ajouter une nouvelle donnée
app.post('/gender-female', (req, res) => {
    const sql = 'INSERT INTO genderfemale (annee, pourcentage) VALUES (?)';
    const values = [req.body.annee, req.body.pourcentage];
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout des données :', err);
            return res.status(500).json({ error: 'Erreur base de données' });
        }
        return res.status(200).json({ message: 'Enregistrement réussi' });
    });
});

// Mettre à jour une donnée
app.put('/gender-female/:idfemale', (req, res) => {
    const sql = 'UPDATE genderfemale SET annee = ?, pourcentage = ? WHERE idfemale = ?';
    const values = [req.body.annee, req.body.pourcentage]; // Utiliser annee et pourcentage comme dans les champs de base de données
    const idfemale = req.params.idfemale;
    db.query(sql, [...values, idfemale], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erreur lors de la mise à jour' });
        return res.status(200).json({ message: 'Données mises à jour avec succès' });
    });
});

// Supprimer une donnée
app.delete('/gender-female/:idfemale', (req, res) => {
    const sql = "DELETE FROM genderfemale WHERE idfemale = ?";
    const idfemale = req.params.idfemale;
    db.query(sql, [idfemale], (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la suppression des données" });
        return res.status(200).json({ message: 'Données supprimées avec succès' });
    });
});

//
// Récupérer toutes les données pour domain-activity
app.get('/domain-activity', (req, res) => {
    const sql = "SELECT * FROM domainactivity";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la récupération des données" });
        return res.status(200).json(result);
    });
});

// Ajouter une nouvelle donnée
app.post('/domain-activity', (req, res) => {
    const sql = 'INSERT INTO domainactivity (aspect, name) VALUES (?)';
    const values = [req.body.aspect, req.body.name];
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout des données :', err);
            return res.status(500).json({ error: 'Erreur base de données' });
        }
        return res.status(200).json({ message: 'Enregistrement réussi' });
    });
});

// Mettre à jour une donnée
app.put('/domain-activity/:iddomain', (req, res) => {
    const sql = 'UPDATE domainactivity SET aspect = ?, name = ? WHERE iddomain = ?';
    const values = [req.body.aspect, req.body.name]; // Utiliser annee et pourcentage comme dans les champs de base de données
    const iddomain = req.params.iddomain;
    db.query(sql, [...values, iddomain], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erreur lors de la mise à jour' });
        return res.status(200).json({ message: 'Données mises à jour avec succès' });
    });
});

// Supprimer une donnée
app.delete('/domain-activity/:iddomain', (req, res) => {
    const sql = "DELETE FROM domainactivity WHERE iddomain = ?";
    const iddomain = req.params.iddomain;
    db.query(sql, [iddomain], (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la suppression des données" });
        return res.status(200).json({ message: 'Données supprimées avec succès' });
    });
});

app.get('/innovation-duration', (req, res) => {
    const sql = "SELECT * FROM innovation";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la récupération des données" });
        return res.status(200).json(result);
    });
});

// Ajouter une nouvelle donnée
app.post('/innovation-duration', (req, res) => {
    const sql = 'INSERT INTO innovation (name, annee) VALUES (?)';
    const values = [req.body.name, req.body.annee];
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout des données :', err);
            return res.status(500).json({ error: 'Erreur base de données' });
        }
        return res.status(200).json({ message: 'Enregistrement réussi' });
    });
});

// Mettre à jour une donnée
app.put('/innovation-duration/:idinnov', (req, res) => {
    const sql = 'UPDATE domainactivity SET name = ?, annee = ? WHERE idinnov = ?';
    const values = [req.body.name, req.body.annee]; // Utiliser annee et pourcentage comme dans les champs de base de données
    const idinnov = req.params.idinnov;
    db.query(sql, [...values, idinnov], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erreur lors de la mise à jour' });
        return res.status(200).json({ message: 'Données mises à jour avec succès' });
    });
});

// Supprimer une donnée
app.delete('/innovation-duration/:idinnov', (req, res) => {
    const sql = "DELETE FROM innovation WHERE idinnov = ?";
    const idinnov = req.params.idinnov;
    db.query(sql, [idinnov], (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la suppression des données" });
        return res.status(200).json({ message: 'Données supprimées avec succès' });
    });
});
//

app.get('/maturity-level', (req, res) => {
    const sql = "SELECT * FROM maturite";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la récupération des données" });
        return res.status(200).json(result);
    });
});

// Ajouter une nouvelle donnée
app.post('/maturity-level', (req, res) => {
    const sql = 'INSERT INTO maturite (name, pourcentage) VALUES (?)';
    const values = [req.body.nom, req.body.pourcentage];
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout des données :', err);
            return res.status(500).json({ error: 'Erreur base de données' });
        }
        return res.status(200).json({ message: 'Enregistrement réussi' });
    });
});

// Mettre à jour une donnée
app.put('/maturity-level/:idmat', (req, res) => {
    const sql = 'UPDATE maturite SET name = ?, pourcentage = ? WHERE idmat = ?';
    const values = [req.body.name, req.body.pourcentage]; // Utiliser annee et pourcentage comme dans les champs de base de données
    const idmat = req.params.idmat;
    db.query(sql, [...values, idmat], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erreur lors de la mise à jour' });
        return res.status(200).json({ message: 'Données mises à jour avec succès' });
    });
});

// Supprimer une donnée
app.delete('/maturity-level/:idmat', (req, res) => {
    const sql = "DELETE FROM maturite WHERE idmat = ?";
    const idmat = req.params.idmat;
    db.query(sql, [idmat], (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la suppression des données" });
        return res.status(200).json({ message: 'Données supprimées avec succès' });
    });
});
//

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

