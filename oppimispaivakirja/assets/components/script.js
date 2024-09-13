
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

// Your SVG code as a string (butterfly SVG)
const svgCode = `
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1803.26 1416.76">
  <path d="M1706.62,34.81c-87.9-8-171.7,16.1-253.9,44.4-116.7,40.1-220.2,102.7-313.9,183.1-77.3,66.4-143,141.3-188.5,232.9-4,8-5.2,18-18.1,25.3,5-19.9,8.2-36.2,13.2-52,5.4-17.3,4.3-34.2-5.3-48.4-8.3-12.4-7.6-37.2-7.6-37.2.1-9.8,2.6-19.2,4.9-28.8,11.3-46.5,26-92,43-136.8,14.9-39.3,40.1-70.8,72.4-97.1,15.2-12.3,32.6-17.8,52.1-16.6,11.6.7,22.1,3.8,27,15.8,5,12.2,4.1,24.1-3.7,34.9-3.3,4.6-7.3,11.3-13.7,8.4-6.4-2.9-1.4-9.2-.3-13.9,2.9-12.9-1.9-22-14.3-26-12.2-3.9-21.7.1-27.5,12-8.2,16.7-.6,36.2,17.4,43.1,19.1,7.4,35.9,1.7,50-11.4,14.7-13.7,13.5-31.5,8.5-49-5.3-18.9-19-29-38-31.4-21.2-2.7-40.5,3.9-58.3,14.7-36,21.9-61.7,53.2-79.4,91-23.7,50.4-38.5,103.7-51.5,157.7-7.4,30.9-48.8,32.9-57,.7-5.1-20.3-10.1-40.5-16.1-60.5-7.1-23.6-14.9-46.9-23.2-70.1-16.6-46.7-45.9-83.3-84.2-113.8-17.9-14.2-38-20-60.2-19.8-26.8.2-45,16.2-47.8,41.4-2.7,23.8,12.9,46.4,36.6,52.9,24.2,6.7,46.7-10.7,46.4-35.7-.3-18.7-18.1-29.5-34.5-20.6-11.5,6.3-14.4,16-10,28.3,1.3,3.7,3.8,8.2-1.6,10.6-3.7,1.6-6.5-1.5-9.2-3.7-10.7-8.7-13.7-20.4-10.2-33.1s11.8-21.3,25.6-23.3c18.3-2.6,34.6,2.3,49.7,12.6,30.5,20.9,54.5,47.2,70,81.1,21.9,48,36.2,98.5,49.9,149.2,3.3,12.3,6.4,24.6,7.8,37.1h.4c.7,19.3-2.3,39-11.8,59.3-9.7,20.6,2.2,44.7,7.8,73.3-5.7-8.3-8.2-10.8-9.5-13.9-42.2-103.8-112.9-186-194.6-260.7C522.02,128.01,379.42,52.41,216.72,14.71,170.22,3.91,123.32-6.09,75.22,4.51,25.42,15.41-.78,44.51.02,89.31c.3,14.8,2.9,30,6.9,44.3,30.9,111.6,89,209.2,157.8,300.9,9.1,12.2,12.7,23.4,11.4,38.8-4.4,51.7,10.7,97.5,45.5,136.7,29.1,32.7,66.9,47.4,109.3,52.6-18.1,60.3-18.4,60.5,20.5,111.4,7.4,9.7,2.3,16.4-1.3,24-11.6,24.2-22.8,50-18.3,76.2,4.7,26.9-2.5,46.5-16.7,68.2-26.8,41-23.6,72.5,9.2,109.8,9.7,11,5.7,18.7.5,28.1-14.3,25.7-24.9,52.8-29.1,82-4.9,34.7,7,59.9,38.2,73.7,20.9,9.3,15.3,14.3,2,25.8-24.8,21.4-47.8,44.9-58.4,77.2-10.1,30.8,7.7,54.9,40.4,54.8,25.7-.1,44.9-14.2,62.9-30.3,20-18,33.6-40.9,48.5-62.7,6.2-9.1,11.1-13.9,23.2-8.1,47.3,22.6,89.8,10.1,127.8-21.7,16.8-14.1,33.1-29.7,46.5-47,94.9-122.1,177.1-251.3,218.4-402.6,2.9-10.6,6.8-20.9,10.3-31.4,5.9,25.9,5.2,50.7,6,75.6,1.1,34.4-.1,69.1,8.8,102.8,2.5,9.3,4.8,21.3,16.1,21.9,13.2.7,12.6-12.5,14.3-21.6,4.3-23.4,8.1-47,11.4-70.6,2.2-15.7,3.7-31.6,4.4-47.4.7-15.6.2-31.2.2-46.8,6.4,2.7,8.1,4.9,8.7,7.4,25.5,111.3,69.6,215,130.7,311.2,34,53.5,64.5,110,111.4,154,38.1,35.7,80.7,58.5,134.2,33.3,14.5-6.8,18.1,2.7,24,11.9,19.4,30.4,36.3,63.1,69.3,82.1,29.2,16.8,56.2,17.3,71.3,1.2,13.9-14.8,12.2-42-3.9-69.3-12.7-21.7-30.3-39-48.4-56-10.2-9.6-10.1-14.3,3.9-19.4,33.4-12.1,47.5-36.6,45.4-72.1-1.7-29-10.9-55.5-23.6-80.7-7.9-15.6-8-26.4,6.3-38.9,23.8-20.8,28.1-47.7,18.3-77.4-5.6-16.9-13.7-32.6-23.2-47.5-4.5-7-7.7-13.2-5.6-22,10.1-42.7,1.5-82.5-20.8-119.4-7.1-11.8-5.8-17.4,6.7-24.3,28.4-15.8,39.8-42.9,37.5-73.6-1.3-17.3,5-20.8,19-23.9,74.1-16.2,127.2-69.4,130.3-143.8,1.8-43.1,14.7-75.9,43-105.4,5.4-5.7,9.5-12.7,14.3-19.1,54.5-73.6,99.6-152.3,128.6-239.4,26.3-79.2-4.5-130.5-87.5-138ZM338.12,137.81c50.1,4.9,91.9,30.8,133.7,55.1,121.8,71.1,221.1,166.4,298.2,284.3,9,13.8,30.3,32.1,16.2,45.1-13.7,12.5-33.5-6.7-48.5-16.8-86.4-58.1-179.1-103-279.1-131.9-38.5-11.1-75.5-24.1-107.6-49.1-42.3-33-68.7-83.9-69.2-137-.4-39.7,15.3-53.7,56.3-49.7ZM410.72,719.51c-10.2,9.3-19.4,29.7-38.5,14.5-12.5-9.9-10.7-41.9,2.4-56.1,28-30.3,62.1-51.9,100.6-66.8,77.3-29.9,157.4-45.6,240.2-48.2,17.6-.2,35.3-3,52.7,1.8,7.7,2.1,17.2,4.2,16.3,14.1-.9,10.7-11.2,9.7-18.7,9.7-57.9.1-114.4,9.5-169.3,27.2-68.7,22.3-131.8,54.7-185.7,103.8ZM478.72,754.81c-21.8,26.4-43.6,52.8-58.9,83.7-5,10.2-8.7,21.1-13.7,31.3-3.7,7.7-7,18.9-17.8,16.1-10.6-2.7-7.1-14.4-8.4-23.6,7-55.3,41.7-92.2,85.1-123.2,5.1-3.6,12.5-4.9,17.3-.2,6.1,5.9-.2,11.7-3.6,15.9ZM375.32,397.11c-.7,10.1-12.1,11.2-20.6,11.6-8.4.3-20,.4-19.3-11.3.6-10.4,12.2-10.4,21.1-12,7.8,1.2,19.7-.3,18.8,11.7ZM241.52,60.31c12-.9,31.4,18.5,31.4,31.3,0,7.3-3.3,11.4-10.6,12.3-15.8-4.6-25.5-15-29.3-30.7-1.7-6.8.2-12.3,8.5-12.9ZM149.72,59.91c21.9,3.2,41.7,13,52.9,35.1,8.5,16.7,1.4,27.9-17.1,27.3-25.2-.8-42.6-15.2-53.9-36.2-8.3-15.4-1.8-25.1,18.1-26.2ZM115.12,162.91c2.7-17.1,19-14.9,32.5-16.3,18.1,1.8,36.1,5.6,47.2,22.8,3.4,5.3,2.8,13-2.7,16.9-16.7,11.8-35,9.2-52.9,3.4-12.8-4.3-26.7-10.8-24.1-26.8ZM149.62,244.61c1.4-19,21.6-20.7,37.5-20,14.4.7,34.9.7,33.8,20.2-1.2,20.2-22.2,18.2-38.3,20.3-13.2-3.3-34.5-.3-33-20.5ZM219.52,320.31c-10.1-1.3-23.9.1-21.8-13.6,2.7-17.9,20.1-17.2,33.8-18.4,9.4-.8,23.1-.8,20.9,12.9-2.7,17.6-20,16.7-32.9,19.1ZM246.72,364.41c1.7-15.7,16-18.4,29.8-19.1,8,1.5,21-1.3,19.6,11.1-1.9,17-18.1,16.3-30.8,17.2-7.4.6-19.6.4-18.6-9.2ZM342.22,575.91c-39.2-.3-66.5-18.1-73.6-44.5-7.4-27.2,6.3-54.6,36.1-72.5,16.3-9.8,34.6-14.2,52.9-15.8,102.2-9.3,198,13.1,288.3,60.9,6.6,3.5,17,5.7,14.2,16-2.3,8.2-11.9,6.6-18.4,7-93.8,5.1-185.3,23.9-276.2,45.8-9.5,2.1-19.3,2.5-23.3,3.1ZM361.02,956.81c13.5-15.8,32-24.5,49.8-34.1,32-17.2,66.2-28.7,101.9-35.4,4.7-.9,11.4-3.7,13.4,3.1.9,3.1-2.3,8.1-4.9,11.3-33.3,42.8-74.1,77.2-119.6,106.3-7.7,4.9-16.1,6.7-25.1,7.1-10.1-.7-20.1-2.7-23.6-13.5-5-16.1-3.2-31.6,8.1-44.8ZM333.42,1343.91c-6.2,1.1-10.2-4.6-8.6-10.1,4-13.8,11-26,26.8-28.8,8.5-1.5,9.7,5.1,9.8,13.2-3.8,13.2-13,22.9-28,25.7ZM439.42,1168.51c-17,15-36.3,24.6-58.6,28.4-26.4,4.4-39-6.2-38.6-36-.7-15.9,8.7-32.2,19-47.5,45.6-67.7,109.9-113.3,180.6-151.1,5-2.7,11.2-7.3,17.1-2.4,4.8,4.1,2.5,9.8.3,14.6-32.2,69.5-60.3,141.4-119.8,194ZM547.12,1237.81c-3.1,4.2-7,7.9-11.1,11.2-14.7,12.1-32.8,25-49.8,13.3-17.3-11.9-6.7-32.1-.4-48.2,24.1-61.7,52.4-121.2,94.6-173,5.4-6.7,9.5-14.8,22.8-19.8,6.5,81-8.6,152.9-56.1,216.5ZM544.32,813.01c-23-23.9-22.4-67.9,1.4-97.2,31.5-38.8,73.4-59.5,121.3-69.8,26.7-5.8,53.4-11.5,83.3-11.1,11.6,3.5,30.6-10.3,39.1,6.6,8.3,16.5-8,29.6-16.9,41.8-37.7,51.7-84.7,94.4-135,133.3-32.4,24.9-68.3,22.2-93.2-3.6ZM672.52,1080.41c-11.3-1.1-19.8-6.9-19.7-20.2.1-14.4,8.6-20,21-21.2,12.9,1.4,20.6,8.1,20.1,20.5-.5,12.7-7,22.3-21.4,20.9ZM718.12,1017.61c-8.6-1-13.8-7.3-13.2-16.6.7-10.7,6.9-15.9,17.3-14.5,8.8,1.2,13.7,6.8,13.9,15-2,11-7.9,17.3-18,16.1ZM812.72,705.11c-9.3,80.3-34,156.3-87.2,221.2-1.7,2-3.5,4-5.4,5.8-18.6,18-37.4,37.2-66.7,25.9-20.1-7.7-33.5-44.7-27.6-74.6,5-25.6,16.4-47.5,37-65.2,44.8-38.4,88.3-78.4,124.8-125.2,5-6.4,9-18.3,19.4-13.8,9.3,4.1,4.3,15.7,5.7,25.9ZM1652.82,91.71c11.8-.4,21.2,2.9,21.7,16.8.7,18.5-30.7,42.7-55.7,43.5-11.5.3-21.5-1.6-21.7-16.2-.2-18.3,31.3-43.2,55.7-44.1ZM1530.12,118.61c2.8-16.5,13.7-26.4,29.1-30.6,9.1-2.5,13.1,3.7,11.7,12.3-2.7,17-14.7,25-29.2,29.4-8.2,0-12.9-3.1-11.6-11.1ZM1014.52,486.41c100-140.9,229.5-245.4,389.4-311.5,20.3-8.4,41.6-14.8,64.1-15.1,36.5-.4,49.9,13.3,49.3,49.5-1.4,76.5-53.1,141.7-134.7,168.1-48.7,15.8-99.1,25.8-147.2,43.6-67.3,24.9-130.9,57.3-192.5,93.9-13.7,8.1-32.9,24.2-44.9,11.5-10.9-11.5,7.9-27.8,16.5-40ZM1437.72,429.71c-8.1-1.8-19.7-.8-20.5-11.8-.7-9.2,9.8-8.4,16.3-8.4,8.7-.1,19.8.4,20.7,11.4.6,9.1-9.6,7.8-16.5,8.8ZM983.52,644.61c4.6-9.1,15.8-4.8,24.2-5.1,6.1-.2,12.3.7,18.5,1,65.4,4.3,127.2,18.5,179.9,60.9,34,27.4,50.6,66.8,39.5,99.2-9.8,28.6-26.8,38.4-56.9,34-49-7.1-81.9-39.9-113.7-72.8-29.4-30.4-58.3-61.6-82-96.9-4.2-6.3-13.4-12.5-9.5-20.3ZM1044.72,1024.71c-10.8-.3-16-7.4-15-17.4,1-10.2,8.2-15.2,18.4-14.4,9.5.7,13.2,7.2,14.4,14.8-2,11-7.5,17.3-17.8,17ZM1089.82,1089.61c-12-.1-19.7-7.6-20.2-19.6-.5-12.6,4.9-22.3,19.2-22.8,13.9-.5,20,8.1,22.2,20.1-1.6,13.3-7.6,22.3-21.2,22.3ZM1140.22,926.41c-3.5,40.1-36.9,56.5-69.5,32.8-33.9-24.7-51.4-61.6-68.9-98.3-26.4-55.6-41.2-141.4-30.7-196.3,42.7,58.6,92.1,105,136.4,155.8,25.3,28.8,36.2,66.2,32.7,106ZM1270.22,1279.11c-14.4,10.5-28.7-.5-40.9-8.9-26.1-17.9-37.8-46.3-49.3-73.7-21.6-51.5-25.7-105.5-17.6-163.3,19.7,7.4,25.1,23.8,33.2,36.4,34,52.9,60.2,109.7,78.1,170.1,4,13.4,9.9,29.7-3.5,39.4ZM1426.92,1354.11c.3,7.7-2.2,14.1-9.9,12.3-13.8-3.1-22.3-12.9-25.4-26.8-1.5-6.6-.5-13.6,8-12.8,16.2,1.8,22.7,14.3,27.3,27.3ZM1416.42,1186.21c-.4,26.3-17.8,38.3-45.1,30.4-34.8-10.1-59.6-33.7-80.5-61.8-37.3-50.2-59.2-108.1-82.4-165.4-2-4.9-4.4-10.4-.5-15,4.7-5.5,9.9-1.3,14.1,1.1,73.8,41.9,140.5,91.5,182.5,167.8,10,18,12.2,27.4,11.9,42.9ZM1415.12,997.31c2.9,12.3,2.4,24.8-8.3,34.2-10.3,9.2-22.3,7-32.3,1.3-54.4-31.3-96.4-75.4-129.6-128.5,58.8,5.1,107.4,30.8,152.6,64,9.7,7.2,14.9,17.8,17.6,29ZM1382.32,907.21c-12.8,2.6-14.5-10.3-17.2-19.3-13-42.2-37.8-77.4-64.3-111.9-4.3-5.6-14.4-11.9-6.8-19.9,6.7-7,15.4-.5,21.4,4.1,40.4,31.2,70.7,68.9,76.1,120.3-2.4,10.7,3.7,24-9.2,26.7ZM1399.92,745.61c-11.1,5.7-21.8,3.9-31.5-5.2-97.3-91.7-213.9-137.7-346.5-145.7-8.8-.5-23,.9-22.9-11.9,0-11.6,13.8-11.3,22.8-13.8,3.4-.9,7-.8,10.5-.8,9.7-.1,19.4,0,29.1,0,87.5,5.7,170.9,27.4,250.7,62.7,25.7,11.4,50.5,25.3,74.4,40.2,16.1,10,26.8,25.6,28.2,45.7.9,12.4-3.7,23-14.8,28.8ZM1516.42,557.01c-7.8,27-32.9,42-69.3,41.9-23.5-.1-44.9-8.9-66.9-15.1-76.7-21.5-154.4-37.8-233.7-46.2-7.8-.8-20.4,1.8-21.4-10.1-.7-8.7,10.1-11.3,17-14.5,70.5-32.8,144.2-52.4,222.5-51.5,26.7-.8,53,.9,79.1,6.4,12.2,2.5,24,5.9,34.9,12.1,31.6,17.6,46.2,47.7,37.8,77ZM1529.92,400.11c-14.2-1.7-29.2-1.7-32.8-17.7-2.7-12,9.1-10.8,16.2-10.9,13.5,0,27.8,3.1,31.8,17.4,3.2,11.7-9.6,8.9-15.2,11.2ZM1576.32,348.61c-13-3.9-31.6-1.4-34.5-20.6-1.6-10.7,10.5-14,19-12.9,14.4,1.8,32,3.4,35.5,20.8,2.2,10.9-10.7,11.2-20,12.7ZM1647.82,276.21c-2,11-10.5,15.6-21,16.4-4.4.3-8.8.1-20.4.1-9-.9-31.6,1.1-30.4-21.2,1-20.2,23.1-17.1,38.5-17.2,5.9-.1,12.3,1.5,17.7,4,7.4,3.5,17.8,6.3,15.6,17.9ZM1677.82,211.81c-18.1,13.6-39.2,16.3-60.5,9.7-16.3-5-18.2-18.9-5.7-30.5,7.8-7.2,22.6-11.5,45-11.6,1.8.2,9.2-.1,15.7,2.2,15.9,5.5,18.8,20.3,5.5,30.2Z"/>
</svg>
`; // Replace this with your butterfly SVG code

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

  object.innerHTML = svgCode;
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
  playAgainButton.style.display = 'block'; // Make the button visible
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
  //const butterflies = document.querySelectorAll('.object');
  //butterflies.forEach(butterfly => butterfly.remove());

  // Start spawning butterflies again
  spawnInterval = setInterval(createObject, 2000);
}

