import uuid from '../uuid';

describe('uuid', () => {
  const expected = /^([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12})|(0{8}-0{4}-0{4}-0{4}-0{12})$/;

  it('is a function', () => {
    expect(uuid).toBeInstanceOf(Function);
  });

  it('render any uuid number', () => {
    expect(uuid()).toEqual(expect.stringMatching(expected));
  });

  it('returns a different uuid on each call.', () => {
    const uuid1 = uuid();
    const uuid2 = uuid();
    expect(uuid1).not.toEqual(uuid2);
  });
});
