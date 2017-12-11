module.exports = function({ types: t }) {
    return {
        visitor: {
            MemberExpression(path, { opts: options }) {
                var currentNode = path.node;
                if (currentNode.object.name && currentNode.object.name.toLowerCase() === 'console' &&
                    currentNode.property.name && currentNode.property.name.toLowerCase() === 'log') {
                    path.parentPath.remove();
                }
            }
        }
    };
}