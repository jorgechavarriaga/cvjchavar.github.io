function changeLanguage(language) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", "../assets/language/" + language + ".json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var translations = JSON.parse(xhr.responseText);
            document.getElementById("title").textContent = translations.title;
            document.getElementById("contacto").textContent = translations.contacto;
            document.getElementById("tagline").textContent = translations.tagline;
            document.getElementById("seguro_personas").textContent = translations.seguro_personas;
            document.getElementById("auto_txt").textContent = translations.auto_txt;
            document.getElementById("auto_li1").textContent = translations.auto_li1;
            document.getElementById("auto_li2").textContent = translations.auto_li2;
            document.getElementById("auto_li3").textContent = translations.auto_li3;
            document.getElementById("auto_li4").textContent = translations.auto_li4;
            document.getElementById("btnSoumissionOne").textContent = translations.btnSoumissionOne;
            document.getElementById("btnWhatsappOne").textContent = translations.btnWhatsappOne;
            document.getElementById("btnSoumissionOne_inquilinos").textContent = translations.btnSoumissionOne_inquilinos;
            document.getElementById("btnWhatsappOne_inquilinos").textContent = translations.btnWhatsappOne_inquilinos;
            document.getElementById("inquilinos_txt").textContent = translations.inquilinos_txt;
            document.getElementById("inquilinos_l1").textContent = translations.inquilinos_l1;
            document.getElementById("propietarios_hogar_txt").textContent = translations.propietarios_hogar_txt;
            document.getElementById("propietarios_hogar_l1").textContent = translations.propietarios_hogar_l1;
            document.getElementById("btnSoumissionOne_propietarios_hogar").textContent = translations.btnSoumissionOne_propietarios_hogar;
            document.getElementById("btnWhatsappOne_propietarios_hogar").textContent = translations.btnWhatsappOne_propietarios_hogar;
            document.getElementById("propietarios_condo_txt").textContent = translations.propietarios_condo_txt;
            document.getElementById("propietarios_condo_l1").textContent = translations.propietarios_condo_l1;
            document.getElementById("btnSoumissionOne_propietarios_condo").textContent = translations.btnSoumissionOne_propietarios_condo;
            document.getElementById("btnWhatsappOne_propietarios_condo").textContent = translations.btnWhatsappOne_propietarios_condo;
            document.getElementById("auto_recreativo_txt").textContent = translations.auto_recreativo_txt;
            document.getElementById("auto_recreativo_l1").textContent = translations.auto_recreativo_l1;
            document.getElementById("btnSoumissionOne_auto_recreativo").textContent = translations.btnSoumissionOne_auto_recreativo;
            document.getElementById("btnWhatsappOne_auto_recreativo").textContent = translations.btnWhatsappOne_auto_recreativo;
            document.getElementById("mas_ahorro_txt").textContent = translations.mas_ahorro_txt;
            document.getElementById("mas_ahorro_l1").textContent = translations.mas_ahorro_l1;
            document.getElementById("mas_ahorro_l2").textContent = translations.mas_ahorro_l2;
            document.getElementById("mas_ahorro_l3").textContent = translations.mas_ahorro_l3;
            document.getElementById("mas_ahorro_l4").textContent = translations.mas_ahorro_l4;
            document.getElementById("condiciones_txt").textContent = translations.condiciones_txt;
            document.getElementById("modal_p1").textContent = translations.modal_p1;
            document.getElementById("modal_p2").textContent = translations.modal_p2;
            document.getElementById("modal_p3").textContent = translations.modal_p3;
            document.getElementById("modal_p4").textContent = translations.modal_p4;
            document.getElementById("modal_p5").textContent = translations.modal_p5;
            document.getElementById("modal_p6").innerHTML = translations.modal_p6;
            document.getElementById("modal_p7").textContent = translations.modal_p7;
        }
    };
    xhr.send(null);
}
document.addEventListener("DOMContentLoaded", function () {
    changeLanguage('es');
});