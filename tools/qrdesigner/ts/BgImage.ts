class Uploading {
    handleDataTransferSelect = (evt:any) => {
        evt.stopPropagation();
        evt.preventDefault();
        this.handleFileSelect(evt.dataTransfer.files);
    };

    handleFileSelect = (files:any[]) => {
        // files is a FileList of File objects. List some properties.
        const output = [];
        let firstOne:any = null;
        for(let i = 0, f; !!(f = files[i]); i++) {
            output.push(f.name + ' (' + (f.type || 'n/a') + ') - ' +
                f.size + ' bytes, last modified: ' +
                (f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a'));
            firstOne = files[0];
            break;
        }
        if(firstOne)
            this.readBinary(firstOne);
        // alert(output.join('\n'));
    };

    readBinary(file:any){
        const reader = new FileReader(), start = 0, stop = file.size - 1;
        reader.onloadend = function(evt:any){
            if(evt.target.readyState == FileReader.DONE){ // DONE == 2
                console.log(evt.target.result);
            }
        };

        var blob = file.slice(start, stop + 1);
        reader.readAsBinaryString(blob);
    }

    handleDragOver = (evt:any) => {
        // debugger;
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    };

    setFileAndDropZone = (input:HTMLElement, butt:HTMLElement) => {
        butt.addEventListener('dragover', this.handleDragOver, false);
        butt.addEventListener('drop', this.handleDataTransferSelect, false);
        input.addEventListener('change', () => this.handleFileSelect((<any>input).files), false);
    };

}



export class BgImage {
    static readonly showUpload = false;
    static height = 0;
    private up = new Uploading();


    canReleaseElements = false;
    elements:string[] = [];

    constructor(onInit:() => void){
        (<any>window).uploadBgImg = () => {
        };
        const total = 77;
        for(let i = 1; i < total + 1; ++i) {
            const path = `assets/bg/small/${i}.jpg`;
            this.elements.push(`<img onclick="qrGenUpdate('bgPath', '${path}')" src="${path}" width="100%"/><br>`);
        }

        $('#bg-image').html('<b>BG Image</b><br>'
            + (BgImage.showUpload ? `\`<input type="file" id="upload-img-file" style="display: none;" />
            <button style="font-weight: bold;" onclick="document.getElementById('upload-img-file').click();">📤 Upload image...</button><br>\`` : ``)
            + '<div class="bg-scroll-pane" style="margin-top: .5em;" id="all-bg-images">Loading list of pictures...</div>');
        const pane = $('.bg-scroll-pane');
        BgImage.height = $(window).height() - 8 - pane.offset().top;
        pane.css(
            'height',
            Math.round(BgImage.height) + 'px'
        );
        if(BgImage.showUpload){
            this.up.setFileAndDropZone(
                document.getElementById('upload-img-file'),
                document.getElementById('the-body')
            );
        }
        setTimeout(onInit, 200);
        const checkForRelease = () => {
            if(!this.canReleaseElements) setTimeout(checkForRelease, 100);
            else
                $(`#all-bg-images`).html(this.elements.join('<br>'));
        };
        checkForRelease();
    }


}
