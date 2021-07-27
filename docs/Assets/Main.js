const QuestionsList = ["1_1", "1_2", "1_3"
    , "1_4_1", "1_4_2", "1_4_3", "1_4_4", "1_5" //, "1_6"
    , "1_7", "1_8", "1_9", "1_10", "1_11"
    , "2_1", "2_2" //, "2_3"
    , "2_3_1", "2_3_2", "2_3_3", "2_4_1", "2_4_2", "2_4_3", "2_4_4"
    , "3_1_1", "3_1_2", "3_1_3", "3_1_4", "3_2", "3_3"
    , "4_1", "4_2_1", "4_2_2", "4_2_3", "4_2_4", "4_2_5", "4_2_6", "4_2_7", "4_2_8", "4_2_9", "4_3"
    , "5_1_1", "5_1_2", "5_1_3", "5_2", "5_3", "5_3_1", "5_3_2"
    , "6", "6_1_1", "6_1_2", "6_1_3", "6_1_4", "6_1_5", "6_1_6", "6_1_7", "6_2_1", "6_2_2", "6_2_3", "6_3_1", "6_3_2"
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
    , "section0_1"
    , "section0_2"
    , "section1"
    , "section1_1"
    , "section1_4"
    , "section1_6"
    //, "section1_8"
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
var fr = new FileReader();
let CurrentSection = "section0";
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
function LocalSave(questionN) {
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
    let doc = `<!DOCTYPE html>
        <html lang ="en" xmlns ="http://www.w3.org/1999/xhtml" >
        <head>
            <meta charset="utf-8" />
            <title>Decision-makers' Research Use Toolkit: answers report</title>
                <style>
                body {
                  font-family: "Times New Roman", Times, serif;
                     font-size: 16px;
                }

                h3 {
                    font-size: 19px;
                    font-weight: normal;
                    color: blueviolet;
                    margin-top: 0.4em;
                    margin-bottom: 0.2em;
                    border-bottom: 1px solid dodgerblue;
                }
                .answer {
                    font-family: "Lucida Console", "Courier New", monospace;
                    background-color: #f7f7f7;
                    font-size:0.9em;
                    padding:0.8em;
                    margin-left:1em;
                    margin-right:auto;
                }
                .question {
                    border-bottom: 1px solid dodgerblue;
                    padding:0.8em;
                    margin-left:1em;
                    margin-right:auto;
                }

                .blue {
                    color: blueviolet;
                }
                </style>
        </head>
        <body>
        <h3>Decision-makers' Research Use Toolkit: answers report</h3>
        `;
    for (let q of QuestionsList) {
        let jsRes = {};
        let tmp = localStorage.getItem(q);
        if (tmp && tmp != "") {
            const tDescr = $("#descr" + q).html();
            //console.log("Answer to question: " + tDescr.toString() + " is: " + tmp);
            doc += "<div class='question'> <span class='blue'>Question:</span> " + tDescr.toString() + "<br />"
                + "<span class='blue'>Your answer:</span> <p class='answer'>" + tmp + "</p></div>";
        }
    }
    const JsString = Export();
    doc += "<input id='hiddenInputWithAnswersInJSONForm' value='" + JsString + "' type='hidden' />";
    doc += "</body></html>"
    //from: https://code-boxx.com/create-save-files-javascript/
    // (A) CREATE BLOB OBJECT
    var myBlob = new Blob([doc], { type: "text/html" });

    // (B) CREATE DOWNLOAD LINK
    var url = window.URL.createObjectURL(myBlob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Research Use Toolkit - answers.html";

    // (C) "FORCE DOWNLOAD"
    // NOTE: MAY NOT ALWAYS WORK DUE TO BROWSER SECURITY
    // BETTER TO LET USERS CLICK ON THEIR OWN
    anchor.click();
    window.URL.revokeObjectURL(url);
    //document.removeChild(anchor);
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
    //console.log("Would save:", JSON.stringify(res));
    return JSON.stringify(res);
}
function ProcessUpload() {
    //from https://stackoverflow.com/a/12282163
    {
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert('The File APIs are not fully supported in this browser.');
            return;
        }

        var input = document.getElementById('myfile');
        if (!input) {
            alert("Um, couldn't find the fileinput element.");
        }
        else if (!input.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            alert("Please select a file before clicking 'Load'");
        }
        else {
            var file = input.files[0];
            if (file) {
                fr.onload = receivedText;
                fr.readAsText(file);
            }
            //fr.readAsBinaryString(file); //as bit work with base64 for example upload to server
            //fr.readAsDataURL(file);
        }
    }
}
function receivedText() {
    const res = fr.result;
    let ind = res.indexOf("hiddenInputWithAnswersInJSONForm");
    if (ind > 0) {
        ind = res.indexOf("value='", ind);
        if (ind == -1) {
            alert("Sorry, couldn't find the 'answers' data in the expected format");
        }
        else {
            ind = ind + 7;
            end = res.indexOf(" type='hidden' />", ind);
            if (ind > 0 && end > ind) {
                let StrData = res.substring(ind, end - 1);
                try {
                    let data = JSON.parse(StrData);
                    //console.log(data);
                    UploadedToLocaStor(data);
                } catch (e) {
                    alert("Sorry, the file you selected appears to contain the data, but the attempt to interpret it failed. ERROR: \r\n" + e.toString());
                }
            }
            else {
                alert("Sorry, couldn't find the 'answers' data in the expected format");
            }
        }
    }
    else {
        alert("Sorry, couldn't find the 'answers' data in the expected format");
    }
}
function UploadedToLocaStor(data) {
    let doneSomething = false;
    for (let q of QuestionsList) {
        const tmp = data[q];
        if (tmp) {
            localStorage.setItem(q, tmp);
            doneSomething = true;
        }
    }
    if (doneSomething == true) {
        LoadFromLocal();
        alert("Data was received, processed and 'applied' correctly");
        $('#myfile').val('');
    }
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