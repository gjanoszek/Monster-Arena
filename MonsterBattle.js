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
        selectedPlayer = 1,
        btnPlayer1 = $("#btnplayer1"),
        btnPlayer2 = $("#btnplayer2"),
        skeletonP = $("#skeleton"),
        ghostP = $("#ghost"),
        warriorP = $("#warrior"),
        trollP = $("#troll");

    log1 = $("#log1");
    log2 = $("#log2");


    beginBattle.click(function () {
        var monster1opts = getMonsterInitData(1),
            monster2opts = getMonsterInitData(2);

        $(this).attr("disabled", "disabled");
        userdata.attr("disabled", "disabled");

        monster1 = new Monster(monster1opts);
        monster2 = new Monster(monster2opts);
        fight();
    });
    $("#reset").click(function () {
        beginBattle.removeAttr("disabled");
        userdata.removeAttr("disabled");
        $('.console').val('');
    });
    $("#clear").click(function () {
        userdata.val('');
        btnPlayer1.removeAttr("disabled");
        btnPlayer2.removeAttr("disabled");
    });
    btnPlayer1.click(function () {
        btnPlayer1.attr("disabled", "disabled");
        btnPlayer2.removeAttr("disabled");
        selectedPlayer = 1;
    });
    btnPlayer2.click(function () {
        btnPlayer2.attr("disabled", "disabled");
        btnPlayer1.removeAttr("disabled");
        selectedPlayer = 2;
    });

    preset = function (name, hp, maxDmg, minDmg, critMult, missMult) {
        $('#name' + selectedPlayer).val(name);
        $('#hp' + selectedPlayer).val(hp);
        $('#maxDamage' + selectedPlayer).val(maxDmg);
        $('#minDamage' + selectedPlayer).val(minDmg);
        $('#criticMultiplier' + selectedPlayer).val(critMult);
        $('#missMultiplier' + selectedPlayer).val(missMult);
    };

    skeletonP.click(function () {
        preset('Skeleton', '80', '9', '1', '1.4', '15');
    });
    ghostP.click(function () {
        preset('Ghost', '75', '8', '3', '1', '10');
    });
    warriorP.click(function () {
        preset('Warrior', '120', '4', '3', '1', '10');
    });
    trollP.click(function () {
        preset('Troll', '90', '5', '4', '0.6', '7');
    });
});
