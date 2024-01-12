// Global Variable declaration
let TotalNumberOfDrinks =0;
let TotalOrderCost = 0;
let DrinkArray = [];

// Drink Cost Data
let DrinkCostLarge = 2.85;
let DrinkCostMedium = 2.65;
let DrinkCostSmall = 2.45;
let ExtraCream = 0.50;
let SyrupShot = 0.25;

// Drink Object Declaration
class Drink{
    constructor(DrinkSize, DrinkType, MilkRequired, MilkTypeRequired, SugarRequired, CreamRequired, ExtraCreamCount, SyrupRequired, SyrupShotCount){
        //Drink Stats
        this.DrinkSize = DrinkSize;
        this.DrinkType = DrinkType;
        this.MilkRequired = MilkRequired;
        this.MilkTypeRequired = MilkTypeRequired;
        this.SugarRequired = SugarRequired;
        this.CreamRequired = CreamRequired;
        this.ExtraCreamCount = ExtraCreamCount;
        this.SyrupRequired = SyrupRequired;
        this.SyrupShotCount = SyrupShotCount;

        //Calculated Variables
        this.TotalDrinkCost = 0;
        this.IsFavourite = false;
    }

    CalculateTotalDrinkCost(){
        // Calculate the total cost of the drink
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

    GetDrinkCost(){
        this.CalculateDrinkCost();
        return(this.TotalDrinkCost)
    }
}

// Document Element Gathering
let DrinkSizeSelection = document.querySelectorAll("input[name='DrinkSizeSelection']");
for (let i = 0; i < DrinkSizeSelection.length; i++) {
    DrinkSizeSelection[i].addEventListener("change", SelectDrinkSize);
}

let DrinkTypeSelection = document.querySelectorAll("input[name='DrinkTypeSelection']");
for (let i = 0; i < DrinkTypeSelection.length; i++) {
    DrinkTypeSelection[i].addEventListener("change", SelectDrinkType);
}

let MilkTypeSelection = document.querySelectorAll("input[name='MilkTypeSelection']");
for (let i = 0; i < MilkTypeSelection.length; i++) {
    MilkTypeSelection[i].addEventListener("change", SelectMilkType);
}

let ExtrasSelection = document.querySelectorAll("input[name='ExtrasSelection']");
for (let i = 0; i <ExtrasSelection.length; i++) {
    ExtrasSelection[i].addEventListener("click", ExtrasTypeSelection);
}

let MilkRequiredCheckbox = document.getElementById("MilkRequired");
MilkRequiredCheckbox.addEventListener("click", SelectWhetherMilkRequired);

let SyrupQuantity = document.getElementById("SyrupQuantity");
SyrupQuantity.addEventListener("change", GetSyrupQuantity);

let AddToOrderButton = document.getElementById("AddToOrder");
AddToOrderButton.addEventListener("click", AddToOrder);

let PlaceOrderButton = document.getElementById("PlaceOrder");
PlaceOrderButton.addEventListener("click", PlaceOrder);

let ClearOrderButton = document.getElementById("ClearOrder");
ClearOrderButton.addEventListener("click", ClearOrder);

let OrderSummaryTable = document.getElementById("OrderSummaryTable");

let OrderTotalText = document.getElementById("OrderTotalText");

// Document Element Functions

function SelectDrinkSize(){
    if (this.value === "S"){
        console.log("Required Drink Size: SMALL");
        // Append new drink size to current drink object in array and recalculate price
        DrinkArray[TotalNumberOfDrinks].DrinkSize = "S";
        DrinkArray[TotalNumberOfDrinks].CalculateDrinkCost();

    }
}