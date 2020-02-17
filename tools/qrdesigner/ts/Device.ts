/**
 * The current class object is currently implemented those interfaces.<br/><br/>
 * The Device class is used to detect common device properties that the current application runs on.<br/>
 * The device detector will detect the following cases:
 * - Detect Desktop / Mobile device.
 * - Detect browser type.
 */

type ButtInterMethod = "touchend" | "click";



export class Device {
    /**
     * Holds the main instance to prevent multiple instance creations.
     */
    private static __self:Device;

    /**
     * The current page user agent string.
     */
    public userAgent:string;

    /**
     * True if current platform is <b>iPhone / iPad</b> device.
     */
    public isiPhone:boolean = false;
    /**
     * True if current platform is an <b>Android</b> device.
     */
    public isAndroid:boolean = false;
    /**
     * True if current platform is any type of <b>Desktop</b> platform.
     * - It could also be an iMAC.
     */
    public isDesktop:boolean = false;
    /**
     * True if running on <b>Any Mobile</b> device.
     */
    public isMobile:boolean = false;
    /**
     * True if running on <b>Chrome</b> browser.
     */
    public isChrome:boolean = false;
    /**
     * True if running on <b>Microsoft Edge</b> browser.
     */
    public isEdge:boolean = false;
    /**
     * True if running on <b>Microsoft Internet Explorer</b> browser (version 11 and below).
     */
    public isIE:boolean = false;
    /**
     * True if running on <b>Firefox</b> browser.
     */
    public isFirefox:boolean = false;
    /**
     * True if running on <b>Safary</b> browser.
     */
    public isSafari:boolean = false;

    /**
     * The name of the current platform based on `isMobile` parameter.
     * Should return `"mobile"` or `"pc"`.
     */
    public get PlatformName():string{
        return this.isMobile ? "mobile" : "pc";
    }

    public get Resolution():string{
        return this.isDesktop ? "web" : this.isMobile ? "low" : 'high';
    }

    /**
     * Returns `true` if current window ration is portrait.
     */
    public get IsPortrait():boolean{
        return window.innerWidth < window.innerHeight;
    }

    /**
     * Returns `true` if current window ration is landscape.
     */
    public get IsLandscape():boolean{
        return window.innerWidth > window.innerHeight;
    }

    /**
     * Returns `true` if the game launched inside an Iframe.
     */
    public get IsFramed():boolean{
        return top !== self;
    }

    /**
     * Returns `true` if the game launched on mobile device and inside an Iframe.
     */
    public get IsMobileAndFramed():boolean{
        return this.isMobile && this.IsFramed;
    }

    /**
     * Determines if there should be notification to a parent window or not,
     * based on [[Device._.IsMobileAndFramed]] and [[Device._.IsFramed]] properties.
     */
    public get ParentNotificationEnabled():boolean{
        return Device._.IsMobileAndFramed || Device._.IsFramed;
    }

    /**
     * Returns the method of interaction that needed in order to execute properly the `addEventListener`.
     */
    public get ButtonInteractionMethod():ButtInterMethod{
        return this.isMobile ? "touchend" : "click";
    }

    /**
     * Automatically initializing the device detector object.
     */
    private constructor(){
        this.userAgent = navigator.userAgent;
        this.init();
    }


    /**
     * Determines if the device singleton instance has been initialized.
     */
    private _initialized:boolean = false;

    /**
     * Initializing the class and fill in the appropriate property values.
     */
    public init():void{
        if(this._initialized) return;

        this._initialized = true;
        const ua = this.userAgent;

        this.isiPhone = /iPad|iPhone|iPod/.test(ua);
        this.isAndroid = /android/i.test(ua);

        this.isFirefox = /firefox/i.test(ua);
        this.isEdge = /Edge/i.test(ua);
        this.isChrome = /chrome/i.test(ua);
        this.isSafari = /^((?!chrome|android).)*safari/i.test(ua);

        this.isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua));
        this.isDesktop = !this.isMobile;

        const verStr = `Version/`;

        if(ua.indexOf(verStr) != -1){
            this.version = ua.split(verStr).pop().split(` `).shift();
        }

    }
    version:string = ``;



    /**
     * Returns the instance of the DeviceDetector.
     */
    public static get _():Device{
        return this.__self || (this.__self = new this());
    }
}