let healthOfEvst = 0;
let currMoveOfMon = 0;

let healthOfMon = 10;
let currMoveEvst = 0;

const forAppendMonInfo = document.getElementById("for_append_mon");
const forAppendEvstInfo = document.getElementById("for_append_evst");

let usedAbilityEvst = '';

const abilitiesEvstInit = [
    {
        "physicalDmg": 2,
        "magicDmg": 0,
        "physicArmorPercents": 0,
        "magicArmorPercents": 50,
        "cooldown": 0,
    },
    {
        "physicalDmg": 4,
        "magicDmg": 0,
        "physicArmorPercents": 0,
        "magicArmorPercents": 0,
        "cooldown": 4
    },
    {
        "physicalDmg": 0,
        "magicDmg": 5,
        "physicArmorPercents": 0,
        "magicArmorPercents": 0,
        "cooldown": 3
    },
    {
        "physicalDmg": 0,
        "magicDmg": 0,
        "physicArmorPercents": 100,
        "magicArmorPercents": 100,
        "cooldown": 4
    },
];
const abilitiesMon = [
    {
        "physicalDmg": 3, // физический урон
        "magicDmg": 0,    // магический урон
        "physicArmorPercents": 20, // физическая броня
        "magicArmorPercents": 20,  // магическая броня
        "cooldown": 0     // ходов на восстановление
    },
    {
        "name": "Огненное дыхание",
        "physicalDmg": 0,
        "magicDmg": 4,
        "physicArmorPercents": 0,
        "magicArmorPercents": 0,
        "cooldown": 3
    },
    {
        "name": "Удар хвостом",
        "physicalDmg": 2,
        "magicDmg": 0,
        "physicArmorPercents": 50,
        "magicArmorPercents": 0,
        "cooldown": 2
    },
];
//Monster powers cooldown;
let currFireBreatheCoolDown = 0;
let currHitWithPawCoolDown = 0


const initTurnTableCoolDown = abilitiesEvstInit[1].cooldown;
const initFireballCoolDown = abilitiesEvstInit[2].cooldown;
const initMagicBlockCoolDown = abilitiesEvstInit[3].cooldown;
//Evst powers cooldown
let currTurntableCoolDown = 0;
let currFireballColdown = 0;
let currMagicBlockCoolDown = 0;


const makeMoveBtn = document.getElementById("make_move_btn");
makeMoveBtn.addEventListener('click', (evt) => {
    incrementMoveEvst();
    incrementMoveMon();
    makeMove();
    enableCoolDownEvst(usedAbilityEvst);
    reduceColDownsEvst();
    disableCoolDownsEvst();
});

const chooseHitWithCenser = document.getElementById("choose_hit_with_censer");
chooseHitWithCenser.addEventListener('click', (evt) => {
    usedAbilityEvst = evt.target.id;
    forAppendEvstInfo.innerHTML = setCurrStateEvst(evt.target.id);
    enableMoveButton();

});

const chooseTurntable = document.getElementById("choose_turntable");
chooseTurntable.addEventListener('click', (evt) => {
    usedAbilityEvst = evt.target.id;
    forAppendEvstInfo.innerHTML = setCurrStateEvst(evt.target.id);
    enableMoveButton();

});

const chooseFireball = document.getElementById("choose_fireball");
chooseFireball.addEventListener('click', (evt) => {
    usedAbilityEvst = evt.target.id;
    forAppendEvstInfo.innerHTML = setCurrStateEvst(evt.target.id);
    enableMoveButton();

});
const chooseMagicBlock = document.getElementById("choose_magic_block");
chooseMagicBlock.addEventListener('click', (evt) => {
    usedAbilityEvst = evt.target.id;
    forAppendEvstInfo.innerHTML = setCurrStateEvst(evt.target.id)
    enableMoveButton();
});


