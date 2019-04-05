module.exports = {
    "parserOptions": {

    },
    "plugins": [],
    "globals": {
        "document": false,
        "localStorage": false,
        "fetch": false,
        "alert": false,
        "window": false,
        "React$Element": false,
        "ReactClass": false,
        "API_HOST": false,
        "FormData": false,
        "Image": false,
        "S3_ZONE": false,
        "S3_BUCKET": false,
        "location": false,
    },
    "extends": [
        "airbnb",
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        // Indent with 2 spaces
        "indent": ["error", 2],
        // Indent JSX with 2 spaces
        "react/jsx-indent": ["error", 2],
        // Indent props with 2 spaces
        "react/jsx-indent-props": ["error", 2],
    },
    "settings": {

    },
};