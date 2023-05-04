function getButton(display: string, key: string = display, className?: string) {
  return {
    display,
    key,
    className,
    testId: `inputKey-${display}`,
  };
}

// Shape of grid
// ['C', 'C', '', '÷' ],
// ['1', '2', '3', 'x'],
// ['4', '5', '6', '+'],
// ['7', '8', '9', '-'],
// ['0', '.', '=', '='],
export const BUTTON_MAP: IButton[][] = [
  [
    getButton('C', 'Escape', 'two-col is-symbol'),
    getButton('', '', 'hide'),
    getButton('÷', '/', 'is-symbol'),
  ],
  [
    getButton('1'),
    getButton('2'),
    getButton('3'),
    getButton('x', '*', 'is-symbol'),
  ],
  [
    getButton('4'),
    getButton('5'),
    getButton('6'),
    getButton('+', '+', 'is-symbol'),
  ],
  [
    getButton('7'),
    getButton('8'),
    getButton('9'),
    getButton('-', '-', 'is-symbol'),
  ],
  [
    getButton('0'),
    getButton('.'),
    getButton('=', 'Enter', 'two-col equals is-symbol'),
  ],
];

interface IButton {
  display: string;
  key: string;
  className?: string;
  testId: string;
}
