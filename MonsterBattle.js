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
    $log,
    $battleStatusPlayer1,
    $battleStatusPlayer2,
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

var raport = function(monster1FightData, monster2FightData, round) {
    var $log = $('#shared_battle_log'),
        template = ['<li class="list-group-item">', '<span class="badge player1">14</span>', '<span class="badge player2">14</span>Round <span class="roundNo">1</span>', '</li>'].join(''),
        $template = $(template);



    $('.roundNo', $template).text(round);

    if (monster1FightData.daneUderzenia.isCritic) {
        $('.player1', $template).addClass('critic').text(monster1FightData.daneUderzenia.uderzenie);
    } else if (monster1FightData.daneUderzenia.uderzenie === 0) {
        $('.player1', $template).addClass('miss').text(0);
    } else {
        $('.player1', $template).text(monster1FightData.daneUderzenia.uderzenie);
    }

    if (monster2FightData.daneUderzenia.isCritic) {
        $('.player2', $template).addClass('critic').text(monster2FightData.daneUderzenia.uderzenie);
    } else if (monster2FightData.daneUderzenia.uderzenie === 0) {
        $('.player2', $template).addClass('miss').text(0);
    } else {
        $('.player2', $template).text(monster2FightData.daneUderzenia.uderzenie);
    }

    $log.append($template);


};

var fight = function () {
    var winner,
        m1DaneUderzenia,
        m2DaneUderzenia,
        round = 0;

    // walka:
    while (monster1.hp > 0 && monster2.hp > 0) {
        round += 1;
        m2DaneUderzenia = monster2.uderz(2);
        m1DaneUderzenia = monster1.uderz(1);

        monster1.hp -= m2DaneUderzenia.uderzenie;
        //raport(monster2, m2DaneUderzenia, 2);

        monster2.hp -= m1DaneUderzenia.uderzenie;
        //raport(monster1, m1DaneUderzenia, 1);

        raport({
            player: monster2,
            daneUderzenia: m2DaneUderzenia
        }, {
            player: monster1,
            daneUderzenia: m1DaneUderzenia
        }, round);

    }

    // analiza walki:
    if (monster1.hp <= 0 && monster2.hp <= 0) {
        $battleStatusPlayer1.text('DEAD');
        $battleStatusPlayer2.text('DEAD');
    } else if (monster1.hp > monster2.hp) {
        winner = monster1;
        $battleStatusPlayer1.text('WINNER');
    } else if (monster2.hp > monster1.hp) {
        winner = monster2;
        $battleStatusPlayer2.text('WINNER');
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

    $log = $('#shared_battle_log');
    $battleStatusPlayer1 = $('#battleStatusPlayer1');
    $battleStatusPlayer2 = $('#battleStatusPlayer2');


    beginBattle.click(function () {
        var monster1opts = getMonsterInitData(1),
            monster2opts = getMonsterInitData(2);

        $log.empty();
        $battleStatusPlayer1.empty();
        $battleStatusPlayer2.empty();

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
