const HuglaBodyParser = require('../lib/hugla-body-parser').default;

test('it built successfully', () => {
  expect(HuglaBodyParser).toBeInstanceOf(Object);
});
