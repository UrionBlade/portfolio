const { i18n } = require("./next-i18next.config");

module.exports = {
	i18n,
	experimental: {
		serverActions: true,
		appDir: true,
	},
};
