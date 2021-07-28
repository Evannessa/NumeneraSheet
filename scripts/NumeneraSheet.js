// import {
	// CypherSystem
// } from "../../../systems/cyphersystem/module/cyphersystem.js";
// import CypherSystemActorSheet, { CypherActorSheet } from "../../../systems/cyphersystem/module/actor/actor-sheet.js";
import {CypherActorSheetPC} from "../../../systems/cyphersystem/module/actor/pc-sheet.js";
// import NumeneraSheet from "templates\NumeneraSheet.html"
export class NumeneraSheet extends CypherActorSheetPC {
	get template() {
		return "modules/NumeneraSheet/templates/NumeneraSheet.html";
	}
	static get defaultOptions() {


		return mergeObject(super.defaultOptions, {

		})
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

}

Hooks.on('renderActorSheet', (app, html, data) => {
	let expandButtons = Array.from(html.find(".expand-toggle"));
	for(let expandButton of expandButtons){
		expandButton.addEventListener("click", toggleExpandClass)
	}
	let cards = Array.from(html.find(".card"))
	for(let card of cards){
		if(card.querySelector(".expand-toggle") !=null){
			if(!card.classList.contains("expanded")){
				card.querySelector(".panel").prepend(returnOverlayHTML())
			}
		}
	}
	let recoveryButton = Array.from(html.find("#recovery"))[0]
	recoveryButton.addEventListener("click", ()=> game.cyphersystem.recoveryRollMacro(data.actor))
	
});

function toggleExpandClass(event){
	console.log(event.target)
	console.log(event.currentTarget)
	// if(event.target !== this || event.target != ){
		// return;
	// }
	var button = event.currentTarget;
	//switch the icon
	if(button.firstChild.className == "fas fa-chevron-circle-down"){
		button.firstChild.className = "fas fa-chevron-circle-up";
	}
	else{
		button.firstChild.className = "fas fa-chevron-circle-down";
	}

	//get the card parent, add expanded class
	var cardParent = button.closest(".card")
	cardParent.classList.toggle("expanded");

	//get the, add overlay
	var panel = cardParent.querySelector(".panel")
	var overlay = panel.querySelector(".panel-overlay")
	if(cardParent.classList.contains("expanded")){
		panel.removeChild(overlay);
	}
	else{
		panel.prepend(returnOverlayHTML())
	}
}

function returnOverlayHTML(){
	const overlay = document.createElement('div');
	overlay.className = "panel-overlay"
	return overlay
}


Actors.registerSheet("cypher", NumeneraSheet, {
	types:["PC"],
	makeDefault: true
});