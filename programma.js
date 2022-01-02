//Scorciatoia root foglio di stile.
stileDocumento = document.documentElement.style;
//Set iniziale colore primario.
stileDocumento.setProperty("--primaryColor", "rgb(0, 0, 0)");
//Set turno iniziale casuale.
turno = Boolean(Math.round(Math.random()));
//Funzione inizio.
inizio();

//Funzione utilizzata sia all'inizio che per la ripetizione del gioco.
function inizio() {
    //Set testo che indica il turno.
    cambioTesto(turno, "turnoDi", "Turno di: X", "Turno di: O");
    //Creazione tabella conteggio vittoria.
    tabella = new Array(9);
}

//Funzione attivata dal tasto ricominciare per ripetere l'esecuzione del gioco.
function ripeti(){
    //Scomparsa tasto ricominciare.
    document.getElementById("ricominciare").style.display = "none";
    //Reset tabella vittoria.
    tabella = undefined;
    //Funzione inizio.
    inizio();
    //Reset grafico campo di gioco.
    for (let i = 0; i < tabella.length; i++) {
        cambioTesto(true, "casella" + String.fromCharCode(49 + i))
    }
}

//Cambio variabili colore.
function temi(colore1 = "", colore2 = "", colore3 = "", colore4 = ""){
    stileDocumento.setProperty("--primaryColor", colore1);
    stileDocumento.setProperty("--secondaryColor", colore2);
    stileDocumento.setProperty("--tertiaryColor", colore3);
    stileDocumento.setProperty("--quaternaryColor", colore4);
}

//Cambio tra tema scuro e tema chiaro.
function cambioTema(c = false){
    //Se il colore primario è nero allora tema chiaro, altrimenti tema scuro.
    if (stileDocumento.getPropertyValue("--primaryColor") == "rgb(0, 0, 0)") {
        temi("rgb(255, 255, 255)", "rgb(0, 0, 0)", "rgba(0, 0, 0, 0.05", "rgba(0, 0, 0, 0.1");
        //Cambio testo bottone con il tema corrente.
        document.getElementById("tema").innerText = "Tema: Chiaro";
    } else {
        temi("rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgba(255, 255, 255, 0.2", "rgba(255, 255, 255, 0.25");
        //Cambio testo bottone con il tema corrente.
        document.getElementById("tema").innerText = "Tema: Scuro";
    }
}

//Funzione per cambiare il testo in base ad una variabile booleana.
function cambioTesto(b, elemento, testo1 = "", testo2 = "") {
    if(b == true){
        document.getElementById(elemento).innerText = testo1;
    }else{
        document.getElementById(elemento).innerText = testo2;
    }
}

//Funzione che si attiva in caso di vittoria.
function Vittoria(n){
    //Blocco caselle.
    for (let i = 0; i < tabella.length; i++) {
        tabella[i] = tabella[n];
    }
    //Testo vittoria.
    cambioTesto(tabella[n], "turnoDi", "Vittoria: X", "Vittoria: O");
    //Attiva tasto ricominciare.
    document.getElementById("ricominciare").style.display= "block";
    //Turno quando si ricomincia di chi ha vinto.
    turno = tabella[n];
}

//Funzione che si attiva quando si preme una delle caselle del gioco.
function fPulsante(elemento, n) {
    //Controllo casella già piena.
    if(tabella[n-1] == null){
        //Cambio scritta casella.
        cambioTesto(turno, elemento, "X", "O");
        //Set casella nella tabella.
        tabella[n-1] = turno;
        //Cambio turno
        if (turno == true) {
            turno = false;
        } else {
            turno = true;
        }
        //Aggiornamento testo turno
        cambioTesto(turno, "turnoDi", "Turno di: X", "Turno di: O");
        //Controllo pareggio.
        //Se tutte le caselle sono piene e non si ha vinto allora pareggio.
        for (let i = 0; i < tabella.length; i++) {
            if (tabella[i] != null) {
                if (i >= 8) {
                    //Testo pareggio.
                    document.getElementById("turnoDi").innerText = "Pareggio";
                    //Attiva tasto ricominciare.
                    document.getElementById("ricominciare").style.display= "block";
                    //Set turno random.
                    turno = Boolean(Math.round(Math.random()));
                }
            }else{
                //Uscita dal ciclo se non si pareggia.
                break;
            }
        }
        //Controllo vittoria.
        for (let i = 0; i < 3; i++) {
            let k = i * 3;
            //Controllo orizzontale.
            if (tabella[k] == tabella[k+1] && tabella[k+1] == tabella[k+2] && tabella[k] != null) {
                Vittoria(k);
            }
            //Controllo verticale.
            if (tabella[i] == tabella[i+3] && tabella[i+3] == tabella[i+6] && tabella[i] != null) {
                Vittoria(i);
            }
        }
        //Controllo diagonale.
        if (((tabella[0] == tabella[4] && tabella[4] == tabella[8]) | (tabella[2] == tabella[4] && tabella[4] == tabella[6])) && tabella[4] != null) {
            //Diagonali casella centrale in comune.
            Vittoria(4);
        }
    }
}