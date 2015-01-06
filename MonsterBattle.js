/**
 * Created by wetcouch on 12.10.14.
 */

var Monster = function (opts) {
        this.nazwa = opts.nazwa;
        this.hp = opts.hp;
        this.maxDmg = opts.maxDmg;
        this.minDmg = opts.minDmg;
        this.critMult = opts.critMult;
        this.missMult = opts.missMult;
    },
    monster1,
    monster2,
    getMonsterInitData = function (monsterNum) {
        return {
            nazwa: $("#name" + monsterNum).val(),
            hp: parseInt($("#hp" + monsterNum).val(), 10),
            maxDmg: parseInt($("#maxDamage" + monsterNum).val(), 10),
            minDmg: parseInt($("#minDamage" + monsterNum).val(), 10),
            missMult: parseFloat($("#missMultiplier" + monsterNum).val()),
            critMult: parseFloat($("#criticMultiplier" + monsterNum).val())
        };
    },
    log1,
    log2,
    uderzenie,
    isCritic,
    isAccurate;

Monster.prototype.przedstawSie = function () {
    return this.nazwa;
};

Monster.prototype.uderz = function (monsterNum) {
    var attackingMonster = window['monster' + monsterNum],
        critic = Math.random() * attackingMonster.critMult,
        missChance = Math.floor(Math.random() * attackingMonster.missMult);

    isCritic = critic <= 0.14;

    if (missChance >= 2) {
        isAccurate = true;
    } else {
        isAccurate = false;
    }

    if (isAccurate === true) {
        uderzenie = Math.floor(Math.random() * (this.maxDmg - this.minDmg)) + this.minDmg;
        if (isCritic) {
            uderzenie *= 3;
            console.log(window['monster' + monsterNum].przedstawSie() + ' zadaje obrażenia krytyczne.');
        } else {
            console.log(window['monster' + monsterNum].przedstawSie() + ' hits with ' + uderzenie + ' damage.');
        }
    } else {
        uderzenie = 0;
        critic = 0.14;
        isCritic = critic <= 0.13;
        console.log(window['monster' + monsterNum].przedstawSie() + ' miss!');
    }


    return {
        isCritic: isCritic,
        uderzenie: uderzenie
    };


};

var raport = function (player, daneUderzenia, monsterNum) {
    var currentLogVal = window['log' + monsterNum].val();
    if (daneUderzenia.isCritic) {
        newLogVal = currentLogVal + "\n" + (player.przedstawSie() + ' deals critic ' + daneUderzenia.uderzenie + ' damage.');
    } else if (daneUderzenia.uderzenie === 0) {
        newLogVal = currentLogVal + "\n" + (player.przedstawSie() + ' misses!')
    } else {
        newLogVal = currentLogVal + "\n" + (player.przedstawSie() + ' hits with ' + daneUderzenia.uderzenie + ' damage.');
    }
    window['log' + monsterNum].val(newLogVal);
};

var fight = function () {
    var winner,
        m1DaneUderzenia,
        m2DaneUderzenia;

    // walka:
    while (monster1.hp > 0 && monster2.hp > 0) {
        m2DaneUderzenia = monster2.uderz(2);
        m1DaneUderzenia = monster1.uderz(1);

        monster1.hp -= m2DaneUderzenia.uderzenie;
        raport(monster2, m2DaneUderzenia, 2);

        monster2.hp -= m1DaneUderzenia.uderzenie;
        raport(monster1, m1DaneUderzenia, 1);
    }

    // analiza walki:
    if (monster1.hp <= 0 && monster2.hp <= 0) {
        alert("Everyone's dead...end of game!");
    } else if (monster1.hp > monster2.hp) {
        winner = monster1;
        alert('The winner is...' + winner.przedstawSie() + '!');
    } else if (monster2.hp > monster1.hp) {
        winner = monster2;
        alert('The winner is...' + winner.przedstawSie() + '!');
    }

};


$(document).ready(function ($) {
    var beginBattle = $("#beginBattle"),
        userdata = $(".userdata"),
        monsters = [
            ['Skeleton', 80, 9, 1, 1.4, 15],
            ['Ghost', 75, 8, 3, 1, 10],
            ['Warrior', 120, 4, 3, 1, 10],
            ['Troll', 90, 5, 4, 0.6, 7]
        ];

    log1 = $("#log1");
    log2 = $("#log2");


    beginBattle.click(function () {
        var monster1opts = getMonsterInitData(1),
            monster2opts = getMonsterInitData(2);

        $('.console').val('');

        monster1 = new Monster(monster1opts);
        monster2 = new Monster(monster2opts);

        setTimeout(fight, 650);

    });


    preset = function (name, hp, maxDmg, minDmg, critMult, missMult, playerNum) {
        $('#name' + playerNum).val(name);
        $('#hp' + playerNum).val(hp);
        $('#maxDamage' + playerNum).val(maxDmg);
        $('#minDamage' + playerNum).val(minDmg);
        $('#criticMultiplier' + playerNum).val(critMult);
        $('#missMultiplier' + playerNum).val(missMult);
    };


    $('.monsters li').click(function() {
        var data = $(this).data(),
            monsterId = parseInt(data.monsterid, 10),
            playerId = parseInt(data.playerid, 10),
            presetParams = monsters[monsterId].slice().concat(playerId);

        preset.apply(null, presetParams);
    });

    // set default monsters:
    preset.apply(this, monsters[0].concat(1));
    preset.apply(this, monsters[1].concat(2));


});
