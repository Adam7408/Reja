// console.log("Wev serverni boshlash");

// // express module(framework)ni install qilib, chaqiriladi
// const exp = require("express");
// const res = require("express/lib/response");
// // express documentationga qarasak, undan instance yasashimiz kerak
// // express() - expressning objecti
// // endi appda foydalanib Express web server quramiz
// const app = exp();

// const db = require("./server").db();

// const fs = require("fs"); // core package

// // bizga 'user' degan object kerak bo'ladi
// let user;

// // File System orqali database degan folderimizi ichidagi user.json degan fileni o'qishga harakat qilamiz
// fs.readFile("database/user.json", "utf8", (err, data) => {
//     if (err) {
//         // agar xatolik bo'lsa
//         console.log("ERROR: ", err);
//     } else {
//         // xatolik bo'lmasa
//         // File System(FS) o'qigan datalarni JSONdan OBJECTga pasre qilamiz ya'ni o'giramiz
//         user = JSON.parse(data);
//     }
// });

// // 1) Kirish code
// // bu bosqichda - Expressga kirib kelayotgan ma'lumotlarga bog'liq bo'lgan codelar yozidali

// // harqanday browserdan kirib kelayotgan zaproslar uchun public forderi ochiq, ya'ni faqatgina public folderni ko'ra oladi
// // publicda - frontEndga tegishli bo'lgan JS, CSS, imagelar publicga boradi
// app.use(exp.static("public"));

// // kirib kelayotgan JSON formatdagi datalarni objectga o'girib beradi
// app.use(exp.json());

// // HTML post qilingan formalarni qabul qiladi
// // bu bo'lmasa qabul qilmaydi
// app.use(exp.urlencoded({ extended: true }));
// // HTML formalari orqali POST so'rovlarini qabul qilish va ulardan kelgan ma'lumotlarni analiz qilish uchun ishlatiladi.

// // 2) Session code

// // 3) Views code    (Express uchun BSSRda folder yasaymiz)

// // view yasash uchun folder kerak
// app.set("views", "views"); // views folderni ko'rsatyapmiz

// // view engine - ejs ekanini ko'rsatyapmiz
// app.set("view engine", "ejs");

// // demak, EJS orqali BackEndda FrontEnd yasaymiz

// // 4) Routing code

// // post qilganda --> /create-item degan manzilga kirib qolamiz
// app.post("/create-item", (req, res) => {
//     console.log("user /create-itemga kirib keldi");
//     // bergan savolimizni bodysini log qil
//     console.log(req.body);
//     // res.end('success'); // userga success degan narsani yuboramiz

//     // endi, yozgan rejalarimizni DataBasega yozishimiz kerak

//     // new_rejamiz - req.bodyni ichidan kelgan rejaga teng
//     const new_reja = req.body.reja;

//     // buning uchun biz yana DataBaseni objectidan(db()) foydalanamiz
//     db.collection("plans") // plans collectionini tanladik
//         .insertOne({ reja: new_reja }, (err, data) => {

//             console.log(data.ops);
//             // modern post bo'lgani uchun - res.jsonga datamizni ichidagi 1nchi indexini yuborishini yozamiz
//             res.json(data.ops[0]);

//             //** Bu - Traditional form postga moslandan kod**/
//             // insertOne()  --> bitta qo'shish degani
//             // insertOne()  2ta parameter qabul qiladi
//             // 1) DataBasega yozmoqchi bo'lgan nom va req.bodydan kelgan reja (ya'ni inputga yozgan ma'lumotimiz)
//             // 2) MongoDB documentation bo'yicha insertOne() - callback qaytaradi
//         //     if (err) {
//         //         // agar error mavjud bo'lsa
//         //         console.log(err); // errorni log qil,
//         //         res.end("nimadir xato bo'ldi!"); // hamda userga javob qaytarmoqchimiz (something went wrong)
//         //     } else {
//         //         // aks holda, ya'ni muvaffaqiyatli bo'lsa
//         //         res.end("Muvaffaqiyatli qo'shildi"); // deb, userga javob qaytaramiz (successfully added)
//         //     }
//         });

//     // bergan savolimizni bodysini log qil
//     // console.log(req.body);
//     // console.log(req.body);
//     // javobni JSON formatda qilsin va
//     // res.json({ test: "succes" });
// });

// // JSON formatda to'gridan to'gri olib kelomimiz, buning uchun File System kerak bo'ladi
// app.get("/author", function (req, res) {
//     // { user: user } object - key: value
//     res.render("author", { user: user });
// });

