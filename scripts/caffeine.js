// caffeine.js - WDOS Assignment JS application - Matthew Boyce - B018567J - 15/05/2020
// v3.0

// Global Variable Declaration
let TotalNumberOfDrinks = 0;
let TotalCostOfOrder = 0;
let DrinkSizeSection = document.getElementById("DrinkSizeSelection");
let DrinkTypeSection = document.getElementById("DrinkTypeSelection");
let MilkSection = document.getElementById("Milk");
let ExtrasSection = document.getElementById("Extras");

// Local storage constants
const FAVOURITE_DRINK_KEY = "FavouriteDrink";
const TOTAL_DRINKS_ORDERED = "TotalDrinksOrdered";

// Main drink array - Holds each Drink() object in a list.
///////////////////////
let DrinkArray = [];
///////////////////////

//Drink Cost Data (JSON?)
let DrinkCostLarge = 2.85;
let DrinkCostMedium = 2.65;
let DrinkCostSmall = 2.45;
let ExtraCream = 0.50;
let SyrupShot = 0.25;

//Drink Variables - Old, left here for reference
let CoffeeSize = ""; // AVAILABLE: "S", "M", "L"
let CoffeeType = ""; // AVAILABLE: "LATTE", "CAPPUCINO", "FLATW", "ESPRESSO", "AMERICANO"
let MilkType = "";   // AVAILABLE: "WHOLE", "SEMI", "SKIMMED", "COCONUT", "SOYA"
let IsMilkRequired = false;  // AVAILABLE: true, false
let IsSugarRequired = false; // AVAILABLE: true, false
let IsCreamRequired = false; // AVAILABLE: true, false
let IsSyrupRequired = false; // AVAILABLE: true, false
let SyrupRequiredQuantity = 0; // AVAILABLE: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
let TotalCostOfDrink = 0;

// Drink Object Declaration
// Every drink object stores information about the type of drink and it's price
class Drink {
    constructor(DrinkSize, DrinkType, MilkRequired, MilkTypeRequired, SugarRequired, CreamRequired, ExtraCreamCount, SyrupRequired, SyrupShotCount){
        // Drink Stats
        this.DrinkSize = DrinkSize;
        this.DrinkType = DrinkType;
        this.MilkRequired = MilkRequired;
        this.MilkTypeRequired = MilkTypeRequired;
        this.SugarRequired = SugarRequired;
        this.CreamRequired = CreamRequired;
        this.ExtraCreamCount = ExtraCreamCount;
        this.SyrupRequired = SyrupRequired;
        this.SyrupShotCount = SyrupShotCount;

        // Calculated Variables
        this.TotalDrinkCost = 0;
        this.IsFavourite = false;
        this.DrinkStatsArray = [];
        //is.DrinkStatsArray = ["DrinkSize","DrinkType","MilkRequired","MilkTypeRequired","SugarRequired","CreamRequired","ExtraCreamCount","SyrupRequired","SyrupShotCount"];
    }

    //Calculates the total cost of the drink object
    CalculateDrinkCost(){
        //Add Size of drink
        this.TotalDrinkCost = 0;
        if(this.DrinkSize === "L") {
            this.TotalDrinkCost += DrinkCostLarge;
        }else if(this.DrinkSize === "M") {
            this.TotalDrinkCost += DrinkCostMedium;
        }else if(this.DrinkSize === "S") {
            this.TotalDrinkCost += DrinkCostSmall;
        }
        //Add Extra Cream, if applicable
        if(this.CreamRequired === true) {
            this.TotalDrinkCost += ExtraCream;
        }

        //Add Syrup shots and quantity, if applicable
        if(this.SyrupShotCount  !== 0) {
            this.TotalDrinkCost += this.SyrupShotCount * SyrupShot
        }
    }

    GetDrinkStatsArray(){
        return (this.DrinkStatsArray);
    }

    GetDrinkCost(){
        this.CalculateDrinkCost();
        return(this.TotalDrinkCost);
    }
}

//Document Element Gathering
let DrinkSizeSelection = document.querySelectorAll("input[name='DrinkSizeSelection']");
for (let i = 0; i < DrinkSizeSelection.length; i++) {
    DrinkSizeSelection[i].addEventListener("change", SelectDrinkSize);
}

