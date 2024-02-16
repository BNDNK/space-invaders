document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("player");
    const invadersContainer = document.getElementById("invaders-container");
    const bullets = [];
  
    let invaderInterval;
  
    // Player controls
    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        movePlayer("left");
      } else if (event.key === "ArrowRight") {
        movePlayer("right");
      } else if (event.key === " ") {
        shoot();
      }
    });
  
    // Move player
// Move player
// Move player
// Move player
function movePlayer(direction) {
    const playerPosition = player.getBoundingClientRect();
    const containerPosition = invadersContainer.getBoundingClientRect();
  
    if (direction === "left" && playerPosition.left > containerPosition.left) {
      player.style.left = playerPosition.left - 10 + "px";
    } else if (direction === "right" && playerPosition.right < containerPosition.right) {
      player.style.left = playerPosition.right + 10 + "px";
    }
  }
  
  
  
    // Create invader
    function createInvader(x, y) {
      const invader = document.createElement("div");
      invader.className = "invader";
      invader.style.left = `${x}px`;
      invader.style.top = `${y}px`;
      invadersContainer.appendChild(invader);
    }
  
    // Move invaders
    function moveInvaders() {
      const invaders = document.getElementsByClassName("invader");
  
      for (let invader of invaders) {
        const invaderPosition = invader.getBoundingClientRect();
        invader.style.top = invaderPosition.top + 20 + "px";
  
        // Check for collision with player
        if (isColliding(invader, player)) {
          endGame();
        }
  
        // Check for collision with bullets
        for (let bullet of bullets) {
          if (isColliding(invader, bullet)) {
            invader.remove();
            bullet.remove();
          }
        }
      }
    }
  
    // Shoot bullet
    function shoot() {
      const bullet = document.createElement("div");
      bullet.className = "bullet";
      const playerPosition = player.getBoundingClientRect();
      bullet.style.left = playerPosition.left + playerPosition.width / 2 + "px";
      bullet.style.bottom = playerPosition.top + "px";
      invadersContainer.appendChild(bullet);
      bullets.push(bullet);
    }
  
    // Check for collision between two elements
    function isColliding(element1, element2) {
      const rect1 = element1.getBoundingClientRect();
      const rect2 = element2.getBoundingClientRect();
  
      return !(
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom ||
        rect1.right < rect2.left ||
        rect1.left > rect2.right
      );
    }
  
    // Game loop
    function gameLoop() {
      invaderInterval = setInterval(() => {
        const randomX = Math.floor(Math.random() * (window.innerWidth - 20));
        createInvader(randomX, 0);
      }, 1000);
  
      setInterval(() => {
        moveInvaders();
      }, 500);
  
      setInterval(() => {
        bullets.forEach(bullet => {
          const bulletPosition = bullet.getBoundingClientRect();
          bullet.style.bottom = bulletPosition.bottom + 10 + "px";
  
          // Remove bullet when it goes out of the container
          if (bulletPosition.bottom > window.innerHeight) {
            bullet.remove();
            bullets.splice(bullets.indexOf(bullet), 1);
          }
        });
      }, 100);
    }
  
    // End the game
    function endGame() {
      clearInterval(invaderInterval);
      alert("Game Over!");
    }
  
    // Start the game loop
    gameLoop();
  });
  