// app.get("/", function (req, res) {
//     console.log('user /ga kirib keldi');
//     db.collection("plans")
//         .find()
//         .toArray((err, data) => {
//             if (err) {
//                 console.log(err);
//                 res.end("Nimadir xato boldi!");
//             } else {
//                 console.log(data);
//                 res.render("reja", { items: data });
//             }
//         });
// });

// module.exports = app;





console.log('Web serverni boshlash');

// express frameworkini install qilib, chaqiriladi
const exp = require('express');

// ?
const res = require('express/lib/response');

// express documentationga qarasak, undan instance yasashimiz kerak
// express() - expressning objecti
// endi appda foydalanib Express web server quramiz
const app = exp();

// MongoDBni chaqiramiz
// .db() -- MongoDBni objecti
// biz shu orqali DataBasega turli hil ma'lumotlarni yozish, o'chirish, o'qish yoki delete qilish operatsiyalarini amalga oshiramiz
const db = require('./server').db();
// mongodbni pasta kerak edi, shuning uchun require qildik
const mongodb = require('mongodb');

const fs = require('fs'); // core package


// bizga 'user' degan object kerak bo'ladi
let user;

// File System orqali database degan folderimizi ichidagi user.json degan fileni o'qishga harakat qilamiz
fs.readFile("database/user.json", "utf8", (err, data) => {
    if(err) { // agar xatolik bo'lsa
        console.log("ERROR: ", err);
    } else { // xatolik bo'lmasa
        // File System(FS) o'qigan datalarni 'JSON'dan 'OBJECT'ga pasre qilamiz ya'ni o'giramiz
        user = JSON.parse(data);
    }
})


// 1) Kirish code  
// bu bosqichda - Expressga kirib kelayotgan ma'lumotlarga bog'liq bo'lgan codelar yozidali

// harqanday browserdan kirib kelayotgan zaproslar uchun public folderi ochiq, ya'ni faqatgina public folderni ko'ra oladi
// publicda - frontEndga tegishli bo'lgan JS, CSS, imagelar publicga boradi
app.use(exp.static('public'));

// kirib kelayotgan JSON formatdagi datalarni objectga o'girib beradi
app.use(exp.json());

// HTML post qilingan formalarni qabul qiladi
// bu bo'lmasa qabul qilmaydi
app.use(exp.urlencoded({ extended: true }));
// HTML formalari orqali POST so'rovlarini qabul qilish va ulardan kelgan ma'lumotlarni analiz qilish uchun ishlatiladi.



// 2) Session code



// 3) Views code    (Express uchun BSSRda folder yasaymiz)

// view yasash uchun folder kerak
app.set("views", "views"); // views folderni ko'rsatyapmiz

// view engine - ejs ekanini ko'rsatyapmiz
app.set("view engine", "ejs");

// demak, EJS orqali BackEndda FrontEnd yasaymiz


// 4) Routing code

// post qilganda --> /create-item degan manzilga kirib qolamiz
app.post("/create-item", (req, res) => {
    console.log('user /create-itemga kirib keldi');
    // bergan savolimizni bodysini log qil
    console.log(req.body);
    // res.end('success'); // userga success degan narsani yuboramiz

    // endi, yozgan rejalarimizni DataBasega yozishimiz kerak
    
    // new_rejamiz - req.bodyni ichidan kelgan rejaga teng
    const new_reja = req.body.reja;
    
    // buning uchun biz yana DataBaseni objectidan(db()) foydalanamiz
    db.collection('plans') // plans collectionini tanladik
        .insertOne({reja: new_reja}, (err, data) => {
            
            console.log(data.ops);
            res.json(data.ops[0]);
        

    //** Bu - Traditional form postga moslandan kod**/
        // insertOne()  --> bitta qo'shish degani
    // insertOne()  2ta parameter qabul qiladi
    // 1) DataBasega yozmoqchi bo'lgan nom va req.bodydan kelgan reja (ya'ni inputga yozgan ma'lumotimiz)
    // 2) MongoDB documentation bo'yicha insertOne() - callback qaytaradi
        // if(err) { // agar error mavjud bo'lsa
        //     console.log(err); // errorni log qil,
        //     res.end("nimadir xato bo'ldi!"); // hamda userga javob qaytarmoqchimiz (something went wrong)
        // } else { // aks holda, ya'ni muvaffaqiyatli bo'lsa
        //     res.end("Muvaffaqiyatli qo'shildi"); // deb, userga javob qaytaramiz (successfully added)
        // }

        });

    // javobni JSON formatda qilsin va 
    // res.json({test: "succes"});
});

