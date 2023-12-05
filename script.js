let swooshSound = new Audio('sounds/swish_quiet.mp3')

let cardPack = [ 
  "1.png","2.png","3.png","4.png",
  "5.png","6.png","7.png","8.png",
  "9.png","10.png","11.png","12.png",
  "13.png","14.png","15.png","16.png",
  "17.png","18.png","19.png","20.png",
  "21.png","22.png","23.png","24.png",
  "25.png","26.png","27.png","28.png",
  "29.png","30.png","31.png","32.png",
  "33.png","34.png","35.png","36.png",
  "37.png","38.png","39.png","40.png",
  "41.png","42.png","43.png","44.png",
  "45.png","46.png","47.png","48.png",
  "49.png","50.png","51.png","52.png",]

  // FETCHING AUTO SOLVE SCENARIO LAYOUT FOR TESTING SOLVE BUTTON - 

  // variables for foundation trackers and drop pile trackers in solve scenario

  // variables for testing solve scenario
let dropPilesScenario = [];
let foundationPilesScenario = [];
let exDistributionDrop = [];
let exDistributionPick = [];

// SOLVE SCENARIO FETCH
//   fetch('/solve_scenario.json')
//   .then(res => res.json())
//   .then(data =>{
//     console.log('..fetched data')
//     dropPilesScenario.push(...data.drop_piles)
//     foundationPilesScenario.push(...data.foundations)

// useArrays(dropPilesScenario, foundationPilesScenario)
//   })




// AUTOMATIC SHUFFLING ON PAGE LOAD -------------------------
window.onload = function() {

};



  // AUTOMATIC SOLVABLE DISTRIBUTION FUNCTION STARTS ---------------- 
//   fetch('/solvable_distribution.json')
// .then(res => res.json())
// .then(data =>{
//   console.log('fetched solvable distribution data')
//   console.log(data)
//  exDistributionDrop.push(...data.drop_pile_distribution)
// exDistributionPick.push(...data.pick_pile_distribution)

// distributeSolvable(exDistributionDrop, exDistributionPick)

// })


// Send distribution arrays for rendering
const distributeSolvable = (dropPiles, pickPile) =>{

 
    // send solvable distribution for card distribution
    // showCardPiles(dropPiles[6], dropPiles[5], dropPiles[4], dropPiles[3], dropPiles[2], dropPiles[1], dropPiles[0], pickPile)
  }


  // AUTOMATIC SOLVABLE DISTRIBUTION FUNCTION ENDS ----------------






// undo button element
let undoBtn = document.getElementById('undo-btn')


//variabel to add event listeners to all piles using forEach
var dropPilesEl = document.querySelectorAll('.piles')
// to add event listeners to all foundation piles using forEach
var foundationPilesEl = document.querySelectorAll('.foundation-pile')

// to adjust game container afer deal button disappears, giving more space for the game. 

let gameContainerEl = document.getElementById('game-container')
// the below two functions are used to indicate whether the mouse button is pressed down or not. So in the multiReset function we can reset things more quickly if the mousup is the the value that we will be reading at mouseDownArr[0]

// ORIENTATION OF PAGE  - since the wrapper behaviour doesn't change appropriately when orientation is changed to portrait, I'll use this code to check orientation and, depending on what the orientation is, we can then use an appropriate wrapper for either portrait or landscape. - so if winW < winH we're in portrait and if winW > winH we're in landscape

let winW;
let winH;
let winCalc;





var mouseDownArr = []
var mouseDown = 0;
document.body.onmousedown = function() { 
  mouseDown = 1;
  mouseDownArr.unshift(mouseDown)
  // console.log(
    
  // )
}
document.body.onmouseup = function() {
  mouseDown = 0;
  mouseDownArr.unshift(mouseDown)
  // console.log(mouseDownArr)
}




// seven pile elements
var pileOne = document.getElementById('pile-one');
var pileTwo = document.getElementById('pile-two');
var moveButtonEl = document.getElementById('drag-drop-btn')
var movingCardsEl; // for the variables once cards are loaded


