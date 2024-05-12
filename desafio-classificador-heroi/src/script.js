/*Essa função é responsável por obter o nome de herói do usuário e seu XP*/ 
function getHeroData(){
let heroName = document.getElementById('userHeroName');
let xpHero = document.getElementById('xpHero');
let insertedName = heroName.value;
let insertedXp = xpHero.value;
let emptyFields = document.getElementById("emptyInputMessage");
let itens = document.getElementById('heroResult');




if (insertedName === "" || insertedXp === "") {
    emptyFields.textContent = "Por favor, preencha ambos os Campos.";
} else {
    emptyFields.textContent = ""; // Limpa a mensagem se os inputs estiverem preenchidos
    document.querySelector('#heroName').innerHTML = insertedName;

    /* mostra o board do herói */
        itens.classList.remove('hiddenBoard');
        document.getElementById('getData').textContent = 'Reclassificar';

    classifyHero(insertedXp,insertedName);

}

}

/*Função para classificar o herói de Acordo com  sua XP*/

function classifyHero(xp,name) {
    let classification;
    let nextClassification;
    let toNextClassification;
    
    if (xp <= 1000) {
        classification = "Ferro";
        nextClassification = "Bronze";
        toNextClassification = 1001 - xp;
    } else if (xp > 1000 && xp <= 2000) {
        classification = "Bronze";
        nextClassification = "Prata";
        toNextClassification = 2001 - xp;
    } else if (xp > 2000 && xp <= 5000) {
        classification = "Prata";
        nextClassification = "Ouro";
        toNextClassification = 5001 - xp;
    } else if (xp > 5000 && xp <= 7000) {
        classification = "Ouro";
        nextClassification = "Platina";
        toNextClassification = 7001 - xp;
    } else if (xp > 7000 && xp <= 8000) {
        classification = "Platina";
        nextClassification = "Ascendente";
        toNextClassification = 8001 - xp;
    } else if (xp > 8000 && xp <= 9000) {
        classification = "Ascendente";
        nextClassification = "Imortal";
        toNextClassification = 9001 - xp;
    } else if (xp > 9000 && xp <= 10000) {
        classification = "Imortal";
        nextClassification = "Radiante";
        toNextClassification = 10001 - xp;
    } else {
        classification = "Radiante";
        nextClassification = "max";
        toNextClassification = 0;
    }

   

    heroProfile(xp, classification, nextClassification, toNextClassification);
    //Frase do Desafio exibida no console.
    console.log("O Herói de nome "+ name + " está no nível de "+ classification);
}


/* calcula XP  e exibe todos os dados relacionados ao herói*/

function heroProfile(heroXP,heroClassification,nextTitle,missingXP) {
    let maxValue = 10001;
    let message ;
    let image = document.getElementById("classShield");
    let avatar = document.getElementById("heroAvatar");
    let classificationColor;
    let postionRank = rankingVerify(heroXP);

 
    // Converte valor para porcentagem
    let percent = (heroXP / maxValue) * 100;

    // Limita a porcentagem a no máximo 100%
    percent = Math.min(percent, 100);

    if(nextTitle === "max"){
        message = "Você alcançou o nível máximo, nem adianta mais upar"

    }else{
        message = `Faltam ${missingXP} pontos de xp para o nível: ${nextTitle}`;
    }

    classificationColor = labelColors(heroClassification);
//prenche board do herói com os dados informados

    document.getElementById('fillXp').style.width = percent.toFixed(2) + '%'
    document.querySelector('#currentClassification').innerHTML = heroClassification;
    document.querySelector('#xpMessage').innerHTML = message;
    document.querySelector('#infoXp').innerHTML = `Quantidade de XP: ${heroXP} , que equivale a ${percent.toFixed(2).replace(/\.?0+$/, '')}% da jornada.${postionRank}`;
    document.getElementById('heroAvatar').style.background = classificationColor.textColor;
    document.getElementById('currentClassification').style.background = classificationColor.textColor;
    document.getElementById('currentClassification').style['text-shadow'] = classificationColor.shadowColor;
    document.getElementById('currentClassification').style['-webkit-background-clip'] = "text";
    document.getElementById('currentClassification').style['-webkit-text-fill-color'] = "transparent";
    image.src = `./src/images/${heroClassification}.png`;
    avatar.src = `./src/images/heroi_${heroClassification}.png`;

    console.log(`Classificação:${heroClassification} , XP: ${heroXP} Próxima?: ${nextTitle}  faltam: ${missingXP}`);

}

//Rensponsável pela coloração do css dos níveis de heróis (Título e fundo do avatar)

function labelColors (classification){

    let labelStyle= {textColor:'',
                    shadowColor:''};

        switch (classification) {
            case 'Ferro':
                labelStyle.textColor= "-webkit-linear-gradient(#fffffe, #ffffff)";
                labelStyle.shadowColor= "0px 0px 12px #000000";
                break;
            case 'Bronze':
                labelStyle.textColor= "-webkit-linear-gradient(#b16c25, #000000)";
                labelStyle.shadowColor= "0px 0px 12px #7e4a14";
                break;
            case 'Prata':
                labelStyle.textColor= "-webkit-linear-gradient(#b3babb, #2e337c)";
                labelStyle.shadowColor= "0px 0px 12px #f2ffff";
                break;
            case 'Ouro':
                labelStyle.textColor= "-webkit-linear-gradient(#fcff36, #ffffff)";
                labelStyle.shadowColor= "0px 0px 5px #ffe94a";
                break;
            case 'Platina':
                labelStyle.textColor= "-webkit-linear-gradient(#121212, #43e0fb)";
                labelStyle.shadowColor= "0px 0px 12px #30bcff";
                break;
             case 'Ascendente':
                labelStyle.textColor= "-webkit-linear-gradient(#b191fd, #004578)";
                labelStyle.shadowColor= "0px 0px 12px #d073ff";
                break;
            case 'Imortal':
                labelStyle.textColor= "-webkit-linear-gradient(#16db37, #004578)";
                labelStyle.shadowColor= "0px 0px 12px #27c8f";
                break;
            default:
                    labelStyle.textColor= "-webkit-linear-gradient(#ffffff, #fdfda8)";
                    labelStyle.shadowColor= "0px 0px 12px #e3f35c";
    }

    return labelStyle;
}


function rankingVerify(xpReceived) {
    let position = 0;
    let rankStatus;
    let ranking = [9001, 8900, 8000, 7900, 7800, 6000, 4000, 3000, 2000, 1000];

    if (xpReceived > ranking[0]) {
        ranking.unshift(xpReceived); 
        ranking.pop(); 
        position = 1; 
        rankStatus = `Você está em ${position}º lugar no ranking de Heróis`;
    } else {
        for (let i = 1; i < ranking.length; i++) {
            if (xpReceived >= ranking[i]) {
                ranking.splice(i, 0, xpReceived); 
                ranking.pop(); 
                position = i + 1; 
                rankStatus = `Você está em ${position}º lugar no ranking de Heróis`;
                break;
            }
        }
    }

    if (position === 0) {
        rankStatus = "Não está no Ranking de Heróis";
    }

    return rankStatus;
}












