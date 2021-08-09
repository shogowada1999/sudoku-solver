# Sudoku Solver

This is the pre-build files of the Sudoku Solver.
You need to install the required node modules from package.json.
You can see the actual Sudoku Solver from the URL below.

これは Sudoku Solver のビルド前のファイル群です。
必要な node modules を package.json ファイルを参照してインストールして下さい。
実際の Sudoku Solver は下の URL から見ることができます。

Sudoku Solver
https://shogowada1999.github.io/sudoku-solver/

![thumbnail](https://user-images.githubusercontent.com/81617513/120050405-38f27180-c058-11eb-9755-3bd33d39068c.png)

---

Sudoku solver is a tool for solving Sudoku questions.

Sudoku solver は数独の問題を解くためのツールです。

---

# Features

You can enjoy solving Sudoku with Material Design Sudoku Solver.
You can select two modes, Solver Mode and Challenger Mode.
When you have any Sudoku questions, you can get the answer with input it in the Solver Mode.
When you want to enjoy solving Sudoku, you should use the Challenger Mode.
Comment window in this solver helps you to solve Sudoku.

マテリアルデザインの数独ソルバーで数独を楽しみましょう。
Solver Mode と Challenger Mode の２つのモードが選択可能です。
数独の問題の答えを知りたいなら、Solver Mode に数独問題を入力して下さい。
数独の問題に挑戦したい場合は、Challenger 　 Mode を選択して下さい。

---

# Requirement

- "@fortawesome/fontawesome-svg-core": "^1.2.35"
- "@fortawesome/free-brands-svg-icons": "^5.15.3"
- "@fortawesome/free-regular-svg-icons": "^5.15.3"
- "@fortawesome/free-solid-svg-icons": "^5.15.3"
- "@fortawesome/react-fontawesome": "^0.1.14"
- "@testing-library/jest-dom": "^5.12.0"
- "@testing-library/react": "^11.2.6"
- "@testing-library/user-event": "^12.8.3"
- "bootstrap": "^4.6.0"
- "ramda": "^0.27.1"
- "react": "^17.0.2"
- "react-bootstrap": "^1.5.2"
- "react-dom": "^17.0.2"
- "react-scripts": "4.0.3",

---

# Usage

You can play this solver from "https://shogowada1999.github.io/sudoku-solver/".
First, please select the mode, Solver or Challenger.

About Solver Mode

[ English ]

1. Enter the Sudoku you want to solve.
2. Double-click the cell you want to enter and enter an integer from 1 to 9.
3. Press [Run] when you're done.
4. If it is a solvable Sudoku, the answer will be displayed.
5. When you press the [Test] button, Sudoku will be randomly entered.

[ 日本語 ]

1. 解決したい数独問題を入力してください。
2. 入力したいマスをダブルクリックして 1~9 の整数を入力して下さい。
3. 入力が完了したら [Run] を押して下さい。
4. 解決可能な数独であれば解が表示されます。
5. [Test] ボタンを押すと数独の問題がランダムに入力されます。

About Challenger Mode

[ English ]

1. Please select the difficulty level first.
2. The difficulty level of Sudoku can be selected from three types: [Easy], [Normal], and [Hard].
3. Tips for solving Sudoku are displayed in the comment area.
4. Double-click the cell you want to enter and enter an integer from 1 to 9.
5. If there is only one number that can be entered, it will be displayed as 'SECRET'.

[ 日本語 ]

1. 最初に難易度を選択して下さい。
2. 数独の難易度は [Easy], [Normal], [Hard] の三種類から選択可能です。
3. コメントエリアには数独を解くためのヒントが表示されます。
4. 入力したいマスをダブルクリックして 1~9 の整数を入力して下さい。
5. 入力可能な数字が一つしかない場合は 'SECRET' と表示されます。

---

# Note

Currently, secret mode is under development. I am considering a program that produces special effects by inputting magic circles.
In creating this program, I referred to the article linked below for the algorithm for solving Sudoku.

現在、シークレットモードの開発中です。魔法陣の入力によって特殊なエフェクトが出るプログラムを検討しています。
このプログラムを作成するにあたって、数独を解くためのアルゴリズムは下記のリンクの記事を参考にしました。

https://qiita.com/41semicolon/items/76db7e5ee0e9bae9984d

---

# Author

- Shogo Wada
- https://wadablog.net/
- shogo.wada.pro@gmail.com

---

# License

"Sudoku Solver" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
