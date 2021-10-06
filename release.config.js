module.exports = {
  branches: [{ name: 'main' }],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@google/semantic-release-replace-plugin',
      {
        replacements: [
          {
            files: ['package.json'],  
            from: "version: \".*\"", // eslint-disable-line
            to: "version: \"${nextRelease.version}\"", // eslint-disable-line
          },
          {
            files: ['package.json'],
            from: "buildNumber: '.*'", // eslint-disable-line
            to: "buildNumber: '${nextRelease.version}'", // eslint-disable-line
          },
          {
            files: ['package.json'], 
            from: `versionCode: [^,]*`, // eslint-disable-line
            to: (match) => `versionCode: ${parseInt(match.split(':')[1].trim()) + 1}`, // eslint-disable-line
          },
        ],
      },
    ],
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        assets: ['CHANGELOG.md', 'package-lock.json', 'package.json'],
      },
    ],
  ],
};