const sheetID = "17IhOecVL-vzhNNdkzvtrlvuGy7IJg2YhKBb51-60abc";
const apiKey = "AIzaSyDg1ttZ3OoQ0Gag4kN6zLdgio6IErxATRk";
const range = "Dados!A1:H";

// function updatetable() {
//   fetch(
//     `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       let html = "<table border='1'>";
//       data.values.forEach((linha) => {
//         html += "<tr>";
//         linha.forEach((celula) => {
//           html += `<td>${celula}</td>`;
//         });
//         html += "</tr>";
//       });
//       html += "</table>";
//       document.getElementById("resultado").innerHTML = html;
//     });
// }

// setInterval(updatetable, 10000);
// updatetable();


const iframe = document.getElementById("sheetFrame");

// Atualiza o iframe a cada 10 segundos
setInterval(() => {
  iframe.src = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTBQH9szVxry3H59tGn1LVQjz0zMdBgfp1w0Ez3moNgVI7kW3b0Pt3uTYbyXUnDhL-6NzbX9w1vu8tN/pubhtml?gid=0&single=true&widget=true&headers=false`;
}, 10000); // 10s





const abrir = document.getElementById("abrirModal");
const fechar = document.getElementById("fecharModal");
const modal = document.getElementById("modal");

abrir.addEventListener("click", () => modal.classList.remove("hidden"));
fechar.addEventListener("click", () => modal.classList.add("hidden"));

// Fecha o modal clicando fora da caixa
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});
// ${new Date().getTime()}