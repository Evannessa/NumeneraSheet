import {
	CypherActorSheetNPC
} from "../../../systems/cyphersystem/module/actor/npc-sheet.js";

export class NumeneraNPCSheet extends CypherActorSheetNPC {
	get template() {
		return "modules/NumeneraSheet/templates/NumeneraNPCSheet.html";
	}
	static get defaultOptions() {

		return foundry.utils.mergeObject(super.defaultOptions, {
			template: "modules/NumeneraSheet/templates/NumeneraNPCSheet.html",
			width: 1000,
			height: false,
			resizable: false,
			// overflow: auto,
		      });
	}
	getData() {
		const data = super.getData();
		return data;
	}
	_createEditor(target, editorOptions, initialContent) {
		editorOptions.min_height = 200;
		super._createEditor(target, editorOptions, initialContent);
	}

	// save all simultaneously open editor field when one field is saved
	async _onEditorSave(target, element, content) {
		return this.submit();
	}
	activateListeners(html) {
		super.activateListeners(html);

		//full rest button click

		let expandButtons = Array.from(html.find(".expand-toggle"));
		for (let expandButton of expandButtons) {
			expandButton.addEventListener("click", (event) => toggleExpandClass(event, this.actor))
		}
		let cards = Array.from(html.find(".card"))
		for (let card of cards) {
			if (card.querySelector(".expand-toggle") != null) {
				//if this isn't set yet, set it to false as default
				if (this.actor.getFlag("world", card.id) == null) {
					this.actor.setFlag("world", card.id, false);
				}
				if (this.actor.getFlag("world", card.id) == true) {
					preExpand(card)
				} else {
					let panel = card.querySelector(".panel")
					panel.prepend(returnOverlayHTML())
				}

			}
		}
	

	
		

	}

}

function changeSlider(select, html){
	// console.log("Slider changed")
	var damage = select.value;
	let damageSlider = Array.from(html.find(".damage__slider"))[0];
	let span = damageSlider.querySelector("span");
	switch(damage){
		case("Hale"):
			span.classList.add("hale")
			break;
		case "Impaired":
			span.classList.add("impaired")
			break;
		case "Debilitated":
			span.classList.add("debilitated")
			break;
		case "Dead":
			span.classList.add("dead")
			break;
	}
	// span.style.width = width;
	// span.style.backgroundColor = color;
}

Hooks.on('renderActorSheet', (app, html, data) => {

	// // if(data.actor.getFlag("world", "scrollX") == null){
	// // 	data.actor.setFlag("world", "scrollX", 0)
	// // }
	// // else{
	// // 	html.find(".stats-section")[0].closest(".window-content").scrollTop = data.actor.getFlag("world", "scrollX")
	// // }
	// if(data.actor.getFlag("world", "Advancement") == null){
	// 	SaveAdvancements(data.actor, html)
	// }

	// let expandButtons = Array.from(html.find(".expand-toggle"));
	// for(let expandButton of expandButtons){
	// 	expandButton.addEventListener("click", (event)=> toggleExpandClass(event, data.actor))
	// }
	// let cards = Array.from(html.find(".card"))
	// for(let card of cards){
	// 	if(card.querySelector(".expand-toggle") !=null){
	// 		//if this isn't set yet, set it to false as default
	// 		if(data.actor.getFlag("world", card.id) == null){
	// 			data.actor.setFlag("world", card.id, false);
	// 		}
	// 		if(data.actor.getFlag("world", card.id) == true){
	// 			preExpand(card)
	// 		}
	// 		else{
	// 			let panel = card.querySelector(".panel")
	// 			panel.prepend(returnOverlayHTML())
	// 		}

	// 	}
	// }
	// let recoveryButton = Array.from(html.find("#recovery"))[0]
	// recoveryButton.addEventListener("click", ()=> game.cyphersystem.recoveryRollMacro(data.actor))

	// populateTiersFromFlags(data.actor, html)
	// let advancementTiers = Array.from(html.find(".tier"));
	// for(let advancementTier of advancementTiers){
	// 	advancementTier.addEventListener("change", ()=>{
	// 		SaveAdvancements(data.actor, html);
	// 	})
	// }
});