//buttons with abilities of monster
const fireBreatheBtn = document.getElementById("fire_breathe_btn");
fireBreatheBtn.addEventListener('click', evt => {
    forAppendMonInfo.innerHTML = updateMonInfo(evt.target.id);
});
const hitWithTailBtn = document.getElementById("hit_with_tail_btn");
hitWithTailBtn.addEventListener('click', evt => {
    usedAbilityEvst = evt.target.id;
    forAppendMonInfo.innerHTML = updateMonInfo(evt.target.id);

});
const hitWithPawBtn = document.getElementById("hit_with_paw_btn");
hitWithPawBtn.addEventListener('click', evt => {
    forAppendMonInfo.innerHTML = updateMonInfo(evt.target.id);
});

//current information of monster
const chooseHealthInput = document.getElementById("choose_health_input");

const button_start = document.getElementById('button_start');
button_start.addEventListener("click", () => {
    if (checkIfCorrectChosen(chooseHealthInput.value)) {
        healthOfEvst = chooseHealthInput.value;
        makeZeroInfo(healthOfEvst);
        enableEvstButtons();
        enableMonButtons();
        zeroAndIncrementMoveMon();
        clickRandomAbilMon(getRandomInt());

    } else {

    }
});

function checkIfCorrectChosen(firsInputStr) {
    const firstInputVal = +firsInputStr
    if (isFinite(firstInputVal) && firstInputVal >= 10 && firstInputVal <= 20) {
        return true;
    } else
        healthOfEvst = 0;
    alert("Неверный ввод");
}

function makeZeroInfo(healthOfEvst) {
    forAppendEvstInfo.innerHTML = `<tr>
                <th>${currMoveEvst}</th>
                <td>${healthOfEvst}</td>
                <td>${0}</td>
                <td>${0}</td>
                <td>${0}</td>
                <td>${0}</td>
            </tr>`.toString()


}

function enableEvstButtons() {
    chooseHitWithCenser.disabled = false;
    chooseTurntable.disabled = false;
    chooseFireball.disabled = false;
    chooseMagicBlock.disabled = false;

}


function  enableMoveButton() {
    makeMoveBtn.disabled = false;

}


let abilitiesEvstCurrs = [...abilitiesEvstInit];


function enableMonButtons() {
    fireBreatheBtn.disabled = false;
    hitWithTailBtn.disabled = false;
    hitWithPawBtn.disabled = false;
}

function getRandomInt() {
    return Math.floor(Math.random() * (4 - 1)) + 1;
}

function clickRandomAbilMon(num) {
    switch (num) {
        case 1:
            hitWithTailBtn.click();
            break;
        case 2:
            fireBreatheBtn.click();
            break;
        case 3:
            hitWithTailBtn.click();
            break
        default:
    }
}

