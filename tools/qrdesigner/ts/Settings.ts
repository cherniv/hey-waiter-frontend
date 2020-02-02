import {Stor} from "./Stor";
import {ConfKeeper} from "./ConfKeeper";
import {FontLoader} from "./FontLoader";
import {QRGen} from "./QRGen";


export class Settings {
    constructor(){
        const elements: string[] = [];
        let i = 0;
        const win = (<any>window);
        win.settingsChUpd = (name: string, value: boolean) => {
            const entry = ConfKeeper.getDataTypeEntryByKey(name);
            if (typeof entry.filter != 'undefined')
                ConfKeeper.dataType.forEach(t => {
                    if (t.name != name && typeof t.filter != 'undefined'){
                        $('#st_chb' + t.name).attr('checked', false);
                        win.qrGenUpdate(t.name, false);
                    }
                });
            win.qrGenUpdate(name, value);
        };
        win.findFontForQR = () => {
            if (confirm(`To change the font, you need to:
  * go to "Google Fonts" website
  * select any font and click it
  * copy the font name
  * go back here and paste the name to the "Font face" field
  * click "apply font"
  
Do you want to proceed to Google Fonts?  
  `))
                $(`#google-fonts-opener`).submit();
        };
        ConfKeeper.dataType.forEach(t => {
            if (!t.outer){
                const id = 'st_chb' + t.name;
                const on: boolean = ConfKeeper.conf[t.name];
                elements.push(
                    (t.title.toLowerCase().indexOf('more') != -1 ? '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' : '')
                    + `<input onclick="settingsChUpd('${t.name}', this.checked)" type="checkbox" id="${id}" ${on ? 'checked' : ''}>&nbsp;&nbsp;<label for="${id}">${t.title}</label>`)
            }
        });
        elements.push(`
  <div style="border: 1px solid #bebebe;border-radius: .5em;padding: .2em;">
  <form id="google-fonts-opener" 
    action="https://fonts.google.com/" method="get" target="_blank" style="display: none;"></form>
    <a href="javascript:findFontForQR()">Font face:</a> <input id="font-face" style="width:6em;padding: 0;height: 1.7em;" value="${FontLoader.globalFontFaceName}"><br>
    size: <input id="font-size-percent" style="width:3em;padding: 0;height: 1.7em;" value="${FontLoader.fontSizeMultiplierPercent}">% &nbsp;<button style="padding:.4em;height:1.9em;font-weight: bold;" onclick="setFontQR()">set font</button>
  
  </div>
`);
        win.setFontQR = () => {
            const face = $(`#font-face`).val();
            const percent = $(`#font-size-percent`).val();
            FontLoader.globalFontFaceName = face;
            FontLoader.fontSizeMultiplierPercent = parseFloat(percent);
            QRGen._.objOpacity = .5;
            setTimeout(() => {
                win.webFontReload();
                QRGen._.previewWithPleaseWait();
            }, 500);
        };
        $('#settings').html('<b>SETTINGS</b><br>' + elements.join('<br>'));

    }

}