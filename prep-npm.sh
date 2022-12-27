rm -rf ./npm &&
yarn build &> /dev/null &&
for file in $(find npm -type f -name '*.js');
do
  minify "./$file" > "./$file.min" && mv "./$file.min" "./$file";
done &&
cp README-npm.md ./npm/README.md &&
cp LICENSE ./npm/LICENSE &&
yarn npm-package &> /dev/null &&
echo "📦 Minified package created" &&
yarn --cwd ./npm pack -s &&
echo "📈 Size: $(wc -c < $(ls ./npm/*.tgz))b" &&
rm -rf ./npm/*.tgz &&
yarn docs &> /dev/null &&
cp -r img ./gh-pages/img &&
echo "📖 Docs: file://$(pwd)/gh-pages/index.html"