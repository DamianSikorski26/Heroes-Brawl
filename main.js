let nomHero = document.getElementById('nomHero');
let typeHero = document.getElementById('typeHero');
let imgContainer = document.querySelector('.imgContainer');
let addButton = document.getElementById("addButton");
let Arena = document.querySelector(".Arena");
let hitSound = document.querySelector("#hitSound");

let listeHero = [];

class Hero{
    constructor(nom,portrait){
        this.nom = nom;
        this.vie;
        this.type;
        this.force;
        this.emoji;
        this.maxVie;
        this.portrait = portrait;

    }
    attaquer(cible){
        cible.takeDamage(this.force)
        console.log("attaque Hero")
    }
    takeDamage(force){
        if(this.vie < force){
            this.vie = 0;
        }
        else{
            this.vie -= force;
        }
        let containerCible = document.querySelectorAll(`.hero-container`);
        console.log(containerCible[listeHero.indexOf(this)]);
        containerCible[listeHero.indexOf(this)].classList.add("damaged");
        

    }
    display(){
        
        let div = document.createElement("div");
        div.classList.add("hero-container");
        div.setAttribute("data-index",listeHero.indexOf(this));
        div.innerHTML = ` <img src="${this.portrait}" alt="img">
        <span>${this.emoji} ${this.nom} (${this.type})</span>
        <div class="lifeCOntainer">
            <div class="healthBar" style="width:${this.vie / (this.maxVie/100) }%;">
                
            </div>
            <span>${this.vie} / ${this.maxVie}</span>
        </div>
        <p>💪 Force :${this.force}</p>`;

        let targets = document.createElement("div");
        targets.classList.add("buttonsContainer");
        
        if(!this.isDead()){
            listeHero.forEach((e,index)=>{
                if(e != this && !e.isDead()){
                    targets.innerHTML += `<button data-index = ${index} class = button>⚔️ ${e.nom}</button>`
                }
            })
            div.append(targets);

        }
        
        if(this.isDead()){

            div.classList.add("dead");
        }

        return div;

    }
    isDead(){
        if (this.vie <= 0){
            return true
        }
        else{
            return false
        }
    }
}

class Guerrier extends Hero {
    constructor(nom,portrait){
        super(nom,portrait)
        this.vie = 100;
        this.maxVie = 100;
        this.type = "Guerrier";
        this.force = 30;
        this.emoji = "🗡️";
        

    }
}



class Mage extends Hero {
    constructor(nom,portrait){
        super(nom,portrait)
        this.vie = 80;
        this.maxVie = 80;
        this.type = "Mage";
        this.force = 20;
        this.emoji = "🔮";
        

    }
    attaquer(cible){
        cible.takeDamage(this.force);
        if(!cible.isDead()){
            cible.takeDamage(5);
        }
        
        console.log("attaque magique")
    }
}

class Vampire extends Hero {
    constructor(nom,portrait){
        super(nom,portrait)
        this.vie = 60;
        this.maxVie = 60;
        this.type = "Vampire";
        this.force = 15;
        this.emoji = "🧛🏼‍♂️";
        

    }
    attaquer(cible){
        cible.takeDamage(this.force)
        if (!cible.isDead()){
                cible.takeDamage(this.force);

            }

            console.log("attaque de vampire")    
        }
        
    }


//fonction qui renvoie tru si une image est selectionner ou non

function isImgSelected(){
    let list = imgContainer.querySelectorAll("img");
    console.log(list);
    let bool = false;
    list.forEach((e)=>{
        if (e.classList.contains("activeImg")){
            console.log(true);
            bool = true;
        }
    });
    
    return bool; 
}

//fontion qui affiche tout les heros de la liste
function displayAll(){
    Arena.innerHTML = "";
    listeHero.forEach((e)=>{
        Arena.append(e.display())
    })
}

//evement de récupération de l'image portrait

imgContainer.addEventListener("click",(e)=>{
    e.preventDefault();
    imgContainer.querySelectorAll("img").forEach((e)=>{
        e.classList.remove("activeImg");
    })
    e.target.classList.add("activeImg");
})


//evenement d'ajout de hero
addButton.addEventListener("click",(e)=>{
    e.preventDefault();
    if(!nomHero.value || !isImgSelected() ){
        alert("Remplisser tout les champs");
        return
    }

    let src = imgContainer.querySelector(".activeImg");
   
    switch (typeHero.value){
        case "Guerrier":
                listeHero.push(new Guerrier(nomHero.value,src.getAttribute("src")));
                break
            case "Mage":
                listeHero.push(new Mage(nomHero.value,src.getAttribute("src")));
                break
            case "Vampire":
                listeHero.push(new Vampire(nomHero.value,src.getAttribute("src")));
                break

            
    }
    console.log(listeHero);
    displayAll();


})

//evenment qui genre les attaques
Arena.addEventListener("click",(e)=>{
    e.preventDefault()
    if(e.target.tagName == "BUTTON"){
        let indexCible = e.target.dataset.index;
        let indexAttaquant = e.target.closest(".hero-container").dataset.index;
        console.log(indexAttaquant);
        console.log(indexCible);
        listeHero[indexAttaquant].attaquer(listeHero[indexCible]);
        hitSound.play();
        setTimeout(function(){
            displayAll();
        },800)
        
        
    }
 
})

