function format(inputString) {
  return inputString
    .replace(/[^0-9.,]/g, "")
    .replace(/^(?!\.)/g, "")
    .replace(/,/g, ".")
    .replace(/^\.($|[^0-9])/, "0.")
    .replace(/\.{2,}/g, ".")
    .replace(/(.*?\..*?)\./g, "$1")
    .replace(/(\d+\.\d{2})\d*/g, "$1");
}
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", (event) => {
    const inputField = event.target;
    inputField.value = format(inputField.value);
  });
});
const visitedElements = document.querySelectorAll("input, select");
visitedElements.forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value) {
      this.classList.add("visited");
    } else {
      this.classList.remove("visited");
    }
  });
});
const mamRozpylacz = document.querySelector("#mam-rozpylacz");
const wyborRozpylacz = document.querySelector("#wybor-rozpylacz");
const sekcja0 = document.querySelector("#section0");
const sekcja1 = document.querySelector("#section1");
const sekcja2 = document.querySelector("#section2");
const sekcja3 = document.querySelector("#section3");
const sekcja4 = document.querySelector("#section4");
sekcja1.classList.add("hidden");
sekcja2.classList.add("hidden");
sekcja3.classList.add("hidden");
sekcja4.classList.add("hidden");
wyborRozpylacz.addEventListener("click", function () {
  sekcja1.classList.remove("hidden");
  sekcja0.classList.add("hidden");
});
mamRozpylacz.addEventListener("click", function () {
  sekcja3.classList.remove("hidden");
  sekcja0.classList.add("hidden");
});

const dzialania = {
  herbicydy: ["doglebowo", "przedwschodowo", "powschodowo - kontaktowe", "powschodowo - systemiczne", "glifosat przed zbiorem"],
  fungicydy: ["kontaktowe", "systemiczne", "niskie rośliny", "wysokie rośliny", "na kłos i górne liście"],
  zoocydy: ["kontaktowe", "systemiczne", "gazowe", "niskie rośliny", "wysokie rośliny", "na kłos i górne liście"],
  nawozy: ["dolistne", "doglebowo"],
};

const rodzajSelect = document.querySelector("#rodzaj-srodka");
const dzialanieSelect = document.querySelector("#dzialanie-srodka");
const wiatrSelect = document.querySelector("#predkosc-wiatru");

rodzajSelect.addEventListener("change", function () {
  const selectedRodzaj = this.value;
  dzialanieSelect.innerHTML = "<option disabled selected hidden>wybierz działanie środka</option>";

  const firstOption = document.createElement("option");
  firstOption.value = "wybierz działanie środka";
  firstOption.textContent = "wybierz działanie środka";
  firstOption.disabled = true;
  firstOption.hidden = true;
  dzialanieSelect.appendChild(firstOption);

  if (dzialania[selectedRodzaj]) {
    dzialania[selectedRodzaj].forEach((d) => {
      const option = document.createElement("option");
      option.value = d;
      option.textContent = d;
      dzialanieSelect.appendChild(option);
    });
  }
});

