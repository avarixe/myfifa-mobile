export function assertDefined<T>(
  value?: T | null
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error('Expected value to be defined')
  }
}

export function assertType<T>(value: unknown): asserts value is T {
  // type guard
}
