const QuestionsList = ["1_1", "1_2", "1_3"
    , "1_4_1", "1_4_2", "1_4_3", "1_4_4", "1_5", "1_6", "1_7", "1_8", "1_9", "1_10"
    , "2_1", "2_2", "2_3_1", "2_3_2", "2_3_3", "2_4"
];
const CheckBoxes = [
    "2_3_1", "2_3_2", "2_3_3"
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
    , "section4"
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