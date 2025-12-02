// --- CONFIGURAÇÃO ---

// Variáveis do sistema
let classifier;
let video;
let label = "Carregando...";
let confianca = 0.0;

// PRELOAD: Carrega o modelo ANTES de iniciar qualquer coisa
function preload() {
  // Carrega o modelo exportado do Teachable Machine
  classifier = ml5.imageClassifier('model.json');
}

function setup() {
  createCanvas(640, 520); // Tamanho da tela
  
  // Cria a captura de vídeo da webcam
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // Esconde o vídeo HTML bruto para mostrarmos só no canvas

  // Inicia a classificação contínua
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video, gotResult);
}

// Função que roda quando a IA detecta algo
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // Armazena os resultados nas variáveis
  label = results[0].label;
  confianca = results[0].confidence;
  
  // Continua classificando (loop infinito)
  classifyVideo();
}

function draw() {
  background(0);
  
  // 1. Desenha o vídeo na tela
  image(video, 0, 0);

  // 2. SIMULAÇÃO DE ENGENHARIA (HUD - Heads Up Display)
  // Cria uma barra inferior preta para os dados
  fill(0); 
  rect(0, 480, 640, 40); 

  // Texto da Classe Detectada
  fill(255);
  textSize(20);
  textAlign(LEFT);
  text("Detectado: " + label, 10, 505);

  // Texto da Confiança (Probabilidade)
  textAlign(RIGHT);
  text("Precisão: " + (confianca * 100).toFixed(0) + "%", 620, 505);

  // 3. LÓGICA DE CONTROLE (O que a "engenharia" faria)
  // Desenha um indicador visual (LED Virtual) no canto da tela
  
  // MUDE "Class 1" PARA O NOME DA SUA CLASSE NO TEACHABLE MACHINE
  // MUDE "Class 2" PARA O NOME DA SUA OUTRA CLASSE
  
  noStroke();
  if (label == "Class 1") { 
    // Se for Classe 1 -> LED VERDE (Acesso Permitido / Sistema Ativo)
    fill(0, 255, 0); 
    circle(50, 50, 50);
    fill(0);
    textSize(10);
    textAlign(CENTER);
    text("ATIVO", 50, 53);
    
  } else if (label == "Class 2") {
    // Se for Classe 2 -> LED VERMELHO (Acesso Negado / Parado)
    fill(255, 0, 0);
    circle(50, 50, 50);
    fill(255);
    textSize(10);
    textAlign(CENTER);
    text("PARE", 50, 53);
    
  } else {
    // Estado neutro ou nada detectado
    fill(255, 255, 0); // Amarelo
    circle(50, 50, 50);
  }
}