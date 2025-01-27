

const gameBoard = {
    board: Array(9).fill(null),
    updateBoard: function (index,symbol){
        if (!this.board[index]){
            this.board[index]=symbol;
            return true;
        }
        return false;
    },
    displayBoard: function(){
        console.log(`${this.board.slice(0, 3).join(' | ')}`);
        console.log(`${this.board.slice(3, 6).join(' | ')}`);
        console.log(`${this.board.slice(6, 9).join(' | ')}`);
    },
    resetBoard: function(){
        this.board=Array(9).fill(null);
    }
}

const Player = (username, symbol) => {
    return {
        name: username,
        symbol: symbol,
    };
};

const player1 = Player("alice", "x");
const player2 = Player("john","o");


const Game = {
    players: [],
    currentPLayerIndex: 0,
    isGameOver: false,
    init: function(player1Name, player2Name){
        this.players=[
            Player(player1Name, "X"),
            Player(player2Name,"O"),
        ];
        gameBoard.resetBoard();
        this.currentPLayerIndex = 0;
        this.isGameOver=false;
    },
    switchTurn: function(){
        this.currentPLayerIndex=1-this.currentPLayerIndex;
    },
    makeMove: function(index){
        if (this.isGameOver) return;
        const currentPlayer = this.players[this.currentPLayerIndex];
        const success = gameBoard.updateBoard(index,currentPlayer.symbol);
        if (success) {
            if (this.checkWinner(currentPlayer.symbol)){
                console.log(`${currentPlayer.name} wins!`);
                this.isGameOver=true;
            } else if (gameBoard.board.every(cell=> cell !== null)) {
                console.log("its a draw!");
            } else {
                this.switchTurn();
                
            }
        } else {
            console.log("spot already taken choose another!")
        }
        
        
    },
    checkWinner :function (symbol){
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6],          
        ];
        return winningCombos.some(combo =>
            combo.every(index => gameBoard.board[index] === symbol)
        );
    },
};

s



