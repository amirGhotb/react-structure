// key : string;

class Store {
    constructor(type) {
        this.type = type
    }

    get(key) {
        let result = null
        if (this.type === 'session') {
            result = sessionStorage.getItem(key);
        } else {
            result = localStorage.getItem(key)
        }
        return result ? JSON.parse(result) : false;
    }

    async store(key, parameters) {
        try {
            if (this.type === 'session') {
                await sessionStorage.setItem(key, JSON.stringify(parameters));
            } else {
                await localStorage.setItem(key, JSON.stringify(parameters));
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    async refresh(key, parameters) {
        try {
            if (this.type === 'session') {
                await sessionStorage.removeItem(key).then(() => {
                    sessionStorage.setItem(key, JSON.stringify(parameters));
                });
            } else {
                await localStorage.removeItem(key).then(() => {
                    localStorage.setItem(key, JSON.stringify(parameters));
                });
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    async remove(key) {
        try {
            if (this.type === 'session') {
                await sessionStorage.removeItem(key);
            } else {
                await localStorage.removeItem(key);
            }
            return true;
        } catch (e) {
            return false;
        }
    }

}

export default Store;
