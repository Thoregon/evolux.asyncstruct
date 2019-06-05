/**
 *
 *
 * @author: blukassen
 */


class Buildstructure {

    constructor() {
        this.bsworker = new bsworker(this);
    }

    nonrecursive() {
        this.nonrecursive = true;
    }

    /**
     * set a function which retieves the head elements
     * @param { Function } selectHeadFn - must return a 'thenable'
     */
    seletctHead(seletctHeadFn) {
        this.seletctHeadFn = seletctHeadFn;
    }

    buildHead(buildHeadFn) {
        this.buildHeadFn = buildHeadFn;
    }

    selectSub(selectSubFn) {
        this.selectSubFn = selectSubFn;
    }

    buildSub(buildSubFn) {
        this.buildSubFn = buildSubFn;
    }

    then(fn) {
        this.succFn = fn;
        let bsworker = new bsworker(this);
        bsworker.then();
    }

    catch(fn) {
        this.catchFn = fn;
    }
}


class BSWorker {

    constructor(def) {
        this.def = def;
    }

    then() {
        if (!this.def.succFn) this.def.succFn = function () {};

        let p = new Promise(function (fulfill, reject) {

        });

        p.then(this.def.succFn)
            .catch(this.def.catchFn);
    }
}

module.exports = buldstructure;