import {Stor} from "./Stor";
import {ConfKeeper} from "./ConfKeeper";
import {FontLoader} from "./FontLoader";
import {QRGen} from "./QRGen";



export class Settings {
    constructor(){
        const elements:string[] = [];
        let i = 0;
        const win = (<any>window);
        win.settingsChUpd = (name:string, value:boolean) => {
            const entry = ConfKeeper.getDataTypeEntryByKey(name);
            if(typeof entry.filter != 'undefined')
                ConfKeeper.dataType.forEach(t => {
                    if(t.name != name && typeof t.filter != 'undefined'){
                        $('#st_chb' + t.name).attr('checked', false);
                        win.qrGenUpdate(t.name, false);
                    }
                });
            win.qrGenUpdate(name, value);
        };
        win.findFontForQR = () => {
            if(confirm(`To change the font, you need to:
  * go to "Google Fonts" website
  * select any font and click it
  * copy the font name
  * go back here and paste the name to the "Font face" field
  * click "set font" button
  
Do you want to proceed to Google Fonts?  
  `))
                $(`#google-fonts-opener`).submit();
        };
        ConfKeeper.dataType.forEach(t => {
            if(!t.outer){
                const id = 'st_chb' + t.name;
                const on:boolean = ConfKeeper.conf[t.name];
                elements.push(
                    (t.title.toLowerCase().indexOf('more') != -1 ? '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' : '')
                    + `<input onclick="settingsChUpd('${t.name}', this.checked)" type="checkbox" id="${id}" ${on ? 'checked' : ''}>&nbsp;&nbsp;<label for="${id}">${t.title}</label>`)
            }
        });
        const currFont = ConfKeeper.getCurrentFont().family;
        elements.push(`
  <div style="border: 1px solid #bebebe;border-radius: .5em;padding: .2em;">
  <form id="google-fonts-opener"   action="https://fonts.google.com/" method="get"
        target="_blank" style="display: none;"></form>
        
        
    <!--<a href="javascript:findFontForQR()">Font face:</a> 
    <input id="font-face" 
            style="width:6em;padding: 0;height: 1.7em;" value="${FontLoader.globalFontFaceName}">-->
    font face:
    <select onchange="qrStFontChanged()" id="qr-st-font-sel">
      ${ConfKeeper.fonts.map(f => `<option
          ${f.family == currFont ? `selected` : ``} 
          value="${f.family}~${f.scale}">${f.family}</option>`)}
    </select>
    <!--
            <br>
    size: <input id="font-size-percent" style="width:3em;padding: 0;height: 1.7em;" value="${FontLoader.fontSizeMultiplierPercent}">% &nbsp;<button style="padding:.4em;height:1.9em;font-weight: bold;" onclick="setFontQR()">set font</button>
  -->
  </div>
`);
        win.qrStFontChanged = () => {
            const [family, scaleStr] = (`` + $(`#qr-st-font-sel`).val()).split(`~`), scale = parseFloat(scaleStr);
            ConfKeeper.setCurrentFont(family);
            this.applyCurrentFontAndReloadThePreview();
            win.setFontQR();
        };

        win.setFontQR = () => this.applyCurrentFontAndReloadThePreview();
        $('#settings').html('<b>SETTINGS</b><br>' + elements.join('<br>'));

    }
    applyCurrentFontAndReloadThePreview = () => {
        const font = ConfKeeper.getCurrentFont();
        const percent = $(`#font-size-percent`).val() || 100;
        FontLoader.globalFontFaceName = font.family;
        FontLoader.fontSizeMultiplierPercent = parseFloat(percent) * font.scale;
        QRGen._.objOpacity = .5;
        setTimeout(() => {
            (window as any).webFontReload();
            setTimeout(() => {
                QRGen._.previewWithPleaseWait();
            }, 300);
        }, 10);
    }
}