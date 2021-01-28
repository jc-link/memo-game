const lightBlue = document.getElementById("lightBlue");
const violet = document.getElementById("violet");
const orange = document.getElementById("orange");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const yellow = document.getElementById("yellow");
const red = document.getElementById("red");
const brown = document.getElementById("brown");
const black = document.getElementById("black");
const btnStart = document.getElementById("btnStart");
const MAX_LEVEL = 10;

class Game {
  constructor() {
    this.initialize();
    this.generateSequence();
    setTimeout(this.nextLevel, 500);
  }

  initialize() {
    this.chooseColor = this.chooseColor.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.btnStartToggle();
    this.level = 1;
    this.colors = {
      lightBlue,
      violet,
      orange,
      green,
      blue,
      yellow,
      red,
      brown,
      black,
    };
  }

  btnStartToggle() {
    if (btnStart.classList.contains("hide")) {
      btnStart.classList.remove("hide");
    } else {
      btnStart.classList.add("hide");
    }
  }

  generateSequence() {
    this.sequence = new Array(MAX_LEVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 9));
  }

  nextLevel() {
    this.subLevel = 0;
    this.iluminateSequence();
    this.addClickEvent();
  }

  numberToColor(number) {
    switch (number) {
      case 0:
        return "lightBlue";
      case 1:
        return "violet";
      case 2:
        return "orange";
      case 3:
        return "green";
      case 4:
        return "blue";
      case 5:
        return "yellow";
      case 6:
        return "red";
      case 7:
        return "brown";
      case 8:
        return "black";
    }
  }

  colorToNumber(color) {
    switch (color) {
      case "lightBlue":
        return 0;
      case "violet":
        return 1;
      case "orange":
        return 2;
      case "green":
        return 3;
      case "blue":
        return 4;
      case "yellow":
        return 5;
      case "red":
        return 6;
      case "brown":
        return 7;
      case "black":
        return 8;
    }
  }

  iluminateSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.numberToColor(this.sequence[i]);
      setTimeout(() => this.iluminateColor(color), 1000 * i);
    }
    return true;
  }

  iluminateColor(color) {
    this.colors[color].classList.add("light");
    setTimeout(() => this.turnOffColor(color), 350);
  }

  turnOffColor(color) {
    this.colors[color].classList.remove("light");
  }

  addClickEvent() {
    this.colors.lightBlue.addEventListener("click", this.chooseColor);
    this.colors.violet.addEventListener("click", this.chooseColor);
    this.colors.orange.addEventListener("click", this.chooseColor);
    this.colors.green.addEventListener("click", this.chooseColor);
    this.colors.blue.addEventListener("click", this.chooseColor);
    this.colors.yellow.addEventListener("click", this.chooseColor);
    this.colors.red.addEventListener("click", this.chooseColor);
    this.colors.brown.addEventListener("click", this.chooseColor);
    this.colors.black.addEventListener("click", this.chooseColor);
  }

  removeClickEvent() {
    this.colors.lightBlue.removeEventListener("click", this.chooseColor);
    this.colors.violet.removeEventListener("click", this.chooseColor);
    this.colors.orange.removeEventListener("click", this.chooseColor);
    this.colors.green.removeEventListener("click", this.chooseColor);
    this.colors.blue.removeEventListener("click", this.chooseColor);
    this.colors.yellow.removeEventListener("click", this.chooseColor);
    this.colors.red.removeEventListener("click", this.chooseColor);
    this.colors.brown.removeEventListener("click", this.chooseColor);
    this.colors.black.removeEventListener("click", this.chooseColor);
  }

  chooseColor(ev) {
    const colorName = ev.target.dataset.color;
    const colorNumber = this.colorToNumber(colorName);
    this.iluminateColor(colorName);

    if (colorNumber === this.sequence[this.subLevel]) {
      this.subLevel++;
      if (this.subLevel == this.level) {
        this.level++;
        this.removeClickEvent();
        if (this.level == MAX_LEVEL + 1) {
          this.victory();
        } else {
          setTimeout(this.nextLevel, 1000);
        }
      }
    } else {
      this.defeat();
    }
  }

  victory() {
    swal("Gratz!", "You win!", "success").then(() => {
      this.initialize();
    });
  }
  defeat() {
    swal("Sorry!", "You lose!", "error").then(() => {
      this.removeClickEvent();
      this.initialize();
    });
  }
}

function startGame() {
  window.Game = new Game();
}
