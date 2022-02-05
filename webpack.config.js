const path = require('path')

module.exports = {
  //entryに書かれたファイルを読み込む
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  //outputは出力するファイルを設定する
  //distディレクトリーに対してファイル名index.jsで出力する
  //変換する際はjs内に書かれている相対パスに自動的にdist/を追加
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: 'dist/',
  },
  //hotファイルを変更すると自動的にブラウザに反映させる
  //open起動時にブラウザで開くフラグ
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist/'),
    },
    hot: true,
    open: true,
  }

}
