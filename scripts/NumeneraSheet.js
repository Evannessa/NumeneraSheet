// import {
// CypherSystem
// } from "../../../systems/cyphersystem/module/cyphersystem.js";
// import CypherSystemActorSheet, { CypherActorSheet } from "../../../systems/cyphersystem/module/actor/actor-sheet.js";
let groupName = "importantChoice";
let choices = { a: "Choice A", b: "Choice B" };
let chosen = "a";
Hooks.once("init", function () {
    // Actors.unregisterSheet("cypher", CypherActorSheetPC);
    Actors.registerSheet("cypher", NumeneraSheet, {
        types: ["pc"],
        makeDefault: true,
    });
});

function someStuff() {
    const actorData = data.actor;
    const itemLists = data.itemLists;

    // Initialize containers
    const equipment = [];
    const abilities = [];
    const spells = [];
    const abilitiesTwo = [];
    const abilitiesThree = [];
    const abilitiesFour = [];
    const skills = [];
    const skillsTwo = [];
    const skillsThree = [];
    const skillsFour = [];
    const attacks = [];
    const armor = [];
    const lastingDamage = [];
    const powerShifts = [];
    const cyphers = [];
    const artifacts = [];
    const oddities = [];
    const teenSkills = [];
    const teenAbilities = [];
    const teenAttacks = [];
    const teenArmor = [];
    const teenLastingDamage = [];
    const materials = [];
    const ammo = [];
    const recursions = [];
    const tags = [];

    // Iterate through items, allocating to containers
    for (let item of data.items) {
        // let item = item.system;
        item.img = item.img || DEFAULT_TOKEN;

        // Check for hidden item
        let hidden = false;
        if (actorData.system.settings.general.hideArchive && item.system.archived) hidden = true;

        // Check for roll button on level
        if (item.type == "cypher" || item.type == "artifact") {
            if (
                Roll.validate(item.system.basic.level.toString()) &&
                item.system.basic.level &&
                isNaN(item.system.basic.level)
            ) {
                item.system.rollForLevel = true;
            } else {
                item.system.rollForLevel = false;
            }
        }

        // Append to containers
        if (item.type === "equipment" && !hidden) {
            equipment.push(item);
        } else if (item.type === "ammo" && !hidden) {
            ammo.push(item);
        } else if (
            item.type === "ability" &&
            item.system.settings.general.unmaskedForm == "Mask" &&
            !hidden &&
            item.system.settings.general.sorting == "Ability"
        ) {
            abilities.push(item);
        } else if (
            item.type === "ability" &&
            item.system.settings.general.unmaskedForm == "Mask" &&
            !hidden &&
            item.system.settings.general.sorting == "Spell"
        ) {
            spells.push(item);
        } else if (
            item.type === "ability" &&
            item.system.settings.general.unmaskedForm == "Mask" &&
            !hidden &&
            item.system.settings.general.sorting == "AbilityTwo"
        ) {
            abilitiesTwo.push(item);
        } else if (
            item.type === "ability" &&
            item.system.settings.general.unmaskedForm == "Mask" &&
            !hidden &&
            item.system.settings.general.sorting == "AbilityThree"
        ) {
            abilitiesThree.push(item);
        } else if (
            item.type === "ability" &&
            item.system.settings.general.unmaskedForm == "Mask" &&
            !hidden &&
            item.system.settings.general.sorting == "AbilityFour"
        ) {
            abilitiesFour.push(item);
        } else if (
            item.type === "skill" &&
            item.system.settings.general.unmaskedForm == "Mask" &&
            !hidden &&
            item.system.settings.general.sorting == "Skill"
        ) {
            skills.push(item);
        } else if (
            item.type === "skill" &&
            item.system.settings.general.unmaskedForm == "Mask" &&
            !hidden &&
            item.system.settings.general.sorting == "SkillTwo"
        ) {
            skillsTwo.push(item);
        } else if (
            item.type === "skill" &&
            item.system.settings.general.unmaskedForm == "Mask" &&
            !hidden &&
            item.system.settings.general.sorting == "SkillThree"
        ) {
            skillsThree.push(item);
        } else if (
            item.type === "skill" &&
            item.system.settings.general.unmaskedForm == "Mask" &&
            !hidden &&
            item.system.settings.general.sorting == "SkillFour"
        ) {
            skillsFour.push(item);
        } else if (item.type === "attack" && item.system.settings.general.unmaskedForm == "Mask" && !hidden) {
            attacks.push(item);
        } else if (item.type === "armor" && item.system.settings.general.unmaskedForm == "Mask" && !hidden) {
            armor.push(item);
        } else if (item.type === "lasting-damage" && item.system.settings.general.unmaskedForm == "Mask" && !hidden) {
            lastingDamage.push(item);
        } else if (item.type === "power-shift" && !hidden) {
            powerShifts.push(item);
        } else if (item.type === "cypher" && !hidden) {
            cyphers.push(item);
        } else if (item.type === "artifact" && !hidden) {
            artifacts.push(item);
        } else if (item.type === "oddity" && !hidden) {
            oddities.push(item);
        } else if (item.type === "skill" && item.system.settings.general.unmaskedForm == "Teen" && !hidden) {
            teenSkills.push(item);
        } else if (item.type === "ability" && item.system.settings.general.unmaskedForm == "Teen" && !hidden) {
            teenAbilities.push(item);
        } else if (item.type === "attack" && item.system.settings.general.unmaskedForm == "Teen" && !hidden) {
            teenAttacks.push(item);
        } else if (item.type === "armor" && item.system.settings.general.unmaskedForm == "Teen" && !hidden) {
            teenArmor.push(item);
        } else if (item.type === "lasting-damage" && item.system.settings.general.unmaskedForm == "Teen" && !hidden) {
            teenLastingDamage.push(item);
        } else if (item.type === "material" && !hidden) {
            materials.push(item);
        } else if (item.type === "recursion" && !hidden) {
            recursions.push(item);
        } else if (item.type === "tag" && !hidden) {
            tags.push(item);
        }
    }

    // Sort by name
    equipment.sort(byNameAscending);
    abilities.sort(byNameAscending);
    abilitiesTwo.sort(byNameAscending);
    abilitiesThree.sort(byNameAscending);
    abilitiesFour.sort(byNameAscending);
    spells.sort(byNameAscending);
    skills.sort(byNameAscending);
    skillsTwo.sort(byNameAscending);
    skillsThree.sort(byNameAscending);
    skillsFour.sort(byNameAscending);
    attacks.sort(byNameAscending);
    armor.sort(byNameAscending);
    lastingDamage.sort(byNameAscending);
    powerShifts.sort(byNameAscending);
    cyphers.sort(byNameAscending);
    artifacts.sort(byNameAscending);
    oddities.sort(byNameAscending);
    teenSkills.sort(byNameAscending);
    teenAbilities.sort(byNameAscending);
    teenAttacks.sort(byNameAscending);
    teenArmor.sort(byNameAscending);
    teenLastingDamage.sort(byNameAscending);
    materials.sort(byNameAscending);
    ammo.sort(byNameAscending);
    recursions.sort(byNameAscending);
    tags.sort(byNameAscending);

    // Sort by skill rating
    if (this.actor.type == "pc" || this.actor.type == "companion") {
        if (actorData.system.settings.skills.sortByRating) {
            skills.sort(bySkillRating);
            skillsTwo.sort(bySkillRating);
            skillsThree.sort(bySkillRating);
            skillsFour.sort(bySkillRating);
            teenSkills.sort(bySkillRating);
        }
    }

    // Sort by identified status
    cyphers.sort(byIdentifiedStatus);
    artifacts.sort(byIdentifiedStatus);

    // Sort by archive status
    equipment.sort(byArchiveStatus);
    abilities.sort(byArchiveStatus);
    abilitiesTwo.sort(byArchiveStatus);
    abilitiesThree.sort(byArchiveStatus);
    abilitiesFour.sort(byArchiveStatus);
    spells.sort(byArchiveStatus);
    skills.sort(byArchiveStatus);
    skillsTwo.sort(byArchiveStatus);
    skillsThree.sort(byArchiveStatus);
    skillsFour.sort(byArchiveStatus);
    attacks.sort(byArchiveStatus);
    armor.sort(byArchiveStatus);
    lastingDamage.sort(byArchiveStatus);
    powerShifts.sort(byArchiveStatus);
    cyphers.sort(byArchiveStatus);
    artifacts.sort(byArchiveStatus);
    oddities.sort(byArchiveStatus);
    teenSkills.sort(byArchiveStatus);
    teenAbilities.sort(byArchiveStatus);
    teenAttacks.sort(byArchiveStatus);
    teenArmor.sort(byArchiveStatus);
    teenLastingDamage.sort(byArchiveStatus);
    materials.sort(byArchiveStatus);
    ammo.sort(byArchiveStatus);
    recursions.sort(byArchiveStatus);
    tags.sort(byArchiveStatus);

    // Assign and return
    itemLists.equipment = equipment;
    itemLists.abilities = abilities;
    itemLists.abilitiesTwo = abilitiesTwo;
    itemLists.abilitiesThree = abilitiesThree;
    itemLists.abilitiesFour = abilitiesFour;
    itemLists.spells = spells;
    itemLists.skills = skills;
    itemLists.skillsTwo = skillsTwo;
    itemLists.skillsThree = skillsThree;
    itemLists.skillsFour = skillsFour;
    itemLists.attacks = attacks;
    itemLists.armor = armor;
    itemLists.lastingDamage = lastingDamage;
    itemLists.powerShifts = powerShifts;
    itemLists.cyphers = cyphers;
    itemLists.artifacts = artifacts;
    itemLists.oddities = oddities;
    itemLists.teenSkills = teenSkills;
    itemLists.teenAbilities = teenAbilities;
    itemLists.teenAttacks = teenAttacks;
    itemLists.teenArmor = teenArmor;
    itemLists.teenLastingDamage = teenLastingDamage;
    itemLists.materials = materials;
    itemLists.ammo = ammo;
    itemLists.recursions = recursions;
    itemLists.tags = tags;
}

