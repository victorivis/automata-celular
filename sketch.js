//quantidade de elementos no array inicial e seus descendentes
let tamanho = 61;

let geracoes = 260;
let num_regra = 110;
let primeiro_array = 0;

console.log("Algumas combinações legais: 57, 41, 73, 129, 77, 22, 99, 110, 30");

let largura = 700;
let altura = 400;

input = document.getElementById("regra");
input.addEventListener("keyup", ()=>{
  num_regra = input.value;
  executar=1;
});

let cells=[];
for(let i=0; i<tamanho; i++){
  cells[i] = 0;
}
cells[Math.round(tamanho/2)] = 1;
/*
cells[4] = 1;
cells[34] = 1;
*/

function draw_cells(cells, w, h=0){
    for(let i=0; i<cells.length; i++){
    fill(255*cells[i]);
    //fill(8, 200, 255*cells[i]);
    square(i*w, h, w);
  }
}

let executar = 1;

function setup() {
  createCanvas(largura, altura);
}

function draw() {
  if(executar === 1){
    background(220);
    fill("black");
    stroke("black");

    let automata = regra(num_regra);
    
    let w = width/(tamanho);
    draw_cells(cells, w);
    
    let first = cells;
    for(let j=1; j<geracoes; j++){
      let nextCells = [];
      nextCells[0] = first[0];
      nextCells[first.length-1] = cells[first.length-1];
      
      for(let i=0; i<first.length; i++){
        let left = first[(i-1+tamanho)%tamanho];
        let itself = first[i]
        let right = first[(i+1+tamanho)%tamanho];
        nextCells[i] = automata(left, itself, right);
      }

      draw_cells(nextCells, w, j*w);
      first = nextCells;
    }

    executar += 1;
  }  
}

//retorna o binario invertido
function decimal_para_binario(num, saida=[]){
  if(num == 1 || num == 0){
    saida.push(num);
    while(saida.length < 8){
      saida.push(0);
    }
    return saida;
  }
  else{
    saida.push(num%2);
    decimal_para_binario(Math.floor(num/2), saida);
  }
}

function array_inicial(num, saida=[], tamanho=41){
  if(num == 1 || num == 0){
    saida.push(num);
    while(saida.length < tamanho){
      saida.push(0);
    }

    for(let i=0; i<tamanho/2; i++){
      let temp = saida[i];
      saida[i] = saida[tamanho-1-i];
      saida[tamanho-1-i] = temp;
    }

    return saida;
  }
  else{
    saida.push(num%2);
    decimal_para_binario(Math.floor(num/2), saida);
  }
}

teste=[];
decimal_para_binario(43, teste);

function regra(num){
  binario=[];
  decimal_para_binario(num, binario);
  
  function automata_gerado(a, b, c){
    if(a == 1 && b == 1 && c == 1) return binario[7];
    if(a == 1 && b == 1 && c == 0) return binario[6];
    if(a == 1 && b == 0 && c == 1) return binario[5];
    if(a == 1 && b == 0 && c == 0) return binario[4];
    if(a == 0 && b == 1 && c == 1) return binario[3];
    if(a == 0 && b == 1 && c == 0) return binario[2];
    if(a == 0 && b == 0 && c == 1) return binario[1];
    if(a == 0 && b == 0 && c == 0) return binario[0];
  }
  return automata_gerado;
}

/*
function automata(a, b, c){
  if(a+b+c == 0 || a+b+c == 2){
    return 0;
  }
  else{
    return 1;
  }
}
*/
