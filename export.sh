# Build site
npm run build
# Export site
npm run export
# Clean old site
rm -r ../ejrbuss.github.io/_next
rm -r ../ejrbuss.github.io/404
rm -r ../ejrbuss.github.io/about
rm -r ../ejrbuss.github.io/blog
rm -r ../ejrbuss.github.io/index
rm -r ../ejrbuss.github.io/static
rm -r ../ejrbuss.github.io/work
rm ../ejrbuss.github.io/index.html
# Copy in new site
mv ./out/_next ../ejrbuss.github.io/_next
mv ./out/404 ../ejrbuss.github.io/404
mv ./out/about ../ejrbuss.github.io/about
mv ./out/blog ../ejrbuss.github.io/blog
mv ./out/index ../ejrbuss.github.io/index
mv ./out/static ../ejrbuss.github.io/static
mv ./out/work ../ejrbuss.github.io/work
mv ./out/index.html ../ejrbuss.github.io/index.html