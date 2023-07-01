module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            "@babel/plugin-proposal-export-namespace-from",
            "react-native-reanimated/plugin",
            [
                "module-resolver",
                {
                    extensions: [
                        ".ios.js",
                        ".android.js",
                        ".ios.jsx",
                        ".android.jsx",
                        ".js",
                        ".jsx",
                        ".json",
                        ".ts",
                        ".tsx",
                    ],
                    root: ["."],
                    alias: {
                        "@": ".",
                        "@assets": "./assets",
                        "@components": "./components",
                        "@custom_hooks": "./custom_hooks",
                        "@pages": "./pages",
                        "@custom_context": "./custom_context",
                        "@utils": "./utils",
                        "@styles": "./styles",
                        "@redux_store": "./redux_store",
                    },
                },
            ],
        ],
    };
};
