import {
	CypherSystem
} from "../../../systems/cyphersystem/module/cyphersystem.js";
import CypherSystemActorSheet, { CypherActorSheet } from "../../../systems/cyphersystem/module/actor/actor-sheet.js";
import CypherSystemPC from "../../../systems/cyphersystem/module/actor/pc-sheet.js";

export class NumeneraSheet extends CypherSystemPC {
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

Actors.registerSheet("CypherSystem", NumeneraSheet, {
	types:["PC"],
	makeDefault: true
});