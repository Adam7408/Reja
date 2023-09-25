console.log('Wev serverni boshlash'); 
 
// express module(framework)ni install qilib, chaqiriladi 
const exp = require('express'); 
// express documentationga qarasak, undan instance yasashimiz kerak 
// express() - expressning objecti 
// endi appda foydalanib Express web server quramiz 
const app = exp(); 
 
// http -> CORE package 
const http = require('http'); 
 
const fs = require('fs'); // core package 
 
// bizga 'user' degan object kerak bo'ladi 
let user; 
 
// File System orqali database degan folderimizi ichidagi user.json degan fileni o'qishga harakat qilamiz 
fs.readFile("database/user.json", "utf8", (err, data) => { 
    if(err) { // agar xatolik bo'lsa 
        console.log("ERROR: ", err); 
    } else { // xatolik bo'lmasa 
        // File System(FS) o'qigan datalarni JSONdan OBJECTga pasre qilamiz ya'ni o'giramiz 
        user = JSON.parse(data); 
    } 
}) 
 
 
// 1) Kirish code   
// bu bosqichda - Expressga kirib kelayotgan ma'lumotlarga bog'liq bo'lgan codelar yozidali 
 
// harqanday browserdan kirib kelayotgan zaproslar uchun public forderi ochiq, ya'ni faqatgina public folderni ko'ra oladi 
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
    // bergan savolimizni bodysini log qil 
    // console.log(req.body); 
    console.log(req.body); 
    // javobni JSON formatda qilsin va  
    res.json({test: "succes"}); 
}); 
 
// JSON formatda to'gridan to'gri olib kelomimiz, buning uchun File System kerak bo'ladi 
app.get("/author", function(req, res) { 
    // { user: user } object - key: value 
    res.render('author', { user: user });  
}); 
 
app.get("/", function(req, res) { 
    res.render('harid'); // render -> file ko'rsatuvchi 
}); 
 
// createServer() --> method - bitta parameter qabul qiladi 
const server = http.createServer(app); 
// serverni ma'lum bir PORTga listen qildirish 
let PORT = 3000; 
server.listen(PORT, function() { // server muvaffaqiyatli amalga oshsa, function ishga tushadi 
    console.log(`server portda muvaffaqiyatli, ${PORT} portda ishlamoqda`); 
});