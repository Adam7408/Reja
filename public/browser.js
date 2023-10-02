
/* 
biz browserda - yangi reja qo'shganimizda /create-itemga borib qolyapmz
bizning maqsadimiz - inputga yozib enterni boskandan keyin, inputimiz bo'sh bo'sin, hamda ohirida biz yozgan reja qo'shilsin

buning uchun bizga JavaScript kerak bo'ladi, bu JavaScript - NodeJSga dahildor bo'lmaydi, bu faqat ejs uchun hizmat qiladigon FRONTEND JAVASCRIPT bo'ladi


HTML forma yasasa
CSS unga style beradi
JavaScript esa bizi frontendimizga turli hil harakatlarni amalga oshiradi (bizga ayana shu FrontEnd JavaScript kerak bo'ladi)

*/

/*
biror bir rejani create qilsak u DataBasega muvaffaqiyatli yozilgandan keyin, yozilgan Datalarni ejsda ohiriga qo'shamiz, bu logicani JavaScript orqali yozib olamiz

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
        // formamiz submit bo'ganda, ya'ni bitta reja yozganimizdan keyin submit qilganimizda - form tradition requestimiz by default ishga tushganda qanaqadir URLga o'tib ketmasin
        e.preventDefault();
        
        /*
        axios package orqali /create-itemga post qilamiz
        bu post qilishimiz traditional formni requesti emas, bu axios request hisoblanadi 
        axiosni ishga tushirishimiz uchun - FrontEndimizda axios packageni require qilib olishimiz kerak 

        AXIOSni yaxshi tarafi - json formatdi qabul qilib, avtamatik ravishta object qilib beradi, 
        va yuboryatgan paytda - avtamatik ravishta objectni jsonga aylantirib post qiladi

        documentation bo'yicha - axiosni post degan methodi bor
        post methodini ichiga ikki narsa yuborishimiz kerak
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