const wielkoscKropliElement = document.querySelector("#wielkosc-kropli");
function dropSize() {
  const dzialanieValue = dzialanieSelect.value;
  const wiatrValue = wiatrSelect.value;
  let wielkoscKropli;
  if (wiatrValue === "do1.5") {
    wielkoscKropli = dzialanieValue === "doglebowo" || dzialanieValue === "wysokie rośliny" ? "średnie" : "drobne";
  } else if (wiatrValue === "do2.5") {
    wielkoscKropli = "średnie";
  } else if (wiatrValue === "do5") {
    wielkoscKropli = dzialanieValue === "doglebowo" || dzialanieValue === "wysokie rośliny" || dzialanieValue === "powschodowo - systemiczne" || dzialanieValue === "glifosat przed zbiorem" || dzialanieValue === "niskie rośliny" ? "grube" : "średnie";
  } else if (wiatrValue === "ponad5") {
    wielkoscKropli = dzialanieValue === "doglebowo" ? "bardzo grube" : "grube";
  } else {
    wielkoscKropli = "uzupełnij";
  }
  wielkoscKropliElement.textContent = wielkoscKropli;
  return wielkoscKropli;
}
const wielkoscRozpylacza = {
  drobne: [
    { id: "01", text: "standardowe" },
    { id: "015", text: "standardowe" },
    { id: "02", text: "standardowe" },
    { id: "025", text: "standardowe" },
  ],
  średnie: [
    { id: "01", text: "niskoznoszeniowe" },
    { id: "015", text: "niskoznoszeniowe" },
    { id: "02", text: "niskoznoszeniowe" },
    { id: "025", text: "niskoznoszeniowe" },
    { id: "03", text: "standardowe" },
    { id: "04", text: "standardowe" },
    { id: "05", text: "standardowe" },
  ],
  grube: [
    { id: "01", text: "eżektorowe kompaktowe" },
    { id: "015", text: "eżektorowe kompaktowe" },
    { id: "02", text: "eżektorowe kompaktowe" },
    { id: "025", text: "eżektorowe kompaktowe" },
    { id: "03", text: "niskoznoszeniowe" },
    { id: "03", text: "eżektorowe kompaktowe" },
    { id: "04", text: "niskoznoszeniowe" },
    { id: "05", text: "niskoznoszeniowe" },
    { id: "06", text: "standardowe" },
    { id: "06", text: "niskoznoszeniowe" },
    { id: "08", text: "standardowe" },
  ],
  "bardzo grube": [
    { id: "01", text: "eżektorowe" },
    { id: "015", text: "eżektorowe" },
    { id: "02", text: "eżektorowe" },
    { id: "025", text: "eżektorowe" },
    { id: "03", text: "eżektorowe" },
    { id: "04", text: "eżektorowe kompaktowe" },
    { id: "04", text: "eżektorowe" },
    { id: "05", text: "eżektorowe kompaktowe" },
    { id: "05", text: "eżektorowe" },
    { id: "06", text: "eżektorowe kompaktowe" },
    { id: "06", text: "eżektorowe" },
    { id: "08", text: "niskoznoszeniowe" },
    { id: "08", text: "eżektorowe kompaktowe" },
    { id: "08", text: "eżektorowe" },
  ],
};
const wielkoscRozpylaczaContainer = document.querySelector("#wielkosc-rozpylacza");
const rozmiarRozpylaczaElement = document.querySelector("#rozmiar-rozpylacza");

function sprayerSize(dropSize) {
  wielkoscRozpylaczaContainer.innerHTML = "";
  if (wielkoscRozpylacza[dropSize]) {
    sekcja2.classList.remove("hidden");
    wielkoscRozpylacza[dropSize].forEach((buttonText) => {
      const button = document.createElement("button");
      button.classList.add("w-11/12", "h-10", "border-2", "rounded-2xl", "border-bg-info", "font-bold", "rozpylacze");
      button.textContent = buttonText.id + " " + buttonText.text;
      button.id = buttonText.id;
      switch (button.id) {
        case "01":
          button.style.backgroundColor = "#ffb900";
          break;
        case "015":
          button.style.backgroundColor = "#00c33d";
          break;
        case "02":
          button.style.backgroundColor = "#ffff00";
          break;
        case "025":
          button.style.backgroundColor = "#e900ff";
          break;
        case "03":
          button.style.backgroundColor = "#00ccff";
          break;
        case "04":
          button.style.backgroundColor = "#ff0000";
          break;
        case "05":
          button.style.backgroundColor = "#863500";
          button.style.color = "#ffffff";
          break;
        case "06":
          button.style.backgroundColor = "#cdcdcd";
          break;
        case "08":
          button.style.backgroundColor = "#ffffff";
          break;
      }
      wielkoscRozpylaczaContainer.appendChild(button);
    });
  }
}
function section2service() {
  sprayerSize(dropSize());
  section3service(false);
}
dzialanieSelect.addEventListener("change", section2service);
wiatrSelect.addEventListener("change", section2service);

section3service(true);

