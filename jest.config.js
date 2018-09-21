module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "testPathIgnorePatterns": [
        "/node_modules/",
    ],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    // "snapshotSerializers": ["enzyme-to-json/serializer"],
    // "setupTestFrameworkScriptFile": "<rootDir>/src/enzyme/setupEnzyme.tsx",
    "moduleNameMapper": {
        "\\.(md|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/assetTransformer.js",
        "\\.(css|scss)$": "<rootDir>/__mocks__/assetsTransformer.js"
    }
}