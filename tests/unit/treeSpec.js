/**
 *
 *
 * @author: blukassen
 */

describe("Initialize Config", function () {
    const util = require('../evolux.modules/evolux.util');
    const TAFFY = require('taffydb');

    let heads;
    let items;

    let tree;
    let tree1;

    beforeAll(() => {
        heads = TAFFY([
            { hid: 1, name: 'A', hint: '1' },
            { hid: 2, name: 'B', hint: '1.1' },
            { hid: 3, name: 'C', hint: '1'  },
            { hid: 4, name: 'D', hint: '1.1.1' },
            { hid: 5, name: 'E', hint: '1.1' },
            { hid: 6, name: 'F', hint: '1.1.1' }
        ]);

        items = TAFFY([
            { sid: 1, hid: 1, iid: 2 },
            { sid: 2, hid: 1, iid: 5 },
            { sid: 3, hid: 2, iid: 4 },
            { sid: 4, hid: 2, iid: 6 },
        ]);

        tree = [
            {
                hid: 1, name: 'A', hint: '1',
                items: [
                    {
                        sid: 1,
                        head: { hid: 2, name: 'B', hint: '1.1' },
                        items: [
                            { sid: 3, head: { hid: 4, name: 'D', hint: '1.1.1' } },
                            { sid: 4, head: { hid: 6, name: 'F', hint: '1.1.1' } }
                        ]
                    },
                    {
                        sid: 2,
                        head: { hid: 5, name: 'E', hint: '1.1' }
                    }
                ]
            },
            { hid: 3, name: 'C', hint: '1'  }
        ];
        tree1 = [
            {
                hid: 1, name: 'A', hint: '1', b: 'B',
                items: [
                    {
                        sid: 1,
                        head: { hid: 2, name: 'B', hint: '1.1' },
                        items: [
                            { sid: 3, head: { hid: 4, name: 'D', hint: '1.1.1' } },
                            { sid: 4, head: { hid: 6, name: 'F', hint: '1.1.1' } }
                        ]
                    },
                    {
                        sid: 2,
                        head: { hid: 5, name: 'E', hint: '1.1' }
                    }
                ]
            }
        ];
    });

    const buildstructure = require("../../lib/buildstructure");

    it("build a tree", function () {
        let builder = new buildstructure();

        builder
            .selectHead(() => {
                return util.promisify(() => { heads.get({hid: 1}) });
            })
            .buildHead((data) => {
                let head = Object.assign({ b: 'B'}, data);
                return head;
            })
            .selectSub((head) => {

            })
            .buildSub((data, head) => {
                let sub = Object.assign({ b: 'C', head: head.hid }, data);
                return sub;
            })
            .then(builttree => {

            } )
            .catch(err => {

            })
    });
});
