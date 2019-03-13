window.gameState = 'INITIAL';
document.onkeydown = function (e) {
    e = e || window.event;
    if(window.gameState !== 'ONGOING') return;
    var current = document.querySelector(`[name=game_${window.currentPos.row}_${window.currentPos.col}]`);
    var mario = document.querySelector('[name=mario]') ;
    if(e.keyCode === 39) { // right
        window.currentPos.col = Math.min(m-1, window.currentPos.col+1);
    }else if(e.keyCode === 40){ //down
        window.currentPos.row = Math.min(n-1, window.currentPos.row+1);
    } else if(e.keyCode === 37 ){ //left
        window.currentPos.col = Math.max(0, window.currentPos.col-1);
    }else if(e.keyCode === 38){ // up
        window.currentPos.row = Math.max(0, window.currentPos.row-1);
    }else{
        return;
    }
    current.removeChild(mario);
    if(window.mushroomPos[window.currentPos.row][window.currentPos.col] === 1){
        window.mushroomPos[window.currentPos.row][window.currentPos.col] = 0;
        removeMush();
        window.mushLeft--;
    }
    createMarioAtPos(window.currentPos);
    if(window.mushLeft === 0){
        window.gameState !== 'END';
        alert('You won');
    }
};

function removeMush(){
    var current = document.querySelector(`[name=game_${window.currentPos.row}_${window.currentPos.col}]`);
    var mush = document.querySelector(`[name=mush_${window.currentPos.row}_${window.currentPos.col}]`) ;
    current.removeChild(mush);

}

function createMarioAtPos(currentPos){
    var td1 = document.querySelector(`[name=game_${currentPos.row}_${currentPos.col}]`);
    var img = document.createElement('img');
    img.setAttribute('src', 'mario.jpg')
    img.setAttribute("name", 'mario');
    td1.appendChild(img);
}

function createTable(n,m){
    var table = document.createElement('table');
    var randSelction = getRandomSelection(n,m,n);
    window.mushroomPos = randSelction;
    for (var i = 0; i < n; i++){
        var tr = document.createElement('tr');   
        for(var j =0; j<m;j++){
            var td1 = document.createElement('td');
            if(i===0 && j===0){
                var img = document.createElement('img');
                img.setAttribute('src', 'C:\\Users\\assreeku\\Desktop\\mario\\resources\\mario.jpg')
                img.setAttribute("name", 'mario');
                td1.appendChild(img);
            }
            if(randSelction[i][j] === 1){
                img = document.createElement('img');
                img.setAttribute('src', 'mush.png')
                img.setAttribute("name", `mush_${i}_${j}`);
                td1.appendChild(img);
            }
            td1.setAttribute("name", `game_${i}_${j}`);
            tr.appendChild(td1);
            table.appendChild(tr);
        }
    }
    
    return table;
}

function startGame(){
    var n = document.querySelector('[name=row]').value ;
    var m = document.querySelector('[name=col]').value ;
    n = parseInt(n);
    m= parseInt(m);
    if(isNaN(n) || isNaN(m)){
        alert('invalid entry');
        return;
    }
    window.n = n;
    window.m = m;
    var table = createTable(n,m);
    var gameArea = document.querySelector("#game");
    gameArea.innerHTML = '';
    gameArea.appendChild(table);
    window.gameState = 'ONGOING';
    window.mushLeft = n;
    window.currentPos = {
        row: 0,
        col: 0
    };
}
