# Classroom Draft: Student JavaScript Task Workflow

## Goal
Students write normal JavaScript (not JavaScript inside a giant string), then run it in the browser task window using `play(...)`.

## Why this workflow
- Students code in normal `.js` files.
- Syntax highlighting looks natural.
- Fewer quote/backtick mistakes.
- The notebook stays simple: load file, call `play`.

## Recommended folder structure

```text
Internship project/
  tasks/
    student_task.js
  Drafting/
    Classroom_JS_Task_Workflow_Draft.md
  JS Lessons/
    Lesson_01_Variables_and_Data_Types.ipynb
```

## Notebook runner cell (copy-paste)

Use this in the notebook cell students run:

```javascript
// 1) Path to the student JS file
const taskPath = "./tasks/student_task.js";

// 2) Read file content as text
const taskCode = await Deno.readTextFile(taskPath);

// 3) Run it in the browser task environment
play(taskCode);
```

## Student task file template (tasks/student_task.js)

Students edit only this file:

```javascript
// Runs in browser context via play(taskCode)
if (window.__studentTaskGame) {
  window.__studentTaskGame.destroy(true);
}

class DemoScene extends Phaser.Scene {
  create() {
    const cx = this.cameras.main.centerX;
    const cy = this.cameras.main.centerY;

    this.add.text(cx, cy - 40, "Hello, cognitive task!", {
      fontSize: "36px",
      color: "#ffffff"
    }).setOrigin(0.5);

    let trialIndex = 0;
    const maxTrials = 5;

    const label = this.add.text(cx, cy + 20, "Trial: 0 / " + maxTrials, {
      fontSize: "24px",
      color: "#aaddff"
    }).setOrigin(0.5);

    this.input.keyboard.on("keydown-SPACE", () => {
      trialIndex = trialIndex + 1;
      label.setText("Trial: " + trialIndex + " / " + maxTrials);
    });
  }
}

window.__studentTaskGame = new Phaser.Game({
  type: Phaser.AUTO,
  parent: "phaser-game",
  width: 800,
  height: 420,
  backgroundColor: "#1d1d2a",
  scene: DemoScene
});
```

## Student instructions (short version)
1. Open `tasks/student_task.js`.
2. Write or paste your JavaScript task there.
3. In notebook, run the runner cell.
4. Click Open Big Screen Window.
5. Edit task file and run the notebook cell again.

## Teacher notes
- This keeps the lesson focused on JavaScript concepts, not quote escaping.
- `play(...)` still needs a string, but the notebook now builds that string by reading a file.
- If students get a "file not found" error, check the path in `taskPath`.

## Optional variants
- One file per lesson: `tasks/lesson1.js`, `tasks/lesson2.js`, etc.
- One file per student: `tasks/student_ana.js`, `tasks/student_luis.js`.
- Add a tiny validation cell that prints `taskCode.length` before calling `play(taskCode)`.

## Minimal troubleshooting checklist
- File path correct?
- Did the student save `student_task.js`?
- Does the file contain valid JavaScript syntax?
- Is `play(taskCode)` called after `readTextFile`?
