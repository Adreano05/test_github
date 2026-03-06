const readline = require("readline");

// Création de l'interface CLI
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let notes = [];
let nombreNotes = 0;
let compteur = 0;

rl.question("Combien de notes voulez-vous entrer ? ", (answer) => {
    nombreNotes = parseInt(answer);

    if(isNaN(nombreNotes) || nombreNotes <= 0){
        console.log("Veuillez entrer un nombre valide de notes.");
        rl.close();
        return;
    }

    demanderNote();
});

// Fonction pour demander les notes une par une
function demanderNote(){
    if(compteur < nombreNotes){
        rl.question(`Note ${compteur+1}: `, (noteStr) => {
            let note = parseFloat(noteStr);

            if(isNaN(note) || note < 0 || note > 20){
                console.log("La note doit être entre 0 et 20. Réessayez.");
                demanderNote(); // redemander la note
            } else {
                notes.push(note);
                compteur++;
                demanderNote(); // passer à la note suivante
            }
        });
    } else {
        calculerResultats();
        rl.close();
    }
}

// Fonction pour calculer la moyenne, max, min, mention, statut
function calculerResultats(){
    let somme = 0;
    let max = notes[0];
    let min = notes[0];

    for(let note of notes){
        somme += note;
        if(note > max) max = note;
        if(note < min) min = note;
    }

    const moyenne = somme / notes.length;

    let mention = "";
    let statut = "";

    if(moyenne < 10){
        mention = "Aucune";
        statut = "Échoué";
    }
    else if(moyenne < 12){
        mention = "Passable";
        statut = "Admis";
    }
    else if(moyenne < 14){
        mention = "Assez bien";
        statut = "Admis";
    }
    else if(moyenne < 16){
        mention = "Bien";
        statut = "Admis";
    }
    else{
        mention = "Très bien";
        statut = "Admis";
    }

    console.log("\n===== Résultat =====");
    console.log(`Moyenne : ${moyenne.toFixed(2)}`);
    console.log(`Note max : ${max}`);
    console.log(`Note min : ${min}`);
    console.log(`Mention : ${mention}`);
    console.log(`Statut : ${statut}`);
}