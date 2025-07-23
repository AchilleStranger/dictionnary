function chercherMot() {
    const mot = document.getElementById("mot").value.trim().toLowerCase();
    const defDiv = document.getElementById("definition");

    if (!mot) {
        defDiv.innerHTML = "Veuillez entrer un mot.";
        return;
    }

    const url = `https://fr.wiktionary.org/w/api.php?action=parse&page=${mot}&format=json&origin=*`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                defDiv.innerHTML = "Mot non trouvé dans le dictionnaire.";
                return;
            }

            const html = data.parse.text["*"];
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;

            const defList = tempDiv.querySelectorAll("ol > li");
            if (defList.length > 0) {
                // Nettoyage de la première définition
                let defTexte = defList[0].innerText;
                defTexte = defTexte.split(".")[0] + "."; // Garde seulement la première phrase
                defTexte = defTexte.replace(/\([^)]*\)/g, ""); // Supprime le texte entre parenthèses

                defDiv.innerHTML = `<strong>${mot}</strong> : ${defTexte}`;
            } else {
                defDiv.innerHTML = "Définition introuvable.";
            }
        })
        .catch(error => {
            defDiv.innerHTML = "Erreur lors de la recherche.";
            console.error(error);
        });
}
