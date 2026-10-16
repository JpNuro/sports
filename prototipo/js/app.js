
"use strict";

const CHAVE_FAVORITOS = "sportsCentralFavoritos";

function lerFavoritos() {
    try {
        const dados = JSON.parse(
            localStorage.getItem(CHAVE_FAVORITOS) || "[]"
        );

        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

function salvarFavoritos(favoritos) {
    try {
        localStorage.setItem(
            CHAVE_FAVORITOS,
            JSON.stringify(favoritos)
        );
        return true;
    } catch (erro) {
        console.error("Não foi possível salvar os favoritos:", erro);
        return false;
    }
}

function obterDadosNoticia(artigo) {
    const titulo = artigo.querySelector("h2, h3");
    const descricao = artigo.querySelector("p");
    const imagem = artigo.querySelector("img");

    return {
        id: artigo.dataset.id || (
            titulo?.textContent.trim().toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")
        ),
        titulo: titulo?.textContent.trim() || "Notícia sem título",
        descricao: descricao?.textContent.trim() || "",
        imagem: imagem?.getAttribute("src") || "",
        alt: imagem?.getAttribute("alt") || ""
    };
}

function atualizarBotoesFavoritos() {
    const favoritos = lerFavoritos();

    document.querySelectorAll("[data-favoritar]").forEach((botao) => {
        const artigo = botao.closest("article");

        if (!artigo) return;

        const noticia = obterDadosNoticia(artigo);
        const favoritado = favoritos.some(
            (item) => item.id === noticia.id
        );

        botao.setAttribute("aria-pressed", String(favoritado));
        botao.textContent = favoritado
            ? "★ Remover dos favoritos"
            : "☆ Favoritar notícia";
    });
}

function alternarFavorito(botao) {
    const artigo = botao.closest("article");

    if (!artigo) return;

    const noticia = obterDadosNoticia(artigo);
    let favoritos = lerFavoritos();

    const jaFavoritado = favoritos.some(
        (item) => item.id === noticia.id
    );

    favoritos = jaFavoritado
        ? favoritos.filter((item) => item.id !== noticia.id)
        : [...favoritos, noticia];

    if (!salvarFavoritos(favoritos)) {
        alert("Não foi possível salvar. Verifique o armazenamento do navegador.");
        return;
    }

    atualizarBotoesFavoritos();
}


/* T08 — Filtro de notícias com jQuery 4 */
function configurarFiltroNoticias() {
    // Se o CDN falhar, o restante do app continua funcionando.
    if (typeof window.jQuery === "undefined") {
        console.warn(
            "jQuery não carregado. O filtro de notícias está indisponível."
        );
        return;
    }

    (function ($) {
        "use strict";

        const $campo = $("#buscar-noticia");
        const $noticias = $("#noticias");
        const $mensagem = $("#resultado-filtro");

        if (!$campo.length || !$noticias.length) {
            return;
        }

        // Namespace evita duplicar este evento se a configuração for repetida.
        $campo
            .off("input.sportsCentralFiltro")
            .on("input.sportsCentralFiltro", function () {
                const consulta = String($(this).val() || "")
                    .trim()
                    .toLocaleLowerCase("pt-BR");

                let quantidade = 0;

                $noticias.children("article").each(function () {
                    const $artigo = $(this);
                    const titulo = $artigo
                        .find("h2, h3")
                        .first()
                        .text();

                    const descricao = $artigo.find("p").first().text();

                    const texto = `${titulo} ${descricao}`
                        .toLocaleLowerCase("pt-BR");

                    const corresponde = texto.includes(consulta);

                    $artigo.prop("hidden", !corresponde);

                    if (corresponde) {
                        quantidade++;
                    }
                });

                if ($mensagem.length) {
                    let textoMensagem;

                    if (!consulta) {
                        textoMensagem = "Exibindo todas as notícias.";
                    } else if (quantidade === 1) {
                        textoMensagem = "1 notícia encontrada.";
                    } else {
                        textoMensagem =
                            `${quantidade} notícias encontradas.`;
                    }

                    $mensagem.text(textoMensagem);
                }
            });
    })(window.jQuery);
}

///////////////////////////////////



function renderizarFavoritos() {
    const lista = document.querySelector("#lista-favoritos");
    const mensagem = document.querySelector("#mensagem-favoritos");

    if (!lista) return;

    const favoritos = lerFavoritos();
    lista.replaceChildren();

    if (favoritos.length === 0) {
        mensagem.textContent =
            "Você ainda não favoritou nenhuma notícia. Volte à página inicial e escolha suas favoritas.";
        return;
    }

    mensagem.textContent =
        `${favoritos.length} notícia(s) salva(s) nos favoritos.`;

    favoritos.forEach((noticia) => {
        const artigo = document.createElement("article");
        artigo.className = "card mb-3 p-3";

        if (noticia.imagem) {
            const imagem = document.createElement("img");
            imagem.src = noticia.imagem;
            imagem.alt = noticia.alt || "";
            imagem.className = "imagem-noticia";
            imagem.loading = "lazy";
            imagem.width = 800;
            imagem.height = 450;
            artigo.append(imagem);
        }

        const titulo = document.createElement("h2");
        titulo.textContent = noticia.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = noticia.descricao;

        const botao = document.createElement("button");
        botao.type = "button";
        botao.dataset.removerFavorito = noticia.id;
        botao.textContent = "Remover dos favoritos";

        artigo.append(titulo, descricao, botao);
        lista.append(artigo);
    });
}

document.addEventListener("click", (evento) => {
    const botaoFavoritar = evento.target.closest("[data-favoritar]");

    if (botaoFavoritar) {
        alternarFavorito(botaoFavoritar);
        return;
    }

    const botaoRemover = evento.target.closest("[data-remover-favorito]");

    if (botaoRemover) {
        const id = botaoRemover.dataset.removerFavorito;
        const favoritos = lerFavoritos().filter(
            (item) => item.id !== id
        );

        if (salvarFavoritos(favoritos)) {
            renderizarFavoritos();
            atualizarBotoesFavoritos();
        }
    }
});



document.addEventListener("DOMContentLoaded", () => {
    atualizarBotoesFavoritos();
    configurarFiltroNoticias();
    renderizarFavoritos();
});