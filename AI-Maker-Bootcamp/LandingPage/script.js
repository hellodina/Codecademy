// "Don't Click the Cat!" interactive logic

// Cat faces and messages for each anger stage
const catStages = [
    { emoji: "😸", message: "Think you have enough time?" },
    { emoji: "😾", message: "Hey! I said don't click me!" },
    { emoji: "😡", message: "Seriously, STOP clicking the cat!" },
    { emoji: "💀", message: "You have angered the cat spirit..." }
  ];
  
  const rainbowMessage = "🌈 Double rainbow cat! You found the secret! 🌈";
  
  let clickCount = 0;
  let stage = 0;
  let rainbowTimeout = null;
  
  const cat = document.getElementById('cat');
  const message = document.getElementById('message');
  const counter = document.getElementById('counter');
  const resetBtn = document.getElementById('reset');
  const title = document.getElementById('title');
  
  // Helper to update UI based on current stage
  function updateCat() {
    cat.textContent = catStages[stage].emoji;
    message.textContent = catStages[stage].message;
    counter.textContent = `Clicks: ${clickCount}`;
    // Color message based on stage
    message.style.color = ['#333', '#e67e22', '#e74c3c', '#8e44ad'][stage];
  }
  
  // Cat click handler
  cat.addEventListener('click', () => {
    if (cat.classList.contains('rainbow')) return; // Ignore clicks during rainbow mode
  
    clickCount++;
    if (stage < catStages.length - 1) {
      stage++;
    }
    updateCat();
  
    // Add shake animation
    cat.classList.remove('shake');
    void cat.offsetWidth; // Force reflow for animation restart
    cat.classList.add('shake');
  });
  
  // Remove shake class after animation
  cat.addEventListener('animationend', (e) => {
    if (e.animationName === 'shake') {
      cat.classList.remove('shake');
    }
  });
  
  // Reset button handler
  resetBtn.addEventListener('click', () => {
    clickCount = 0;
    stage = 0;
    updateCat();
    // Remove rainbow if active
    if (cat.classList.contains('rainbow')) {
      cat.classList.remove('rainbow');
      message.textContent = catStages[stage].message;
      title.innerHTML = "Don't Click the Cat! 😸";
    }
  });
  
  // Double-click easter egg: rainbow cat!
  cat.addEventListener('dblclick', () => {
    cat.classList.add('rainbow');
    message.textContent = rainbowMessage;
    title.innerHTML = "🌈 Don't Click the Rainbow Cat! 🌈";
    // Remove rainbow after 2.5 seconds
    clearTimeout(rainbowTimeout);
    rainbowTimeout = setTimeout(() => {
      cat.classList.remove('rainbow');
      updateCat();
      title.innerHTML = "Don't Click the Cat! 😸";
    }, 2500);
  });
  
  // Keyboard accessibility: Enter/Space triggers click
  cat.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      cat.click();
    }
  });
  
  // Initial UI setup
  updateCat();