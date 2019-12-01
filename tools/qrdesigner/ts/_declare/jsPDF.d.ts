declare class jsPDF {
    constructor(orientation?: string);

    addImage(imgData: string, imageType: string, x: number, y: number, w: number, h: number): void;

    addPage(): void;

    autoPrint(options?: { variant: string }): void;

    save(fileName: string): void;

    output(type: string, options?: any): void;
}