function makeMove() {
    let resHealthEvst = 0;
    let resHealthMon = 0;
    //current values of abilities of evst
    const currHealthEvst = document.getElementById("health_evst");

    const currMoveEvstSpan = document.getElementById("curr_move_evst");
    const currMoveMonSpan = document.getElementById("curr_move_mon")

    const physDmgEvst = document.getElementById("physical_dmg_evst");
    const magDmgEvst = document.getElementById("magic_dmg_evst");
    const physArmEvst = document.getElementById("physical_armor_evst");
    const magArmEvst = document.getElementById("magic_armor_evst");

    //current values of abilities of monster
    const currHealthMon = document.getElementById("curr_health_mon");
    console.log(currHealthMon);
    const physDmgMon = document.getElementById("physical_dmg_mon");
    const magDmgMon = document.getElementById("magic_dmg_mon");
    const physArmMon = document.getElementById("physical_armor_mon");
    const magArmMon = document.getElementById("magic_armor_mon");

    if (+physArmEvst.innerText / 100 !== 0 && magArmEvst.innerText / 100 !== 0) {
        resHealthEvst = (+currHealthEvst.innerText) - (+physDmgMon.innerText - (+physDmgMon.innerText * (+physArmEvst.innerText / 100))) - (+magDmgMon.innerText - (magDmgMon.innerText * (magArmEvst.innerText / 100)));
        console.log(resHealthEvst);
    } else if (+physArmEvst.innerText / 100 !== 0 && magArmEvst.innerText / 100 === 0) {
        resHealthEvst = (+currHealthEvst.innerText) - (+physDmgMon.innerText - (+physDmgMon.innerText * (+physArmEvst.innerText / 100))) - +magDmgMon.innerText;
    } else if (+physArmEvst.innerText / 100 === 0 && magArmEvst.innerText / 100 !== 0) {
        resHealthEvst = (+currHealthEvst.innerText) - +physDmgMon.innerText - (+magDmgMon.innerText - (magDmgMon.innerText * (magArmEvst.innerText / 100)));
        console.log(resHealthEvst);
    } else if (+physArmEvst.innerText / 100 === 0 && magArmEvst.innerText / 100 === 0) {
        resHealthEvst = (+currHealthEvst.innerText) - +physDmgMon.innerText - +magDmgMon.innerText;
    }

    if (+physArmMon.innerText / 100 !== 0 && magArmMon.innerText / 100 !== 0) {
        resHealthMon = (+currHealthMon.innerText) - (+physDmgEvst.innerText * (+physArmMon.innerText / 100)) - (+magDmgEvst.innerText * (magArmMon.innerText / 100));
    } else if (+physArmMon.innerText / 100 !== 0 && magArmMon.innerText / 100 === 0) {
        resHealthMon = (+currHealthMon.innerText) - (+physDmgEvst.innerText - (+physDmgEvst.innerText * (+physArmMon.innerText / 100))) - +magDmgEvst.innerText;
    } else if (+physArmMon.innerText / 100 === 0 && magArmMon.innerText / 100 !== 0) {
        resHealthMon = (+currHealthMon.innerText) - +physDmgEvst.innerText - (+magDmgEvst.innerText - (magDmgEvst.innerText * (magArmMon.innerText / 100)));
    } else if (+physArmMon.innerText / 100 === 0 && magArmMon.innerText / 100 === 0) {
        resHealthMon = (+currHealthMon.innerText) - +physDmgEvst.innerText - +magDmgEvst.innerText;
    }
    currHealthEvst.innerText = resHealthEvst.toString();
    currHealthMon.innerText = resHealthMon.toString();

    currMoveEvstSpan.innerText = currMoveEvst.toString()
    currMoveMonSpan.innerText = currMoveOfMon.toString();


    console.log(resHealthEvst, resHealthMon);

}

