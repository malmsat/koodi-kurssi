
////////////////////////////////////////
//////////// BUTTERFLY GAME //////////// 
////////////////////////////////////////

const container = document.getElementById('container');
const counter = document.getElementById('counter');
const winMessage = document.getElementById('winMessage');
const playAgainButton = document.createElement('button'); // Create the Play Again button
let clickCount = 0;
let spawnInterval;
let butterflyCount = 0;

// Butterfly png
let butterflyImg = new Image(); 
butterflyImg.src = './assets/img/butterfly.png';

// Function to generate random position within the container
function getRandomPosition() {
  const x = Math.random() * (container.clientWidth - 50);
  const y = Math.random() * (container.clientHeight - 50);
  return { x, y };
}

// Function to generate random speed for movement
function getRandomSpeed() {
  return Math.random() * 2 + 1;
}

// Function to move object in random directions and change direction at intervals
function moveObject(object) {
  let speedX = (Math.random() < 0.5 ? -1 : 1) * getRandomSpeed();
  let speedY = (Math.random() < 0.5 ? -1 : 1) * getRandomSpeed();

  let posX = parseFloat(object.style.left);
  let posY = parseFloat(object.style.top);

  function animate() {
    posX += speedX;
    posY += speedY;

    if (posX < 0 || posX > container.clientWidth - 50) {
      speedX = -speedX;
      posX = Math.max(0, Math.min(posX, container.clientWidth - 50));
    }

    if (posY < 0 || posY > container.clientHeight - 50) {
      speedY = -speedY;
      posY = Math.max(0, Math.min(posY, container.clientHeight - 50));
    }

    object.style.left = `${posX}px`;
    object.style.top = `${posY}px`;

    requestAnimationFrame(animate);
  }

  function changeDirection() {
    speedX = (Math.random() < 0.5 ? -1 : 1) * getRandomSpeed();
    speedY = (Math.random() < 0.5 ? -1 : 1) * getRandomSpeed();
    const randomInterval = Math.random() * 2000 + 1000;
    setTimeout(changeDirection, randomInterval);
  }

  animate();
  changeDirection();
}

// Function to create a clickable object (butterfly) with embedded SVG
function createObject() {
  if (butterflyCount >= 5) {
    return;
  }

  const object = document.createElement('div');
  object.classList.add('object');
  const { x, y } = getRandomPosition();
  object.style.left = `${x}px`;
  object.style.top = `${y}px`;

  // Append the image element
  const img = butterflyImg.cloneNode(); // Clone the image to use it for each butterfly
  object.appendChild(img); 
  
  butterflyCount++;

  object.addEventListener('click', () => {
    object.remove();
    butterflyCount--;
    clickCount++;
    counter.textContent = `Butterflies caught: ${clickCount}/10`;

    if (clickCount === 10) {
      displayWinMessage();
      clearInterval(spawnInterval);
    }
  });

  container.appendChild(object);
  moveObject(object);
}

// Function to display the "You won" message and the Play Again button
function displayWinMessage() {
  winMessage.style.display = 'block';

  // Add "Play Again" button
  playAgainButton.textContent = 'Play Again';
  playAgainButton.style.display = 'block'; // Make it visible when needed
  playAgainButton.addEventListener('click', resetGame); // Add event listener to restart the game
  document.body.appendChild(playAgainButton); // Add the button to the body
}

// Function to reset the game
function resetGame() {
  clickCount = 0;
  butterflyCount = 0;
  counter.textContent = `Butterflies caught: ${clickCount}/10`;
  winMessage.style.display = 'none';
  playAgainButton.style.display = 'none'; // Hide the play again button

  // Remove any remaining butterflies
  const butterflies = document.querySelectorAll('.object');
  butterflies.forEach(butterfly => butterfly.remove());

  // Start spawning butterflies again
  spawnInterval = setInterval(createObject, 10000);
}

// Start spawning objects every 10 seconds
spawnInterval = setInterval(createObject, 60000);


