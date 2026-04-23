# 🖐️ Air Juggler: Controle por Gestos com TensorFlow.js

Este projeto foi desenvolvido como um estudo prático para o aprimoramento de habilidades em **JavaScript**, focando em manipulação de fluxos assíncronos, APIs de mídia e integração de modelos de inteligência artificial diretamente no front-end.

O objetivo principal é entender como transformar dados brutos de sensores (neste caso, a webcam) em uma experiência interativa sem o uso de periféricos tradicionais.

> **Nota:** Este projeto é um dos tutoriais práticos disponibilizados pela plataforma [Codédex](https://www.codedex.io).

---

## 🎮 Como o Jogo Funciona

O **Air Juggler** (Malabarista de Ar) é um jogo de habilidade onde o objetivo é manter bolas virtuais flutuando o maior tempo possível.

1.  **Início:** O jogador clica em "Start Game" e concede permissão para a webcam.
2.  **Detecção:** O sistema mapeia as mãos do jogador em tempo real.
3.  **Mecânica:** As mãos do jogador funcionam como "pás" invisíveis. Ao mover a mão para a posição onde uma bola está caindo, ocorre uma detecção de colisão baseada nas coordenadas da palma.
4.  **Desafio:** O jogador deve usar movimentos rápidos para rebater as bolas para cima. O jogo termina se as bolas caírem abaixo do limite da tela.
5.  **Feedback:** O tempo de sobrevivência é rastreado para definir a pontuação final.

---

## 🧠 Fundamentação Teórica

### 1. O Paradigma do Aprendizado de Máquina
Diferente da programação convencional baseada em regras rígidas (`if/else`), este projeto utiliza **Machine Learning**. Em vez de "codar" manualmente o que define uma mão, utilizamos um modelo que aprendeu a reconhecer padrões de dedos e articulações após ser exposto a milhares de imagens. Isso permite que o JavaScript identifique sua mão mesmo com fundos complexos ou variações de iluminação.

> ****

### 2. Visão Computacional com MediaPipe
O motor de detecção é o **MediaPipe Hands**. Ele identifica **21 pontos-chave (landmarks)** em cada mão. 
- Para o funcionamento do jogo, o JavaScript extrai esses pontos e calcula a média entre o pulso e a base dos dedos para encontrar o **centro da palma**.
- Esse ponto central é o que interage com os objetos do jogo.

> ****

### 3. Processamento em Tempo Real (On-Device)
Para que o jogo seja responsivo, utilizamos o **TensorFlow.js**, que permite a execução do modelo diretamente no navegador.
- **WebGL:** O JavaScript utiliza a aceleração de hardware (GPU) para processar os quadros do vídeo instantaneamente.
- **Ciclo de Detecção:** O modelo analisa o feed da webcam a cerca de 30 quadros por segundo (FPS), enquanto a lógica do jogo roda a 60 FPS para garantir suavidade.

### 4. Sincronização e Espelhamento
Como a webcam captura a imagem de forma invertida (como um espelho), aplicamos uma lógica matemática para inverter o eixo horizontal (X). Sem esse ajuste, ao mover sua mão para a direita, a "pá" do jogo iria para a esquerda, tornando a jogabilidade impossível.

---

## 🛠️ Skills Desenvolvidas
* **Manipulação de DOM:** Controle de estados de carregamento e overlays de interface.
* **Asynchronous JS:** Uso intenso de `async/await` para gerenciar o carregamento de modelos pesados e acesso a hardware.
* **Tratamento de Fluxos de Dados:** Transformação de coordenadas matemáticas complexas em estados de jogo utilizáveis.
* **API de Mídia:** Gerenciamento de permissões e processamento de vídeo via `getUserMedia`.

---
*Documentação teórica fundamentada no tutorial original de Dharmarajsinh Jethva para Codédex.*
*Repositório com arquivos originais do projeto em https://github.com/Goku-kun/air-juggler-using-tensorflowjs*
