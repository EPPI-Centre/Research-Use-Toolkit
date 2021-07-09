const QuestionsList = ["1_1", "1_2", "1_3", "1_4", "1_5", "1_6"
    , "2_1", "2_2", "2_3", "2_4"
];
$(document).ready(
    () => { LoadFromLocal(); }
);
function LoadFromLocal() {
    for (let q of QuestionsList) {
        let tmp = localStorage.getItem(q);
        if (tmp && tmp != "") {
            let el = $("#input" + q);
            if (el) el.val(tmp);
        }
    }
}
function LocalSave(questionN) {
    for (let q of QuestionsList) {
        let tmp = $("#input" + q).val();
        if (tmp && tmp != "") localStorage.setItem(q, tmp);
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