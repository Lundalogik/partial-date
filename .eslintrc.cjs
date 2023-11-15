/* eslint-env node */
module.exports = {
    extends: ['@limetech/eslint-config'],
    overrides: [
        {
            files: ['src/**/*.ts'],
            rules: {
                'no-undef': 'off', // Typescript takes care of this for us.
            },
        },
    ],
};
