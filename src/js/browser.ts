import * as Rx from "rxjs";
import { Game } from "./lib/game";
import { User } from "./lib/user";
import "./components";

function browser() {
  const adventure = document.createElement('bookshelf-adventure');

  const input$ = new Rx.ReplaySubject<string>();
  const output$ = new Rx.ReplaySubject<string>();
  const game = new Game(
    input$,
    (output: string) => {
      output$.next(output);
    },
    { user: new User() }
  );

  document.addEventListener("DOMContentLoaded", () => {
    game.setup();
  });

  window.onload = () => {
    game.start();

    const canvasEl = document.getElementById("canvas") as HTMLDivElement;
    if (!canvasEl) {
      throw new Error(`Start error: invalid HTML`);
    }

    canvasEl.replaceChildren(adventure);
  };

  // testing
  output$.subscribe((output) => {
    if (output) {
      console.log(`> ${output}`);
    }
  });
  input$.subscribe((input) => {
    console.log(`< ${input}`);
  });
  setTimeout(() => {
    input$.next("Test User");
  }, 800);
}

browser();
