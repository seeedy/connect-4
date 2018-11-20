var curPlayer = "player1";
var currentY;
var deleteChip;

$(".slot").on("mouseover", function(e) {
    if (e.target === $(".hole")) {
        return;
    }
    e.stopPropagation();
    deleteChip = $(".select-column");
    deleteChip.remove();
    var top = $(e.currentTarget)
        .parent()
        .find(".top");
    var newChip = '<div class="' + curPlayer + ' select-column"></div>';
    top.eq(0).append(newChip);
});

$(".slot").on("mouseleave", function(e) {
    e.stopPropagation();
    deleteChip = $(".select-column");
    deleteChip.remove();
});

$(".column").on("click", function(e) {
    e.stopPropagation();
    deleteChip = $(".select-column");
    deleteChip.remove();

    var holesInColumn = $(e.currentTarget).find(".hole");
    for (var i = 5; i >= 0; i--) {
        if (
            !holesInColumn.eq(i).hasClass("player1") &&
            !holesInColumn.eq(i).hasClass("player2")
        ) {
            holesInColumn.eq(i).addClass(curPlayer);

            currentY = i;
            break;
        }
    }
    setTimeout(checkForVictory, 50);
    setTimeout(switchPlayers, 51);
});

function switchPlayers() {
    if (curPlayer == "player1") {
        curPlayer = "player2";
    } else {
        curPlayer = "player1";
    }
}

function checkForVictory() {
    function winCondition() {
        if (str.indexOf("yyyy") > -1) {
            winMsg();
        }
    }
    // check columns
    var holes = $(".hole");
    var str = "";
    for (var i = 0; i < holes.length; i++) {
        if (holes.eq(i).hasClass(curPlayer)) {
            str += "y";
        } else {
            str += "n";
        }
    }
    winCondition();

    // check rows
    var curRow = "row" + currentY;
    var holesInRow = $(".hole." + curRow);
    str = "";
    for (var j = 0; j < holesInRow.length; j++) {
        if (holesInRow.eq(j).hasClass(curPlayer)) {
            str += "y";
        } else {
            str += "n";
        }
    }
    winCondition();

    // check diagonal
    var diagonalWins = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [15, 20, 25, 30],
        [16, 21, 26, 31],
        [17, 22, 27, 32],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [21, 26, 31, 36],
        [22, 27, 32, 37],
        [23, 28, 33, 38]
    ];

    for (var k = 0; k < diagonalWins.length; k++) {
        str = "";
        var diagonalArr = diagonalWins[k];
        for (var l = 0; l < diagonalArr.length; l++) {
            if (holes.eq(diagonalArr[l]).hasClass(curPlayer)) {
                str += "y";
            } else {
                str += "n";
            }
            winCondition();
        }
    }
}

function winMsg() {
    var winHtml = "<h1>Player " + curPlayer[6] + " wins!</h1>";
    var winText = $(".win-msg");
    var scoreHtml = '<div class="' + curPlayer + '"></div>';
    var winOver = $("#overlay-win");

    winOver.css("transform", "translateY(0)");

    if (curPlayer == "player1") {
        winText.css("text-shadow", "5px 5px 2px red");
        $("#player1-score").append(scoreHtml);
    } else {
        winText.css("text-shadow", "5px 5px 2px green");
        $("#player2-score").append(scoreHtml);
    }
    winText.css("transform", "translateY(0)");
    winText.css("transition-duration", "0.5s");
    winText.append(winHtml);

    // restart game
    $("a").click(function(e) {
        e.stopPropagation();
        winOver.css("transform", "translateY(-1000px)");
        winText.css("transform", "translateY(-1000px)");
        var holes = $(".hole");
        holes.removeClass("player1 player2");
        $("h1").remove();
    });
}