app.post("/delete-item", (req, res) => {
    // browser.jsdagi axiosdan kelgan postni idga sovolamiz, requestni body qismidan qo'lga kiritamiz, demak frontEnddan post qilyapmiz bu yerda body qismini ichida id bor, idni qiymatini olib const idda qabul qilib olyapmiz

    const id = req.body.id;
    // console.log(id);

    // endi BackEndni shakllantiramiz
    // idni qabul qilganan keyin, mongoDBga kirib biz tanlagan deleteni ochirsin

    // frontEnd axiosdan post qilinayotgan id string edi, bizga esa ObjectId bo'lishi kerak, ObjectId esa mongodb packageda bor, shuning biz tepaga mongodb packageni require qilishimiz kerak
    // mongodb faqat idni qiymatini emas, typesini ham talab qiladi
    db.collection("plans")
    // biz nimani delete qilishni mongodbga aytdik
        .deleteOne({ _id: new mongodb.ObjectId(id) }, 
        function(err, data) {
            // endi BackEnddan turib FrontEnddagi axiosga response qaytaramiz, va responsemizi json formatda qaytaramiz, va bu responseni axios then bilan ushlab olamiz
            res.json( {state: "success"} );
        });
});

app.post("/edit-item", (req, res) => {
    const data = req.body;
    console.log(data);

    // endi olgan ma'lumotlarni databaseda o'zgartiramiz ya'ni edit qilamiz
    // edit qilishimiz uchun findOneAndUpdate comandasi kerak bo'ladi, 
    db.collection("plans")
        .findOneAndUpdate({ _id: new mongodb.ObjectId(data.id) }, 
        // qo'shimcha shart qo'yishimiz kerak, mongoDBni set degan comandasi bor
        {$set: {reja: data.new_input}}, 
        // tepadagi ikkita parameter ya'ni o'zgarish va joylashtirish parameterlari muvaffaqiyatli ishlasa function ishga tushsin
        function(err, data) {
            // BackEnddan FrontEndga response yuboramiz
            res.json({ state: "success" });
        });
});

app.post("/delete-all", (req, res) => {
    // agar req.body qismining delete-allni qiymati true bo'lsa
    if(req.body.delete_all) {
        // mongoDBdagi hamma ma'lumotlarni o'chiramiz, buning uchun deleteMany comandasidan foydalanamiz
        db.collection("plans")
        // deleteManyga hechqanday parameteri pass qilishimiz shart emas, faqat functionni belgilab olamiz
            .deleteMany(function() {
                // BackEnddan FrontEndga response yuboramiz
                res.json({state: "hamma rejalar o'chirildi"});
            })
    }
});

// JSON formatda to'gridan to'gri olib kelomimiz, buning uchun 'File System(FS)' kerak bo'ladi
app.get("/author", function(req, res) {
    // { user: user } object - key: value
    res.render('author', { user: user }); 
});

app.get("/", function(req, res) { // localhost:3000
    // har bitta APIga borsa - log qilsin (user /ga kirib keldi) deb
    // localhost:3000 kirib DBdan ma'lumotlarni o'qisin
    console.log('user /ga kirib keldi'); // (user entered /)

    db.collection("plans") // collection() --> collectionni nomini kiritish kerak (biz 'plans' degan collectionni tanladik)
    .find() // find()  --> izlash methodi
    .toArray((err, data) => {  // izlagan natijasini ARRAY qilib bersin
        if(err) { // agar xatolik mavjud bo'lsa,
            console.log(err); // errorni log qilsin
            res.end("nimadir xato bo'ldi!"); // hamda localhost:3000ga kirgan userga javob ham berishimiz kerak
        } else{ // aks holda, ya'ni hech qanday xatosiz MongoDBni o'qilsa va undan javob(data) kelsa,
            console.log(data); // o'sha datani log qilamiz
            // va o'sha datani 'ejs'ga pass qilamiz
            // buning uchun bitta object yasaymiz, nomini 'items' deb belgilab oldik, va unga datani yukladik
            // endi 'reja.ejs'da manashu ma'lumotlardan foydalanamiz (datamiz array ko'rinishda)
            res.render('reja', {items: data}); // render -> file ko'rsatuvchi
        }
    })
    // documentation bo'yicha 'toArray()' functioni ikkita parameter qabul qiladi
    // biz callback qilib olamiz
});

module.exports = app; // (bu 'module.exports' orqali appni boshqa filega export qilamiz)
