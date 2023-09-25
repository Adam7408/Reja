// [19] NodeJS event loop va callback functionlarni o'rganamiz

// Backend language:
// Single thread
// Multi thread

// NodeJS: Single threaddir (kam rasxodli)
// PHP: Multi threaddir (ko'p rasxodli)

// Single threaddan to'gri foydalanish kerak, logicasini noto'g'ri qilib qo'ysak qolgan 'user'larga javob bera olmay qoladi, shuning uchun asynchronous function, callback functionlarni yaxshi bilishimiz kerak


// const list = [
//     "yaxshi talaba bo'ling",                         // 0-20
//     "togri boshliq tanlash va kop hato qiling",      // 20-30
//     "uzingizga ishlashingizni boshlang",             // 30-40
//     "siz kuchli bolgan narsalarni qiling",           // 40-50
//     "yoshlarga inverstitsiya qiling",                // 50-60
//     "endi dam oling, foydasi yoq endi"               // 60
// ];

// CALLBACK function //

// define qismi 
// async function maslahatBering(a, callb) {
//     // kiritilgan yoshning tipi nomer bo'lmasa, NULL qaytarsin
//     if(typeof a !== 'number') callb ('raqam kiriting', null);
//     else if(a <= 20) callb (null, list[0]);
//     else if(a > 20 && a <= 30) callb (null, list[1]);
//     else if(a > 30 && a <= 40) callb (null, list[2]);
//     else if(a > 40 && a <= 50) callb (null, list[3]);
//     else if(a > 50 && a <= 60) callb (null, list[4]);
//     else{
//         callb(null, list[5]);
//     }
// }

// maslahatBering(10, (err, data) => {
//     if(err) console.log('ERROR: ', err); // xatolik mavjud bo'lsa, xatolikni ko'rsatadi
//     console.log(data); // xatolik mavjud bo'lmasa, datani ko'rsatadi
// })

// javob: yaxshi talaba bo'ling (0chi indexga teng, shart topildi)

// ---------------------------------------------------------------------------------------------

// Asynhron function

// async function maslahatBering(a, callb) {
//     if(typeof a !== 'number') callb ('raqam kiriting', null);
//     else if(a <= 20) callb (null, list[0]);
//     else if(a > 20 && a <= 30) callb (null, list[1]);
//     else if(a > 30 && a <= 40) callb (null, list[2]);
//     else if(a > 40 && a <= 50) callb (null, list[3]);
//     else if(a > 50 && a <= 60) callb (null, list[4]);
//     else{
//         setTimeout(function() {
//             callb(null, list[5]);
//         }, 5000);
        
//     }
// }

// console.log('passed here 0'); // (birinchi bu chiqdi)
// maslahatBering(65, (err, data) => {  // (ikkinchi shu callbackni o'qiydi (javobi uzun kutilgani uchun ohiri chiqti))
//     if(err) console.log('ERROR: ', err); // xatolik mavjud bo'lsa, xatolikni ko'rsatadi
//     else{
//         console.log(data); // xatolik mavjud bo'lmasa, datani ko'rsatadi
//     }    
// });
// console.log('paddes here 1'); // (uchinchi shu chiqti)

// javob:
    // passed here 0
    // passed here 1
    // endi dam oling, foydasi yoq endi 
// javoblar async shaklida chiqti, callbackni javobini kutib o'tirmadi






// ======================================================================================================================================




// [20] Asynchronous functionlarni qo'llash

// hozirgacha hamma o'rgangan functionlarimiz synchronour functionlar edi, bular javobini srazi talab qilyatgan functionlar edi

// function:
// 1) Synchronous function (javobni srazi talab qiladigon)
// 2) Asynchronous function


const list = [
    "yaxshi talaba bo'ling", // 0-20
    "togri boshliq tanlash va kop hato qiling", // 20-30
    "uzingizga ishlashingizni boshlang", // 30-40
    "siz kuchli bolgan narsalarni qiling", // 40-50
    "yoshlarga inverstitsiya qiling", // 50-60
    "endi dam oling, foydasi yoq endi" // 60
];



// define qismi (ya'ni async functionni define qismida ishlatish)
// async function maslahatBering(a) {
//     if(typeof a !== 'number') throw new Error ('insert a number');
//     else if(a <= 20) return list[0];
//     else if(a > 20 && a <= 30) return list[1];
//     else if(a > 30 && a <= 40) return list[2];
//     else if(a > 40 && a <= 50) return list[3];
//     else if(a > 50 && a <= 60) return list[4];
//     else{
//         return new Promise((resolve, reject) => {         // resolve(return), reject(throw new Error)
//             setTimeout(() => {
//                 resolve(list[5]);
//             }, 5000)
            
//         });
//         // async functionlar ichida setTimeout setIntervalga oxshagan core modulelar ishlamaydi, ishlatish uchun Promise ishlatiladi
//         setTimeout(function () {
//             return list[5];
//         }, 5000);
//     }
// }



// call qismi
// then, catch method bilan
// console.log('passed here 0');
// maslahatBering(25)
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((err) => {
//         console.log(err)
//     });
// console.log('passed here 1');

// javob: 
    // passed here 0
    // passed here 1
    // togri boshliq tanlash va kop hato qiling (bu kutilganligi uchun ohiri chiqdi)

//--------------------------------------------------------------------------------------------------



// endi, async functionni call qismida ishlatish


// async, await bilan (javoblar ketma ketlik bilan olidani)
// async function run() {
//     let javob = await maslahatBering(20); // 1) buni javobi chiqgungacha kutadi va chiqmagungacha keyingisiga o'tmaydi
//     console.log(javob);
//     javob = await maslahatBering(31); // 2) buni javobi chiqgungacha kutadi va chiqmagungacha keyingisiga o'tmaydi
//     console.log(javob);
//     javob = await maslahatBering(41); // 3) buni javobi chiqgungacha kutadi va chiqmagungacha keyingisiga o'tmaydi
//     console.log(javob);
// }
// run();

// aslida async functionda try/catch ishlatilishi kerak, lekin bizda oddiy misollar bo'lgani uchun ishlatmadik

// --------------------------------------------------------------------------------------------------------------------------------


// async functionlar ichida setTimeout, setIntervalga o'xshagan core modulelar ishlamaydi, ishlatish uchun 'Promise'dan foydalanamiz

async function maslahatBering(a) {
    if(typeof a !== 'number') throw new Error ('insert a number');
    else if(a <= 20) return list[0];
    else if(a > 20 && a <= 30) return list[1];
    else if(a > 30 && a <= 40) return list[2];
    else if(a > 40 && a <= 50) return list[3];
    else if(a > 50 && a <= 60) return list[4];
    else{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(list[5]);
            }, 5000)
            
        });
        
    }
}

async function run() {
        let javob = await maslahatBering(25); // 1) buni javobi chiqgungacha kutadi va chiqmagungacha keyingisiga o'tmaydi
        console.log(javob);
        javob = await maslahatBering(70); // 2) buni javobi chiqgungacha kutadi va chiqmagungacha keyingisiga o'tmaydi
        console.log(javob);
        javob = await maslahatBering(41); // 3) buni javobi chiqgungacha kutadi va chiqmagungacha keyingisiga o'tmaydi
        console.log(javob);
    }
    run();