

function byTagName(node, tagName) {
    tagName = tagName.toUpperCase();
    let els = [];
    let children = Array.prototype.slice.call(node.children);
    children.forEach(child => {
        if (!child) return;
        if (child.tagName === tagName) els.push(child);
        els = [...els, ...byTagName(child, tagName)];
    })
    return els;
}