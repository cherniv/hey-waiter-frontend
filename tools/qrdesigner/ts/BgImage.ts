export class BgImage {
    static height = 0;

    constructor(onInit: () => void){
        const elements: string[] = [];
        const total = 77;
        for (let i = 1; i < total + 1; ++i) {
            const path = `assets/bg/${i}.jpg`;
            elements.push(`<img onclick="qrGenUpdate('bgPath', '${path}')" src="${path}" width="100%"/><br>`);
        }

        $('#bg-image').html('<b>BG Image</b><br>' +
            '<div class="bg-scroll-pane">' + elements.join('<br>') + '</div>');
        const pane = $('.bg-scroll-pane');
        BgImage.height = $(window).height() - 4 - pane.offset().top;
        pane.css(
            'height',
            Math.round(BgImage.height) + 'px'
        );
        setTimeout(onInit, 200);
    }
}