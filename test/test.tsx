import { render, screen, act, waitFor } from '@testing-library/react';
import { Wait } from '../src';

test('test', async () => {
  let resolve: (value: string) => void;
  const promise = new Promise<string>(r => { resolve = r; });

  await act(async () => {
    render(<Wait promise={promise} transient="Transient" render={value =>
      <div>{value}</div>
    } fallback={null} />);
  });

  expect(screen.getByText("Transient")).toMatchInlineSnapshot(`
<div>
  Transient
</div>
`);

  await act(async () => {
    resolve!("Resolved");
  });

  await waitFor(() => {
    expect(screen.getByText("Resolved")).toMatchInlineSnapshot(`
<div>
  Resolved
</div>
`);
  });
});
