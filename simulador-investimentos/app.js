function arredondar(valor) {
       parseFloat(valor.toFixed(2))
}

function impostoRenda(tempo) {
  let ir = 0
   if(tempo <= 6) {
      ir = 22.5
   } else if(tempo <= 12){
      ir = 20
   } else if(tempo <= 24) {
      ir = 17.5
   } else {
      ir = 15
   }
   return ir
}

function calcular() {
   //Tipo investimento
   var investimento = document.querySelector('input[name="investimento"]:checked').value
   var valor = parseFloat(document.getElementById("valor").value)
   var tempo = document.getElementById("tempo").value
   var rentabilidade = document.getElementById("rentabilidade").value
   var resultado = document.getElementById("resultado")

   //Validate
   if (investimento == '' || valor == '' || rentabilidade == '') {
      alert('Por favor, preencha todos os campos')
   } else {
      let lucroMensal = parseFloat(((valor * rentabilidade) / 100) / 12)
      let lucroTotal = parseFloat(lucroMensal * tempo)

      let montante = valor + lucroTotal

      //Juros compostos

      //Imposto de renda para CDB (1)
       if(investimento == 1) {
         let descontoIr = lucroTotal * (impostoRenda(tempo)/100)
         console.log(descontoIr)
         lucroTotal = lucroTotal - descontoIr
         montante = montante - descontoIr
       }

      resultado.style.display = "block"
      resultado.innerHTML = "Valor investido: R$: "+valor+"<br>Total a receber: R$ "+montante+" <br> Lucro: R$ "+parseFloat(lucroTotal.toFixed(2)) 
   }

}
