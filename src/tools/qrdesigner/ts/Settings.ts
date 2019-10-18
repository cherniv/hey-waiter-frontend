export class Settings {
    constructor(){
        const elements:string[]=[];
        const box=(id:string, label:string)=>
            elements.push(`<input type="checkbox" id="${id}"><label for="${id}">${label}</label>`);
        box('blur-bg', 'blur background');
        box('darken-bg', 'darken background');


        $('#settings').html('<h1>QR SETTINGS:</h1>'+elements.join('<br>'));

    }

}