// Get drink type selection boxes
let DrinkTypeSelection = document.querySelectorAll("input[name='DrinkTypeSelection']");
for (let i = 0; i < DrinkTypeSelection.length; i++) {
    DrinkTypeSelection[i].addEventListener("change", SelectDrinkType);
}

// Get milk type selection boxes
let MilkTypeSelection = document.querySelectorAll("input[name='MilkTypeSelection']");
for (let i = 0; i < MilkTypeSelection.length; i++) {
    MilkTypeSelection[i].addEventListener("change", SelectMilkType);
}

// Get extras selection boxes
let ExtrasSelection = document.querySelectorAll("input[name='ExtrasSelection']");
for (let i = 0; i <ExtrasSelection.length; i++) {
    ExtrasSelection[i].addEventListener("click", ExtrasTypeSelection);
}

// Get milk required checkbox
let MilkRequiredCheckbox = document.getElementById("MilkRequired");
MilkRequiredCheckbox.addEventListener("click", SelectWhetherMilkRequired);

// Get syrup quantity slider
let SyrupQuantity = document.getElementById("SyrupQuantity");
SyrupQuantity.addEventListener("change", GetSyrupQuantity);

// Add to order button
let AddToOrderButton = document.getElementById("AddToOrder");
AddToOrderButton.addEventListener("click", AddToOrder);

// Place order button
let PlaceOrderButton = document.getElementById("PlaceOrder");
PlaceOrderButton.addEventListener("click", PlaceOrder);

// Clear order button
let ClearOrderButton = document.getElementById("ClearOrder");
ClearOrderButton.addEventListener("click", ClearOrder);

// Add favorites button
let AddFavouritesButton = document.getElementById("AddFavourite");
AddFavouritesButton.addEventListener("click", AddDrinkToFavourites);

// Load favourites button
let LoadFavouritesButton = document.getElementById("LoadFavourite");
LoadFavouritesButton.addEventListener("click", LoadFavouriteDrink);

// Order summary table
let OrderSummaryTable = document.getElementById("OrderSummaryTable");

// Total cost of order text
let OrderTotalText = document.getElementById("OrderTotalText");


// Document Element Functions
function SelectDrinkSize() {
    if (this.value === "S") {
        //Prints to console for diagnostic purposes
        console.log("Required Drink Size: SMALL");
        //Append new drink size to current drink in array and recalculate price
        DrinkArray[TotalNumberOfDrinks].DrinkSize = "S";
        //Updates total cost of drink based on new data
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
        //Refreshes the display to show/hide next element on page
        DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
    }else if (this.value === "M") {
        console.log("Required Drink Size: MEDIUM");
        DrinkArray[TotalNumberOfDrinks].DrinkSize = "M";
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
        DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
    }else if (this.value === "L") {
        console.log("Required Drink Size: LARGE");
        DrinkArray[TotalNumberOfDrinks].DrinkSize = "L";
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
        DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
    }
}

function SelectDrinkType(){
    if (this.value ==="LATTE"){
        console.log("Required Drink Type: LATTE");
        DrinkArray[TotalNumberOfDrinks].DrinkType = "LATTE";
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
        DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
    }else if (this.value === "CAPPUCINO") {
        console.log("Required Drink Type: CAPPUCINO");
        DrinkArray[TotalNumberOfDrinks].DrinkType = "CAPPUCINO";
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
        DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
    }else if (this.value === "FLATW") {
        console.log("Required Drink Type: FLAT WHITE");
        DrinkArray[TotalNumberOfDrinks].DrinkType = "FLATW";
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
        DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
    }else if (this.value === "ESPRESSO") {
        console.log("Required Drink Type: ESPRESSO");
        DrinkArray[TotalNumberOfDrinks].DrinkType = "ESPRESSO";
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
        DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
    }else if (this.value === "AMERICANO") {
        console.log("Required Drink Type: AMERICANO");
        DrinkArray[TotalNumberOfDrinks].DrinkType = "AMERICANO";
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
        DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
    }

}

