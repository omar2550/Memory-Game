let theName;
let duration = 1000;
let blocksContainer = document.querySelector(".game-blocks");
let blocks = Array.from(blocksContainer.children);
let seconds = document.querySelector(".seconds");
let timerBar = document.querySelector(".timer-bar span");
let timerBarWidth = parseInt(timerBar.style.width);
let timeid;
let players = JSON.parse(localStorage.getItem("players")) || [];
localStorage.setItem("players", JSON.stringify(players));
let trie = JSON.parse(localStorage.getItem("tries")) || [];

document.querySelector(".start-button").addEventListener("click", () => {
  document.querySelector(".start-button").style.display = "none";

  document.querySelector(".enter-name").style.display = "block";
  document.querySelector(".enter-name").focus();

  document.querySelector(".enter-name").addEventListener("blur", (event) => {
    if (event.target.value !== "") {
      theName = event.target.value;

      if (
        JSON.parse(localStorage.getItem("players")).indexOf(
          event.target.value
        ) === -1
      ) {
        players.push(event.target.value);
        localStorage.setItem("players", JSON.stringify(players));
      }
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

    timer();
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
      clearInterval(timeid);
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

  trie[players.indexOf(theName)] = tries.innerHTML;
  localStorage.setItem("tries", JSON.stringify(trie));
}
function timerPopUp() {
  let div = document.createElement("div");
  let triesDiv = document.createElement("div");
  let tries = document.querySelector(".tries span");
  div.classList.add("popup");
  div.appendChild(document.createTextNode("Game Over, Time out"));
  triesDiv.appendChild(
    document.createTextNode(`Wrong Tries: ${tries.innerHTML}`)
  );
  div.appendChild(triesDiv);
  document.body.appendChild(div);
}

function timer() {
  timeid = setInterval(() => {
    seconds.innerHTML -= 1;
    timerBarWidth = timerBarWidth - (1 / 60) * 100;
    timerBar.style.width = `${timerBarWidth}%`;

    if (seconds.innerHTML <= 0) {
      clearInterval(timeid);
      timerBar.style.width = 0;
      timerPopUp();
      blocksContainer.classList.add("stop-click");
    }
  }, duration);
}

// function leaderBoard() {
//   let leader_board = document.querySelector(".leader-board");
//   let trieArray = trie.filter( e => e === e );
//   for (let i = 0; i < players.length; i++) {
//   let member = document.createElement("div");
//   let tries = document.createElement("span");

//   member.appendChild(
//     document.createTextNode(players[i])
//   );

//   tries.appendChild(document.createTextNode(trie[i]));
//   member.appendChild(tries);

//   leader_board.appendChild(member);
    
//   }
//   let leaderSpan = document.querySelectorAll(".leader-board div span");

//   for (let i = 0; i < leaderSpan.length; i++) {

//     leaderSpan[trieArray.indexOf(`${Math.min(...trieArray)}`)].parentElement.style.order = `${i}`

//     trieArray[trieArray.indexOf(`${Math.min(...trieArray)}`)] = 9999;

//   }
// }
