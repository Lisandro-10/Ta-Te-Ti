class Tateti{

      constructor(player1, player2, actualTurn, icons, gameTable){
            //this.gameTime = gameTimem, en un futuro para llevar el tiempo de partida
            this.player1 = new Player()
            this.player2 = new Player()
            this.actualTurn = this.randomTurn()
            this.icons = {circle: '<i class="fa-regular fa-circle fa-2xl square-icon"><p class="icon-para">circle</p></i>', cross:'<i class="fa-solid fa-xmark fa-2xl square-icon"><p class="icon-para">cross</p></i>'}
            this.gameTable = document.getElementById("gameTable")
      }
      
      randomTurn(){
            let min = 0
            let max = 1
            return Math.floor(Math.random() * (max - min + 1)) + min
      }

      nameAssign(){
            var input1 = document.getElementById('name1')
            var input2 = document.getElementById('name2')

            console.log(input1)

            if (input1 !== null && input2 !== null) {

                  this.player1.name = input1.value
                  this.player2.name = input2.value

                  input1.readOnly = true
                  input2.readOnly = true
            }
      }

      figureChoose(){
            //traigo los grupos de botones
            var input1 = document.getElementsByName("figure1")
            var input2 = document.getElementsByName("figure2")
            var valueFigure1 = ""
            var valueFigure2 = ""

            //chequeo cual eligio cada uno
            for (let i = 0; i < input1.length; i++) {
                  if (input1[i].checked) {
                        valueFigure1 = input1[i].value
                        console.log(valueFigure1)
                  }
            }
            for (let i = 0; i < input2.length; i++) {
                  if (input2[i].checked) {
                        valueFigure2 = input2[i].value
                        console.log(valueFigure2)
                  }
            }

            //no pueden elegir la misma figura
            if (valueFigure1 == valueFigure2) {
                  console.log("No puede elegir la misma figura los dos jugadores.")
            }else{
                  if (valueFigure1 == 'circle') {
                        this.player1.figure = this.icons.circle
                        this.player1.figureName = valueFigure1
                        this.player2.figure = this.icons.cross
                        this.player2.figureName = valueFigure2
                  }else{
                        this.player1.figure = this.icons.cross
                        this.player2.figure = this.icons.circle
                  }
                  for (let i = 0; i < input1.length; i++) {
                        input1[i].disabled = true
                        input2[i].disabled = true
                  }
            }
      }

      turnAssign(){
            //Esto anda jamon
            var turno1 = this.randomTurn()
            var turno2 = 0

            if(turno1 == 0){
                  turno2 = 1
            }
            console.log("Turno jug 1: " + turno1)
            console.log("Turno jug 2: " + turno2)
            this.player1.turn = turno1
            this.player2.turn = turno2
      }

      manageTurn(){

            const insertFigure = e =>{
                  
                  var iterator = [0, 1];
                  var players = [this.player1, this.player2];
                  var squareElement = document.getElementById(e.target.id);
                  if (squareElement.hasChildNodes()) {
                        console.log("Cuadro ocupado, elija otro")
                  }
                  else{
                        for (let i of iterator){
                              if (this.actualTurn == players[i].turn){

                                    squareElement.innerHTML = players[i].figure;
                              }else{

                                    squareElement.innerHTML = players[1-i].figure;
                              }
                        }
                        this.actualTurn = 1 - this.actualTurn;
                  }

                  var gameResult = this.gameFinished()

                  if (gameResult[0]) {
                        this.winner(gameResult[1])
                        this.disabledTable()
                  }
            }
            this.gameTable.addEventListener("click", insertFigure);
      }

      gameFinished(){

            //Look for better solution
            var gameTable = document.getElementById("gameTable")
            var tableChilds = gameTable.childNodes
            var List = new Array() //defino una lista que tendra todos los ids de los cuadrados de la tabla
            for (let i = 0; i < tableChilds.length; i++) {
                  const child = tableChilds[i];
                  List.push(child)
            }
            var idList = List.filter(function (element) {
                  return element.nodeName === 'DIV'
            })

            var iter = [0, 3, 6]
            for (let i of iter) {
                  if (idList[i].hasChildNodes() && idList[i+1].hasChildNodes() && idList[i+2].hasChildNodes()) {
                        if (idList[i].textContent === idList[i+1].textContent && idList[i+1].textContent === idList[i+2].textContent)  {
                              return [true, idList[i].textContent]
                        }
                  }
            }

            for (let i = 0; i < 2; i++) {
                  if (idList[i].hasChildNodes() && idList[i+3].hasChildNodes() && idList[i+6].hasChildNodes()) {
                        if (idList[i].textContent === idList[i+3].textContent && idList[i+3].textContent === idList[i+6].textContent)  {
                              return [true, idList[i].textContent]
                        }
                  }
            }

            if (idList[2].hasChildNodes() && idList[4].hasChildNodes() && idList[6].hasChildNodes()) {
                        if (idList[2].textContent === idList[4].textContent && idList[4].textContent === idList[6].textContent)  {
                              return [true, idList[4].textContent]
                        }
                  }

            if (idList[0].hasChildNodes() && idList[4].hasChildNodes() && idList[8].hasChildNodes()) {
                        if (idList[0].textContent === idList[4].textContent && idList[4].textContent === idList[8].textContent)  {
                              return [true, idList[4].textContent]
                        }
                  }

            return false
      }

      winner(winFigure) {
            for (let i = 0; i < 1; i++) {
                  if (this.player1.name === winFigure) {
                         alert("EL GANADOR ES: " + this.player1.name)
                  }else{
                        alert("EL GANADOR ES: " + this.player2.name)
                  }
            }
      }

      disabledTable(){
            var gameTable = document.getElementById('gameTable')
            gameTable.style.pointerEvents = 'none'
      }



}

class Player{

      constructor(name, figure, figureName, turn){
            this.name = name
            this.figure = figure
            this.figureName = figureName
            this.turn = turn
      }
}

var tateti = new Tateti()