// GET POSITION OF PILES RELATIVE TO THE VIEWPORT
let pileOnePosition = pileOne.getBoundingClientRect()
let pileTwoPosition = pileTwo.getBoundingClientRect()


// object to keep x/y position of each pile:  I've used 'let' because, in the current iteration of the game, the piles shift slightly when a pile containing a single card has its card removed, or when an empty pile has a card added to it. But just checking these work. 
let pileOnePositionObj = {
  'pile_name':'pile-one',
  'x': pileOnePosition.x,
  'y': pileOnePosition.y
}


let pileTwoPositionObj = {
  'pile_name':'pile-two',
  'x': pileTwoPosition.x,
  'y': pileTwoPosition.y
}



// if window size changes and the x/y values of piles one and two will not represent the original values given above, the pile positions will need to be recalculated. the original objects which contain the x/y positions of each pile will also need to be recalculated, because
window.addEventListener('resize', () =>{

// get client positions for piles in resized window
pileOnePosition = pileOne.getBoundingClientRect()
pileTwoPosition = pileTwo.getBoundingClientRect()

// get x/y values for pile one
pileOnePositionObj = {
  'pile_name':'pile-one',
  'x': pileOnePosition.x,
  'y': pileOnePosition.y
}

// get x/y values for pile two
pileTwoPositionObj = {
  'pile_name':'pile-two',
  'x': pileTwoPosition.x,
  'y': pileTwoPosition.y
}
})




// arrays associated with each drop target
let origArr = []; 
let halfArr = [];
let destArr = [];
let shuffleArr = [];
let newArr; // we'll use this to shift the array elements from the waste array to the remain array

// arrays for the piles
let pileOneArr;
let pileTwoArr;
let pileThreeArr;
let pileFourArr;
let pileFiveArr;
let pileSixArr;
let pileSevenArr;
let remainingCardsArr;
let wastArr = []

let allPileElements = [pileOne, pileTwo]
// this array stores the trails of cards in a solutions; the order in which they moved from their drop pile positions to foundation array positions.  This array will be used as the source for moving the HTML elements when the auto complete button is clicked when a solution is available. 
let solutionMapArray = []


let clickedFoundationArr = []


// create some arrays which will take images associated with the values in the piles array... so pileOneArr will have an array associated with it that will, for each index value, have an associated url  to the image associated with that value
let pileOneImgArr = [];
let pileTwoImgArr = [];


// array to store selected cards and parent pile for multiple drag
let selectArray = []
// this array is for all of the id's of each element
let dragIdArray = []

// contains data in multi drag cards 
let dataArray = []

// card tracking objects temporarily pushed to this array, pending drop status; if drop fails, this array is emptied of the temporary card; if drop succeeds, then the card in the array is pushed to the breadcrumb array, after which it is deleted from this temporary array
let tempDragCardArr = []
let tempGroupElementsArr = []
let tempGroupObjectsArray = []

// each subarray represents one of each of the drop piles
var pileImgArrays = [ pileOneImgArr, pileTwoImgArr]

var secondLastChildArr = [] // Takes the details of the first .face-down card from bottom. If it is exposded, by lifting the card(s) covering it and dropping them elsewhere, its class will be changed to .face-up, causing it to flip and to face upward. 







// ----------------- TRACKING ARRAYS ---------------------------

// arrays to keep track of cards in each pile - these are populated with integer values representing card values of each corresponding drop pile
let dropPileOne = []

let dropPileTwo = []


let dropPileTracker; // to hold the above arrays


let wasteCardTracker = []
let pickCardTracker = []

let breadcrumbArray = []



let allTrackers;

let pileNavigation = ['pile-one', 'pile-two' ]

dropPileTracker = [dropPileOne, dropPileTwo]
let foundationNavigation = ['foundation-one', 'foundation-two']
// ----------------------------------------------------  





// for when multiple cards are dragged
const dragstartMulti = (event) =>{
// console.log('hello')
event.target.style.width = '8.5vw'
event.dataTransfer.setData("text/plain", event.target.id)
setTimeout(() => {
  event.target.classList.add('hide')

}, 1);
}

