/* 
CS316 program 1
Initial Author: Paul Piwowarski 2014/09
Modifications: Roxanne Coburn 2016/10

*/
//************************* GLOBAL VARIABLES ******************************
// DSIZE is size of deck: 52 for normal deck
// Note: do not hardcode deck size. Use this variable
// to simplify my (and your) testing

var DSIZE = 52; // size of deck

var cards_init = new Array(DSIZE); 

var cards = new Array(DSIZE); // shuffled deck

var my_cards = [];

var dealer_cards = [];

var dealer_total = 0;

var my_total = 0;

var shuffled = 0;

var dealed = 0;

var win_percentage = 0;

var my_cards_index = 0;

var dealer_cards_index = 0;

var card_index = 0;

var games_played = 0;

var wins = 0;

var win_lose_tie = "";

var game_end = 0;


//calculates the value of card between 1 and 52, returns the value of the card
function calculate(card) {
    if (card <= 4) {    // ace
		value = 11;
		return value; 
	}
    
	if (card <= 20) {   // face card or 10
		value = 10;
		return value;
	}
    
	if (card <= 24) {  // 9, and so forth
		value = 9;
		return value;
	}
    
	if (card <= 28) {
		value = 8;
		return value;
	}
    
	if (card <= 32) {
		value = 7;
		return value;
	}
    
	if (card <= 36) {
		value = 6;
		return value;
	}
    
	if (card <= 40) {
		value = 5;
		return value;
	}
    
	if (card <= 44) {
		value = 4;
		return value;
	}
    
	if (card <= 48) {
		value = 3;
		return value;
	}
    
	value = 2;          // only 2 left
	return value; 
}


//resets all of the game variables and innerHTML thats associated with keeping track of the running total of games
function reset() {

    document.getElementById("dealer-space").innerHTML = "";
    document.getElementById("my-space").innerHTML = "";
    document.getElementById("win-percentage").innerHTML = 0;
    document.getElementById("dealer-score").innerHTML = 0;
    document.getElementById("my-score").innerHTML = 0;
    end_game(0);
    
    cards.length = 0;
    cards_init.length = 0;
    
    card_index = 0;
    shuffled = 0;
   
  
    win_percentage = 0;
    games_played = 0;
    wins = 0;
  
}

//resets all of the variables that are associated with each game and displays the outcome of the last game
function end_game (show) {
    game_end = 1;
   
    games_played++;
    
    win_percentage = wins / games_played * 100;
    
    if(show) {
        show_cards();
        alert("You " + win_lose_tie + "!");
        document.getElementById("dealer-score").innerHTML = dealer_total;
        document.getElementById("my-score").innerHTML = my_total;
        document.getElementById("win-percentage").innerHTML = win_percentage;
    }
    
    dealed = 0;
    aces = 0;
    bust = 0;
    win_lose_tie = 0;
    
    my_total = 0;
    dealer_total = 0;
    
    my_cards_index = 0
    dealer_cards_index = 0;
    
    my_cards.length = 0;
    dealer_cards.length = 0;
}

//fills the cards array with random numbers between 1 and DSIZE
function shuffle() {

    //fills initial array
     for(var j = 0; j <= DSIZE; j++) {
        cards_init[j] = j + 1 ;
    }
    
    var randomcard;
    
    for(var i = 0; i < DSIZE; i++) {
        randomcard = Math.round(Math.random() * (DSIZE - i - 1)); //chooses random card index
        cards[i] = cards_init[randomcard]; //stores random card
        cards_init.splice(randomcard, 1);  //pack array
    }

    card_index = 0;
    //sets shuffled to 1 so you know you've shuffled
    shuffled = 1;
}


//determines whether or not to count aces as high or low
function recalculate(total, aces) {
    while(total > 21) {
        if(aces != 0) {
            total = total - 10;
            aces--; 
        }
        else return total;
    }
    return total;
}

//takes all of the cards in the deck and adds the values and returns the total
function add_up_cards(deck) {
    var total = 0;
    var addend = 0;
    var aces = 0;
    for(var i = 0; i < deck.length; i++) {
        addend = calculate(deck[i]);
        total = total + addend;
        
        if(deck[i] <= 4) {
            aces++;
        }
    }
    
    if(aces > 0 && total > 21) {
            total = recalculate(total, aces);
        }
    
    return total; 
}

//checks to see if either the dealer or the player has busted and then ends the game if so
function check_bust(show) {
    
    if(dealer_total > 21) {
        wins++;
        win_lose_tie = "win! Dealer bust";
        end_game(show);
    }
    
    if(my_total > 21) {
        win_lose_tie = "bust";
        end_game(show);
    }
  
}

