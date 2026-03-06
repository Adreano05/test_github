const readline = require("readline");

// Création dune interface 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let notes = [];
let nombreNotes = 0;
let compteur = 0;

rl.question("Combien de notes voulez-vous entrer ? ", (answer) => {
    nombreNotes = parseInt(answer);

    if(isNaN(nombreNotes) || nombreNotes <= 1){
        console.log("Veuillez entrer un nombre valide de notes.");
        rl.close();
        return;
    }
    
    demanderNote();
});

// Fonction pour demander les notes une par une avec une validation stricte
function demanderNote(){
    if(compteur < nombreNotes){
        rl.question(`Note ${compteur+1}: `, (noteStr) => {
            let note = parseFloat(noteStr);

            if(isNaN(note) || note < 0 || note > 20){
                console.log("La note doit être entre 0 et 20. Réessayez.");
                demanderNote(); 
            } else {
                notes.push(note);
                compteur++;
                demanderNote();
            }
        });
    } else {
        calculerResultats();
        rl.close();
    }
}

// Fonction pour calculer la moyenne, mention, statut
function calculerResultats(){
    let somme = 0;

    for(let note of notes){
        somme += note;
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
    console.log(`Mention : ${mention}`);
    console.log(`Statut : ${statut}`);
}