// for when multiple cards are dropped
const dragendMulti = (event) =>{
  
  // console.log('dragging ended')
  
  }
  



// BEGIN DRAG
const dragStart = (event) =>{
  //let card = event.target;
  event.target.classList.add('dragging')
 event.dataTransfer.setData("text/plain", event.target.id);
// the class added causes the dragged card to be highighted with a red solid 4px border

}

// STOP DRAG
const dragEnd = (event) =>{
  event.target.classList.remove('dragging')

 
}


// ENTER DROP TARGET
const dragEnter = (event) =>{
  event.target.classList.add('enter')
// the class added causes the target pile to be highighted with a red solid 4px border
}

// DRAG OVER DROP TARGET
const dragOver = (event) =>{
   event.preventDefault();
 
}


// LEAVE DROP TARGET
const dragLeave = (event) =>{
  // NOTE, the event target is the PILE
  event.target.classList.remove('enter');// gets rid of highlight
}
 



// once all cards are face up and there are no remaining pick cards, this array will be mapped and used configure a pathway from current game state to completed game state
// let allCurrentPilesArray = [currentPileOne, currentPileTwo, currentPileThree, currentPileFour, currentPileFive, currentPileSix, currentPileSeven]



// variables for card elements in each pile
let pileOneChildren = pileOne.childNodes
let pileTwoChildren = pileTwo.childNodes


// array of pile cards which will be mapped through to get the id of each card in a given pile.
let allPilesArray = [pileOneChildren, pileTwoChildren]






// APPEND DRAG CARD

// create a card element
let dragCard = document.createElement('img')
let imgId = '2.png'
let imgClass = 'foundationCardEl'
dragCard.classList.add(imgClass)
dragCard.src = 'images/' + imgId
dragCard.setAttribute('id', imgId)
dragCard.setAttribute('draggable', true)
dragCard.classList.add('card-transition')
dragCard.classList.add('duration-1')
dragCard.addEventListener('dragstart', dragStart)
dragCard.addEventListener('dragend', dragEnd)
pileOne.append(dragCard)

// CREATE OBJECT TO PASS BETWEEN THE TWO PILES
let cardObj = {

  primary_card: {
    card:parseInt(dragCard.id),
    origin:'pile-one',
    destination:'',
    group_elements:''
  }, 
  
  total_selected: '', 
when_flipped: '', 
when_moved: '',
  principal_origin: 'pile-one'
  }
dropPileOne.push(cardObj)





let newCard;
let pileName;
let endCoordinates;
let cardX;
let cardY;
let xTranslation;
let yTranslation;
// click event listener for moving card from pile to pile
moveButtonEl.addEventListener('click', () =>{

// FIRST FIND OUT WHICH PILE THE CARD IS IN
allPileElements.forEach(pile =>{
  if(pile.childNodes.length > 0){
    pileName = pile.id

  }else{
    // do nothing, the pile is contains no card
  }


})
  // after loop is finished append use condition to append the card to the empty pile
// clone the card in the pile
// newCard = pile.firstChild.cloneNode('false')
if(pileName == 'pile-one'){
// get card coords
let cardCoords = pileOne.firstChild.getBoundingClientRect()


// get card coordinates prior to card move
cardX = cardCoords.x;
cardY = cardCoords.y;

// get destination pile coordinates
destinationX = pileTwoPositionObj.x
destinationY = pileTwoPositionObj.y


xTranslation = destinationX - cardX + 17
yTranslation = destinationY - cardY



  // move the card the distance to the empty pile
  pileOne.firstChild.style.transform = `translateX(${xTranslation}px)`
  swooshSound.play()
  // the x translation is positive
setTimeout(() => {
  // append the card and remove translation
  pileOne.firstChild.style.transform = `translateX(${0}px)`
  pileTwo.appendChild(pileOne.firstChild)

}, 402);
  // pileTwo.appendChild(pileOne.firstChild)



 }else{

// get card coords
let cardCoords = pileTwo.firstChild.getBoundingClientRect()

// get card coordinates prior to card move
cardX = cardCoords.x;
cardY = cardCoords.y;

// get destination pile coordinates
destinationX = pileOnePositionObj.x
destinationY = pileOnePositionObj.y


// 


xTranslation = destinationX - cardX + 17
yTranslation = destinationY - cardY


    // the x translation is negative

  // move the card the distance to the empty pile
  pileTwo.firstChild.style.transform = `translateX(${xTranslation}px)`
swooshSound.play()
  // the x translation is positive
setTimeout(() => {
  // append the card and remove translation
  pileTwo.firstChild.style.transform = `translateX(${0}px)`
  pileOne.appendChild(pileTwo.firstChild)

}, 450);
  // pileTwo.appendChild(pileOne.firstChild)




 }



})


