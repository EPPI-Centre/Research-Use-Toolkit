const QuestionsList = ["1_1", "1_2", "1_3"
    , "1_4_1", "1_4_2", "1_4_3", "1_4_4", "1_5", "1_6", "1_7", "1_8", "1_9", "1_10"
    , "2_1", "2_2", "2_3_1", "2_3_2", "2_3_3", "2_4"
    , "3_1_1", "3_1_2", "3_1_3", "3_1_4", "3_2", "3_3"
    , "4_1", "4_3"
    , "5_1_1", "5_1_2", "5_1_3", "5_2", "5_3", "5_3_1", "5_3_2"
    , "6", "6_1_1", "6_1_2", "6_1_3", "6_1_4", "6_1_5", "6_1_6", "6_1_7", "6_3_1", "6_3_2"
    , "7_1", "7_2", "7_3"
    , "8_1", "8_2", "8_3_1", "8_3_2"
];
const CheckBoxes = [
    "2_3_1", "2_3_2", "2_3_3"
    , "4_2_1", "4_2_2", "4_2_3", "4_2_4", "4_2_5", "4_2_6", "4_2_7", "4_2_8", "4_2_9"
    , "6_1_1", "6_1_2", "6_1_3", "6_1_4", "6_1_5", "6_1_6"
];
const Sections = [
    "section0"
    , "section1"
    , "section1_4"
    , "section1_5"
    , "section1_8"
    , "section2"
    , "section2_3"
    , "section2_4"
    , "section3"
    , "section3_1"
    , "section3_2"
    , "section4"
    , "section4_2"
    , "section4_3"
    , "section5"
    , "section5_1"
    , "section5_2_0"
    , "section5_2_1"
    , "section5_2_2"
    , "section5_3"
    , "section5_4"
    , "section6"
    , "section6_0"
    , "section6_1"
    , "section6_2_0"
    , "section6_2"
    , "section6_3"
    , "section7"
    , "section8_1"
    , "section8_3"
    , "section8_4"
]
let CurrentSection = "section0";//last bit needs to be an integer
$(document).ready(
    () => { LoadFromLocal(); }
);
function LoadFromLocal() {
    for (let q of QuestionsList) {
        let tmp = localStorage.getItem(q);
        if (tmp && tmp != "") {
            let el = $("#input" + q);
            if (el) {
                if (CheckBoxes.indexOf(q) == -1) {
                    el.val(tmp);//normal text value
                }
                else {
                    //this is a checkbox we're dealing with...
                    if (tmp == "true") {
                        el.prop('checked', true);
                    } else {
                        el.prop('checked', false);
                    }
                }
            }
        }
    }
    GoTo("section0");
}
function LocalSave(questionN, ischeckbox = false) {
    for (let q of QuestionsList) {
        if (questionN == q) {
            if (CheckBoxes.indexOf(questionN) !== -1) {
                let tmp = $("#input" + q).prop('checked');
                localStorage.setItem(q, tmp);
            }
            else {
                let tmp = $("#input" + q).val();
                if (tmp && tmp != "") localStorage.setItem(q, tmp);
            }
            break;
        }
    }
}
function Report() {
    for (let q of QuestionsList) {
        let tmp = localStorage.getItem(q);
        if (tmp && tmp != "") {
            const tDescr = $("#descr" + q).text();
            console.log("Answer to question: " + tDescr.toString() + " is: " + tmp);
        }
    }
}
function Export() {
    let res = {};
    for (let q of QuestionsList) {
        let tmp = localStorage.getItem(q);
        if (tmp && tmp != "") {
            res[q] = tmp;
        } else {
            res[q] = "";
        }
    }
    console.log("Would save:", JSON.stringify(res));
}
function ToggleById(id) {
    const t1 = $("#" +id);
    const t2 = $("#" + id + "closed");
    if (t1 && t2) {
        t1.toggle(300);
        t2.toggle(300);
    }
}
function GoTo(SectionId) {
    const sections = $(".section");
    for (let section of sections) {
        if (section.id == SectionId) {
            $("#" + section.id).show(0);
            CurrentSection = SectionId;
        }
        else if (section.id != "AimsSection") {
            $("#" + section.id).hide(0);
        }
    }
    let ind = Sections.indexOf(CurrentSection);
    if (ind == -1) return;
    if (ind == 0) {
        $(".GoToStart").prop("disabled", true);
        $(".GoToPrevious").prop("disabled", true);
        $(".GoToNext").prop("disabled", false);
        $(".GoToLast").prop("disabled", false);
    }
    else if (ind == Sections.length - 1) {
        $(".GoToStart").prop("disabled", false);
        $(".GoToPrevious").prop("disabled", false);
        $(".GoToNext").prop("disabled", true);
        $(".GoToLast").prop("disabled", true);
    }
    else {
        $(".GoToStart").prop("disabled", false);
        $(".GoToPrevious").prop("disabled", false);
        $(".GoToNext").prop("disabled", false);
        $(".GoToLast").prop("disabled", false);
    }
}
function GoToNext() {
    let ind = Sections.indexOf(CurrentSection);
    if (ind == -1) {
        GoTo(Sections[0]);
    }
    else if (ind == Sections.length - 1) {
        GoTo(Sections[Sections.length - 1]);
    }
    else {
        GoTo(Sections[ind + 1]);
    }
}
function GoToPrevious() {
    let ind = Sections.indexOf(CurrentSection);
    if (ind == -1) {
        GoTo(Sections[0]);
    }
    else if (ind == 0) {
        GoTo(Sections[0]);
    }
    else {
        GoTo(Sections[ind - 1]);
    }
}
function GoToLast() {
    GoTo(Sections[Sections.length - 1]);
}