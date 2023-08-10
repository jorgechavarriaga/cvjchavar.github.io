function changeLanguage(language) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", "../assets/language/" + language + ".json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var translations = JSON.parse(xhr.responseText);
            document.getElementById("title").textContent = translations.title;
            document.getElementById("contact").innerHTML = translations.contact;
            document.getElementById("profile-container-1").textContent = translations["profile-container-1"];
            document.getElementById("profile-container-2").textContent = translations["profile-container-2"];
            document.getElementById("profile-container-3").textContent = translations["profile-container-3"];
            document.getElementById("profile-container-4").textContent = translations["profile-container-4"];
            document.getElementById("language-select-1").textContent = translations["language-select-1"];
            document.getElementById("language-select-2").textContent = translations["language-select-2"];
            document.getElementById("language-select-3").textContent = translations["language-select-3"];
            document.getElementById("education_txt").innerHTML = translations["education_txt"];
            document.getElementById("education_degree_title6").innerHTML = translations["education_degree_title6"];
            document.getElementById("education_degree_univ6").textContent = translations["education_degree_univ6"];
            document.getElementById("education_degree_time6").textContent = translations["education_degree_time6"];
            document.getElementById("education_degree_place6").textContent = translations["education_degree_place6"];
            document.getElementById("education_degree_title5").textContent = translations["education_degree_title5"];
            document.getElementById("education_degree_univ5").textContent = translations["education_degree_univ5"];
            document.getElementById("education_degree_time5").textContent = translations["education_degree_time5"];
            document.getElementById("education_degree_place5").textContent = translations["education_degree_place5"];
            document.getElementById("education_degree_title4").textContent = translations["education_degree_title4"];
            document.getElementById("education_degree_univ4").textContent = translations["education_degree_univ4"];
            document.getElementById("education_degree_time4").textContent = translations["education_degree_time4"];
            document.getElementById("education_degree_place4").textContent = translations["education_degree_place4"];
            document.getElementById("education_degree_title3").textContent = translations["education_degree_title3"];
            document.getElementById("education_degree_univ3").textContent = translations["education_degree_univ3"];
            document.getElementById("education_degree_time3").textContent = translations["education_degree_time3"];
            document.getElementById("education_degree_place3").textContent = translations["education_degree_place3"];
            document.getElementById("education_degree_univ2").textContent = translations["education_degree_univ2"];
            document.getElementById("education_degree_time2").textContent = translations["education_degree_time2"];
            document.getElementById("education_degree_place2").textContent = translations["education_degree_place2"];

            var diplomaElement1 = document.getElementById("diploma-link1");
            var diplomaTitleTranslation1 = translations["diploma_title1"];
            var diplomaContentTranslation1 = translations["diploma_content1"];
            diplomaElement1.setAttribute("data-original-title", diplomaTitleTranslation1);
            diplomaElement1.setAttribute("data-content", diplomaContentTranslation1);
            document.getElementById("diploma-link1").innerHTML = translations["diploma-link1"];
            
            var diplomaElement2 = document.getElementById("diploma-link2");
            var diplomaTitleTranslation2 = translations["diploma_title2"];
            var diplomaContentTranslation2 = translations["diploma_content2"];
            diplomaElement2.setAttribute("data-original-title", diplomaTitleTranslation2);
            diplomaElement2.setAttribute("data-content", diplomaContentTranslation2);
            document.getElementById("diploma-link2").innerHTML = translations["diploma-link2"];


            document.getElementById("education_degree_univ1").textContent = translations["education_degree_univ1"];
            document.getElementById("education_degree_time1").textContent = translations["education_degree_time1"];
            document.getElementById("education_degree_place1").textContent = translations["education_degree_place1"];
            document.getElementById("language_txt").innerHTML = translations["language_txt"];
            document.getElementById("language_native").textContent = translations["language_native"];
            document.getElementById("language_fluent").textContent = translations["language_fluent"];
            document.getElementById("language_inter").textContent = translations["language_inter"];
            document.getElementById("language_1").textContent = translations["language_1"];
            document.getElementById("language_2").textContent = translations["language_2"];
            document.getElementById("language_3").textContent = translations["language_3"];
            document.getElementById("inter_fair_txt").innerHTML = translations["inter_fair_txt"];
            document.getElementById("fair1").innerHTML = translations["fair1"];
            var fairElement1 = document.getElementById("fair1");
            var fairTitleTranslation1 = translations["fair_title1"];
            var fairContentTranslation1 = translations["fair_content1"];
            fairElement1.setAttribute("data-original-title", fairTitleTranslation1);
            fairElement1.setAttribute("data-content", fairContentTranslation1);
            document.getElementById("fair2").innerHTML = translations["fair2"];
            var fairElement2 = document.getElementById("fair2");
            var fairTitleTranslation2 = translations["fair_title2"];
            var fairContentTranslation2 = translations["fair_content2"];
            fairElement2.setAttribute("data-original-title", fairTitleTranslation2);
            fairElement2.setAttribute("data-content", fairContentTranslation2);
            document.getElementById("fair3").innerHTML = translations["fair3"];
            var fairElement3 = document.getElementById("fair3");
            var fairTitleTranslation3 = translations["fair_title3"];
            var fairContentTranslation3 = translations["fair_content3"];
            fairElement3.setAttribute("data-original-title", fairTitleTranslation3);
            fairElement3.setAttribute("data-content", fairContentTranslation3);
            document.getElementById("fair4").innerHTML = translations["fair4"];
            var fairElement4 = document.getElementById("fair4");
            var fairTitleTranslation4 = translations["fair_title4"];
            var fairContentTranslation4 = translations["fair_content4"];
            fairElement4.setAttribute("data-original-title", fairTitleTranslation4);
            fairElement4.setAttribute("data-content", fairContentTranslation4);
            document.getElementById("fair5").innerHTML = translations["fair5"];
            var fairElement5 = document.getElementById("fair5");
            var fairTitleTranslation5 = translations["fair_title5"];
            var fairContentTranslation5 = translations["fair_content5"];
            fairElement5.setAttribute("data-original-title", fairTitleTranslation5);
            fairElement5.setAttribute("data-content", fairContentTranslation5);
            document.getElementById("interest_txt").innerHTML = translations["interest_txt"];
            document.getElementById("interest1").textContent = translations["interest1"];
            document.getElementById("interest2").textContent = translations["interest2"];
            document.getElementById("interest3").textContent = translations["interest3"];
            document.getElementById("interest4").textContent = translations["interest4"];
            document.getElementById("summary_qualifications_txt").innerHTML = translations["summary_qualifications_txt"];
            document.getElementById("summary_q1").textContent = translations["summary_q1"];
            document.getElementById("summary_q2").textContent = translations["summary_q2"];
            document.getElementById("summary_q3").textContent = translations["summary_q3"];
            document.getElementById("summary_q4").textContent = translations["summary_q4"];
            document.getElementById("summary_q5").textContent = translations["summary_q5"];
            document.getElementById("summary_q6").textContent = translations["summary_q6"];
            document.getElementById("experience_txt").innerHTML = translations["experience_txt"];
            document.getElementById("job_title4").textContent = translations["job_title4"];
            document.getElementById("job_time4").textContent = translations["job_time4"];
            document.getElementById("company4").innerHTML = translations["company4"];
            document.getElementById("job4_li1").textContent = translations["job4_li1"];
            document.getElementById("job4_li2").textContent = translations["job4_li2"];
            document.getElementById("job4_li3").textContent = translations["job4_li3"];
            document.getElementById("job_title3").textContent = translations["job_title3"];
            document.getElementById("job_time3").textContent = translations["job_time3"];
            document.getElementById("company3").innerHTML = translations["company3"];
            document.getElementById("job3_li1").textContent = translations["job3_li1"];
            document.getElementById("job3_li2").textContent = translations["job3_li2"];
            document.getElementById("job_title2").textContent = translations["job_title2"];
            document.getElementById("job_time2").textContent = translations["job_time2"];
            document.getElementById("company2").innerHTML = translations["company2"];
            document.getElementById("job2_li1").textContent = translations["job2_li1"];
            document.getElementById("job2_li2").textContent = translations["job2_li2"];
            document.getElementById("job2_li3").textContent = translations["job2_li3"];
            document.getElementById("job2_li4").textContent = translations["job2_li4"];
            document.getElementById("job2_li5").textContent = translations["job2_li5"];
            document.getElementById("job2_li6").textContent = translations["job2_li6"];
            document.getElementById("job2_li7").textContent = translations["job2_li7"];
            document.getElementById("job2_li8").textContent = translations["job2_li8"];
            document.getElementById("job2_li9").textContent = translations["job2_li9"];
            document.getElementById("job2_li10").textContent = translations["job2_li10"];
            document.getElementById("job2_li11").textContent = translations["job2_li11"];
            document.getElementById("job2_li12").textContent = translations["job2_li12"];
            document.getElementById("job2_li13").textContent = translations["job2_li13"];
            document.getElementById("job2_li14").textContent = translations["job2_li14"];
            document.getElementById("job2_li15").textContent = translations["job2_li15"];
            document.getElementById("job2_li16").textContent = translations["job2_li16"];
            document.getElementById("job_title1").textContent = translations["job_title1"];
            document.getElementById("job_time1").textContent = translations["job_time1"];
            document.getElementById("company1").innerHTML = translations["company1"];
            document.getElementById("job1_li1").textContent = translations["job1_li1"];
            document.getElementById("job1_li2").textContent = translations["job1_li2"];
            document.getElementById("job1_li3").textContent = translations["job1_li3"];
            document.getElementById("job1_li4").textContent = translations["job1_li4"];
            document.getElementById("job1_li5").textContent = translations["job1_li5"];
            document.getElementById("skills_txt").innerHTML = translations["skills_txt"];
            document.getElementById("skill_hd1").textContent = translations["skill_hd1"];
            document.getElementById("skill_hd2").textContent = translations["skill_hd2"];
            document.getElementById("skill_dt2-1").textContent = translations["skill_dt2-1"];
            document.getElementById("skill_dt2-2").textContent = translations["skill_dt2-2"];
            document.getElementById("skill_dt2-3").textContent = translations["skill_dt2-3"];
            document.getElementById("skill_dt2-4").textContent = translations["skill_dt2-4"];
            document.getElementById("skill_dt2-5").textContent = translations["skill_dt2-5"];
            document.getElementById("skill_dt2-6").textContent = translations["skill_dt2-6"];
            document.getElementById("skill_dt2-7").textContent = translations["skill_dt2-7"];
            document.getElementById("skill_dt2-8").textContent = translations["skill_dt2-8"];
        }
    };
    xhr.send(null);
}
document.addEventListener("DOMContentLoaded", function () {
    changeLanguage('cv_en');
});

