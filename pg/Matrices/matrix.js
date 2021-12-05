var p = document.getElementById("display");
p.style.color = "white";

function dash(){
    p.innerHTML += "________________________<br>";
}
var btn = document.getElementById("btn");

class Matrix {
    constructor(data){
        this.data = data;
    }

    getRow(n){
        return this.data[n];
    }

    getColumn(n){
        let r = [];
        for(let i = 0; i < this.data.length; i++){
            r[i] = this.data[i][n];
        }
        return r;
    }

    insertRow(n, val){
        for(let i = 0; i < this.data[n].length; i++){
            this.data[n][i] = val;
        }
    }

    insertColumn(n, val){
        for(let i = 0; i < this.data.length; i++){
            this.data[i][n] = val;
        }
    }

    replaceRow(n, row){
        this.data[n] = row;
    }

    replaceColumn(n, column){
        for(let i = 0; i < this.data.length; i++){
            this.data[i][n] = column[i];
        }
    }

    print(p){
        for(let i = 0; i < this.data.length; i++){
            for(let j = 0; j < this.data[i].length; j++){
                p.innerHTML += "&emsp;" + this.data[i][j];
                if(j == this.data[i].length - 1){
                    p.innerHTML += "<br>";
                }
            }
        }
    }

    static add(m1, m2){
        let m = new Matrix(m1.data);
        for(let i = 0; i < m2.data.length; i++){
            for(let j = 0; j < m2.data[i].length; j++){
                m.data[i][j] += m2.data[i][j];
            }
        }
        return m;
    }

    
    static sub(m1, m2){
        let m = new Matrix(m1.data);
        for(let i = 0; i < m2.data.length; i++){
            for(let j = 0; j < m2.data[i].length; j++){
                m.data[i][j] -= m2.data[i][j];
            }
        }
        return m;
    }

    static _multiplyRow(r1, r2){
        let sum = 0;
        for(let i = 0; i < r1.length; i++){
            sum += r1[i] * r2[i];
        }
        return sum;
    }

    static multiply(m1, m2){
        if(m1.data[0].length != m2.getColumn(0).length){
            console.error("Error matrix multiplication : Row count and column count dosen't match");
            return Matrix.empty(1, 1);
        }
       let res = Matrix.empty(m1.data.length, m2.data[0].length);
        for(let i = 0; i < m1.data.length; i++){
            for(let j = 0; j < m2.data[0].length; j++){
                res.data[i][j] = Matrix._multiplyRow(m1.data[i], m2.getColumn(j));
            }
        }
        return res;
    }

    static copy(mat){
        let res = Matrix.empty(mat.data.length, mat.data[0].length);
        for(let i = 0; i < res.data.length; i++){
            for(let j = 0; j < res.data[0].length; j++){
                res.data[i][j] = mat.data[i][j];
            }
        }
        return res;
    }

    static matfrom_d(mat){
        let res = Matrix.empty(mat.data.length-1, mat.data.length-1);
        let ii = 0, jj = 0;
        for(let i = 0; i < mat.data.length; i++){
            for(let j = 0; j < mat.data[0].length; j++){
                if(mat.data[i][j] != "_d"){
                    res.data[ii][jj] = mat.data[i][j];
                    jj += 1;
                    if(jj > res.data.length - 1){
                        ii += 1;
                        jj = 0;
                    }
                }
            }
        }
        return res;
    }

    det(){
        if(this.data.length != this.data[0].length){
            console.error("Error calculator determinent : Not a square matrix");
            return Matrix.empty(1, 1);
        }
        if(this.data.length == 2){
            return this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0];
        }
        let res = 0;
        for(let i = 0; i < this.data[0].length; i++){
            let a = this.data[0][i];
            let newMat = Matrix.copy(this);
            newMat.insertRow(0, "_d");
            newMat.insertColumn(i, "_d");
            let newNewMat = Matrix.matfrom_d(newMat);
            let newDet = newNewMat.det();
            let sign;
            if(i % 2 == 0){
                sign = 1;
            }else{
                sign = -1;
            }
            res += a * newDet * sign;
        }
        return res;
    }

    static solve(coffMatrix, variableMatrix, rhsMatrix){
        let del = coffMatrix.det();
        let xDels = [];
        let res = [];
        for(let i = 0; i < coffMatrix.data[0].length; i++){
            let mat = Matrix.copy(coffMatrix);
            mat.replaceColumn(i, rhsMatrix.data[0]);
            xDels.push(mat.det());
            res.push(xDels[i] / del);
        }
        return new Matrix([res]);
    }

    static empty(r, c){
        let m = new Matrix();
        let res = [];
        for(let i = 0; i < r; i++){
            let f = [];
            for(let j = 0; j < c; j++){
                f[j] = 0;
            }
            res.push(f);
        }
        m.data = res;
        return m;
    }
}

let VARIABLES = ["x", "y", "z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w"]
class EquationMaker{
    constructor(n){
        this.div = document.createElement("div");
        this.generate = document.createElement("button");
        this.generate.innerHTML = "Solve";
        for(let i = 0; i < n; i++){
            let div = document.createElement("div");
            for(let j = 0; j < n; j++){
                let input = document.createElement("input");
                input.style.width = "20px";
                input.style.height = "20px";
                input.id = i + "-" + j;
                div.appendChild(input);
                if(j < n - 1){
                    div.innerHTML += VARIABLES[j] + " + ";
                }else{
                    div.innerHTML += VARIABLES[j];
                }
                div.style.color = "white";
                div.style.padding = "10px";
                if(j == n - 1){
                    let solInput = document.createElement("input");
                    solInput.id = "sol-" + i;
                    solInput.style.width = "20px";
                    solInput.style.height = "20px";
                    div.innerHTML += " = ";
                    div.appendChild(solInput);
                }
            }
            this.div.style.border = "2px dashed red";
            this.div.appendChild(div);
            this.div.appendChild(this.generate);
        }
        document.body.appendChild(this.div);
        this.generate.onclick = () =>{
            btn.style.display = "block";
            let coff = Matrix.empty(this.div.children.length - 1, this.div.children.length - 1);
            let rhs = Matrix.empty(1, this.div.children.length - 1);
            let vars = new Matrix([VARIABLES.splice(0, this.div.children.length - 1)]);
            for(let i = 0; i < this.div.children.length; i++){
                for(let j = 0; j < this.div.children[i].children.length; j++){
                    let child = this.div.children[i].children[j];
                    if(j < this.div.children.length - 1){
                        coff.data[i][j] = Number(child.value);
                    }else{
                        rhs.data[0][i] = Number(child.value);
                    }
                }
            }
            let solution = Matrix.solve(coff, vars, rhs);
            this.div.style.display = "none";
            // coff.print(p);
            dash(p);
            vars.print(p);
            // rhs.print(p);
            // dash(p);
            solution.print(p);
            dash(p);
            VARIABLES = ["x", "y", "z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w"];
        }
    }
}

btn.onclick = () =>{
    btn.style.display = "none";
    let n = prompt("How many unknown variables");
    n = Number(n);
    if(n > VARIABLES.length - 1){
        n = VARIABLES.length - 1;
    }
    if(n == undefined || n == ""){
        n = 3;
    }
    new EquationMaker(n);
}
