///**
// * Created by wetcouch on 04.10.14.
// */
//
///**
// * ZADANIE:
// *
// * 1. Dodaj do kolekcji serie liczb z przedzialu 1 do 10
// *
// * 2. Usun z kolekcji ostatni element
// *
// * 3. Dodaj DO POCZATKU kolekcji liczbe ->  0
// *
// * 4. Usun 3-ci element z tablicy
// *
// * 5. Dodaj do kolekcji serie zaczynajac od wartosci 600 do 1 uzywajac petli "while"
// *
// * @type {Array}
// */
//var kolekcja = [];
//for(var liczba = 1; liczba <= 10; liczba++) {
//    kolekcja.push(liczba);
//}
//kolekcja.pop();
//kolekcja.unshift(0);
//kolekcja.splice(2, 1);
//
//var liczba = 600;
//
//while(liczba --) {
//    kolekcja.push(liczba);
//}
//
//var MENU_OPTS = ['USTAWIENIA', 'ZAPISZ', 'WCZYTAJ', 'WYJDZ', 'KONTYNUUJ'];
//
//// COS SIE DZIEJE W GRZE I UZYTKOWNIK KLIKA NA "USTAWIENIA":
//var CURRENT_MENU_OPT = MENU_OPTS[0];
//
//switch(CURRENT_MENU_OPT) {
//    case 'USTAWIENIA':
//        // TO WYSWIETL OPCJE
//        break;
//    case 'ZAPISZ':
//        // OPCJE ZAPISU
//        break;
//    default:
//        // COSIK...
//}
//var a = Math.random();
//
////////
//
//function isBigEnough(element, index, array) {
//    console.log(arguments);
//    return element >= 10;
//}
////var passed = [12, 5, 8, 130, 44].every(isBigEnough);
//// passed is false
//passed = [12, 54, 18, 130, 44].every(isBigEnough);
//// passed is true
//
///**
// * ZADANIE DOMOWE:
// *
// * 1. POCZYTAC O ISTNIEJACYCH METODACH NALEZACYCH DO ARRAY:
// * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
// *
// * 2. POEKSPERYMENTOWAC !!! (HAVE FUN)
// *
// * WARTE ZAPAMIETANIA (WYKUCIA):
// * - contains
// * - every
// * - filter
// * - find
// * - findIndex
// * - forEach
// * - indexOf
// * - join
// * - map
// * - pop
// * - push
// * - reverse
// * - shift
// * - slice
// * - some
// * - sort
// * - splice
// * - unshift
// *
// * 3. WSTEP DO ALGORYTMOW:
// * Zaznajomic sie (wykuc!!!) skladnie i uzycie dla petli:
// * a) FOR
// * b) WHILE
// * c) DO WHILE
// * Oraz :
// * - SWITCH
// * - IF
// *
// * Co rozni WHILE od DO WHILE ?
// *
// */
//
//// ZAAWANSOWANE:
//// https://github.com/caolan/async
//// https://github.com/kriskowal/q
//
///**
// *  EXTRA ZADANIE PRAKTYCZNE:
// *
// *  Napisz funkcje, ktora odwraca kolejnosc znakow w stringu:
// *
// *  function reverseString(str) {
// *      // IMPLEMENTACJA
// *
// *      return str;
// *  }
// *
// *  czyli w uzyciu, jezeli mamy:
// *  var cosik = 'ABCD';
// *  reverseString(cosik);  //=> 'DCBA'
// *  "\"asdfasdf"
// */
//
//var reverseString = function(str) {
//    //var str, reversedstr, reversedarr;
//    //str = str.split("");
//    //
//    //reversedarr = str.reverse();
//    //
//    //reversedstr = reversedarr.join("");
//    //return reversedstr;
//
//    return str.split('').reverse().join('');
//
//};
//
//console.log(reverseString("ABCD"));
//
////var Animal = function(nazwa, iloscNog, iloscOczu) {
////    var tymczasowaZmienna = 100;
////
////    this.nazwa = nazwa;
////    this.iloscNog = iloscNog;
////    this.iloscOczu = iloscOczu;
////
////    //return this; // TO SIE DZIEJE AUTOMATYCZNIE - nie trzeba pisac return this;  zmienna tymczasowaZmienna "ginie"
////};
////
////Animal.prototype.przedstawSie = function() {
////    return this.nazwa;
////};
////
////
////var Monster = function(nazwa, iloscNog, iloscOczu, hp, minDmg, maxDmg) {
////    Animal.call(this, nazwa, iloscNog, iloscOczu);
////    this.hp = hp;
////    this.maxDmg = maxDmg;
////    this.minDmg = minDmg
////};
////
////Monster.prototype = Object.create(Animal.prototype);
////Monster.prototype.constructor = Monster;
////
////Monster.prototype.przedstawSie = function() {
////    return "Zmodyfikowana " + this.nazwa;
////};
////
////Monster.prototype.uderz = function() {
////    return Math.floor(Math.random() * (this.maxDmg - this.minDmg + 1)) + this.minDmg;
////};
////
////
////var pies = new Animal('pies', 4, 2);
////var zmutowanaMucha = new Monster('Zmutowana Mucha', 28, 10, 1000, 50, 100);
////var skeleton = new Monster('Szkielet', 2, 2, 1000, 50, 100);
////
////console.log("Jestem " + pies.przedstawSie());
////console.log("Atakuje cię " + zmutowanaMucha.przedstawSie());
////
////console.log(zmutowanaMucha.przedstawSie() + " zadaje ci " + zmutowanaMucha.uderz() + " punktów obrażeń");
////
////var fight = function(monster1, monster2) {
////    var winner;
////
////    // walka:
////    while(monster1.hp > 0 && monster2.hp > 0) {
////        monster1.hp -= monster2.uderz();
////        monster2.hp -= monster1.uderz();
////    }
////
////    // analiza walki:
////    if(monster1.hp <= 0 && monster2.hp <= 0) {
////        console.log('WSZYSCY ZGINELI.... KONIEC GRY!!!');
////    } else if(monster1.hp > monster2.hp) {
////        winner = monster1;
////        console.log('Zwycięzcą jest ' + winner.przedstawSie() + '.');
////    } else if(monster2.hp > monster1.hp) {
////        winner = monster2;
////        console.log('Zwycięzcą jest ' + winner.przedstawSie() + '.');
////    }
////
////
////};
////
////fight(zmutowanaMucha, skeleton);
///*
//TO DO LIST:
// -pytanie o nazwę potwora
// -krytyki
// -info kto uderzył
// */