function SelectMilkType(){
    if (this.value === "WHOLE"){
        console.log("Required Milk Type: WHOLE");
        DrinkArray[TotalNumberOfDrinks].MilkTypeRequired = "WHOLE";
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
        DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
    }else if (this.value === "SEMI"){
        console.log("Required Milk Type: SEMI");
        DrinkArray[TotalNumberOfDrinks].MilkTypeRequired = "SEMI";
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
        DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
    }else if (this.value === "SKIMMED"){
        console.log("Required Milk Type: SKIMMED");
        DrinkArray[TotalNumberOfDrinks].MilkTypeRequired = "SKIMMED";
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
        DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
    }else if (this.value === "COCONUT") {
        console.log("Required Milk Type: COCONUT");
        DrinkArray[TotalNumberOfDrinks].MilkTypeRequired = "COCONUT";
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
        DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
    }else if (this.value === "SOYA"){
        console.log("Required Milk Type: SOYA");
        DrinkArray[TotalNumberOfDrinks].MilkTypeRequired = "SOYA";
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
        DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
    }

}

function ExtrasTypeSelection(){
    if (this.id === "SugarRequired"){
        if (this.checked === true) {
            console.log("Sugar Required");
            DrinkArray[TotalNumberOfDrinks].SugarRequired = true;
            DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
            DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
        }else if (this.checked === false) {
            console.log("Sugar NOT Required");
            DrinkArray[TotalNumberOfDrinks].SugarRequired = false;
            DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
            DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
        }
    }else if (this.id === "CreamRequired"){
        if (this.checked === true) {
            console.log("Cream Required");
            DrinkArray[TotalNumberOfDrinks].CreamRequired = true;
            DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
            DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
        }else if (this.checked === false) {
            console.log("Cream NOT Required");
            DrinkArray[TotalNumberOfDrinks].CreamRequired = false;
            DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
            DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
        }
    }else if (this.id === "SyrupRequired"){
        if (this.checked === true) {
            console.log("Syrup Required");
            DrinkArray[TotalNumberOfDrinks].SyrupRequired = true;
            DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
            DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
        }else if (this.checked === false) {
            console.log("Syrup NOT Required");
            DrinkArray[TotalNumberOfDrinks].SyrupRequired = false;
            DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
            DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
        }
    }
}

function SelectWhetherMilkRequired(){
    if (this.checked === true){
        DrinkArray[TotalNumberOfDrinks].MilkRequired = true;
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
        console.log("Milk Required");
        DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
    }else if (this.checked === false) {
        DrinkArray[TotalNumberOfDrinks].MilkRequired = false;
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
        console.log("Milk NOT Required");
        DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);
    }

}

function GetSyrupQuantity(){
    console.log("Number of Syrup Shots: " + this.value);
    DrinkArray[TotalNumberOfDrinks].SyrupShotCount = this.value;
    DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();

}



// Display Manager Functions - Deals with hiding/showing elements on the page based on the drink object
function HideElement(elementID) {
    document.getElementById(elementID).style.display = "none";
}

function ShowElement(elementID) {
    document.getElementById(elementID).style.display = "block";
}

// Resets page order controls to "unchecked" state
function ResetOrderControls(){
    var DrinkSizeSelectionElement = document.getElementsByName("DrinkSizeSelection");
    var DrinkTypeSelectionElement = document.getElementsByName("DrinkTypeSelection");
    var MilkTypeSelectionElement = document.getElementsByName("MilkTypeSelection");
    var ExtrasSelectionElement = document.getElementsByName("ExtrasSelection");

// Reset all controls to unchecked
    console.log("Order Controls Reset.");
    for(i=0; i < DrinkSizeSelectionElement.length; i++){
        DrinkSizeSelectionElement[i].checked = false;
    }

    for(i=0; i < DrinkTypeSelectionElement.length; i++){
        DrinkTypeSelectionElement[i].checked = false;
    }

    for(i=0; i < MilkTypeSelectionElement.length; i++){
        MilkTypeSelectionElement[i].checked = false;
    }

    for(i=0; i <ExtrasSelectionElement.length; i++){
        ExtrasSelectionElement[i].checked = false;
    }

    MilkRequiredCheckbox.checked = false;

    HideElement("DrinkTypeSelection");
    HideElement("Milk");
    HideElement("Extras");

}

