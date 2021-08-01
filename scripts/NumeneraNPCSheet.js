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

Actors.registerSheet("cypher", NumeneraNPCSheet, {
	types: ["NPC"],
	makeDefault: true
})