function setCurrStateEvst(evtId) {
    console.log(evtId);
    switch (evtId) {
        case 'choose_hit_with_censer':
            return `<tr>
                <th><span id="curr_move_evst">${currMoveEvst}</span></th>
                <td><span id="health_evst">${healthOfEvst}</td>
                <td><span id="physical_dmg_evst">${abilitiesEvstCurrs[0].physicalDmg}</span></td>
                <td><span id="magic_dmg_evst">${abilitiesEvstCurrs[0].magicDmg}<spam></td>
                <td><span id="physical_armor_evst">${abilitiesEvstCurrs[0].physicArmorPercents}</span></td>
                <td><span id="magic_armor_evst">${abilitiesEvstCurrs[0].magicArmorPercents}</span></td>
            </tr>`.toString()
        case 'choose_turntable':
            return `<tr>
                <th><span id="curr_move_evst">${currMoveEvst}</span></th>
                <td><span id="health_evst">${healthOfEvst}</span></td>
                <td><span id="physical_dmg_evst">${abilitiesEvstCurrs[1].physicalDmg}</span></td>
                <td><span id="magic_dmg_evst">${abilitiesEvstCurrs[1].magicDmg}</span></td>
                <td><span id="physical_armor_evst">${abilitiesEvstCurrs[1].physicArmorPercents}</span></td>
                <td><span id="magic_armor_evst">${abilitiesEvstCurrs[1].magicArmorPercents}</span></td>
            </tr>`.toString()
        case 'choose_fireball':
            return `<tr>
                <th><span id="curr_move_evst">${currMoveEvst}</span></th>
                <td><span id="health_evst">${healthOfEvst}</span></td>
                <td><span id="physical_dmg_evst">${abilitiesEvstCurrs[2].physicalDmg}</span></td>
                <td><span id="magic_dmg_evst">${abilitiesEvstCurrs[2].magicDmg}</span></td>
                <td><span id="physical_armor_evst">${abilitiesEvstCurrs[2].physicArmorPercents}</span></td>
                <td><span id="magic_armor_evst">${abilitiesEvstCurrs[2].magicArmorPercents}</span></td>
            </tr>`.toString()
        case 'choose_magic_block':
            enableMoveButton();
            return `<tr>
                <th><span id="curr_move_evst">${currMoveEvst}</span></th>
                <td><span id="health_evst">${healthOfEvst}</td>
                <td><span id="physical_dmg_evst">${abilitiesEvstCurrs[3].physicalDmg}</span></td>
                <td><span id="magic_dmg_evst">${abilitiesEvstCurrs[3].magicDmg}</span></td>
                <td><span id="physical_armor_evst">${abilitiesEvstCurrs[3].physicArmorPercents}</span></td>
                <td><span id="magic_armor_evst">${abilitiesEvstCurrs[3].magicArmorPercents}</span></td>
            </tr>`.toString()
        default:
            console.log("lala");
    }
}

function updateMonInfo(evtId) {
    console.log(evtId);
    switch (evtId) {

        case 'hit_with_paw_btn':
            return (
                `<tr><th><span id="curr_move_mon">${currMoveOfMon}</span></th>
            <td><span id="curr_health_mon">${healthOfMon}</td>
            <td><span id="physical_dmg_mon">${abilitiesMon[0].physicalDmg}</span></td>
            <td><span id="magic_dmg_mon">${abilitiesMon[0].magicDmg}</td>
            <td><span id="physical_armor_mon">${abilitiesMon[0].physicArmorPercents}</span></td>
            <td><span id="magic_armor_mon">${abilitiesMon[0].magicArmorPercents}</span></td>
        </tr>`.toString()
            )
        case 'fire_breathe_btn':
            return (
                `<tr><th><span id="curr_move_mon">${currMoveOfMon}</span></th>
            <td><span id="curr_health_mon">${healthOfMon}</span></td>
            <td><span id="physical_dmg_mon">${abilitiesMon[1].physicalDmg}</span></td>
            <td><span id="magic_dmg_mon">${abilitiesMon[1].magicDmg}</span></td>
            <td><span id="physical_armor_mon">${abilitiesMon[1].physicArmorPercents}</span></td>
            <td><span id="magic_armor_mon">${abilitiesMon[1].magicArmorPercents}</span></td>
        </tr>`.toString()
            )
            break;
        case 'hit_with_tail_btn':
            return (
                `<tr><th><span id="curr_move_mon">${currMoveOfMon}</span></th>
            <td><span id="curr_health_mon">${healthOfMon}</span></td>
            <td><span id="physical_dmg_mon">${abilitiesMon[2].physicalDmg}</span></td>
            <td><span id="magic_dmg_mon">${abilitiesMon[2].magicDmg}</span></td>
            <td><span id="physical_armor_mon">${abilitiesMon[2].physicArmorPercents}</span></td>
            <td><span id="magic_armor_mon">${abilitiesMon[2].magicArmorPercents}</span></td>
        </tr>`.toString()
            )
        default:
    }
}

//проверяет, не является ли сгенерированное случайное число - валидным для дальнейшей обработки монстра;
// function checkRandValCoolDownMon(num) {
//     switch (num) {
//         case 1:
//
//
//     }
//
// }
//функция обнуления и увеличения хода монстра на единицу для начала игры
function zeroAndIncrementMoveMon() {
    currMoveOfMon = 0;
    currMoveOfMon++;
}

