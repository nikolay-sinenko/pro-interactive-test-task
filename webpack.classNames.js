const BASE_CLASS = 'base';

/*
    Minifier for CSS Modules classnames
*/

const alphabet = 'abcefghijklmnopqrstuvwxyzABCEFGHJKLMNOPQRSTUVWXYZ';

function* idGenerator() {
    let indexes = [0];

    while (true) {
        yield indexes.reduce((result, index) => result + alphabet[index], '');

        let scope = indexes.length - 1;

        do {
            indexes[scope] += 1;

            if (indexes[scope] === alphabet.length) {
                indexes[scope] = 0;
                scope--;
                continue;
            }

            if (scope < 0) {
                indexes = Array(indexes.length + 1).fill(0);
            }

            break;
        } while (true);
    }
}

function createGenerator() {
    const store = {};
    const blockIdGenerator = idGenerator();

    return (blockName, elementName) => {
        if (!store[blockName]) {
            store[blockName] = {
                blockId: blockIdGenerator.next().value,
                elementIdGenerator: idGenerator(),
                elementIds: {},
            };
        }

        const { blockId } = store[blockName];

        if (elementName === BASE_CLASS) {
            return [blockId];
        }

        const { elementIdGenerator, elementIds } = store[blockName];

        if (!elementIds[elementName]) {
            elementIds[elementName] = elementIdGenerator.next().value;
        }

        const elementId = elementIds[elementName];

        return [blockId, elementId];
    };
}

const generateUniqueId = createGenerator();

const minifiedClassnames = ({ context }, _, localName) => {
    const blockName = context.split('\\').pop();
    const [block, element] = generateUniqueId(blockName, localName);
    const className = element ? `${block}_${element}` : block;
    console.log(blockName, localName, className);
    return className;
};

/*
    BEM-naming function for CSS Modules
*/

const fullBEMClassnames = ({ context }, _, localName) => {
    //  Block name in kebab-case
    const blockName = context
        .split('\\') // Split path by backslashes
        .pop() // Get folder name
        .split(/([A-Z][a-z]*)/) // Split on words by the capital letters
        .filter(Boolean) // Filter out empty strings
        .join('-') // Join words by hyphens, like the truly kebab does
        .toLowerCase();

    //  Decrease naming complexity by replacing
    //  Base classname with block name
    if (localName.includes(BASE_CLASS)) {
        return localName.replace(BASE_CLASS, blockName);
    }

    return `${blockName}__${localName}`;
};

module.exports = {
    minifiedClassnames,
    fullBEMClassnames,
};
