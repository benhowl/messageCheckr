describe('jms - length check', function () {
  var actualMsg = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <testRootElement xmlns="http://www.testing.com/integration/event">
    <elementToCheckLengthOf>thisIs22CharactersLong</elementToCheckLengthOf>
  </testRootElement>`;

  it('should report a mismatch where an element\'s actual length does not match the expected length', function () {
    var expectedMessage = [
      {path: 'elementToCheckLengthOf', equals: '{length(21)}'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, false);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value thisIs22CharactersLong has a length equal to 21',
      passedCheck: false
    });
  });

  it('should report a match where an element\'s actual length does match the expected length', function () {
    var expectedMessage = [
      {path: 'elementToCheckLengthOf', equals: '{length(22)}'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, true);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value thisIs22CharactersLong has a length equal to 22',
      passedCheck: true
    });
  });

  it('should report a mismatch where an element\'s actual length is not less than the given < expected length', function () {
    var expectedMessage = [
      {path: 'elementToCheckLengthOf', equals: '{length(<22)}'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, false);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value thisIs22CharactersLong has a length less than 22',
      passedCheck: false
    });
  });

  it('should report a match where an element\'s actual length is less than the given (< expected length)', function () {
    var expectedMessage = [
      {path: 'elementToCheckLengthOf', equals: '{length(<23)}'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, true);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value thisIs22CharactersLong has a length less than 23',
      passedCheck: true
    });
  });

  it('should report a mismatch where an element\'s actual length is not greater than the given > expected length', function () {
    var expectedMessage = [
      {path: 'elementToCheckLengthOf', equals: '{length(>22)}'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, false);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value thisIs22CharactersLong has a length greater than 22',
      passedCheck: false
    });
  });

  it('should report a match where an element\'s actual length is greater than the given (> expected length)', function () {
    var expectedMessage = [
      {path: 'elementToCheckLengthOf', equals: '{length(>21)}'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, true);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value thisIs22CharactersLong has a length greater than 21',
      passedCheck: true
    });
  });
});