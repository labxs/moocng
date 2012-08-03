/*jslint vars: false, browser: true, nomen: true */
/*global MOOC: true, Backbone, $, _ */

if (typeof MOOC === 'undefined') {
    window.MOOC = {};
}

MOOC.models = {};

MOOC.models.Question = Backbone.Model.extend({
    defaults: function () {
        "use strict";
        return {
            last_frame: null, // of the question's video
            solution: null
        };
    }
});

MOOC.models.KnowledgeQuantum = Backbone.Model.extend({
    defaults: function () {
        "use strict";
        return {
            order: -1,
            title: null,
            videoID: null,
            question: null // Optional
        };
    }
});

MOOC.models.KnowledgeQuantumList  = Backbone.Collection.extend({
    model: MOOC.models.KnowledgeQuantum,

    comparator: function (kq) {
        "use strict";
        return kq.get("order");
    },

    getByPosition: function (position) {
        "use strict";
        return this.find(function (kq) {
            return position === kq.get("order");
        });
    }
});

MOOC.models.Unit = Backbone.Model.extend({
    defaults: function () {
        "use strict";
        return {
            order: -1,
            knowledgeQuantumList: null
        };
    }
});

MOOC.models.UnitList = Backbone.Collection.extend({
    model: MOOC.models.Unit,

    getByKQ: function (kqID) {
        "use strict";
        return this.find(function (unit) {
            var kq = unit.get("knowledgeQuantumList");
            if (kq === null) {
                return false;
            }
            kq = kq.get(kqID);
            return typeof kq !== "undefined";
        });
    }
});

MOOC.models.course = new MOOC.models.UnitList();

MOOC.models.init = function () {
    "use strict";
    $("#unit-selector div.collapse").each(function (idx, node) {
        var id = node.id.split("unit")[1];
        MOOC.models.course.add(new MOOC.models.Unit({
            order: idx,
            id: parseInt(id, 10)
        }));
    });
};