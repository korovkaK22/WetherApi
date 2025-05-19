const { validateCityParam, validateSubscriptionInput } = require('../../utils/validators');

describe('validateCityParam', () => {
  it('passes for non-empty string', () => {
    expect(validateCityParam('Kyiv')).toBeTruthy();
  });
  it('fails for empty string', () => {
    expect(validateCityParam('')).toBeFalsy();
  });
});

describe('validateSubscriptionInput', () => {
  it('returns null for valid input', () => {
    expect(
      validateSubscriptionInput({ email: 'a@b.c', city: 'Kyiv', frequency: 'daily' })
    ).toBeNull();
  });
  it('returns error string for invalid email', () => {
    expect(
      validateSubscriptionInput({ email: 'bad', city: 'Kyiv', frequency: 'daily' })
    ).toMatch(/Invalid email/);
  });
});