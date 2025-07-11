onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);

  // Prompt for the user's name
  let name = "";
  while (!name) {
    name = prompt("Please enter your name:");
    if (name === null) name = ""; // If user cancels, re-prompt
  }
  document.getElementById("user-name").textContent = name;
};
