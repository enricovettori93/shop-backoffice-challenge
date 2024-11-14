import {defineConfig} from "cypress";

export default defineConfig({
    env: {
        BASE_URL: "",
        DEFAULT_STORE: "",
        DEFAULT_PRODUCT: ""
    },
    e2e: {
        // @ts-ignore
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
