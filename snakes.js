let board = document.querySelector('.gameboard');
let snakearr = [
{
    x:10,
    y:14
}];
let food = {
    x:5,
    y:10
};

let lasttime = 0
let speed = 20

let dir = {x:0,y:0};


const mainengine = (c) => {
    requestAnimationFrame(mainengine)
    if((c-lasttime)/1000<1/speed) return;
    lasttime = c;
    init()
}


const init= () => {
    board.innerHTML = ''
    snakearr.forEach(snake => {
        let element = document.createElement('div');
        element.style.gridColumnStart = snake.x;
        element.style.gridRowStart = snake.y;
        element.classList.add('snake')
        board.appendChild(element);
    })
    if(collide()){
       snakearr = [
            {
                x:10,
                y:14
            }];
        dir = {x:0,y:0};
    }
    getfood();
    if(snakearr[0].x === food.x && snakearr[0].y === food.y){
        snakearr.unshift({x:snakearr[0].x+dir.x, y:snakearr[0].y+dir.y})

        food = {
        x : Math.floor(Math.random()*20),
        y : Math.floor(Math.random()*20)}

    }
   

    for(let i = 1; i<snakearr.length;i++){
        if(snakearr[i].x === food.x && snakearr[i].y === food.y ){
            food = {
                x : Math.floor(Math.random()*20),
                y : Math.floor(Math.random()*20)}
        }
    }

    for(let i=snakearr.length-2;i>=0;i--){
        let head = {...snakearr[i]}
        snakearr[i+1] = head;
    }

    snakearr[0].x += dir.x;
    snakearr[0].y += dir.y;
    
}

const collide = () => {
    if(snakearr[0].x<0 || snakearr[0].x > 20 || snakearr[0].y < 0 || snakearr[0].y>20)
        {
            return true;
        }
    for(let i =1;i<snakearr.length;i++){
        if(snakearr[0].x===snakearr[i].x && snakearr[0].y === snakearr[i].y){
            return true;
        }
    }    

}

const getfood = () => {
    foodelement = document.createElement('div');
    foodelement.style.gridColumnStart = food.x;
    foodelement.style.gridRowStart = food.y;
    foodelement.classList.add('food')

    board.appendChild(foodelement)
}

const update = (e) => {
    if(e.key === 'ArrowUp'){
        dir.x = 0;
        dir.y = -1;
    }
    else if(e.key === 'ArrowDown'){
        dir.x = 0;
        dir.y = 1;
    }
    else  if(e.key === 'ArrowLeft'){
        dir.x = -1;
        dir.y = 0;
    }
    else  if(e.key === 'ArrowRight'){
        dir.x = 1;
        dir.y = 0;
    }
}

window.addEventListener('keydown', update);


mainengine()