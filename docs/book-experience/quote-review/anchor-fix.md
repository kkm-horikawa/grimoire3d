# 見出しへ直接開くときの背景の位置

[Issue #49](https://github.com/kkm-horikawa/grimoire3d/issues/49)。0.3.0の公開後チェックで、モバイルの初期紙面に116pxのscrollTopが付く状態を確認した。本人承認済みの配置を保つ修正として0.3.1を公開する。

reader全体のoverflowをhiddenからclipに変更し、ネイティブのフラグメント移動でも背景のコンテナがスクロールしないようにした。本文のpage-textは従来どおりスクロールできる。

Chromeで1920×1080、1280×720、390×844を確認し、JavaScript有効・無効の全6条件で外側のreaderのscrollTopが0であることを確認。本文の脚注のフォーカス往復と補足のキーボード開閉も確認。check・typecheck・coverage付き86テスト・buildに成功。

![修正前のスマートフォン](anchor-current-mobile.png)

![修正後のスマートフォン](anchor-fixed-mobile.png)

![修正後のノートPC](anchor-fixed-laptop.png)

![修正後の大型モニター](anchor-fixed-monitor.png)
