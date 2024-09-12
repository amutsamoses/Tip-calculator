const billInput = document.getElementById("bill-input");
const peopleInput = document.getElementById("people-input");
const btnTips = [...document.querySelectorAll(".tip")];
const btnCustome = document.getElementById("custome");
const inputWrapper = document.querySelector(".input-wrapper");
const inputValue = document.querySelector(".input-value");
const numberOfPeople = document.querySelector(".borderNumberPeople");
const peopleLabelBox = document.querySelector(".people-label-box");
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");
const btnreset = document.getElementById("btn-reset");

let tips, custome, numberPerson, bill;

let emptyField = null;

const btnReset = () => {
  btnreset.addEventListener("click", () => {
    billInput.value = "";
    btnCustome.value = "";
    peopleInput.value = "";

    tipAmount.innerHTML = "$0";
    totalAmount.innerHTML = "$0";

    btnTips.forEach((btn) => {
      btn.style.backgroundColor = "hsl(183, 100%, 15%)";
    });
    custome = "";
    tips = "";
    selectedBtn = null;
    window.location.reload();
  });
};

let label;

const emptyFieldExecuted = () => {
  inputWrapper.style.border = "2px solid #e17457";
  numberOfPeople.style.border = "2px solid #e17457";

  label = document.createElement("label");
  label.innerHTML = "Can't be zero";
  label.style.color = "#e17457";

  peopleLabelBox.appendChild(label);
  peopleLabelBox.style.display = "flex";
  peopleLabelBox.style.justifyContent = "space-between";
  peopleLabelBox.style.width = "100";

  btnTips.forEach((btn) => {
    btnTips.value = "";
    btn.style.backgroundColor = "hsl(183, 100%, 15%)";
  });

  bill = "";
  tips = "";
  custome.value = "";
  emptyField = true;
};

const filledField = () => {
  inputWrapper.style.border = "";
  numberOfPeople.style.border = "";

  if (label) {
    label.remove();
    label = null;
  }
};

billInput.addEventListener("change", function () {
  bill = billInput.value;
  incrementTips();
});

let selectedBtn = null;

btnTips.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (selectedBtn) {
      btnCustome.value = "";
      selectedBtn.style.backgroundColor = "";
    }
    selectedBtn = btn;
    btn.style.backgroundColor = "#26c2ae";
    tips = btn.textContent;
    incrementTips();
  });
});

btnCustome.addEventListener("change", function () {
  btnTips.forEach((btn) => {
    btn.style.backgroundColor = "hsl(183, 100%, 15%)";
    btn.value = 0;
  });
  custome = btnCustome.value;
  incrementTips();
  calculatedTips(custome);
});

peopleInput.addEventListener("change", function () {
  numberPerson = peopleInput.value;
  incrementTips();
});

const calculatedTips = (value) => {
  let percentageValue = (value / 100) * Number(bill);
  let tipsPerPerson = percentageValue / Number(numberPerson);
  let totalPerPerson = (percentageValue + Number(bill)) / Number(numberPerson);
  tipAmount.innerHTML = `$${Math.trunc(tipsPerPerson)}`;
  totalAmount.innerHTML = `$${Math.trunc(totalPerPerson)}`;
};

const incrementTips = () => {
  try {
    if (bill) {
      if (emptyField) {
        filledField();
      }
      if (tips && numberPerson) {
        let tip = Number(tips.replace("%", ""));
        calculatedTips(tip);
        filledField();
      } else if (custome) {
        if (custome && numberPerson) {
          calculatedTips(custome);
          filledField();
        }
      }
    } else {
      if (!emptyField) {
        emptyFieldExecuted();
      }
    }
  } catch (error) {
    console.log("Unexpected error:", error.message);
  }
};

btnReset();
