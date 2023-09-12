exports.toTree = function(list){
    var map = {}, node, roots = [], i;

    for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (parseInt(node.parent_id) !== 0) {
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node.parent_id]].children.push(node);
        } else {
            roots.push(node);
        }
    }

    return roots;
};

exports.indexBy = function(list, pName){
    const listTmp = {};

    list.forEach(item => {
        listTmp[item[pName]] = item;
    });

    return listTmp;
};