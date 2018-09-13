const cssnanoOpts = {
	preset: ['default'],
	zindex: false,
	discardComments: { removeAll: true },
	reduceIdents: { keyframes: false },
};

module.exports = ({ file, options, env }) => ({
	plugins: {
		autoprefixer: { remove: false },
		cssnano: options.isMinify ? cssnanoOpts : false,
		'postcss-move-props-to-bg-image-query': {},
	},
});
