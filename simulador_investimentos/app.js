function arredondar(valor) {
       parseFloat(valor.toFixed(2))
}

function calcular() {
   //tipo investimento
   var tipo = document.getElementsByName("investimento").value
   console.log(tipo)
   var type = tipo == 1 ? 'CDB': 'LCI'

   var valor_mes = document.getElementById("valor").value
   var tempo = document.getElementById("tempo").value
   var rentabilidade = document.getElementById("rentabilidade").value

   var mensal = ((valor_mes * rentabilidade) / 100) / 12
   console.log(mensal+' R$ por mês')

   var lucro = mensal * tempo
   console.log(parseFloat(lucro.toFixed(2))+' R$ de lucro.')

   var patrimonio = lucro + valor_mes * tempo
   console.log(patrimonio+' R$ total a receber.')

   var view = document.getElementById("alert").innerHTML = patrimonio+' R$ total a receber.'
}
