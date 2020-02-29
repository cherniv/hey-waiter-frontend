import { observable, computed, reaction } from 'mobx';
import Model from 'mobx-active-model';
import { listenForWindowVisibility } from '../utils/WindowVisibility'
import Auth from '../services/Auth';

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

    static updateUserWindowVisibility(windowVisible:boolean) {
      Auth.user && Auth.user.update({windowVisible});
    }

    static async init() {
        await AppState.fetchFromCache();
        if (!this.first) {
            this.populate([this.new()]);
            this.cacheOnLocal();
        }

        this.updateUserWindowVisibility(true);
        listenForWindowVisibility(this.updateUserWindowVisibility);
        reaction(
          () => Auth.user,
          user => this.updateUserWindowVisibility(!!user)
        )
    }
    
}