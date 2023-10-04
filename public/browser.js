
/* 
biz browserda - yangi reja qo'shganimizda /create-itemga borib qolyapmz
bizning maqsadimiz - inputga yozib enterni boskandan keyin, inputimiz bo'sh bo'sin, hamda ohirida biz yozgan reja qo'shilsin

buning uchun bizga JavaScript kerak bo'ladi, bu JavaScript - NodeJSga dahildor bo'lmaydi, bu faqat ejs uchun hizmat qiladigon FRONTEND JAVASCRIPT bo'ladi


HTML forma yasasa
CSS unga style beradi
JavaScript esa bizi frontendimizga turli hil harakatlarni amalga oshiradi (bizga ayana shu FrontEnd JavaScript kerak bo'ladi)

*/




console.log("FrontEnd JS ishga tushdi");
// buni FrontEndning consoledan ko'rsak bo'ladi, terminalda ko'rinmaydi ya'ni BackEndga dahli yo'q

// itemTemplate functioni
function itemTemplate(item) {
    return `<li 
        class="list-group-item list-group-item-indo d-flex align-items-center justify-content-between">
        <span class="item-text">${item.reja}</span>
        <div>
            <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1" style="border-radius: 20px;">
                Ozgartirish      
            </button>
            <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">
            Ochirish
            </button>
        </div>
    </li>`;
    // ejsda - <% %>ni ishlatamiz, JSda esa - ` ${} `ni ishlatamiz   
}

// inputni IDsini olib kelib createFieldga tenglaymiz
let createField = document.getElementById("create-field");

// 'create-form'ni qo'lga olishimiz kerak, buni olib kelib addEventListener hosil qilamiz hamda manashu formamiz submit bo'lganda - functionimiz ishga tushishi kerak deb shart yozamiz
document
    .getElementById("create-form")
    .addEventListener("submit", function(e) {
        // formamiz submit bo'ganda, ya'ni bitta reja yozganimizdan keyin submit qilganimizda - form traditional requestimiz by default ishga tushganda qanaqadir URLga o'tib ketmasin
        e.preventDefault();
        
        /*
        axios package orqali /create-itemga post qilamiz
        bu post qilishimiz traditional formni requesti emas, bu axios request hisoblanadi 
        axiosni ishga tushirishimiz uchun - FrontEndimizda axios packageni require qilib olishimiz kerak 

        AXIOSni yaxshi tarafi - responseni json formatdi qabul qilib, avtamatik ravishta object qilib beradi, 
        va yuboryatgan paytda - avtamatik ravishta objectni jsonga aylantirib post qiladi

        documentation bo'yicha - axiosni post degan methodi bor
        post methodini ichiga ikki narsa yuborishimiz kerak:
        1) URL 
        2) request body qismidan boryatgan narsa
        */
        axios // modern post, modern request
            .post("/create-item", { reja: createField.value }) // form submit qilingan payt - inputga yozilgan narsani qiymatni rejaga tenglab olib, axios orqali post qilyapmiz
            .then((response) => { // serverdan response muvaffaqiyatli kelsa
                document
                    .getElementById("item-list") // item-list(ul)ni qo'lga kiritishimiz kerak
                    .insertAdjacentHTML ("beforeend", itemTemplate(response.data)); // item-listni tugashidan oldin itemTemplateni qo'shamiz, hamda u axiosimiz qaytargan responseni datasini oladi
                    // axios qaytargan responseni datasi - server bergan data hisoblanadi (hardoim axios qabul qilgan datani olamiz)

                createField.value = ""; // submit qilingandan keyin - bo'sh bo'lsin 
                createField.focus(); // va focus bo'lsin
            })
            .catch(err => { // error bo'lsa
                console.log("Iltimos qaytadan harakat qiling!");
            });

});

// ochirish va ozgartirish knopkalarini ishga tushiramiz
document.addEventListener('click', function(e) {
    console.log(e.target);

    // delete operatsiya
    if(e.target.classList.contains('delete-me')){
        if(confirm("aniq ochirmoqchimisiz?")){
            // bu data-idni id nom bilan - app.jsning /delete-item routeriga post qilamiz
            axios
            .post("/delete-item", {id: e.target.getAttribute("data-id")})
            .then((response) => {
                console.log(response.data);

                // shu yergacha faqat databasedan o'chdi, endi viewdan ham o'chirishimiz kerak
                e.target.parentElement.parentElement.remove();
                /* ya'ni click qilgan knopkamizni otasini otasini ochiramiz (ya'ni <button>ni otasi <div>, <div>ni otasi <li> biz uchalasini ham ochiramiz, ya'ni masalan: engliz tilini organish, ozgartirish, ochirish uchovini teng ochiryapmiz)
                */
            })
            // mabodo error yuzaga kelsa xatolikni chiqarsin
            .catch((err) =>{
                console.log("Iltimos qaytadan harakat qiling!");
            });
        } 
    }

    // endi edit operatsiyasini qilamiz
    if(e.target.classList.contains('edit-me')) {
        let userInput = prompt("O'zgartirish kiriting", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML); // spanni classini olamiz, buning uchun bobosidan ruhsat olib spanni classini olamiz  ya'ni amakisini classini olyapmiz, va bizga uni texti kerak bo'lgani uchun innerHTMLni yozamiz

        // kiritgan qiymatimiz mavjud bo'lsa
        if(userInput) {
            // console.log(userInput);

            // endi FrontEnd(browser.js)dan o'zgartirmoqchi bo'lgan narsamizni idsini axios orqali '/edit-item'ga post qilamiz, ya'ni BackEnd(app.js)ga post qilamiz
            axios.post("/edit-item", { 
                id: e.target.getAttribute("data-id"), 
                new_input: userInput,
            }).then(response => { // shu yergacha faqat DataBaseda o'zgardi, endi viewda ya'ni reja.ejsda o'zgartiramiz
                console.log(response.data);
                e.target.parentElement.parentElement.querySelector(
                    ".item-text"
                ).innerHTML = userInput;
            }).catch(err => {
                console.log("Iltimos qaytadan harakat qiling!");
            });
        }
    }
});

// shu yergacha CRUD ishini hammasi tamom bo'ldi, endi bularni hammasini o'chirvorish uchun ohirgi knopkani ishga tushiraiz

document.getElementById("clear-all").addEventListener("click", function() {
    // formni ichida bo'lmaganligi uchun preventDefault qilishimiz shart emas, demak knopka bosilgan paytda to'gridan to'gri BackEndga zapros bo'lsin

    // yangi '/delete-all' degan API yasab u yerga zapros yuboramiz

    axios.post("/delete-all", {delete_all : true}) // delete-all elementimizni qiymati true bo'lsin
    .then(response => {
       alert(response.data.state);
       document.location.reload();
    }).catch(err => {
        console.log("Iltimos qaytadan harakat qiling!");
    })
})