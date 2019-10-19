export class BgImage{
    constructor(){
        const elements:string[]=[];
        const total=70;
        for(let i=1; i<total+1;++i) {
            const path=`assets/bg/${i}.jpg`;
            elements.push(`<img onclick="qrGenUpdate('bgPath', '${path}')" src="${path}" width="100%"/><br>`);
        }

        $('#bg-image').html('BG Image:<br>'+
            '<div class="bg-scroll-pane">'+elements.join('<br>')+'</div>');
    }
}