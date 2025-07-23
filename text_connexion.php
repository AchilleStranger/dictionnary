<?php
$hote='localhost';
$utilisateur='root';
$nomBase='DICTIONNAIRE_DB';
$motDePasse='Achillosco12';
$connexion = new mysqli($hote, $utilisateur, $motDePasse, $nomBase);

if ($connexion->connect_error) {
    die("Échec de la connexion : " . $connexion->connect_error);
} else {
    echo "Connexion réussie à la base de données.";
}
?>