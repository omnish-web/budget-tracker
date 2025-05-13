document.getElementById("expense-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = sessionStorage.getItem("userEmail");
  if (!email) {
    alert("User not logged in. Please log in first.");
    return;
  }

  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!category || !description || isNaN(amount) || !type) {
    alert("Please fill all fields.");
    return;
  }

  const payload = {
    category,
    description,
    amount,
    type,
    email
  };

  try {
    const response = await fetch("https://script.google.com/macros/library/d/1zy7sFCvyR26vlnfiJZZkPTwSDoZ7-ELop8exw5mfODff0UYVHnB9aBpE/1", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();
    if (result.result === "success") {
      alert("Entry added!");
      document.getElementById("expense-form").reset();
    } else {
      alert("Something went wrong.");
    }
  } catch (error) {
    console.error(error);
    alert("Error sending data.");
  }
});