// DROP TO TARGET
const drop = (event) =>{

 event.target.style.opacity = "1";

  // remove pile highlight
  event.target.classList.remove('enter')

 
    // the rest of the function can only continue if data can be extracted from event.dataTransfer (if the card fails to drop, there will be no data available so we want to prevent an attempt to use the data to find the drop object id)

  // THIS COULD BE IN A FUNCTION 
  // get id data from dragged card
  // console.log('checking data transfer object')
  // console.log(event)


  if(event.dataTransfer.getData("text/plain")){
  const id = event.dataTransfer.getData("text/plain");
  let dataTransferArray = []
dataTransferArray.push(id)
  // create new object using id 
  const newObj = document.getElementById(id);

  // IF OBJECT DOES NOT DROP, THEN HALT DON'T RUN THE REST OF THE FUNCTION AND RENDER THE ALERT
  if(newObj == null){
    alert('card was not dropped')
  }else{
// console.log('card dropped successfully')

  
// console.log('new object test')
// console.log(newObj)
 



// variable for destination pile
let destinationTracker;
// variable for card object
let trackingObject;

// variable for destination name
let destinationPileName

// variable for destination pile
let originTracker;
// variable for origin name
let originPileName

let destinationPile = event.srcElement
// console.log('destination pile')
// console.log(destinationPile)
destinationPile.append(newObj)

// //GET ORIGIN AND DESTNATION PILE TRACKER
pileNavigation.forEach((pile, indexOfPile) =>{
  if(pile == destinationPile.id){

  // get destination tracker
destinationTracker = dropPileTracker[indexOfPile]
 // set destination name
destinationPileName = pile
  }else{

originTracker = dropPileTracker[indexOfPile]
originPileName = pile

  }
})

// GET DROP CARD TRACKING OBJECT
dropPileTracker.forEach((pile) =>{
  if(pile.length > 0){
    pile.forEach((object, indexOfObject) =>{
      if(object.primary_card.card === parseInt(newObj.id)){
trackingObject = pile[indexOfObject]
      }
    })
  }
})


trackingObject.primary_card.destination = destinationPileName
trackingObject.primary_card.origin = originPileName
destinationTracker.push(trackingObject)
// REMOVE OBJECT FROM ORIGIN TRACKER
originTracker.pop()

}



  }
else{
    console.log('ID is null, failed card drop - try again')
  }

}





//AUTO SOLVE FUNCTIONS BELOW-------------------------------------



let lastFoundationCard;
let totalCardsAdded = 0;

// temporary function for testing solve scenario; auto solve function seems to be working now - will need to test on several solve scenarios. 
function useArrays(newdrop, newFoundation){

  // dropPileTracker.push(...newdrop)
  // foundationTracker.push(...newFoundation)
}






// add event listeners to all drop piles
dropPilesEl.forEach(function(element){
  element.addEventListener('dragenter', dragEnter)
  element.addEventListener('dragover', dragOver)
  element.addEventListener('dragleave', dragLeave)
  element.addEventListener('drop', drop)
})







