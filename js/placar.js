$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sinconizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Felipe Capelli"
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.prepend(linha);

    $(".placar").slideDown(400);

    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;//pega o offset (que é a posição desse elemento) em relação ao top (topo da página)
    $("html, body").animate(//função animate é a função que faz animações no jquery (da pra mexer nas propriedades css)
    {
        scrollTop: posicaoPlacar+"px"
    }, 1000);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    //$(this).parent().parent().remove();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000); //tem o fadeIn e o fadeToggle tbm se quiser usar, é o mesmo princípio dos outros elementos que usam essa nomenclatura
    setTimeout(function(){//outra opção seria passar essa funcao anonima direto dentro do fadeOut que só depois de terminar o fadeOut que ele iria chamar a função com o remove dentro
        linha.remove();
    }, 1000);
}

function mostraPlacar(){
    //$(".placar").css("display", "block");
    //$(".placar").toggle();//pode usar o .show() ou .hide(), mas aqui ta .toggle (se tiver mostrando esconde ou vice-versa)
    $(".placar").stop().slideToggle(2000);//pode usar o .slideDown() ou .slideUp(), mas aqui ta .slideToggle (se tiver mostrando esconde ou vice-versa)
}

function sinconizaPlacar(){
    var placar = [];
    var linhas = $("tbody>tr");
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });

    var dados = {
        placar: placar
    }

    $.post("http://localhost:3000/placar",dados, function(){
        console.log("Salvou o placar no servidor");
    })
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);//no caso o this ta se referindo a quem ta chamando a função each, no caso $(data)
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        });
    });
}
/*
//Exemplo de utilização do função each em um array
var letras = ['a', 'b', 'c'];
$.each(letras, function(){
    console.log(this); o this se refere ao array
});

//se fosse no javaScript seria:
letras.forEach(function(letra){
    console.log(letra);
})
*/