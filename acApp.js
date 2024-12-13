const addPage = document.querySelector(".add-page");

const saveNote = () => {
    const particularLocal = document.querySelectorAll(".myData");

    const statment = [];

    particularLocal.forEach(function (data) {
        statment.push(data.value)
        localStorage.setItem("lsStatment", JSON.stringify(statment));
    });
};

(
    function () {
        if (localStorage.length !== 0) {
            let pureData = localStorage.getItem("lsStatment").slice(1, -1);
            let [statement, cAmount, pAmount] = pureData.split(",");

            addNotes(statement.slice(1, -1), cAmount.slice(1, -1), pAmount.slice(1, -1));
        } else {

        }
    }
)();

function addNotes(particular = "", cya = "", pya = "") {
    const accPage = document.createElement("div");
    accPage.classList.add("acc-page");

    accPage.innerHTML = `
   
            <div class="heading">
                <span>Cash flow Statment - 1</span>
                <div class="head-btn-container">
                    <div class="download">⬇️</div>
                    <div class="delete">X</div>
                </div>
            </div>

            <div class="content-heading">
                <table>
                    <tr>
                        <th>Particular</th>
                        <th>current yrs(₹)</th>
                        <th>previous yrs(₹)</th>
                    </tr>
                </table>
            </div>

            <div class="content-body">
                <div class="main-content-body" style="padding: 5px;">
                    <div style="display: flex; font-weight: 700;">
                        <p>I.</p>
                        <p style="margin-left: 20px;">Cash flow from Operating Activity</p>
                    </div>

                    <div class="textarea-container">

                        <div class="serial-num">
                            <textarea class="myData prtclr">${particular}</textarea>
                            <textarea class="myData cya">${cya}</textarea>
                            <textarea class="myData pya">${pya}</textarea>
                        </div>

                    </div>

                </div>
            </div>
    `;

    document.getElementById("container").append(accPage);

    //Sent whole component which about to be renderd
    handleTextarea(accPage);

    accPage.querySelector(".delete").addEventListener(
        "click",
        () => {
            accPage.remove();
            localStorage.removeItem("lsStatment");
        });

    accPage.querySelector(".download").addEventListener(
        "click",
        () => {
            saveNote();
        })
};

addPage.addEventListener("click", function () {
    addNotes();


});

function handleTextarea(container) {
    const textArea = container.querySelectorAll("textarea");

    let activeTextarea = null;
    textArea.forEach((area, index) => {
        area.addEventListener("focus", function (event) {
            activeTextarea = event.target;
        });
        area.addEventListener("keydown", (event) => {
            if (activeTextarea === event.target && event.key === "Enter") {
                event.preventDefault();
                console.log(textArea[index], index);
                textArea[++index].focus();

                // Start work from here hint: childElementCount

                if (area.classList.contains("cya") && area.value !== "") {

                    let clone = area.parentNode.cloneNode();

                    const structure = `
                 <textarea class="myData prtclr"></textarea>
                        <textarea class="myData cya"></textarea>
                        <textarea class="myData pya"></textarea>
                 `
                    clone.innerHTML = structure;
                    container.querySelector(".textarea-container").append(clone);


                }
            }
        })
    })
};
