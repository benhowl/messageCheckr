describe('jms - UUID check', function () {

  var actualMsg = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <testRootElement xmlns="http://www.testing.com/integration/event">
    <validUuidElement>49276fbd-d143-4fb4-9a00-6b60ae6b0c9e</validUuidElement>
    <notUuidElement>thisIsNotAValidUuid</notUuidElement>
  </testRootElement>`;

  it('should report a mismatch where the actual element is not a UUID', function () {
    var expectedMessage = [
      {path: 'notUuidElement', equals: '{uuid}'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, false);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value thisIsNotAValidUuid is a valid UUID',
      passedCheck: false
    });
  });

  it('should report a match where the actual element is a valid UUID', function () {
    var expectedMessage = [
      {path: 'validUuidElement', equals: '{uuid}'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, true);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value 49276fbd-d143-4fb4-9a00-6b60ae6b0c9e is a valid UUID',
      passedCheck: true
    });
  });
});