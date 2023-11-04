stileDocumento = document.documentElement.style;
stileDocumento.setProperty("--primaryColor", "rgb(0, 0, 0)");
turno = Boolean(Math.round(Math.random()));
inizio();

function inizio() {
    cambioTesto(turno, "turnoDi", "Turno di: X", "Turno di: O");
    tabella = new Array(9);
}

function ripeti(){
    document.getElementById("ricominciare").style.display = "none";
    tabella = undefined;
    inizio();
    for (let i = 0; i < tabella.length; i++) {
        cambioTesto(true, "casella" + String.fromCharCode(49 + i))
    }
}

function temi(colore1 = "", colore2 = "", colore3 = "", colore4 = ""){
    stileDocumento.setProperty("--primaryColor", colore1);
    stileDocumento.setProperty("--secondaryColor", colore2);
    stileDocumento.setProperty("--tertiaryColor", colore3);
    stileDocumento.setProperty("--quaternaryColor", colore4);
}

function cambioTema(c = false){
    if (stileDocumento.getPropertyValue("--primaryColor") == "rgb(0, 0, 0)") {
        temi("rgb(255, 255, 255)", "rgb(0, 0, 0)", "rgba(0, 0, 0, 0.05", "rgba(0, 0, 0, 0.1");
        document.getElementById("tema").innerText = "Tema: Chiaro";
    } else {
        temi("rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgba(255, 255, 255, 0.2", "rgba(255, 255, 255, 0.25");
        document.getElementById("tema").innerText = "Tema: Scuro";
    }
}

function cambioTesto(b, elemento, testo1 = "", testo2 = "") {
    if(b == true){
        document.getElementById(elemento).innerText = testo1;
    }else{
        document.getElementById(elemento).innerText = testo2;
    }
}

function Vittoria(n){
    for (let i = 0; i < tabella.length; i++) {
        tabella[i] = tabella[n];
    }
    cambioTesto(tabella[n], "turnoDi", "Vittoria: X", "Vittoria: O");
    document.getElementById("ricominciare").style.display= "block";
    turno = tabella[n];
}

function fPulsante(elemento, n) {
    if(tabella[n-1] == null){
        cambioTesto(turno, elemento, "X", "O");
        tabella[n-1] = turno;
        if (turno == true) {
            turno = false;
        } else {
            turno = true;
        }
        cambioTesto(turno, "turnoDi", "Turno di: X", "Turno di: O");
        for (let i = 0; i < tabella.length; i++) {
            if (tabella[i] != null) {
                if (i >= 8) {
                    document.getElementById("turnoDi").innerText = "Pareggio";
                    document.getElementById("ricominciare").style.display= "block";
                    turno = Boolean(Math.round(Math.random()));
                }
            }else{
                break;
            }
        }
        for (let i = 0; i < 3; i++) {
            let k = i * 3;
            if (tabella[k] == tabella[k+1] && tabella[k+1] == tabella[k+2] && tabella[k] != null) {
                Vittoria(k);
            }
            if (tabella[i] == tabella[i+3] && tabella[i+3] == tabella[i+6] && tabella[i] != null) {
                Vittoria(i);
            }
        }
        if (((tabella[0] == tabella[4] && tabella[4] == tabella[8]) | (tabella[2] == tabella[4] && tabella[4] == tabella[6])) && tabella[4] != null) {
            Vittoria(4);
        }
    }
}