function incrementMoveEvst() {
    currMoveEvst++;
}

function incrementMoveMon() {
    currMoveOfMon++;
}

//проверяет можно ли использовать способность
function disableCoolDownEvst(usedPowerId) {
    switch (usedPowerId) {
        case 'choose_turntable':
            if (currTurntableCoolDown === 0) {
                chooseTurntable.disabled = false;
                chooseTurntable.innerText = "Вы можете использовать эту способность.";
            }
            break;
        case 'choose_fireball':
            if (currFireballColdown === 0) {
                chooseFireball.disabled = false;
                chooseFireball.innerText = "Вы можете использовать эту способность.";
            }
            break;
        case 'choose_magic_block':
            if (currMagicBlockCoolDown === 0) {
                chooseMagicBlock.disabled = false;
                chooseMagicBlock.innerText = "Вы можете использовать эту способность";

            }
    }
}

function enableCoolDownEvst(evtId) {
    switch (evtId) {
        case 'choose_turntable':
            currTurntableCoolDown = initTurnTableCoolDown;
            chooseTurntable.disabled = true;
            chooseTurntable.innerText = `Вы можете использовать эту способность через ${currTurntableCoolDown} хода`;

            break;
        case 'choose_fireball':
            currFireballColdown = initFireballCoolDown;
            chooseFireball.disabled = true;
            chooseFireball.innerText = `Вы сможете использовать эту способность через ${currFireballColdown} хода.`;
            break;
        case 'choose_magic_block':
            currMagicBlockCoolDown = initMagicBlockCoolDown;
            chooseMagicBlock.innerText = `Вы можете использовать эту способность через ${currMagicBlockCoolDown} хода`;
            chooseMagicBlock.disabled = true;

    }
}

function reduceColDownsEvst() {
    console.log("currMagicBlockCoolDown:", currMagicBlockCoolDown)

    if (currTurntableCoolDown > 0 && currFireballColdown > 0 && currMagicBlockCoolDown > 0) {
        console.log("currMagicBlockCoolDown:", currMagicBlockCoolDown)
        chooseTurntable.disabled = true;
        chooseTurntable.innerText = `Вы можете использовать эту способность через ${currTurntableCoolDown} хода`;

        currTurntableCoolDown--;
        currFireballColdown--;
        currMagicBlockCoolDown--;

        chooseTurntable.innerText = `Вы можете использовать эту способность через ${currTurntableCoolDown} хода`;
        chooseFireball.innerText = `Вы сможете использовать эту способность через ${currFireballColdown} хода.`;
        chooseMagicBlock.innerText = `Вы можете использовать эту способность через ${currMagicBlockCoolDown} хода`;
        console.log("Попадает сюда");

    } else if (currTurntableCoolDown > 0 && currFireballColdown > 0 && currMagicBlockCoolDown === 0) {
        currTurntableCoolDown--;
        currFireballColdown--;

        chooseTurntable.innerText = `Вы можете использовать эту способность через ${currTurntableCoolDown} хода`;
        chooseFireball.innerText = `Вы сможете использовать эту способность через ${currFireballColdown} хода.`;

    } else if (currTurntableCoolDown > 0 && currFireballColdown === 0 && currMagicBlockCoolDown > 0) {
        currTurntableCoolDown--;
        currMagicBlockCoolDown--;
        chooseTurntable.innerText = `Вы можете использовать эту способность через ${currTurntableCoolDown} хода`;
        chooseMagicBlock.innerText = `Вы можете использовать эту способность через ${currMagicBlockCoolDown} хода`;


    } else if (currTurntableCoolDown === 0 && currFireballColdown > 0 && currMagicBlockCoolDown > 0) {
        currFireballColdown--;
        currMagicBlockCoolDown--;

        chooseFireball.innerText = `Вы сможете использовать эту способность через ${currFireballColdown} хода.`;
        chooseMagicBlock.innerText = `Вы можете использовать эту способность через ${currMagicBlockCoolDown} хода`;



    } else if (currTurntableCoolDown > 0 && currFireballColdown === 0 && currMagicBlockCoolDown === 0) {
        currTurntableCoolDown--;
        chooseTurntable.innerText = `Вы можете использовать эту способность через ${currTurntableCoolDown + 1} хода`;

    } else if (currTurntableCoolDown === 0 && currFireballColdown > 0 && currMagicBlockCoolDown === 0) {
        currFireballColdown--;
        chooseFireball.innerText = `Вы сможете использовать эту способность через ${currFireballColdown + 1} хода.`;


    } else if (currTurntableCoolDown === 0 && currFireballColdown === 0 && currMagicBlockCoolDown > 0) {
        currMagicBlockCoolDown--;
        chooseMagicBlock.innerText = `Вы можете использовать эту способность через ${currMagicBlockCoolDown + 1} хода`;
        console.log("Попадает сюда");
    }

}