// WHEN PILE IS CLICKED draggable cards from clicked card upwards are highlighted ready for dragging
dropPilesEl.forEach(function(cardPile){
  // for each pile add an event listener. 

// PROBLEM SOLVED... 'click' is a combination of 'mousedown' and 'mouseup', so you have to wait for mouseup to happen before the function actually starts running. So by setting the event listener to 'mousedown' everything will start to run as soon as you click down on the mouse.  The function will then decide if the target is draggable, i.e, the actual clicked card, and loop from that card through to the last card if 'draggable:true; '. Then the parent is pushed to the array, and so are the click child.  Then in the select array, they are wrapped and the wrapper is made draggable and highlighted, given an id that corresponds to the value of the clicked card, and is therefore ready for dragging and dropping.  This means that it is impossible to drag a sandwiched draggable card without dragging all of the cards above it.  As opposed to using the click function which requires 'mouseup'; if you tried to drag the card between mousedown and mouseup, then the loop and highlight function would not work so you could drag the card out; but now that's impossible. PROBLEM SOLVED.  Now you just need to check the issues with dragging into the foundation pile to prevent that occuring - we can just specify what type of 'attribute' to disallow from any attempted drop cards.  

// NOTE 2.. we also need to deal with what happens if multiple cards are dropped back into their original pile because you change your mind. You'll need to unwrap them so perhaps we can make the unwrap function separate (which I think we already have; it's the multiReset function) - I think the conditions for this already exist in the drop() frunction, 

// and you need to do multi-reset on from the foundation pile as well. this wasn't an issue before because when draging just one card, which is what we do to drop a card on a foundation pile, it wasn't wrapped in a container, but now even just 'one' selected card is wrapped so we need to unwrap it.  

cardPile.addEventListener('mousedown', (event) => {
  // clear select array on double click 

  //console.log('NEW CARD SELECTED ----------------------------')
  selectArray = []
  dragIdArray = []



  // define pile children, children length, and clicked target
  let children = cardPile.childNodes // cards belonging to pile
  let maxVal = children.length // number of cards
  let target = event.target // clicked card
  let parent = target.parentNode // parent pile
  let attr = target.getAttribute('draggable') // target drag status

//   console.log('children')
// console.log(children)

// console.log('maxVal')
// console.log(maxVal)


// console.log('parent')
// console.log(parent)

// console.log('attr')
// console.log(attr)


let cardValue =  parseInt(target.id)
// console.log('card value')
// console.log(cardValue)


// console.log('origin pile name below:')
// console.log(parent.id)
if(event.target.length > 0){
  // console.log('previous card')
  // console.log(event.target.previousSibling)
}else{
  // console.log('no cards left in pile')
}


// getting the object of the clicked card from the tracking array. 
let pileIndex;
let cardObj


pileNavigation.forEach(pile =>{
  if(pile == parent.id){
 
pileIndex = pileNavigation.indexOf(pile)
// console.log('card objects in tracking subarray of origin pile (minus the moved card - unopened console element will show original number of cards in pile; but opened, the correct total will show')
// console.log(dropPileTracker[pileIndex])
dropPileTracker[pileIndex].forEach(card =>{
if(card.primary_card.card === cardValue){
cardObj = card
// console.log('object of selected card, with destination properties added')
// console.log(cardObj)
}
})
  }
})


// THIS IS FOR CREATING THE DRAGGABLE GROUP
if(attr == "true"){ // if draggable: true; get the HTML element
selectArray.push(parent) // THIS IS THE SELECTED PILE
//$(cardPile).multidraggable()
for(i=0; i < maxVal; i++){ // loop through pile's children (cards)
if(children[i] == target){ // when child[i] is target card

let j;
for(j=i; j<maxVal; j++){ 
// loop through parent pile from child[j] to last child
  children[j].classList.add('multi-style')// style looped children
selectArray.push(j) // push children to array
dragIdArray.push(children[j])
// console.log(dragIdArray)

}}}


cardObj.total_selected = dragIdArray.length
tempDragCardArr.push(cardObj)

// console.log('breadcrumbs - last element is last card moved')
// console.log(tempDragCardArr[0])
// create an object from array entries with the indexes as keys


}else{
console.log('cannot drag a face down card')

}





})
})



