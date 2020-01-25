// template = ['<div class="logLine"> <li class="list-group-item">', '<div class="outer p1">', '<div class="inner player1HPBar">', '</div>', '</div>', '<span class="player1Hp"></span>', '<span class="badge player1">14</span>', '<span class="badge player2">14</span> <div class="round"> Round <span class="roundNo">1</span> </div>', '<div class="outer p2">', '<div class="inner player2HPBar">', '<div></div>', '</div>', '</div>', '<span class="player2Hp"></span>', '</li> </div>'].join(''),

// let game;

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


    }
}

class Game {
    constructor() {
        this.gracz1 = new Monster("Baba Wodna", 120, 5, 2, 23, 20);
        this.gracz2 = new Monster("Strzyga", 75, 8, 3, 25, 20);
        this.space = document.addEventListener('keypress', this.onKeyPress.bind(this));
        this.btn = document.getElementById("beginBattle");
        this.btn.onclick = this.round.bind(this);
        this.gracz1Data = document.getElementById("gracz1Data");
        this.gracz2Data = document.getElementById("gracz2Data");
    }
        
    onKeyPress(e) {
        console.log(e);
        if (e.code === "Space") {
            this.round();
        }
    }
    round() {
        this.gracz1.hit(this.gracz2);
        this.gracz2.hit(this.gracz1);
        if (this.gracz1.isDead()) {
            if(confirm('this.gracz2.name + " win. Press OK to restart."')) {
                const game = new Game();
            }
        }
        if (this.gracz2.isDead()) {
            // alert(this.gracz1.name + " win");
            if(confirm('this.gracz1.name + " win. Press OK to restart."')) {
                const game = new Game();
            }
        }
        console.log(this.gracz1, this.gracz2);
    }
}













window.addEventListener('DOMContentLoaded', (e) => {
  const game = new Game();
});