function section3service(mamRozpylacz) {
  let wielkoscRozpylacza;
  document.querySelectorAll(".rozpylacze").forEach((element) => {
    element.addEventListener("click", function () {
      sekcja1.classList.add("hidden");
      sekcja2.classList.add("hidden");
      sekcja3.classList.add("hidden");
      sekcja4.classList.remove("hidden");

      wielkoscRozpylacza = this.id.replace("btn", "").replaceAll("a", "").replaceAll("b", "").replaceAll("c", "");
      rozmiarRozpylaczaElement.textContent = wielkoscRozpylacza;
    });
  });

  document.querySelector("#cofnij").addEventListener("click", function () {
    if (mamRozpylacz) {
      sekcja1.classList.add("hidden");
      sekcja2.classList.add("hidden");
      sekcja3.classList.remove("hidden");
      sekcja4.classList.add("hidden");

      cisnienieInputElement.value = "0";
      predkoscInputElement.value = "";
      dawkaCieczyInputElement.value = "";
      rozstawInputElement.value = "50";
      cisnienieBg.style.backgroundColor = "#fff";
      predkoscBg.style.backgroundColor = "#fff";
      dawkaCieczyBg.style.backgroundColor = "#fff";
      cisnienieElement.classList.add("hidden");
      predkoscElement.classList.add("hidden");
      dawkaCieczyElement.classList.add("hidden");
      cisnienieInputElement.classList.remove("visited");
      predkoscInputElement.classList.remove("visited");
      dawkaCieczyInputElement.classList.remove("visited");
      rozstawInputElement.classList.remove("visited");
      wynikiElement.classList.add("hidden");
      wynik.textContent = "uzupenij";
    } else {
      sekcja1.classList.remove("hidden");
      sekcja2.classList.remove("hidden");
      sekcja3.classList.add("hidden");
      sekcja4.classList.add("hidden");

      cisnienieInputElement.value = "0";
      predkoscInputElement.value = "";
      dawkaCieczyInputElement.value = "";
      rozstawInputElement.value = "50";
      cisnienieBg.style.backgroundColor = "#fff";
      predkoscBg.style.backgroundColor = "#fff";
      dawkaCieczyBg.style.backgroundColor = "#fff";
      cisnienieElement.classList.add("hidden");
      predkoscElement.classList.add("hidden");
      dawkaCieczyElement.classList.add("hidden");
      cisnienieInputElement.classList.remove("visited");
      predkoscInputElement.classList.remove("visited");
      dawkaCieczyInputElement.classList.remove("visited");
      rozstawInputElement.classList.remove("visited");
      wynikiElement.classList.add("hidden");
      wynik.textContent = "uzupenij";
    }
  });

  document.querySelectorAll(".calculation-option").forEach((element) => {
    element.addEventListener("click", function () {
      mainCalculation(wielkoscRozpylacza, this.id);
    });
  });
}
const cisnienieBg = document.querySelector("#cisnienie");
const predkoscBg = document.querySelector("#predkosc");
const dawkaCieczyBg = document.querySelector("#dawka-cieczy");
const cisnienieElement = document.querySelector("#cisnienie-input");
const predkoscElement = document.querySelector("#predkosc-input");
const dawkaCieczyElement = document.querySelector("#dawka-cieczy-input");
const wynikiElement = document.querySelector("#wyniki");
const cisnienieInputElement = document.querySelector("#cisnienie-input-input");
const predkoscInputElement = document.querySelector("#predkosc-input-input");
const dawkaCieczyInputElement = document.querySelector("#dawka-cieczy-input-input");
const rozstawInputElement = document.querySelector("#rozstaw-rozpylaczy");
const coDoObliczenia = document.querySelector("#to-calculate");
const wynik = document.querySelector("#result");

cisnienieElement.classList.add("hidden");
predkoscElement.classList.add("hidden");
dawkaCieczyElement.classList.add("hidden");
wynikiElement.classList.add("hidden");
const pressureData = {
  // 0: { "01": 0, "015": 0, "02": 0, "025": 0, "03": 0, "04": 0, "05": 0, "06": 0, "08": 0 },
  1: { "01": 0.23, "015": 0.34, "02": 0.46, "025": 0.57, "03": 0.68, "04": 0.91, "05": 1.14, "06": 1.37, "08": 1.82 },
  1.5: { "01": 0.28, "015": 0.42, "02": 0.57, "025": 0.7, "03": 0.85, "04": 1.13, "05": 1.41, "06": 1.7, "08": 2.26 },
  2: { "01": 0.33, "015": 0.49, "02": 0.65, "025": 0.81, "03": 0.98, "04": 1.31, "05": 1.63, "06": 1.96, "08": 2.61 },
  2.5: { "01": 0.37, "015": 0.55, "02": 0.73, "025": 0.92, "03": 1.1, "04": 1.46, "05": 1.83, "06": 2.19, "08": 2.92 },
  3: { "01": 0.4, "015": 0.6, "02": 0.8, "025": 0.99, "03": 1.2, "04": 1.6, "05": 2, "06": 2.4, "08": 3.2 },
  4: { "01": 0.46, "015": 0.69, "02": 0.92, "025": 1.14, "03": 1.39, "04": 1.85, "05": 2.31, "06": 2.77, "08": 3.7 },
  5: { "01": 0.52, "015": 0.77, "02": 1.03, "025": 1.28, "03": 1.55, "04": 2.07, "05": 2.58, "06": 3.1, "08": 4.13 },
  6: { "01": 0.57, "015": 0.84, "02": 1.11, "025": 1.4, "03": 1.64, "04": 2.21, "05": 2.75, "06": 3.28, "08": 4.34 },
  7: { "01": 0.61, "015": 0.9, "02": 1.19, "025": 1.51, "03": 1.79, "04": 2.37, "05": 2.96, "06": 3.54, "08": 4.68 },
  8: { "01": 0.65, "015": 0.96, "02": 1.27, "025": 1.62, "03": 1.91, "04": 2.53, "05": 3.17, "06": 3.79, "08": 5 },
};

