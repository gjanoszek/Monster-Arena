class Monster {
    constructor(name, hp, maxDmg, minDmg, critChance, missChance) {
        this.name = name;
        this.hp = hp;
        this.maxDmg = maxDmg;
        this.minDmg = minDmg;
        this.critChance = critChance;
        this.missChance = missChance;
    
    }

    calculateDamage() {
        return Math.floor(Math.random() * (Math.floor(this.maxDmg) - Math.ceil(this.minDmg) + 1)) + Math.ceil(this.minDmg);
    }

    checkIfCritical() {
        return Math.ceil(Math.random() * 100) <= this.critChance;
    }

    checkIfMiss() {
        return Math.ceil(Math.random() * 100) <= this.missChance;
    }
    isAlive() {
        return this.hp > 0;
    }
    isDead() {
        return !this.isAlive();
    }


    hit(targetMonster) {
        let missed = this.checkIfMiss();
        let dmg = 0;
        if (!missed) {
            dmg = this.calculateDamage()
            if (this.checkIfCritical()) {
                dmg = dmg * 3;
            }
        }
        targetMonster.hp = targetMonster.hp - dmg;
        return dmg;
    }
}

class Game {
    constructor() {
        this.monsters = [
            new Monster("Baba Wodna", 120, 5, 2, 23, 20),
            new Monster("Strzyga", 75, 8, 3, 25, 20),
            new Monster("Ścierwojad", 60, 9, 2, 25, 20),
            new Monster("Cieniostwór", 100, 6, 2, 25, 20),
            new Monster("Zębacz", 90, 10, 1, 25, 20)
        ]; 

        this.gracz1Data = document.getElementById("gracz1Data");
        this.gracz2Data = document.getElementById("gracz2Data");
        
        this.gracz1 = Object.assign(new Monster, this.getSelectedMonster(this.gracz1Data))
        this.gracz2 = Object.assign(new Monster, this.getSelectedMonster(this.gracz2Data))

        this.setInputValues(1, this.gracz1.hp, this.gracz1.maxDmg, this.gracz1.minDmg, this.gracz1.critChance, this.gracz1.missChance);
        this.setInputValues(2, this.gracz2.hp, this.gracz2.maxDmg, this.gracz2.minDmg, this.gracz2.critChance, this.gracz2.missChance);

        this.gracz1Data.onchange = () => {
            this.gracz1 = Object.assign(new Monster, this.getSelectedMonster(this.gracz1Data))
            this.setInputValues(1, this.gracz1.hp, this.gracz1.maxDmg, this.gracz1.minDmg, this.gracz1.critChance, this.gracz1.missChance);
        }

        this.gracz2Data.onchange = () => {
            this.gracz2 = Object.assign(new Monster, this.getSelectedMonster(this.gracz2Data))
            this.setInputValues(2, this.gracz2.hp, this.gracz2.maxDmg, this.gracz2.minDmg, this.gracz2.critChance, this.gracz2.missChance);
        }

        this.space = document.addEventListener('keypress', this.onKeyPress.bind(this));
        this.btn = document.getElementById("beginBattle");
        this.btn.onclick = this.round.bind(this);


    }

    getSelectedMonster(playerData) {
        return this.monsters[playerData.options[playerData.selectedIndex].value];
    }

    resetGame() {
        document.getElementById("shared_battle_log").innerHTML = '';
        this.gracz1 = Object.assign(new Monster, this.getSelectedMonster(this.gracz1Data))
        this.gracz2 = Object.assign(new Monster, this.getSelectedMonster(this.gracz2Data))
    }
        
    onKeyPress(e) {
        console.log(e);
        if (e.code === "Space") {
            this.round();
        }
    }
    round() {
        const dmg1 = this.gracz1.hit(this.gracz2);
        const dmg2 = this.gracz2.hit(this.gracz1);
        document.querySelector('#shared_battle_log').innerHTML += this.newRoundTemplate(this.gracz1.name, this.gracz1.hp, dmg1, this.gracz2.name, this.gracz2.hp, dmg2);
        if (this.gracz1.isDead()) {
            if(confirm(this.gracz2.name + ' win. Press OK to restart.')) {
                this.resetGame();
            }
        }
        if (this.gracz2.isDead()) {
            if(confirm(this.gracz1.name + ' win. Press OK to restart.')) {
                this.resetGame();
            }
        }
        this.scroll();
        console.log(this.gracz1, this.gracz2);
    }
    
    newRoundTemplate(name1, hp1, dmg1, name2, hp2, dmg2) {
        return `
        <li class="round">
            <div class="monster-container">
                <h3 class="monster" id="monster1">${name1}</h3>
                <span class="hp" id=hp-monster1>${hp1}</span>
                <span class="damageDeal" id=dd-monster1>${dmg1}</span>
            </div>
            <div class="monster-container">
                <h3 class="monster" id="monster2">${name2}</h3>
                <span class="hp" id=hp-monster2>${hp2}</span>
                <span class="damageDeal" id=dd-monster2>${dmg2}</span>
            </div>
        </li>
    `
    }
    setInputValues(player, hp, maxDmg, minDmg, critChance, missChance) {
        const d = document;
        d.getElementById('hp' + player).value = hp;
        d.getElementById('maxDamage' + player).value = maxDmg;
        d.getElementById('minDamage' + player).value = minDmg;
        d.getElementById('criticChance' + player).value = critChance;
        d.getElementById('missChance' + player).value = missChance;
    }

    scroll() {
        document.getElementById('shared_battle_log').scrollTop = 9999999;
    }
}

window.addEventListener('DOMContentLoaded', (e) => {
  const game = new Game();
});
