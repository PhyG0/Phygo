class Matrix {
    constructor(data){
        this.data = data;
    }

    getRow(n){
        return this.data[n];
    }

    getColumn(n){
        let column = [];
       //for each row
       for(let i = 0; i < this.data.length; i++){
            column.push(this.data[i][n]);
       } 
       return column;
    }

    insertRow(n, row){
        this.data[n] = row;
    }

    insertColumn(n, column){
        for(let i = 0; i < this.data[0].length; i++){
            this.data[i][n] = column[i];
        }
    }

    fillRow(n, value){
        for(let j = 0; j < this.data[0].length; j++){
            this.data[n][j] = value;
        }
    }

    fillColumn(n, value){
        for(let i = 0; i < this.data.length; i++){
            this.data[i][n] = value;
        }
    }

    static empty(r, c){
        let res = [];
        //for each row
        for(let i = 0; i < r; i++){
            //for each element
            let row = [];
            for(let j = 0; j < c; j++){
                row.push(0);
            }
            res.push(row);
        }
        return new Matrix(res);
    }

    add(mat){
        let result = Matrix.empty(mat.data.length, mat.data[0].length);
        for(let i = 0; i < this.data.length; i++){
            for(let j = 0; j  < this.data[0].length; j++){
                result.data[i][j] = this.data[i][j] + mat.data[i][j];
            }
        }
        return result;
    }

    sub(mat){
        let result = Matrix.empty(mat.data.length, mat.data[0].length);
        for(let i = 0; i < this.data.length; i++){
            for(let j = 0; j  < this.data[0].length; j++){
                result.data[i][j] = this.data[i][j] - mat.data[i][j];
            }
        }
        return result;
    }

    static multiplyRowColumn(r, c){
        let sum = 0;
        for(let i = 0; i < r.length; i++){
            sum += r[i] * c[i];
        }
        return sum;
    }

    static mult(m1, m2){
        let result = Matrix.empty(m1.data.length, m2.data[0].length);
        //for each row in m1
        for(let i = 0; i < m1.data.length; i++){
            //for each column in m2
            for(let j = 0; j < m2.data[0].length; j++){
                result.data[i][j] = Matrix.multiplyRowColumn(m1.data[i], m2.getColumn(j));
            }
        }
        return result;
    }

    static copy(mat){
        let res = Matrix.empty(mat.data.length, mat.data[0].length);
        for(let i = 0; i < mat.data.length; i++){
            for(let j = 0; j < mat.data[0].length; j++){
                res.data[i][j] = mat.data[i][j];
            }
        }
        return res;
    }

    static matrixFrom_del(mat){
        let res = Matrix.empty(mat.data.length - 1, mat.data[0].length-1);
        let ii = 0, jj = 0;
        for(let i = 0; i < mat.data.length; i++){
            for(let j = 0; j < mat.data[0].length; j++){
                if(mat.data[i][j] != "_del"){
                    res.data[ii][jj] = mat.data[i][j];
                    jj++;
                    if(jj == mat.data[0].length - 1){
                        ii++;
                        jj = 0;
                    }
                }
            }
        }
        return res;
    }

    static det(m1){
        //for each element in 1st row
        if(m1.data.length == 2){
            return m1.data[0][0] * m1.data[1][1] - m1.data[0][1] * m1.data[1][0];
        }
        if(m1.data.length == 1){
            return m1.data[0][0];
        }
        let sum = 0;
        for(let i = 0; i < m1.data[0].length; i++){
            let element = m1.data[0][i];
            let removedRCmat = Matrix.copy(m1);
            removedRCmat.fillRow(0, "_del");
            removedRCmat.fillColumn(i, "_del");
            let newMat = Matrix.matrixFrom_del(removedRCmat);
            let dett = Matrix.det(newMat);
            let sign;
            if(i % 2 == 0){
                sign = 1;
            }else{
                sign = -1;
            }
            sum += element * dett* sign;
        }
        return sum;
    }

    static solve(coff, rhs, vars){
        let del = Matrix.det(coff);
        if(del == 0){
            console.error("can't be solved with this method");
            return;
        }
        let delX = [];
        let res = [];
        for(let i = 0; i < coff.data[0].length; i++){
            let copy = Matrix.copy(coff);
            copy.insertColumn(i, rhs.data);
            delX.push(Matrix.det(copy));
            res.push(delX[i] / del);
        }

        return new Matrix([res]);
    }

    print(){
        //for each row
        for(let i = 0; i < this.data.length; i++){
            //for each element in row
            for(let j = 0; j < this.data[0].length; j++){
                p.innerHTML += "&emsp;" + this.data[i][j];
                if(j == this.data[0].length - 1){
                    p.innerHTML += "<br>";
                }             
            }
        }
    }

}

//x = 2, y = 3
//1x + 1y = 5
//2x + 1y = 7

//x = 1, y = 1, z = 2
//x + y + z = 4
//x - 2y + 3z = 5
//2x + 3y + z = 7

let coff = new Matrix([
    [1, 1, 1],  
    [1, -2, 3],
    [2, 3, 1]
]);


let vars = new Matrix([
    ["x"],
    ["y"],
    ["z"]
]);

let rhs = new Matrix([
    [4],
    [5],
    [7]
]);

Matrix.solve(coff, rhs, vars).print();





