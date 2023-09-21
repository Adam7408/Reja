console.log('Wev serverni boshlash');

// express module(framework)ni install qilib, chaqiriladi
const exp = require('express');
// express documentationga qarasak, undan instance yasashimiz kerak
// express() - expressning objecti
// endi appda foydalanib Express web server quramiz
const app = exp();
// http -> CORE package
const http = require('http');


// 1) Kirish code  
// bu bosqichda - Expressga kirib kelayotgan ma'lumotlarga bog'liq bo'lgan codelar yozidali

// harqanday browserdan kirib kelayotgan zaproslar uchun public forderi ochiq, ya'ni faqatgina public folderni ko'ra oladi
app.use(exp.static('public'));

// kirib kelayotgan JSON formatdagi datalarni objectga o'girib beradi
app.use(exp.json());

// HTML post qilingan formalarni qabul qiladi
app.use(exp.urlencoded({ extended: true }));
// HTML formalari orqali POST so'rovlarini qabul qilish va ulardan kelgan ma'lumotlarni analiz qilish uchun ishlatiladi.



// 2) Session code



// 3) Views code    

// view yasash uchun folder kerak
app.set("views", "views"); // views folderni ko'rsatyapmiz

// view engine - ejs ekanini ko'rsatyapmiz
app.set("view engine", "ejs");

// demak, EJS orqali BackEndda FrontEnd yasaymiz


// 4) Routing code

// hamma /ga keladigon

app.get("/", function(req, res) {
    res.end(`<h1>Hi!</h1>`); // http://localhost:3000 - da turipti
});

app.get("/hello", function(req, res) {
    res.end(`<h1>HELLO WORLD</h1>`); // http://localhost:3000/hello - da turipti
});

app.get("/gift", function(req, res) {
    res.end(`<h1>Siz sovg'alar bo'limidasiz</h1>`); //http://localhost:3000/gift - da turipti
});


// server hosil qilish

// createServer() --> method - bitta parameter qabul qiladi
const server = http.createServer(app);
// serverni ma'lum bir PORTga listen qildirish
let PORT = 3000;
server.listen(PORT, function() { // server muvaffaqiyatli amalga oshsa, function ishga tushadi
    console.log(`server portda muvaffaqiyatli, ${PORT} portda ishlamoqda`);
});
