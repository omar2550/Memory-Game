let duration = 1000;
let blocksContainer = document.querySelector(".game-blocks");
let blocks = Array.from(blocksContainer.children);

document.querySelector(".start-button").addEventListener("click", () => {
  document.querySelector(".start-button").style.display = "none";

  document.querySelector(".enter-name").style.display = "block";
  document.querySelector(".enter-name").focus();

  document.querySelector(".enter-name").addEventListener("blur", (event) => {
    let theName;
    if (event.target.value !== "") {
      theName = event.target.value;
    } else theName = "Unknown";

    document.querySelector(".layout").style.display = "none";

    document.querySelector(".name span").innerHTML = theName;

    blocks.forEach((e) => {
      e.classList.add("flipped");
    });
    setTimeout(() => {
      blocks.forEach((e) => {
        e.classList.remove("flipped");
      });
    }, duration);
  });
});

blocks.forEach((e) => {
  let randomeBlockNumber = Math.floor(Math.random() * blocks.length);

  e.style.order = randomeBlockNumber;

  e.addEventListener("click", () => {
    flipBlock(e);
  });
});

function flipBlock(block) {
  block.classList.add("flipped");

  let flippedBlocks = blocks.filter((flipped) =>
    flipped.classList.contains("flipped")
  );

  if (flippedBlocks.length === 2) {
    stopClicking();

    setTimeout(() => {
      check(flippedBlocks);
    }, duration / 2);
  }
}

function stopClicking() {
  blocksContainer.classList.add("stop-click");

  setTimeout(() => {
    blocksContainer.classList.remove("stop-click");
  }, duration / 2);
}

function check(array) {
  let tries = document.querySelector(".tries span");

  if (
    array[0].getAttribute("data-technology") ===
    array[1].getAttribute("data-technology")
  ) {
    array.forEach((e) => e.classList.remove("flipped"));

    array.forEach((e) => e.classList.add("done"));

    document.getElementById("success").play();

    if (
      blocks.filter((e) => e.classList.contains("done")).length ===
      blocks.length
    ) {
      winPopUp();
    }
  } else {
    tries.innerHTML = 1 + +tries.innerHTML;
    array.forEach((e) => e.classList.remove("flipped"));
    document.getElementById("fail").play();
  }
}

function winPopUp() {
  let div = document.createElement("div");
  let triesDiv = document.createElement("div");
  let tries = document.querySelector(".tries span");
  div.classList.add("popup");
  div.appendChild(document.createTextNode("Congratulation, You Win!"));
  triesDiv.appendChild(
    document.createTextNode(`Wrong Tries: ${tries.innerHTML}`)
  );
  div.appendChild(triesDiv);
  document.body.appendChild(div);
}

// document.addEventListener("click", (e) => {
//   if (e.target.classList[1] == "front") {
//         e.target.parentElement.classList.add("flipped");
//   }
// });
