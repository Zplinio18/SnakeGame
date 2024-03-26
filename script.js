window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    //variaveis
    snake = [];
    positionX = 10;
    positionY = 10;
    foodX = 15;
    foodY = 15;
    velX = 0;
    velY = 0;
    grid =20; //tamanho da grade
    tam = 3; //tamanho da cobra
    ant = 0; //direção anterior

    //chamada da função jogo a cada 100ms
    setInterval(jogo,100)

    // Controles
    document.addEventListener("keydown", function(e){
        if(e.keyCode == 65 && ant != 68){ //esquerda
            velX = -1;
            velY = 0;
            ant = 65;
        }
        if(e.keyCode == 87 && ant != 83){ //cima
            velX = 0;
            velY = -1;
            ant = 87;
        }
        if(e.keyCode == 68 && ant != 65){ //direita
            velX = 1;
            velY = 0;
            ant = 68;
        }
        if(e.keyCode == 83 && ant != 87){ //baixo
            velX = 0;
            velY = 1;
            ant = 83;
        }
    });
}

function jogo(){

    //configuração da tela
    ctx.fillStyle = "#8CBC09";
    // distancia da borda h, distancia da borda v, largura, altura
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //deslocamento da cobra
    positionX += velX;
    positionY += velY;

    //espelahemento da cobra
    if(positionX < 0)
        positionX = grid;
    if(positionX > grid)
        positionX = 0;
    if(positionY < 0)
        positionY = grid;
    if(positionY > grid)
        positionY = 0;

    //configuração da cobra
    ctx.fillStyle = "#415C01";
    for(let i=0; i<snake.length; i++){
        ctx.fillRect(snake[i].x*grid,snake[i].y*grid,grid-1,grid-1);
        if(snake[i].x == positionX && snake[i].y == positionY && snake.length > 3){
            location.reload(); //recarrega a pagina
        }
    }

    //movimentação da cobra
    snake.push({x:positionX, y:positionY});


    //Apagando rabo da cobra
    while(snake.length > tam){
        snake.shift(); //remove o primeiro elemento do array
    }

    //configuração da comida
    ctx.fillStyle = "#6D9B02";
    ctx.fillRect(foodX*grid,foodY*grid,grid-1,grid-1);

    //Comendo a comida
    if(positionX == foodX && positionY == foodY){
        tam++;
        foodX = Math.floor(Math.random()*grid);
        foodY = Math.floor(Math.random()*grid);
    }

}