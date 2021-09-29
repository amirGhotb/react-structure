import Store from "./Store";

export default function LocalStore(){
    return new Store('localStorage');
}
