// Initiation du jeu
window.addEventListener("load", init)

// Déclaration des variables

// The boards
let game_select;
let game_fight;
let score_wins;
let score_games;
let score_draws;

// The hands
let hands = ["rock", "paper", "scissors"];

// player hand refs
let refpaper_p;
let refrock_p;
let refscissor_p;

// Scores
let player_score = 0;
let total_games = 0;
let total_draws = 0;


function init() {
  refpaper_p = document.getElementById("paper_p");
  refrock_p = document.getElementById("rock_p");
  refscissor_p = document.getElementById("scissor_p");

  game_select = document.querySelector(".game_select");
  game_fight = document.querySelector(".game_fight");
  score_wins = document.getElementById("score_wins");
  score_games = document.getElementById("score_gamesPlayed");
  score_draws = document.getElementById("score_draws");

  document.querySelectorAll('.player_hand').forEach(player_hand => {
    player_hand.addEventListener('click', play.bind(this));
  });

}

function play(event) {
  game_fight.innerHTML = "";
  game_fight.style.display = "none";
  // Get player choice
  
  let player_game_select = event.target.closest('.player_hand');
  let player_hand_value = player_game_select.getAttribute('data-hand');
  let player_hand_html = document.createElement('div');
  player_hand_html.className = `hand player_hand ${player_hand_value} base`;
  // player_hand_html.id = `${player_hand_value}_p`;
  player_hand_html.innerHTML = `<img src="liaisons/images/icon-${player_hand_value}.svg" alt="${player_hand_value}">`;

  // Display player choice
  game_fight.appendChild(player_hand_html);

  // Get computer choice
  let computer_hand_value = hands[Math.floor(Math.random() * hands.length)];
  let computer_hand_html = document.createElement('div');
  computer_hand_html.className = `hand computer_hand ${computer_hand_value} base`;
  // computer_hand_html.id = `${computer_hand_value}_c`;
  computer_hand_html.innerHTML = `<img src="liaisons/images/icon-${computer_hand_value}.svg" alt="${computer_hand_value}">`;

  // Display computer choice
  game_fight.appendChild(computer_hand_html);

  setTimeout(() => {
    let results = referee(player_hand_value, computer_hand_value);
    score(results);
    displayResults(results);
  }, (2 * 1000));
  transition(game_select, 0.5, "out");
  transition(game_fight, 0.5, "in", 0.5);
}

function referee(player_hand, computer_hand) {
  switch (player_hand) {
    case "rock":
      return computer_hand === "scissors" ? "win" : computer_hand === "paper" ? "lose" : "draw";
    case "paper":
      return computer_hand === "rock" ? "win" : computer_hand === "scissors" ? "lose" : "draw";
    case "scissors":
      return computer_hand === "paper" ? "win" : computer_hand === "rock" ? "lose" : "draw";
    default:
      return "what just happened?"
  }
}

function score(results) { 
  switch (results) {
    case "win":
      player_score++;
      score_wins.innerHTML = player_score;
      total_games++;
      score_games.innerHTML = total_games;
      break;
    case "lose":
      total_games++;
      score_games.innerHTML = total_games;
      break;
    case "draw":
      total_draws++;
      score_draws.innerHTML = total_draws;
      break;
  }
}

function displayResults(result) {
  let game_results = document.createElement('div');
  game_results.className = "game_results";
  game_results.id = "game_results";

  // Display result
  let result_html = document.createElement('span');
  result_html.className = `result ${result}`;
  if (result === "draw") {
    result_html.innerHTML = `Its a ${result}`;
  } else {
    result_html.innerHTML = `You ${result}`;
  }
  game_results.appendChild(result_html);

  // Display play again button
  let play_again = document.createElement('button');
  play_again.className = "play_again";
  play_again.innerHTML = "Play Again";
  play_again.addEventListener('click', reset.bind(this));
  game_fight.appendChild(game_results);
  
  setTimeout(() => {
    game_results.appendChild(play_again);
  }, (1 * 1000));
}

function reset() {game_select
  transition(game_fight, 0.5, "out");
  transition(game_select, 0.5, "in", 0.5);
}

function transition(element, time, inOut, delay = 0) {
  if (inOut === "out") {
    element.style.display = "flex";
    element.style.opacity = "1";
    element.style.transition = `opacity ${time}s ease-${inOut}`;
    element.style.opacity = "0";
    setTimeout(() => {
      element.style.display = "none"
    }, time * 1000);
  } else if (inOut === "in") {
    element.style.opacity = "0";
    if (delay > 0) {
      setTimeout(() => {
      element.style.display = "flex"
      }, (delay * 1000)-100);
      setTimeout(() => {
        element.style.transition = `opacity ${time}s ease-${inOut}`;
        element.style.opacity = "1";
      }, delay * 1000);
    } else { 
      transition = `opacity ${time}s ${ease}`;
      element.style.opacity = "1";
      element.style.display = "flex"
    }
  }

}