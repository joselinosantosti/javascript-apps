padrao = document.getElementById("padrao")
padrao.setAttribute("src", "img/padrao.png")
resposta = document.getElementById("resposta")

document.querySelectorAll(".bt").forEach(btn => {
   btn.addEventListener("click", (e) => {

   //Gerar numero aleatorio
   var num = Math.round(Math.random()*2)
   
   //Imagem vai para a padrao do app
   padrao.setAttribute("src", 'img/'+comparaImagem(num)+".png")

   //Captura o id da imagem clicada
   const id = btn.getAttribute("data-id")
   
   //Verifica quem ganhou
   var escolha_user = comparaImagem(id)

   //User ganha (user->pedra e app->tesoura, user->papel e app->pedra, user->tesoura e app->papel)
   if (id == num) {
      resposta.innerHTML = "Empatou! Os dois escolheram "+comparaImagem(num)
   } else if (id == 0 && num == 2 || (id == 1 && num == 0) || (id == 2 && num == 1)) {
      resposta.innerHTML = "Vc ganhou! Vc escolheu "+comparaImagem(id)+" e o app escolheu "+comparaImagem(num)
   } else {
      resposta.innerHTML = "Perdeu :(. Vc escolheu "+comparaImagem(id)+" e o app escolheu "+comparaImagem(num)
   }
   })
})

function comparaImagem(num) {
   var img = ""
   
   if (num == 0) {
      img = "pedra"
   } else if (num == 1) {
      img = "papel"
   } else {
      img = "tesoura"
   }
   return img
}
