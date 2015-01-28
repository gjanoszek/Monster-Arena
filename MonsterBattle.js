/**
 * Created by wetcouch on 12.10.14.
 */

var Monster = function (opts) {
        this.nazwa = opts.nazwa;
        this.hp = opts.hp;
        this.armor = opts.armor;
        this.maxDmg = opts.maxDmg;
        this.minDmg = opts.minDmg;
        this.critChance = opts.critChance;
        this.missChance = opts.missChance;
        this.maxHp = opts.maxHp;
        this.level = opts.level || 1;
        this.xp = opts.xp || 0;
        this.class = opts.class;
        this.abilities = opts.abilities || [abilities[0], classes[this.class].abilities[0]];
    },
    abilities = [{
        name: 'Fire Arrow',
        cooldown: 2,
        cooldown_left: 0,
        use: function (monster1, monster2, daneUderzeniaAtk, daneUderzeniaDef) {
            // analiza i interpretacja
            daneUderzeniaAtk.uderzenie += 5;

            return daneUderzenia;
        }
    }, {
        name: 'Sacrifice',
        cooldown: 2,
        cooldown_left: 0,
        use: function (monster1, monster2, daneUderzeniaAtk, daneUderzeniaDef) {
            // analiza i interpretacja
            monster1.hp *= 0.9;
            daneUderzeniaAtk.uderzenie *= 2;

            return daneUderzenia;
        }
    }, {
        name: 'Blizzard',
        cooldown: 3,
        cooldown_left: 0,
        use: function (monster1, monster2, daneUderzeniaAtk, daneUderzeniaDef) {
            // analiza i interpretacja
            daneUderzeniaAtk.uderzenie *= 1.5;
            daneUderzeniaDef.uderzenie *= 0.5;

            return daneUderzenia;
        }
    }, {
        name: 'Fury',
        cooldown: 2,
        cooldown_left: 0,
        use: function (monster1, monster2, daneUderzeniaAtk, daneUderzeniaDef) {
            // analiza i interpretacja
            daneUderzeniaAtk.uderzenie *= 3;
            daneUderzeniaDef.uderzenie *= 1.5;

            return daneUderzenia;
        }
    }],
    classes = {
        'Death Knight': {
            abilities: [{
                name: 'Wrath of Death',
                cooldown: 2,
                cooldown_left: 0,
                use: function (attackingMonster, defendingMonster, daneUderzeniaAtk, daneUderzeniaDef) {
                    // analiza i interpretacja
                    stolenHp = defendingMonster.hp*0.15;
                    defendingMonster.hp -= stolenHp;
                    attackingMonster.hp += stolenHp;
                    
                    return daneUderzenia;
                }
            }, {
                name: 'Curse',
                cooldown: 2,
                cooldown_left: 0,
                use: function (monster1, monster2, daneUderzeniaAtk, daneUderzeniaDef) {
                    // analiza i interpretacja
                    defendingMonster.hp -= defendingMonster.hp*0.1;
                    daneUderzeniaDef.uderzenie -= daneUderzeniaDef.uderzenie*0.2;
                    
                    return daneUderzenia;
                }
            }]
        },
        Assasin: {
            abilities: [{
                name: 'Backstab',
                cooldown: 2,
                cooldown_left: 0,
                use: function (monster1, monster2, daneUderzeniaAtk, daneUderzeniaDef) {
                    // analiza i interpretacja
                    isAccurate = true;
                    isCritic = true;

                    return daneUderzenia;
                }
            }, {
                name: 'Stealth',
                cooldown: 2,
                cooldown_left: 0,
                use: function (monster1, monster2, daneUderzeniaAtk, daneUderzeniaDef) {
                    // analiza i interpretacja
                    daneUderzeniaDef.uderzenie = 0;
                    daneUderzeniaAtk.uderzenie *= 1.5;

                    return daneUderzenia;
                }
            }]
        },
        Priest: {
            abilities: [{
                name: 'Heal',
                cooldown: 2,
                cooldown_left: 0,
                use: function (monster1, monster2, daneUderzeniaAtk, daneUderzeniaDef) {
                    // analiza i interpretacja
                    monster1.hp += monster1.hp*0.25;

                    return daneUderzenia;
                }
            }, {
                name: 'Burst of Mana',
                cooldown: 2,
                cooldown_left: 0,
                use: function (monster1, monster2, daneUderzeniaAtk, daneUderzeniaDef) {
                    // analiza i interpretacja
                    daneUderzeniaAtk.uderzenie = monster1.maxDmg*2;

                    return daneUderzenia;
                }
            }]
        },
        Paladin: {
            abilities: [{
                name: 'Divine Shield',
                cooldown: 2,
                cooldown_left: 0,
                use: function (monster1, monster2, daneUderzeniaAtk, daneUderzeniaDef) {
                    // analiza i interpretacja
                    transferredDmg = daneUderzeniaDef.uderzenie * 0.9;
                    monster1.hp += transferredDmg;

                    return daneUderzenia;
                }
            }, {
                name: 'Hammer of Glory',
                cooldown: 2,
                cooldown_left: 0,
                use: function (monster1, monster2, daneUderzeniaAtk, daneUderzeniaDef) {
                    // analiza i interpretacja
                    daneUderzeniaAtk.uderzenie *= 1.5;
                    monster1.hp += daneUderzeniaAtk.uderzenie;

                    return daneUderzenia;
                }
            }]
        }
    },
    monster1,
    monster2,
    calculateNextLevelXP = function(currentLvl) {
        var nextLevel = 400;

        if (currentLvl > 1) {
            for (var i = 2; i <= currentLvl; i++) {
                nextLevel += Math.floor(nextLevel * 0.2);
            }
        }

        return nextLevel;
    },
    getMonsterInitData = function (monsterNum) {
        return {
            nazwa: $("#name" + monsterNum).val(),
            hp: parseInt($("#hp" + monsterNum).val(), 10),
            armor: parseInt($("#armor" + monsterNum).val(), 10),
            maxDmg: parseInt($("#maxDamage" + monsterNum).val(), 10),
            minDmg: parseInt($("#minDamage" + monsterNum).val(), 10),
            missChance: parseFloat($("#missChance" + monsterNum).val()),
            critChance: parseFloat($("#criticChance" + monsterNum).val()),
            maxHp: parseInt($("#hp" + monsterNum).val(), 10),
            'class': $('#gracz' + monsterNum + ' [name="monsterClass"]').val()
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
        critic = Math.floor(Math.random() * 100 + 1),
        missChance = Math.floor(Math.random() * 100 + 1),
        secondMonster;

    if (monsterNum === 1) {
        secondMonster = monster2
    } else {
        secondMonster = monster1
    }



    isCritic = critic <= attackingMonster.critChance;

    if (missChance <= attackingMonster.missChance) {
        isAccurate = false;
    } else {
        isAccurate = true;
    }

    if (isAccurate === true) {
        uderzenie = Math.floor(((Math.random() * (this.maxDmg + 1 - this.minDmg)) + this.minDmg) * (1 - (secondMonster.armor * 3 / 100)));
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

var raport = function (monster1FightData, monster2FightData, round) {
    var $log = $('#shared_battle_log'),
        template = ['<div class="logLine"> <li class="list-group-item">', '<div class="outer p1">', '<div class="inner player1HPBar">', '</div>', '</div>', '<span class="player1Hp"></span>', '<span class="badge player1">14</span>', '<span class="badge player2">14</span> <div class="round"> Round <span class="roundNo">1</span> </div>', '<div class="outer p2">', '<div class="inner player2HPBar">', '<div></div>', '</div>', '</div>', '<span class="player2Hp"></span>', '</li> </div>'].join(''),
        $template = $(template),
        stats = {
            monster1: {
                criticCount: 0,
                damage: []
            },
            monster2: {
                criticCount: 0,
                damage: []
            }
        },
        raporting = function (monsterFightData, playerNo) {
            var playerClass = '.player' + playerNo,
                monsterStats = stats['monster' + playerNo],
                monster = monsterFightData.monster,
                daneUderzenia = monsterFightData.daneUderzenia;

            if (daneUderzenia.isCritic) {
                $(playerClass, $template).addClass('critic').text(daneUderzenia.uderzenie);
                monsterStats.criticCount += 1;
            } else if (daneUderzenia.uderzenie === 0) {
                $(playerClass, $template).addClass('miss').text(0);
            } else {
                $(playerClass, $template).text(daneUderzenia.uderzenie);
            }

            monsterStats.damage.push(daneUderzenia.uderzenie);
            $(playerClass + 'HPBar', $template).css('height', monster.hp * 100 / monster.maxHp + '%');
            $(playerClass + 'Hp', $template).text(monster.hp + "HP");
        };

    $('.roundNo', $template).text(' ' + round);

    raporting(monster1FightData, 1);
    raporting(monster2FightData, 2);

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

        // TU TRZEBA SPRAWDZAC UZYTE ABILITIES, ktore modyfikuja m[1|2]DaneUderzenia
        // na przyklad:
        //


        // sprawdzamy, ktore ability jest uzyte i jezeli jest to dzialamy:



        monster1.hp -= m2DaneUderzenia.uderzenie;
        monster2.hp -= m1DaneUderzenia.uderzenie;

        raport({
            monster: monster1,
            daneUderzenia: m1DaneUderzenia
        }, {
            monster: monster2,
            daneUderzenia: m2DaneUderzenia
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
            ['Skeleton', 80, 5, 9, 2, 22, 23, 'Assasin'],
            ['Ghost', 75, 5, 8, 3, 25, 20, 'Death Knight'],
            ['Warrior', 120, 5, 5, 2, 23, 20, 'Paladin'],
            ['Troll', 90, 5, 5, 4, 32, 25, 'Priest']
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


    preset = function (name, hp, armor, maxDmg, minDmg, critChance, missChance, playerClass, playerNum) {
        $('#name' + playerNum).val(name);
        $('#hp' + playerNum).val(hp);
        $('#armor' + playerNum).val(armor);
        $('#maxDamage' + playerNum).val(maxDmg);
        $('#minDamage' + playerNum).val(minDmg);
        $('#criticChance' + playerNum).val(critChance);
        $('#missChance' + playerNum).val(missChance);
        $('#gracz' + playerNum + ' [name="monsterClass"]').val(playerClass)
    };


    $('.monsters li').click(function () {
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

