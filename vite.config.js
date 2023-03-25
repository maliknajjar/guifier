export default {
    build: {
        lib: {
            entry: 'src/guify/index.js',
            name: 'MyLibrary'
        },
        rollupOptions: {
            // make sure to externalize dependencies
            external: ['my-dependency'],
            output: {
                // generate a single JS file containing your library code
                file: 'dist/my-library.js',
                format: 'umd',
                name: 'MyLibrary',
                sourcemap: true
            }
        }
    }
};