function mainCalculation(wielkoscRozpylacza, coObliczasz) {
  if (wielkoscRozpylacza !== undefined) {
    wynikiElement.classList.remove("hidden");
    switch (coObliczasz) {
      case "cisnienie":
        predkoscElement.classList.remove("hidden");
        dawkaCieczyElement.classList.remove("hidden");
        cisnienieElement.classList.add("hidden");
        cisnienieBg.style.backgroundColor = "#aaa";
        predkoscBg.style.backgroundColor = "#fff";
        dawkaCieczyBg.style.backgroundColor = "#fff";
        coDoObliczenia.textContent = "Ciśnienie [bar] ok.:";
        break;

      case "predkosc":
        cisnienieElement.classList.remove("hidden");
        dawkaCieczyElement.classList.remove("hidden");
        predkoscElement.classList.add("hidden");
        cisnienieBg.style.backgroundColor = "#fff";
        predkoscBg.style.backgroundColor = "#aaa";
        dawkaCieczyBg.style.backgroundColor = "#fff";
        coDoObliczenia.textContent = "Prędkość [km/godz.] ok.:";
        break;

      case "dawka-cieczy":
        cisnienieElement.classList.remove("hidden");
        predkoscElement.classList.remove("hidden");
        dawkaCieczyElement.classList.add("hidden");
        cisnienieBg.style.backgroundColor = "#fff";
        predkoscBg.style.backgroundColor = "#fff";
        dawkaCieczyBg.style.backgroundColor = "#aaa";
        coDoObliczenia.textContent = "Dawka cieczy [l/ha] ok.:";
        break;
    }
    wynik.textContent = "uzupenij";

    document.querySelectorAll(".calculation-input").forEach((element) => {
      element.addEventListener("input", function () {
        let dawka;
        let predkosc;
        let wydajnosc;
        let rozstaw = rozstawInputElement.value;
        let result;
        switch (coObliczasz) {
          case "cisnienie":
            predkosc = parseFloat(predkoscInputElement.value);
            dawka = parseFloat(dawkaCieczyInputElement.value);
            wydajnosc = ((dawka * rozstaw) / 1000 / 60) * predkosc;

            let najblizszaRoznica = Infinity;
            let najlepszeCisnienie = null;

            for (let cisnienie in pressureData) {
              const dane = pressureData[cisnienie][wielkoscRozpylacza];
              if (dane !== undefined) {
                const roznica = Math.abs(dane - wydajnosc);
                if (roznica < najblizszaRoznica) {
                  najblizszaRoznica = roznica;
                  najlepszeCisnienie = cisnienie;
                }
              }
            }

            if (najlepszeCisnienie !== null) {
              result = najlepszeCisnienie;
            }
            break;

          case "predkosc":
            wydajnosc = pressureData[cisnienieInputElement.value][wielkoscRozpylacza];
            dawka = dawkaCieczyInputElement.value;
            result = (wydajnosc * ((1 / rozstaw) * 1000) * 60) / dawka;
            break;

          case "dawka-cieczy":
            wydajnosc = pressureData[cisnienieInputElement.value][wielkoscRozpylacza];
            predkosc = predkoscInputElement.value;
            result = (wydajnosc * ((1 / rozstaw) * 1000) * 60) / predkosc;
            break;
        }
        if (result !== Infinity && !isNaN(result)) wynik.textContent = result.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      });
    });
  }
}

document.querySelector("#reset").addEventListener("click", function () {
  sekcja0.classList.remove("hidden");
  sekcja1.classList.add("hidden");
  sekcja2.classList.add("hidden");
  sekcja3.classList.add("hidden");
  rodzajSelect.value = 1;
  rodzajSelect.classList.remove("visited");
  dzialanieSelect.innerHTML = "<option disabled selected hidden>na początku wybierz rodzaj</option>";
  dzialanieSelect.classList.remove("visited");
  wiatrSelect.value = 1;
  wiatrSelect.classList.remove("visited");
  sekcja4.classList.add("hidden");

  cisnienieInputElement.value = "0";
  predkoscInputElement.value = "";
  dawkaCieczyInputElement.value = "";
  rozstawInputElement.value = "50";
  cisnienieBg.style.backgroundColor = "#fff";
  predkoscBg.style.backgroundColor = "#fff";
  dawkaCieczyBg.style.backgroundColor = "#fff";
  cisnienieElement.classList.add("hidden");
  predkoscElement.classList.add("hidden");
  dawkaCieczyElement.classList.add("hidden");
  cisnienieInputElement.classList.remove("visited");
  predkoscInputElement.classList.remove("visited");
  dawkaCieczyInputElement.classList.remove("visited");
  rozstawInputElement.classList.remove("visited");
  wynikiElement.classList.add("hidden");
  wynik.textContent = "uzupenij";
});
