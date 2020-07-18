# react-ev-bus

![CI](https://github.com/zhzLuke96/react-ev-bus/workflows/CI/badge.svg?branch=master)

react event bus.

## Table of Contents

- [react-ev-bus](#react-ev-bus)
  - [Table of Contents](#table-of-contents)
  - [Background](#background)
  - [Usage](#usage)
  - [Maintainers](#maintainers)
  - [License](#license)

## Background

project background

## Usage

```tsx
import {
  BusProvider,
  BusRootProvider,
  useBusEffect,
  useBusState,
  useDispatch,
} from 'react-ev-bus';

const CounterControl = () => {
  const inc = useDispatch('inc');
  const sub = useDispatch('sub');
  return (
    <div>
      <button onclick={inc}>+</button>
      <button onclick={sub}>-</button>
    </div>
  );
};

const CounterView = () => {
  const [count, change] = useBusState('count');
  useBusEffect('inc', () => change(count + 1));
  useBusEffect('sub', () => change(count - 1));
  return <span>{num}</span>;
};

const AnyComponent = () => {
  return (
    <div style={{boder: '1px solid tomato', padding: '1rem'}}>
      <CounterView />
      <CounterControl />
    </div>
  );
};

const App = () => {
  const [mode, changeMode] = useState('mode');
  return (
    <BusRootProvider>
      <BusProvider>
        <CounterView />
        <CounterControl />
        <AnyComponent />
      </BusProvider>
      <BusProvider>
        <CounterView />
        <CounterControl />
        <AnyComponent />
      </BusProvider>
      <AnyComponent />
    </BusRootProvider>
  );
};
```

## Maintainers

[@zhzluke96](https://github.com/zhzluke96).

## License

[MIT](LICENSE) © Richard Littauer