// Start spawning objects every 2 seconds
spawnInterval = setInterval(createObject, 2000);















//////////////////////////////////////
//////////// MYSTERY GAME //////////// 
//////////////////////////////////////

const textBox = document.getElementById('text-box');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const choice3 = document.getElementById('choice3');
const returnButton = document.getElementById('returnButton'); // Add reference to the Return button

// Define the choice tree
const choiceTree = {
  start: 'Welcome to the Sainsbury Mystery. Make your move.',
  option1: 'The gardens are blooming with a vast variety of flora. Barclay the gardener is tending to the flowers.',
  option2: 'The butler opens the heavy front doors to let you enter. The main hall is a large room with an air of affluence.',
  option3: 'The door opens with a creak. You arrive at a musty room with an on ominous draft breathing at the back of your neck.',
  option1_next: 'You selected the next step after Option 1.',
  option2_next: 'You selected the next step after Option 2.',
  option3_next: 'You selected the next step after Option 3.'
};

let currentState = 'start';
let previousState = null;  // Track the previous state

// Function to update the text in the text box
function updateText(choice) {
  previousState = currentState;  // Store the current state as the previous state
  currentState = choice;  // Update the current state to the new choice
  textBox.textContent = choiceTree[choice];
}

// Attach event listeners to the buttons
choice1.addEventListener('click', () => {
  updateText('option1');
  choice1.textContent = 'Talk to Barclay.';
  choice2.textContent = 'Smell the roses.';
  choice3.style.display = 'none'; // Hide option 3 if not needed
});

choice2.addEventListener('click', () => {
  updateText('option2');
  choice1.textContent = 'Talk to the butler.';
  choice2.textContent = 'Frolic about the room.';
  choice3.style.display = 'none';
});

choice3.addEventListener('click', () => {
  updateText('option3');
  choice1.textContent = 'Call out to the ancestors.';
  choice2.textContent = 'Study the ancient mural.';
  choice3.style.display = 'none';
});

// Function to return to the previous state
returnButton.addEventListener('click', () => {
  if (previousState) {
    updateText(previousState);  // Return to the previous state
    resetButtons();  // Reset the button text based on the state
  }
});

// Function to reset the button text based on the state
function resetButtons() {
  if (currentState === 'start') {
    choice1.textContent = 'Option 1';
    choice2.textContent = 'Option 2';
    choice3.textContent = 'Option 3';
    choice3.style.display = 'inline';  // Show option 3 again
  } else if (currentState === 'option1' || currentState === 'option2' || currentState === 'option3') {
    choice1.textContent = 'Next Step 1';
    choice2.textContent = 'Next Step 2';
    choice3.style.display = 'none';
  }
}