//associates the png card files with the numbers in the card arrays
function show_cards() {
    var dealer_string = "", my_string = "";
    
    //show dealers cards 
    for(var i = 0; i < dealer_cards.length; i++) {
        dealer_string = dealer_string + "<img src = '" + dealer_cards[i] + ".png' />";
    }
    
    //shows players cards
    for(var j = 0; j < my_cards.length; j++) {
        my_string = my_string + "<img src = '" + my_cards[j] + ".png' />";
    }
    
    //fills the space with the cards
    document.getElementById("dealer-space").innerHTML = dealer_string;
    document.getElementById("my-space").innerHTML = my_string;
    
}


//deals two cards to dealer and to the player
function deal(show) {
    //resets game variable on start of new deal
    game_end = 0;
    
    dealer_cards.length = 0;
    
    dealer_score = 0;
    my_score = 0;
    
    
    if(dealed == 1) {
        alert("You can only deal once per game!");
        return;
    }
    
    if(shuffled != 1) {
        shuffle();
    }
    
    //shuffles cards when there is less than 20% of cards left
    if(card_index > 42) {
        shuffle();
    } 
    
    dealed = 1;
    
    //you get two cards
    my_cards[0] = (cards[card_index]);
    card_index++;
    my_cards_index++;
    my_cards[1] = (cards[card_index]);
    card_index++;
    my_cards_index++;
    
    //dealer gets two cards
    dealer_cards[0] = (cards[card_index]);
    card_index++;
    dealer_cards_index++;
    dealer_cards[1] = (cards[card_index]);
    card_index++;
    dealer_cards_index++;
    
    //gets total cards
    my_total = add_up_cards(my_cards);
    dealer_total = add_up_cards(dealer_cards);
    
    
      //if we are outputting to screen, show the stats
    if(show) {
        document.getElementById("dealer-score").innerHTML = dealer_total;
        document.getElementById("my-score").innerHTML = my_total;
        show_cards(); 
    }  
    
    //checks for blackjack
    if(my_total == 21 && dealer_total != 21) {
        win_lose_tie = "got BLACKJACK!"
        end_game(show);
    }
    //if you didn't get blackjack, check for busts
    if(!game_end) {
        check_bust(show);
    }
    
  
}

//adds a card to players hand and checks if they bust
function hit(show) {
    //ensures you don't hit before you have cards
    if(dealed != 1) {
        alert("Please press deal before hit!");
        return;
    }
    //if you run out of cards, reshuffle
    if(card_index == 51) {
        shuffle();
    } 
    
    //add cards to players deck
    my_cards[my_cards_index] = cards[card_index];
    
    my_cards_index++;
    card_index++;
    
    my_total = add_up_cards(my_cards);
    
    if(show) {
        document.getElementById("my-score").innerHTML = my_total;
        show_cards();
    }
    
    if(!game_end) {
        check_bust(show);
    }
}

//adds cards to dealer until they get to at least 17
//then calculates which player wins
function stay(show) {
    if(dealed != 1) {
        alert("Please press deal before stay!");
        return;
    }
    
    while(dealer_total < 17) {
        
        if(card_index == 51) {
            shuffle();
        } 
        dealer_cards[dealer_cards_index] = cards[card_index];
        card_index++;
        dealer_cards_index++;
        
        dealer_total = add_up_cards(dealer_cards);
        
        if(show) {
            document.getElementById("dealer-score").innerHTML = dealer_total;
            show_cards();
        }
        if(!game_end) {
            check_bust(show);
        }
        
    }
    
    if(game_end) {
        return;
    }
    else {
        if(my_total > dealer_total) {
            wins++;
            win_lose_tie = "win";
      
        }
        else if (dealer_total > my_total) {
            win_lose_tie = "lose";
     
        }
    
        else {
            wins++;
            win_lose_tie = "tie";
      
        }
    
        end_game(show);
        
    }
    
}

//runs game 1000 times and returns win percentage
function run1000times() {
    console.log("running 100 times!");
    
    reset();
    
    while(games_played < 1000) {
        
        if(dealed == 0) {
            deal(0);
        }
        
        else {
            if(dealer_total >= 17 && my_total >= dealer_total) {
                stay(0);
            }
            
            else if(my_total >= 12) {
                stay(0);
            }
            
            else {
                hit(0);
            }
        }
    }
    
    alert("Win Percentage " + win_percentage + "%");
    reset();
}