function preExpand(card) {
	var button = card.querySelector(".expand-toggle")
	if (button.firstChild.className == "fas fa-chevron-circle-down") {
		button.firstChild.className = "fas fa-chevron-circle-up";
	} else {
		button.firstChild.className = "fas fa-chevron-circle-down";
	}
	//get the card parent, add expanded class
	//if the event is null, we called this method without clicking
	card.classList.add("expanded")
	//if this card has a wrapper, add the wrapper too
	let wrapper = card.closest(".card__wrapper")
	if (wrapper != null) {
		wrapper.classList.add("expanded")
	}

	//get the, add overlay
	// var panel = card.querySelector(".panel")
	// panel.prepend(returnOverlayHTML())
}

function toggleExpandClass(event, actor) {
	var button = event.currentTarget;

	//save scroll position
	// let scrollTop = button.closest(".window-content").scrollTop
	// saveScrollPosition(actor, scrollTop)
	//switch the icon
	if (button.firstChild.className == "fas fa-chevron-circle-down") {
		button.firstChild.className = "fas fa-chevron-circle-up";
	} else {
		button.firstChild.className = "fas fa-chevron-circle-down";
	}

	//get the card parent, add expanded class
	var cardParent = button.closest(".card")

	//if the event is null, we called this method without clicking
	cardParent.classList.toggle("expanded");

	//if this card has a wrapper, add the wrapper too
	let wrapper = cardParent.closest(".card__wrapper")
	if (wrapper != null) {
		wrapper.classList.add("expanded")
	}
	//set a boolean value for if the classlist is expanded
	let expanded = cardParent.classList.contains("expanded")

	actor.setFlag("world", cardParent.id, expanded)
	// console.log(cardParent.id + " expanded is " + actor.getFlag("world", cardParent.id))

	//get the, add overlay
	var panel = cardParent.querySelector(".panel")
	var overlay = panel.querySelector(".panel-overlay")
	if (cardParent.classList.contains("expanded")) {
		panel.removeChild(overlay);
	} else {
		panel.prepend(returnOverlayHTML())
	}
}

function returnOverlayHTML() {
	const overlay = document.createElement('div');
	overlay.className = "panel-overlay"
	return overlay
}




async function CreateFlagForAdvancements(actor) {
	for (let tier of tiers) {
		let inputs = tier.querySelectorAll('input[type=text]')
		var i = 0;
		for (let input of inputs) {
			input.value = advancementArray[i].text
			i++;
		}

	}
	let flagSet = await actor.setFlag("world", "Advancement", [])

}


function SaveAdvancements(actor, thisHTML) {
	//save the scroll position
	// let scrollTop = thisHTML.find(".numeneraoverhaul")[0].closest(".window-content").scrollTop
	// saveScrollPosition(actor, scrollTop)

	//place the arrays into the flag to save them to be reopened next time
	let storedTiers = []

	let tiers = Array.from(thisHTML.find(".tier"));
	for (let tier of tiers) {
		let inputAdvancements = tier.querySelectorAll('input[type=text]')
		var storedInputs = []
		for (let input of inputAdvancements) {
			var newStoredAdvancement = {
				"text": input.value
			}
			storedInputs.push(newStoredAdvancement)
		}
		var tierID = tier.id;
		var key = tierID; //get the key for the property
		var tierObject = {} //create the object
		tierObject[key] = storedInputs; //get the value for the property
		storedTiers.push(tierObject) //push the object to storedTiers
	}

	actor.setFlag("world", "Advancement", storedTiers)
	//clear incentives and objections array  so they are fresh on restart

}

function saveScrollPosition(actor, scrollTop) {
	actor.setFlag("world", "scrollX", scrollTop)
}

function getScrollPosition(actor) {
	return actor.getFlag("world", "scrollX")
}

Actors.registerSheet("cypher", NumeneraNPCSheet, {
	types: ["NPC"],
	makeDefault: true
})