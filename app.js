console.log("Wev serverni boshlash");

// express module(framework)ni install qilib, chaqiriladi
const exp = require("express");
const res = require("express/lib/response");
// express documentationga qarasak, undan instance yasashimiz kerak
// express() - expressning objecti
// endi appda foydalanib Express web server quramiz
const app = exp();

const db = require("./server").db();

const fs = require("fs"); // core package

// bizga 'user' degan object kerak bo'ladi
let user;

// File System orqali database degan folderimizi ichidagi user.json degan fileni o'qishga harakat qilamiz
fs.readFile("database/user.json", "utf8", (err, data) => {
    if (err) {
        // agar xatolik bo'lsa
        console.log("ERROR: ", err);
    } else {
        // xatolik bo'lmasa
        // File System(FS) o'qigan datalarni JSONdan OBJECTga pasre qilamiz ya'ni o'giramiz
        user = JSON.parse(data);
    }
});

// 1) Kirish code
// bu bosqichda - Expressga kirib kelayotgan ma'lumotlarga bog'liq bo'lgan codelar yozidali

// harqanday browserdan kirib kelayotgan zaproslar uchun public forderi ochiq, ya'ni faqatgina public folderni ko'ra oladi
// publicda - frontEndga tegishli bo'lgan JS, CSS, imagelar publicga boradi
app.use(exp.static("public"));

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
    console.log("user /create-itemga kirib keldi");
    // bergan savolimizni bodysini log qil
    console.log(req.body);
    // res.end('success'); // userga success degan narsani yuboramiz

    // endi, yozgan rejalarimizni DataBasega yozishimiz kerak

    // new_rejamiz - req.bodyni ichidan kelgan rejaga teng
    const new_reja = req.body.reja;

    // buning uchun biz yana DataBaseni objectidan(db()) foydalanamiz
    db.collection("plans") // plans collectionini tanladik
        .insertOne({ reja: new_reja }, (err, data) => {

            console.log(data.ops);
            // modern post bo'lgani uchun - res.jsonga datamizni ichidagi 1nchi indexini yuborishini yozamiz
            res.json(data.ops[0]);

            //** Bu - Traditional form postga moslandan kod**/
            // insertOne()  --> bitta qo'shish degani
            // insertOne()  2ta parameter qabul qiladi
            // 1) DataBasega yozmoqchi bo'lgan nom va req.bodydan kelgan reja (ya'ni inputga yozgan ma'lumotimiz)
            // 2) MongoDB documentation bo'yicha insertOne() - callback qaytaradi
        //     if (err) {
        //         // agar error mavjud bo'lsa
        //         console.log(err); // errorni log qil,
        //         res.end("nimadir xato bo'ldi!"); // hamda userga javob qaytarmoqchimiz (something went wrong)
        //     } else {
        //         // aks holda, ya'ni muvaffaqiyatli bo'lsa
        //         res.end("Muvaffaqiyatli qo'shildi"); // deb, userga javob qaytaramiz (successfully added)
        //     }
        });

    // bergan savolimizni bodysini log qil
    // console.log(req.body);
    // console.log(req.body);
    // javobni JSON formatda qilsin va
    // res.json({ test: "succes" });
});

// JSON formatda to'gridan to'gri olib kelomimiz, buning uchun File System kerak bo'ladi
app.get("/author", function (req, res) {
    // { user: user } object - key: value
    res.render("author", { user: user });
});

app.get("/", function (req, res) {
    console.log('user /ga kirib keldi');
    db.collection("plans")
        .find()
        .toArray((err, data) => {
            if (err) {
                console.log(err);
                res.end("Nimadir xato boldi!");
            } else {
                console.log(data);
                res.render("reja", { items: data });
            }
        });
});

module.exports = app;
