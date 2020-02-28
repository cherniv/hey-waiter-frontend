import { observable, computed } from 'mobx';
import Model from 'mobx-active-model';

export const LOCAL_PATH = 'appstate/';

const ICON_SIZES = ['BIG', 'SMALL'];

export default class AppState extends Model {
    
    static LOCAL_PATH = LOCAL_PATH;
    
    @observable currentIconSizeIndex:number = 0;

    @computed static get iconIsBig () {
        return ICON_SIZES[this.first.currentIconSizeIndex] === 'BIG';
    }

    static switchIconSize () {
        this.first.currentIconSizeIndex = Math.abs((this.first.currentIconSizeIndex + 1) - ICON_SIZES.length);
        this.cacheOnLocal();
    }

    static async init() {
        await AppState.fetchFromCache();
        if (!this.first) {
            this.populate([this.new()]);
            this.cacheOnLocal();
        }
    }
}