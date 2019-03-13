function getRandomSelection(n,m,count){
    var x = new Array(n);

    for (var i = 0; i < x.length; i++) {
        x[i] = new Array(m);
    }
    for( i =0; i<n;i++){
        for(var j=0;j<m;j++){
            x[i][j] = 0;
        }
    }
    while(count){
        var r_i = Math.floor(Math.random()*n);
        var r_j = Math.floor(Math.random()*m);
        if(r_i === 0 && r_j === 0 ) continue;
        if(x[r_i][r_j] === 0){
            x[r_i][r_j] = 1;
            count--;
        }else{
            while(r_i < n && x[r_i][r_j]===1){
                r_i++;
            }
            if(x[r_i][r_j] === 0){
                x[r_i][r_j] = 1;
                count--;
            }
        }
    }

    return x;

}