// Handles the hiding/showing of selection elements based on the status of the last drink object in the DrinkArray.
function DisplayManagerRefresh(DrinkObj) {
    // Status Variables
    let IsDrinkSizeChosen = false;
    let IsDrinkTypeChosen = false;
    let isMilkChosen = false;
    let isMilkTypeChosen = false;

    // Get currently assembled drink stats
    if (DrinkObj.DrinkSize === "N") {
        IsDrinkSizeChosen = false;
    } else if (DrinkObj.DrinkSize !== "N") {
        IsDrinkSizeChosen = true;
    }

    if (DrinkObj.DrinkType === "N") {
        IsDrinkTypeChosen = false;
    } else if (DrinkObj.DrinkType !== "N") {
        IsDrinkTypeChosen = true;
    }

    if (DrinkObj.MilkRequired === false) {
        isMilkChosen = false;
    } else if (DrinkObj.MilkRequired === true) {
        isMilkChosen = true;
    }

    if (DrinkObj.MilkTypeRequired === "N") {
        isMilkTypeChosen = false;
    } else if (DrinkObj.MilkTypeRequired !== "N") {
        isMilkTypeChosen = true;
    }

    //Show/Hide elements based on drink stats
    if (IsDrinkSizeChosen === true) {
        ShowElement("DrinkTypeSelection");
    } else {
        HideElement("DrinkTypeSelection");
    }

    if (IsDrinkTypeChosen === true) {
        if (DrinkObj.DrinkType === "ESPRESSO" || DrinkObj.DrinkType === "AMERICANO"){
            ShowElement("Extras");
        } else {
            ShowElement("Milk");
        }

    } else {
        if (DrinkObj.DrinkType === "ESPRESSO") {
            HideElement("Extras");
        } else {
            HideElement("Milk");
        }
    }

    if (isMilkChosen === false) {
        HideElement("MilkSelectionField");
    } else {
        ShowElement("MilkSelectionField");
    }

    if (isMilkTypeChosen === true) {
        ShowElement("Extras");
    } else {
        HideElement("Extras");
    }
}


// Misc functions
function AddDrinkToFavourites(){
    //Try to clear existing drink if it exists
    try{
        localStorage.removeItem(FAVOURITE_DRINK_KEY);
    }
    catch (err) {

    }

    //Takes latest drink in array
    var DrinkObj = DrinkArray[DrinkArray.length - 1];

    // Temporary storage of drink attributes to parse to localstorage array
    var StoreDrinkSize = DrinkObj.DrinkSize;
    var StoreDrinkType = DrinkObj.DrinkType;
    var StoreMilkType = DrinkObj.MilkTypeRequired;
    var StoreMilkReq = DrinkObj.MilkRequired;
    var StoreSyrupQuant = DrinkObj.SyrupShotCount;
    var StoreSyrupReq = DrinkObj.SyrupRequired;
    var StoreCreamReq = DrinkObj.CreamRequired;
    var StoreSugarReq = DrinkObj.SugarRequired;

    //r StorageArray = ["L/M/S", "COFFEE TYPES", "True/False", "MILKTYPE", "int", "True/False", "True/False", "True/False"];
    var StorageArray = [StoreDrinkSize,
        StoreDrinkType,
        StoreMilkType,
        StoreMilkReq,
        StoreSyrupQuant,
        StoreSyrupReq,
        StoreCreamReq,
        StoreSugarReq];

    //Converts StorageArray into JSON to store in localstorage
    localStorage.setItem(FAVOURITE_DRINK_KEY, JSON.stringify(StorageArray));
    console.log("Added favourite Drink: " + StorageArray);


}

function LoadFavouriteDrink(){
    console.log("Loading favourite drink");
    try{
        TemporaryDrinkArray = JSON.parse(localStorage.getItem(FAVOURITE_DRINK_KEY));
        console.log(TemporaryDrinkArray);
    }
    catch (err) {
        console.log("No favourite drink found.");
        window.alert("No favourite drink found.");
    }

    DrinkArray[DrinkArray.length -1].DrinkSize = TemporaryDrinkArray[0];
    DrinkArray[DrinkArray.length -1].DrinkType = TemporaryDrinkArray[1];
    DrinkArray[DrinkArray.length -1].MilkRequired = TemporaryDrinkArray[2];
    DrinkArray[DrinkArray.length -1].MilkTypeRequired = TemporaryDrinkArray[3];
    DrinkArray[DrinkArray.length -1].SyrupShotCount = TemporaryDrinkArray[4];
    DrinkArray[DrinkArray.length -1].SyrupRequired = TemporaryDrinkArray[5];
    DrinkArray[DrinkArray.length -1].CreamRequired = TemporaryDrinkArray[6];
    DrinkArray[DrinkArray.length -1].SugarRequired = TemporaryDrinkArray[7];
    AddToOrder();

}

