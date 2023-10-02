// F-Task:

// findDoublers function tuzing, unga faqat bitta string argument pass bolib, agar stringda bir hil harf qatnashgan bolsa true, qatnashmasa false qaytarishi kerak.

// masalan: getReverse("hello") return true return qiladi

function findDoublers(soz) {
    let ohshasHarf = false;

    for (let i = 0; i < soz.length; i++) {
        if (soz.split(soz[i]).length - 1 > 1) {
            ohshasHarf = true;
            break;
        }
    }

    return ohshasHarf;
}

// call
console.log(findDoublers("hello"));

// =========================================================================================

// E-Task:

// Shunday function tuzing, u bitta string argumentni qabul qilib, o'sha stringni teskari qilib return qilsin

// masalan: getReverse("hello") return qilsin "olleh"

// Define
// function getReverse(soz) {
//     let teskari = soz.split("").reverse().join("");
//     return teskari;
// }

// // Call
// console.log(getReverse("hello"));

// ==================================================================================

// // D-Task:
// // Shunday class tuzing nomi Shop, va uni constructoriga 3 hil mahsulot pass bolsin, hamda classning 3ta methodi bolsin,
// // biri qoldiq, biri sotish va biri qabul. Har bir method ishga tushgan vaqt ham log qilinsin.

// // MASALAN: const shop = new Shop(4, 5, 2);
// // shop.qoldiq() - return hozir 20:40da 4ta non, 5ta lagmon va 2ta cola mavjud!
// // shop.sotish('non', 3) & shop.qabul('cola', 4) & shop.qoldiq() - return hozir 20:50da 1ta non, 5ta lagmon va 6ta cola mavjud!

// const moment = require("moment");

// class Shop {
//     constructor(non, lagmon, cola) {
//         this.non = non;
//         this.lagmon = lagmon;
//         this.cola = cola;
//     }

//     // methods
//     qoldiq() {
//         const time = moment().format("HH:mm");
//         return `hozir ${time}da ${this.non}ta non, ${this.lagmon}ta lag'mon va ${this.cola}ta cola mavjud!`;
//     }

//     sotish(mahsulot, miqdori) {
//         const time = moment().format("HH:mm");

//         if (mahsulot === "non") {
//             if (miqdori <= this.non) {
//                 this.non -= miqdori;
//                 return `hozir ${time}da ${miqdori}ta non sotildi!`;
//             } else {
//                 return `non yetarli emas!`;
//             }
//         } else if (mahsulot === "lagmon") {
//             if (miqdori <= this.lagmon) {
//                 this.lagmon -= miqdori;
//                 return `hozir ${time}da ${miqdori}ta lag'mon sotildi!`;
//             } else {
//                 return `lag'mon yetarli emas!`;
//             }
//         } else if (mahsulot === "cola") {
//             if (miqdori <= this.cola) {
//                 this.cola -= miqdori;
//                 return `hozir ${time}da ${miqdori}ta cola sotildi`;
//             } else {
//                 return `cola yetarli emas!`;
//             }
//         }
//     }

//     qabul(mahsulot, miqdori) {
//         const time = moment().format("HH:mm");

//         if (mahsulot === "non") {
//             this.non += miqdori;
//             return `hozir ${time}da ${miqdori}ta non qabul qilindi!`;
//         } else if (mahsulot === "lagmon") {
//             this.lagmon += miqdori;
//             return `hozir ${time}da ${miqdori}ta lag'mon qabul qilindi!`;
//         } else if (mahsulot === "cola") {
//             this.cola += miqdori;
//             return `hozir ${time}da ${miqdori}ta cola qabul qilindi!`;
//         }
//     }
// }

// // object
// // non, lagmon, cola
// const shop = new Shop(4, 5, 2);

// console.log(shop.qoldiq());

// console.log("========================================================");

// console.log(shop.sotish("non", 3));
// // console.log(shop.sotish('lagmon', 2));
// // console.log(shop.sotish('cola', 4));

// console.log("========================================================");

// // console.log(shop.qabul('non', 3));
// // console.log(shop.qabul('lagmon', 1));
// console.log(shop.qabul("cola", 4));

// console.log("========================================================");

// console.log(shop.qoldiq());
