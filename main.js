onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);

  // Show the beautiful name modal
  const nameModal = document.getElementById('name-modal');
  const nameForm = document.getElementById('name-form');
  const nameInput = document.getElementById('name-input');
  
  // Show modal with animation
  setTimeout(() => {
    nameModal.classList.add('show');
    nameInput.focus();
  }, 1200);

  // Handle form submission
  nameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    
    if (name) {
      // Log visitor to Google Sheets
      logVisitorToSheet(name);
      
      // Hide modal with animation
      nameModal.classList.add('hiding');
      
      setTimeout(() => {
        nameModal.style.display = 'none';
        
        // Display the name at the top
        document.getElementById("user-name").textContent = name;
        
        // Show the specific beautiful message above the flowers
        const personalMessage = document.getElementById("personal-message");
        personalMessage.textContent = "Your presence makes this world more beautiful, just like these flowers do. Just remember; someone loves everything that you hate about yourself";
        personalMessage.classList.add('show');
        
      }, 500);
    }
  });

  // Prevent closing by clicking overlay (optional - remove if you want to allow closing)
  nameModal.addEventListener('click', (e) => {
    if (e.target === nameModal) {
      // Optional: allow closing by clicking outside
      // nameModal.classList.add('hiding');
    }
  });
};

// Function to log visitor to Google Sheets
function logVisitorToSheet(name) {
  // Google Sheets Web App URL - you'll need to create this
  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbyC-EyIltZ1z6Gqg3Grh00_-QYCOuwtvwSOZR0UYH4FB4r334wU3UTtmkGYPSNO3uSp3w/exec';
  
  const visitorData = {
    name: name,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    referrer: document.referrer || 'Direct'
  };

  // Send data to Google Sheets
  fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors', // Important for cross-origin requests
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(visitorData)
  })
  .catch(error => {
    console.log('Visitor logged successfully');
  });
}
