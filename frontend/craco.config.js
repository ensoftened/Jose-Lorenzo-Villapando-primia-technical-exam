const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        // Specify the path to your tsconfig.json
        baseUrl: './src',
        tsConfigPath: './tsconfig.paths.json', // Create this file in the next step
      },
    },
  ],
};