// ===== Dice Two Albuns =====
const albuns = [
  {
    titulo: "Harry Styles", ano: 2017, classeCapa: "capa-1",
    descricao: "O álbum de estreia mistura rock clássico e pop e traz uma sonoridade bem diferente da época da One Direction.",
    faixas: ["Meet Me in the Hallway", "Sign of the Times", "Carolina", "Two Ghosts", "Sweet Creature", "Kiwi"]
  },
  {
    titulo: "Fine Line", ano: 2019, classeCapa: "capa-2",
    descricao: "Mais colorido e experimental, o segundo disco rendeu hits mundiais e fortaleceu a identidade visual do artista.",
    faixas: ["Golden", "Watermelon Sugar", "Adore You", "Lights Up", "Cherry", "Falling", "Treat People With Kindness"]
  },
  {
    titulo: "Harry's House", ano: 2022, classeCapa: "capa-3",
    descricao: "Com clima de synth-pop, foi o maior sucesso de crítica e público e venceu o Grammy de Álbum do Ano.",
    faixas: ["Music for a Sushi Restaurant", "Late Night Talking", "Grapejuice", "As It Was", "Daylight", "Matilda", "Satellite"]
  }
];

// ===== Elementos da página =====
const gradeAlbuns = document.getElementById("gradeAlbuns");
const fundoModal = document.getElementById("fundoModal");
const menu = document.getElementById("menu");

// ===== Renderização dos álbuns =====
function mostrarAlbuns(decada) {
  gradeAlbuns.innerHTML = "";
  const lista = albuns.filter(function (album) {
    return decada === "todos" || String(album.ano).startsWith(decada.slice(0, 3));
  });
  lista.forEach(function (album) {
    const cartao = document.createElement("button");
    cartao.className = "cartao-album";
    cartao.innerHTML =
      '<div class="capa ' + album.classeCapa + '">' + album.titulo + '</div>' +
      '<div class="info-album"><h3>' + album.titulo + '</h3><small>' + album.ano + ' · ' + album.faixas.length + ' faixas em destaque</small></div>';
    cartao.addEventListener("click", function () { abrirModal(album); });
    gradeAlbuns.appendChild(cartao);
  });
}

// ===== Janela modal =====
function abrirModal(album) {
  document.getElementById("modalTitulo").textContent = album.titulo;
  document.getElementById("modalMeta").textContent = "Lançado em " + album.ano;
  document.getElementById("modalDescricao").textContent = album.descricao;
  const listaFaixas = document.getElementById("modalFaixas");
  listaFaixas.innerHTML = "";
  album.faixas.forEach(function (faixa) {
    const item = document.createElement("li");
    item.textContent = faixa;
    listaFaixas.appendChild(item);
  });
  fundoModal.classList.add("aberto");
}
function fecharModal() { fundoModal.classList.remove("aberto"); }
document.getElementById("botaoFechar").addEventListener("click", fecharModal);
fundoModal.addEventListener("click", function (e) { if (e.target === fundoModal) fecharModal(); });
document.addEventListener("keydown", function (e) { if (e.key === "Escape") fecharModal(); });

// ===== Filtros =====
document.getElementById("filtros").addEventListener("click", function (e) {
  const botao = e.target.closest(".filtro");
  if (!botao) return;
  document.querySelectorAll(".filtro").forEach(function (b) { b.classList.remove("ativo"); });
  botao.classList.add("ativo");
  mostrarAlbuns(botao.dataset.decada);
});

// ===== Menu mobile =====
document.getElementById("botaoMenu").addEventListener("click", function () { menu.classList.toggle("aberto"); });
menu.addEventListener("click", function () { menu.classList.remove("aberto"); });

// ===== Revelar elementos ao rolar =====
const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) { entrada.target.classList.add("visivel"); observador.unobserve(entrada.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".revelar").forEach(function (el) { observador.observe(el); });

// ===== Contador animado dos números =====
document.querySelectorAll("[data-alvo]").forEach(function (el) {
  const alvo = Number(el.dataset.alvo);
  const passos = 40;
  let atual = 0;
  const intervalo = setInterval(function () {
    atual++;
    el.textContent = Math.round((alvo * atual) / passos);
    if (atual >= passos) clearInterval(intervalo);
  }, 30);
});

// ===== Formulário =====
document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("campoEmail").value.trim();
  document.getElementById("mensagem-form").textContent = "Obrigado! " + email + " foi cadastrado (simulação).";
  this.reset();
});

// ===== Início =====
mostrarAlbuns("todos");