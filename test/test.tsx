import React from 'react';
import { render, screen } from '@testing-library/react';
import { Wait } from '../src';

test('test', async () => {
  const promise = Promise.resolve("Resolved");

  render(<Wait promise={promise} transient="Transient" render={value =>
    <div>{value}</div>
  } fallback={null} />);

  expect(screen.getByText("Transient")).toMatchInlineSnapshot(`
<div>
  Transient
</div>
`);

  expect(await screen.findByText("Resolved")).toMatchInlineSnapshot(`
<div>
  Resolved
</div>
`);
});