Hooks.on("getJournalSheetHeaderButtons", function (app, buttons) {
    if (app.document.testUserPermission(game.user, 3) && app.object._getSheetClass().name !== "ExcalidrawJournal") {
        buttons.unshift({
            label: "Excalidraw",
            class: "entry-excalidraw",
            icon: "fas fa-pen-alt",
            onclick: async (ev) => _excaRenderSheet(app),
        });
    }
});

import { CypherActorSheetPC } from "../../../systems/cyphersystem/module/actor/pc-sheet.js";
// import NumeneraSheet from "templates\NumeneraSheet.html"
export class NumeneraSheet extends CypherActorSheetPC {
    get template() {
        return "modules/NumeneraSheet/templates/NumeneraSheet.html";
    }
    static get defaultOptions() {
        // return foundry.utils.mergeObject(super.defaultOptions, {})

        return foundry.utils.mergeObject(super.defaultOptions, {
            template: "modules/NumeneraSheet/templates/NumeneraSheet.html",
            width: 1000,
            height: false,
            resizable: true,
            // overflow: auto,
        });
    }
    async getData() {
        const data = await super.getData();
        console.log(data);
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
        html.find(".rest").click((clickEvent) => {
            this.actor.update({
                "system.pools.might.value": this.actor.system.pools.might.max,
                "system.pools.speed.value": this.actor.system.pools.speed.max,
                "system.pools.intellect.value": this.actor.system.pools.intellect.max,
                "system.damage.damageTrack": "Hale",
            });
        });
        if (!this.actor.getFlag("world", "Advancement")) {
            SaveAdvancements(this.actor, html);
        }

        let expandButtons = Array.from(html.find(".expand-toggle"));
        for (let expandButton of expandButtons) {
            expandButton.addEventListener("click", (event) => toggleExpandClass(event, this.actor));
        }
        let cards = Array.from(html.find(".card"));
        for (let card of cards) {
            if (card.querySelector(".expand-toggle") != null) {
                //if this isn't set yet, set it to false as default
                if (this.actor.getFlag("world", card.id) == null) {
                    this.actor.setFlag("world", card.id, false);
                }
                if (this.actor.getFlag("world", card.id) == true) {
                    preExpand(card);
                } else {
                    let panel = card.querySelector(".panel");
                    panel.prepend(returnOverlayHTML());
                }
            }
        }
        let recoveryButton = Array.from(html.find("#recovery"))[0];
        recoveryButton.addEventListener("click", () => game.cyphersystem.recoveryRollMacro(this.actor));

        populateTiersFromFlags(this.actor, html);
        let advancementTiers = Array.from(html.find(".tier"));
        for (let advancementTier of advancementTiers) {
            advancementTier.addEventListener("change", () => {
                SaveAdvancements(this.actor, html);
            });
        }
        desaturateRankingColors(html);
        let damageTrackSelect = Array.from(html.find('[name="data.system.damage.damageTrack"]'))[0];
        changeSlider(damageTrackSelect, html);
        damageTrackSelect.addEventListener("change", (event) => {
            changeSlider(event.currentTarget, html);
        });
    }
}

