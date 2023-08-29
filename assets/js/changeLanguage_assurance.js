function changeLanguage(language) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", "../assets/language/" + language + ".json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var translations = JSON.parse(xhr.responseText);
            document.getElementById("title").textContent = translations.title;
            document.getElementById("contacto").innerHTML = translations.contacto;
            document.getElementById("tagline").textContent = translations.tagline;
            document.getElementById("company").textContent = translations.company;
            document.getElementById("seguro_txt").innerHTML = translations.seguro_txt;
            document.getElementById("seguro_desc").textContent = translations.seguro_desc;
            document.getElementById("ahorro_retiro_txt").textContent = translations.ahorro_retiro_txt;
            document.getElementById("ahorro_retiro_desc").textContent = translations.ahorro_retiro_desc;
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
            // document.getElementById("inquilinos_l1").textContent = translations.inquilinos_l1;
            document.getElementById("vida_txt").textContent = translations.vida_txt;
            // document.getElementById("vida_l1").textContent = translations.vida_l1;
            document.getElementById("btnSoumissionOne_vida").textContent = translations.btnSoumissionOne_vida;
            document.getElementById("btnWhatsappOne_vida").textContent = translations.btnWhatsappOne_vida;
            document.getElementById("viaje_txt").textContent = translations.viaje_txt;
            document.getElementById("viaje_l1").textContent = translations.viaje_l1;
            document.getElementById("btnSoumissionOne_viaje").textContent = translations.btnSoumissionOne_viaje;
            document.getElementById("btnWhatsappOne_viaje").textContent = translations.btnWhatsappOne_viaje;
            document.getElementById("hipotec_txt").textContent = translations.hipotec_txt;
            document.getElementById("hipotec_l1").textContent = translations.hipotec_l1;
            document.getElementById("btnSoumissionOne_hipotec").textContent = translations.btnSoumissionOne_hipotec;
            document.getElementById("btnWhatsappOne_hipotec").textContent = translations.btnWhatsappOne_hipotec;
            document.getElementById("res_civil_txt").textContent = translations.res_civil_txt;
            document.getElementById("res_civil_l1").textContent = translations.res_civil_l1;
            document.getElementById("btnSoumissionOne_res_civil").textContent = translations.btnSoumissionOne_res_civil;
            document.getElementById("btnWhatsappOne_res_civil").textContent = translations.btnWhatsappOne_res_civil;
            document.getElementById("seg_accidentes_txt").textContent = translations.seg_accidentes_txt;
            document.getElementById("seg_accidentes_l1").textContent = translations.seg_accidentes_l1;
            document.getElementById("btnSoumissionOne_seg_accidentes").textContent = translations.btnSoumissionOne_seg_accidentes;
            document.getElementById("btnWhatsappOne_seg_accidentes").textContent = translations.btnWhatsappOne_seg_accidentes;            
            document.getElementById("seg_graves_txt").textContent = translations.seg_graves_txt;
            document.getElementById("seg_graves_l1").textContent = translations.seg_graves_l1;
            document.getElementById("btnSoumissionOne_seg_graves").textContent = translations.btnSoumissionOne_seg_graves;
            document.getElementById("btnWhatsappOne_seg_graves").textContent = translations.btnWhatsappOne_seg_graves;
            // document.getElementById("mas_ahorro_txt").textContent = translations.mas_ahorro_txt;
            document.getElementById("mas_ahorro_l1").innerHTML = translations.mas_ahorro_l1;
            document.getElementById("mas_ahorro_l2").innerHTML = translations.mas_ahorro_l2;
            document.getElementById("mas_ahorro_l3").innerHTML = translations.mas_ahorro_l3;
            document.getElementById("mas_ahorro_l4").innerHTML = translations.mas_ahorro_l4;
            document.getElementById("condiciones_txt").textContent = translations.condiciones_txt;
            document.getElementById("modal_p1").textContent = translations.modal_p1;
            document.getElementById("modal_p2").textContent = translations.modal_p2;
            document.getElementById("modal_p3").textContent = translations.modal_p3;
            document.getElementById("modal_p4").textContent = translations.modal_p4;
            document.getElementById("modal_p5").textContent = translations.modal_p5;
            document.getElementById("modal_p6").innerHTML = translations.modal_p6;
            document.getElementById("modal_p7").textContent = translations.modal_p7;
            document.getElementById("pdt_revenue_txt").textContent = translations.pdt_revenue_txt;
            document.getElementById("pdt_revenue_l1").textContent = translations.pdt_revenue_l1;
            document.getElementById("pdt_revenue_l2").textContent = translations.pdt_revenue_l2;
            document.getElementById("pdt_revenue_l3").textContent = translations.pdt_revenue_l3;
        }
    };
    xhr.send(null);
}
document.addEventListener("DOMContentLoaded", function () {
    changeLanguage('es');
});