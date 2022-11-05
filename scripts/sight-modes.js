import { MODULE_ID } from "./const.js";

Hooks.once("init", () => {
    libWrapper.register(MODULE_ID, "VisionSource.prototype._getPolygonConfiguration", function () {
        const sightMode = this.object.document.getFlag(MODULE_ID, "sightMode") || "sight";
        return {
            source: this,
            type: sightMode,
            angle: this.data.angle,
            rotation: this.data.rotation,
            externalRadius: this.data.externalRadius
        };
    }, "OVERRIDE");
});

Hooks.on("renderTokenConfig", (app, html, data) => {
    const sightMode = app.token.getFlag(MODULE_ID, "sightMode") || "sight";
    const langSightMode = game.i18n.localize(`${MODULE_ID}.sightMode`);
    const langHint = game.i18n.localize(`${MODULE_ID}.hint`);
    const langMovement = game.i18n.localize(`${MODULE_ID}.movement`);
    const langLight = game.i18n.localize(`${MODULE_ID}.light`);
    const langSight = game.i18n.localize(`${MODULE_ID}.sight`);
    const langSound = game.i18n.localize(`${MODULE_ID}.sound`);
    let formGroup = `
        <div class="form-group">
            <label>${langSightMode}</label>
            <div class="form-fields">
                <select name="flags.${MODULE_ID}.sightMode">
                    <option value="movement" ${(sightMode == `movement`)?`selected`:``}>${langMovement}</option>
                    <option value="light" ${(sightMode == `light`)?`selected`:``}>${langLight}</option>
                    <option value="sight" ${(sightMode == `sight`)?`selected`:``}>${langSight}</option>
                    <option value="sound" ${(sightMode == `sound`)?`selected`:``}>${langSound}</option>
                </select>
            </div>
            <p class="hint">${langHint}</p>
        </div>
    `;
    html.find('select[name="sight.visionMode"]').closest(".form-group").after(formGroup);
    app.setPosition({ height: "auto" });
  });