// function expandForEditor(html){
// 	var editors = Array.from(html.find(".sheet-editor"))
// 	for(let editor of editors){
// 		//for the editors on our sheet
// 		if(editor.querySelectorAll(".tox-tinymce").length > 0){
// 			console.log('Weve got editor child');
// 			//if they have a tox-tinymce class as a child
// 			//expand them
// 			preExpand(editor.closest(".card"))
// 		}
// 	}
// }

function changeSlider(select, html) {
    // console.log("Slider changed")
    var damage = select.value;
    let damageSlider = Array.from(html.find(".damage__slider"))[0];
    let span = damageSlider.querySelector("span");
    switch (damage) {
        case "Hale":
            span.classList.add("hale");
            break;
        case "Impaired":
            span.classList.add("impaired");
            break;
        case "Debilitated":
            span.classList.add("debilitated");
            break;
        case "Dead":
            span.classList.add("dead");
            break;
    }
    // span.style.width = width;
    // span.style.backgroundColor = color;
}

function preExpand(card) {
    var button = card.querySelector(".expand-toggle");
    if (button.firstChild.className == "fas fa-chevron-circle-down") {
        button.firstChild.className = "fas fa-chevron-circle-up";
    } else {
        button.firstChild.className = "fas fa-chevron-circle-down";
    }
    //get the card parent, add expanded class
    //if the event is null, we called this method without clicking
    card.classList.add("expanded");
    //if this card has a wrapper, add the wrapper too
    let wrapper = card.closest(".card__wrapper");
    if (wrapper != null) {
        wrapper.classList.add("expanded");
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
    var cardParent = button.closest(".card");

    //if the event is null, we called this method without clicking
    cardParent.classList.toggle("expanded");

    //if this card has a wrapper, add the wrapper too
    let wrapper = cardParent.closest(".card__wrapper");
    if (wrapper != null) {
        wrapper.classList.add("expanded");
    }
    //set a boolean value for if the classlist is expanded
    let expanded = cardParent.classList.contains("expanded");

    actor.setFlag("world", cardParent.id, expanded);
    // console.log(cardParent.id + " expanded is " + actor.getFlag("world", cardParent.id))

    //get the, add overlay
    var panel = cardParent.querySelector(".panel");
    var overlay = panel.querySelector(".panel-overlay");
    if (cardParent.classList.contains("expanded")) {
        panel.removeChild(overlay);
    } else {
        panel.prepend(returnOverlayHTML());
    }
}

function returnOverlayHTML() {
    const overlay = document.createElement("div");
    overlay.className = "panel-overlay";
    return overlay;
}

async function CreateFlagForAdvancements(actor) {
    for (let tier of tiers) {
        let inputs = tier.querySelectorAll("input[type=text]");
        var i = 0;
        for (let input of inputs) {
            input.value = advancementArray[i].text;
            i++;
        }
    }
    let flagSet = await actor.setFlag("world", "Advancement", []);
}
function desaturateRankingColors(html) {
    var rankings = Array.from(html.find(".item-quantity"));
    for (var ranking of rankings) {
        if (ranking.style.color == "grey") {
            // console.log("ranking is archived")
            continue;
        }
        switch (ranking.innerText) {
            case "Trained":
                ranking.style.color = "#00A36C"; //"#2a9d8f"//"#00A36C"
                break;
            case "Specialized":
                ranking.style.color = "#1C80AB"; //277DA1"// 577590"//#6495ED"
                break;
            case "Inability":
                ranking.style.color = "#E76F51"; //#9A2A2A"
                break;
        }
    }
}

function populateTiersFromFlags(actor, thisHTML) {
    let tiers = Array.from(thisHTML.find(".tier"));
    let advancements = actor.getFlag("world", "Advancement");
    if (!advancements) {
        return;
    }
    let tierIndex = 0;
    for (let tier of tiers) {
        let advancementArray = advancements[tierIndex][`${tier.id}`];
        tierIndex++;
        let inputs = tier.querySelectorAll("input[type=text]");
        var i = 0;
        for (let input of inputs) {
            input.value = advancementArray[i].text;
            i++;
        }
    }
}

function SaveAdvancements(actor, thisHTML) {
    //save the scroll position
    // let scrollTop = thisHTML.find(".numeneraoverhaul")[0].closest(".window-content").scrollTop
    // saveScrollPosition(actor, scrollTop)

    //place the arrays into the flag to save them to be reopened next time
    let storedTiers = [];

    let tiers = Array.from(thisHTML.find(".tier"));
    for (let tier of tiers) {
        let inputAdvancements = tier.querySelectorAll("input[type=text]");
        var storedInputs = [];
        for (let input of inputAdvancements) {
            var newStoredAdvancement = {
                text: input.value,
            };
            storedInputs.push(newStoredAdvancement);
        }
        var tierID = tier.id;
        var key = tierID; //get the key for the property
        var tierObject = {}; //create the object
        tierObject[key] = storedInputs; //get the value for the property
        storedTiers.push(tierObject); //push the object to storedTiers
    }

    actor.setFlag("world", "Advancement", storedTiers);
    //clear incentives and objections array  so they are fresh on restart
}

function saveScrollPosition(actor, scrollTop) {
    actor.setFlag("world", "scrollX", scrollTop);
}

function getScrollPosition(actor) {
    return actor.getFlag("world", "scrollX");
}

Hooks.once("init", function () {
    loadHandleBarTemplates();
});
async function loadHandleBarTemplates() {
    const templatePaths = ["modules/NumeneraSheet/templates/LastingDamage.html"];
    return loadTemplates(templatePaths);
}
