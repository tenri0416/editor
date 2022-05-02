import Dexie from 'dexie'

export interface MemoRecord {
  datetime: string
  title: string
  text: string
}
//テーブル作成
const database = new Dexie('markdown-editor')
database.version(1).stores({
  memos: '&datetime'
})
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

//ページング
const NUM_PER_PAGE: number = 10
//１ページあたり１０件と定義

export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count()
  //memosテーブルから総件数を取得するcount()はDexieの関数
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE)
  //Math.ceil引数に指定した数値を切り上げた数値を取得
  return pageCount > 0 ? pageCount : 1
  //三項演算子で0件でも１件と判定
}

//テーブルへの保存
export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString()

  await memos.put({ datetime, title, text })
}
//テキスト履歴をindexedDBから取得
export const getMemos = (page: number): Promise<MemoRecord[]> => {
  const offset = (page - 1) * NUM_PER_PAGE
  return memos.orderBy('datetime').reverse()
    .offset(offset)
    .limit(NUM_PER_PAGE)
    .toArray()
  //orderByでdatetime(保存した日時)の古い順で取得
  //reverseで並び順を変える(古いのを下に)
  //offsetは取得するリスト内の開始位置を設定する
  //例100件存在する場合にoffset(20)としたら２０件目以降を取得
  //limitは取得する件数を取得する
  //toArrayで取得したデータを配列に変換
}
