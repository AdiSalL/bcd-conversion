function convertNum() {
  const valueInput = document.getElementById("input").value;
  const conversionType = document.getElementById("conversionType").value;
  const result = document.getElementById("result");
  const grayButton = document.getElementById("convert-gray-btn");

  if (isNaN(valueInput) || valueInput.trim() === "") {
    result.innerText = "Invalid Input or Empty";
    grayButton.classList.add("hidden");
    return;
  }

  let digits = valueInput.split("").map(Number);
  let bcd = "";

  switch (conversionType) {
    case "8421":
      bcd = digits.map((d) => d.toString(2).padStart(4, "0")).join(" ");
      break;
    case "4221":
      const map4221 = [
        "0000",
        "0001",
        "0010",
        "0011",
        "0100",
        "1000",
        "1001",
        "1010",
        "1100",
        "1111",
      ];
      bcd = digits.map((d) => map4221[d]).join(" ");
      break;
    case "5421":
      const map5421 = [
        "0000",
        "0001",
        "0011",
        "0100",
        "0101",
        "0111",
        "1000",
        "1010",
        "1100",
        "1111",
      ];
      bcd = digits.map((d) => map5421[d]).join(" ");
      break;
    case "8-4-2-1":
      const map8421 = [
        "0000",
        "0001",
        "0010",
        "0011",
        "0100",
        "0101",
        "0110",
        "0111",
        "1000",
        "1001",
      ];
      bcd = digits.map((d) => map8421[d]).join(" ");
      break;
    default:
      bcd = "Invalid Type";
  }

  result.textContent = `${conversionType} BCD: ${bcd}`;

  // Show the Convert to Gray button
  grayButton.classList.remove("hidden");
  grayButton.dataset.bcd = bcd; // Store BCD result in button attribute
}

function convertToGray() {
  const result = document.getElementById("result");
  const grayButton = document.getElementById("convert-gray-btn");

  let bcd = grayButton.dataset.bcd.split(" ");
  let gray = bcd.map((bin) => binaryToGray(bin)).join(" ");

  console.log(gray);
  result.textContent = `Gray Code: ${gray}`;
  grayButton.classList.add("hidden"); // Hide the button after conversion
}

function binaryToGray(bin) {
  let gray = bin[0]; // First bit remains the same
  for (let i = 1; i < bin.length; i++) {
    gray += bin[i - 1] ^ bin[i]; // XOR operation
  }
  return gray;
}
