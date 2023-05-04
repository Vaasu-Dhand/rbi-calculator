function getButton(display: string, className?: string, key: string = display) {
  return {
    display,
    className,
    key,
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
    getButton('C', 'two-col symbol', 'Escape'),
    getButton('', 'hide'),
    getButton('÷', 'symbol', '/'),
  ],
  [
    getButton('1', 'number'),
    getButton('2', 'number'),
    getButton('3', 'number'),
    getButton('x', 'symbol', '*'),
  ],
  [
    getButton('4', 'number'),
    getButton('5', 'number'),
    getButton('6', 'number'),
    getButton('+', 'symbol'),
  ],
  [
    getButton('7', 'number'),
    getButton('8', 'number'),
    getButton('9', 'number'),
    getButton('-', 'symbol'),
  ],
  [
    getButton('0', 'number'),
    getButton('.', 'decimal'),
    getButton('=', 'two-col equals symbol', 'Enter', ),
  ],
];

interface IButton {
  display: string;
  className?: string;
  key: string;
  testId: string;
}