function disableCoolDownsEvst() {
    if (currTurntableCoolDown === 0 && currFireballColdown === 0 && currMagicBlockCoolDown === 0) {

        currTurntableCoolDown = initTurnTableCoolDown;
        chooseTurntable.disabled = false;
        chooseTurntable.innerText = `Выбрать способность`;

        currFireballColdown = initFireballCoolDown;
        chooseFireball.disabled = false;
        chooseFireball.innerText = `Выбрать способность`;

        currMagicBlockCoolDown = initMagicBlockCoolDown;
        chooseMagicBlock.disabled = false;
        chooseMagicBlock.innerText = `Выбрать способность`;


    } else if (currTurntableCoolDown === 0 && currFireballColdown === 0 && currMagicBlockCoolDown > 0) {
        currTurntableCoolDown = initTurnTableCoolDown;
        chooseTurntable.disabled = false;
        chooseTurntable.innerText = `Выбрать способность`;

        currFireballColdown = initFireballCoolDown;
        chooseFireball.disabled = false;
        chooseFireball.innerText = `Выбрать способность`;

    } else if (currTurntableCoolDown === 0 && currFireballColdown > 0 && currMagicBlockCoolDown === 0) {
        currTurntableCoolDown = initTurnTableCoolDown;
        chooseTurntable.disabled = false;
        chooseTurntable.innerText = `Выбрать способность`;

        currMagicBlockCoolDown = initMagicBlockCoolDown;
        chooseMagicBlock.disabled = false;
        chooseMagicBlock.innerText = `Выбрать способность`;


    } else if (currTurntableCoolDown > 0 && currFireballColdown === 0 && currMagicBlockCoolDown === 0) {

        currFireballColdown = initFireballCoolDown;
        chooseFireball.disabled = false;
        chooseFireball.innerText = `Выбрать способность`;

        currMagicBlockCoolDown = initMagicBlockCoolDown;
        chooseMagicBlock.disabled = false;
        chooseMagicBlock.innerText = `Выбрать способность`;

    } else if (currTurntableCoolDown === 0 && currFireballColdown > 0 && currMagicBlockCoolDown > 0) {
        currTurntableCoolDown = initTurnTableCoolDown;
        chooseTurntable.disabled = false;
        chooseTurntable.innerText = `Выбрать способность`;

    } else if (currTurntableCoolDown > 0 && currFireballColdown === 0 && currMagicBlockCoolDown > 0) {
        currFireballColdown = initFireballCoolDown;
        chooseFireball.disabled = false;
        chooseFireball.innerText = `Выбрать способность`;

    } else if (currTurntableCoolDown > 0 && currFireballColdown > 0 && currMagicBlockCoolDown === 0) {
        currMagicBlockCoolDown = initMagicBlockCoolDown;
        chooseMagicBlock.disabled = false;
        chooseMagicBlock.innerText = `Выбрать способность`;
    }
}