//Add to order button actions
function AddToOrder(){
    DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();
    console.log("Added to Order!");
    console.log("Total Number on Order: " + DrinkArray.length);
    TotalNumberOfDrinks += 1;
    // Check if customer has ordered more than ten drinks
    if (localStorage.getItem(TOTAL_DRINKS_ORDERED) >= 10){
        window.alert("Congratulations, you receive a free drink!");
        localStorage.setItem(TOTAL_DRINKS_ORDERED, 0);
        DrinkArray[DrinkArray.length - 1].TotalDrinkCost = 0;
    }
    GenerateNewDrink();
    UpdateOrderSummaryTable(DrinkArray[DrinkArray.length - 2]);
    UpdateTotalOrderPrice();
    ResetOrderControls();
}

// Place order function
function PlaceOrder(){
    window.alert("Thank you for your order! (•ᴗ•)");
    localStorage.setItem("TotalDrinksOrdered", TotalNumberOfDrinks);
    ResetOrderControls();
    ClearOrder();
}

//Clear order button actions
function ClearOrder(){
    console.log("Order Cleared.");
    DrinkArray = [];
    ClearOrderSummaryTable(DrinkArray);
    UpdateTotalOrderPrice();
}

//Updates the total order price indicator on the page
function UpdateTotalOrderPrice(){
    let TotalOrderCost = 0;
    for (index = 0; index < DrinkArray.length; index++){
        try {
            TotalOrderCost += DrinkArray[index].TotalDrinkCost
        }
        catch(err){
        }
    }
    OrderTotalText.innerText = "Total Price: £" + TotalOrderCost;
}

// Handles the order summary table and it's contents
function UpdateOrderSummaryTable(DrinkObj){
    console.log("Updated Order Summary Table.");

    // Get table functions
    var OrderSummaryTableRow = OrderSummaryTable.insertRow(-1);
    let DrinkSizeType = OrderSummaryTableRow.insertCell(0);
    let Extras = OrderSummaryTableRow.insertCell(1);
    let DrinkPriceCell = OrderSummaryTableRow.insertCell(2);

    //Output Drink size and type to the table
    DrinkSizeType.innerHTML = (DrinkObj.DrinkSize + " " + DrinkObj.DrinkType);

    // Generate the text for the extras cell
    let ExtrasCell = "";
    if (DrinkObj.MilkRequired === true){
        ExtrasCell = "Milk ";
    }
    if (DrinkObj.SugarRequired === true){
        ExtrasCell += "Sugar ";
    }
    if(DrinkObj.CreamRequired === true){
        ExtrasCell += "Cream ";
    }
    if (DrinkObj.SyrupRequired === true){
        ExtrasCell += "Syrup"
    }
    Extras.innerHTML = ExtrasCell;

    //Output the total price of the drink
    DrinkPriceCell.innerHTML = DrinkObj.TotalDrinkCost.toFixed(2);
}

// Clears the order summary table when the clear order button is pressed
function ClearOrderSummaryTable(DrinkArray){
    // console.log("Rows: " + OrderSummaryTable.rows.length);
    for (index = 1; index < OrderSummaryTable.rows.length; index++){
        OrderSummaryTable.deleteRow(-1);
        // console.log("cleared row:" + index);
    }
    for (index = 1; index < OrderSummaryTable.rows.length; index++){
        OrderSummaryTable.deleteRow(-1);
        // console.log("cleared row:" + index);
    }
    for (index = 1; index < OrderSummaryTable.rows.length; index++){
        OrderSummaryTable.deleteRow(-1);
        // console.log("cleared row:" + index);
    }
    GenerateNewDrink();
}

// Generates a new drink object at the end of the DrinkArray.
function GenerateNewDrink() {
    console.log("TotalNumberOfDrinks:" + TotalNumberOfDrinks);
    DrinkArray[TotalNumberOfDrinks] = new Drink("N", "N", "false", "N", "false", "false", "0", "false", "0");
}

//On initial run
UpdateTotalOrderPrice();
GenerateNewDrink();
DisplayManagerRefresh(DrinkArray[TotalNumberOfDrinks]);

// Attempt to load TOTAL_DRINKS_ORDERED from Localstorage
try{
    localStorage.getItem(TOTAL_DRINKS_ORDERED);
}
catch (err) {
    localStorage.setItem(TOTAL_DRINKS_ORDERED, 0);
}
