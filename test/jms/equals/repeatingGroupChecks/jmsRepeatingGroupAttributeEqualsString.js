describe('jms - repeating element attribute equals', function () {

  var actualMsg = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <testRootElement xmlns="http://www.testing.com/integration/event">
    <thingContainingRepeatingGroups>
        <RepeatingGroup>
            <fieldOneOfRepeatingGroup testAttribute1="hello">10001</fieldOneOfRepeatingGroup>
            <fieldTwoOfRepeatingGroup testAttribute1="its">10003</fieldTwoOfRepeatingGroup>
        </RepeatingGroup>
        <RepeatingGroup>
            <fieldOneOfRepeatingGroup testAttribute1="me">10002</fieldOneOfRepeatingGroup>
            <fieldTwoOfRepeatingGroup testAttribute1="ben">10004</fieldTwoOfRepeatingGroup>
        </RepeatingGroup>
    </thingContainingRepeatingGroups>
  </testRootElement>`;

  it('should report a mismatch where the actual repeating group element attribute value does not match the expected value', function () {
    var expectedMessage = [
      {repeatingGroup: {path: 'thingContainingRepeatingGroups', repeater: 'RepeatingGroup', number: 1}, path: 'fieldOneOfRepeatingGroup', attribute: 'testAttribute1', equals: 'hellop'},
      {repeatingGroup: {path: 'thingContainingRepeatingGroups', repeater: 'RepeatingGroup', number: 1}, path: 'fieldTwoOfRepeatingGroup', attribute: 'testAttribute1', equals: 'bits'},
      {repeatingGroup: {path: 'thingContainingRepeatingGroups', repeater: 'RepeatingGroup', number: 2}, path: 'fieldOneOfRepeatingGroup', attribute: 'testAttribute1', equals: 'sme'},
      {repeatingGroup: {path: 'thingContainingRepeatingGroups', repeater: 'RepeatingGroup', number: 2}, path: 'fieldTwoOfRepeatingGroup', attribute: 'testAttribute1', equals: 'benn'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, false);

    assert.deepEqual(result.checks[2], {
      actual: 'hello',
      description: "Check actual value hello is equal to hellop",
      expected: 'hellop',
      pass: false,
      path: 'thingContainingRepeatingGroups.RepeatingGroup.fieldOneOfRepeatingGroup number: 1 (attribute: testAttribute1)'
    });

    assert.deepEqual(result.checks[4], {
      actual: 'its',
      description: "Check actual value its is equal to bits",
      expected: 'bits',
      pass: false,
      path: 'thingContainingRepeatingGroups.RepeatingGroup.fieldTwoOfRepeatingGroup number: 1 (attribute: testAttribute1)'
    });

    assert.deepEqual(result.checks[6], {
      actual: 'me',
      description: "Check actual value me is equal to sme",
      expected: 'sme',
      pass: false,
      path: 'thingContainingRepeatingGroups.RepeatingGroup.fieldOneOfRepeatingGroup number: 2 (attribute: testAttribute1)'
    });

    assert.deepEqual(result.checks[8], {
      actual: 'ben',
      description: "Check actual value ben is equal to benn",
      expected: 'benn',
      pass: false,
      path: 'thingContainingRepeatingGroups.RepeatingGroup.fieldTwoOfRepeatingGroup number: 2 (attribute: testAttribute1)'
    });
  });

  it('should report a match where the actual repeating group element value does match the expected value', function () {
    var expectedMessage = [
      {repeatingGroup: {path: 'thingContainingRepeatingGroups', repeater: 'RepeatingGroup', number: 1}, path: 'fieldOneOfRepeatingGroup', attribute: 'testAttribute1', equals: 'hello'},
      {repeatingGroup: {path: 'thingContainingRepeatingGroups', repeater: 'RepeatingGroup', number: 1}, path: 'fieldTwoOfRepeatingGroup', attribute: 'testAttribute1', equals: 'its'},
      {repeatingGroup: {path: 'thingContainingRepeatingGroups', repeater: 'RepeatingGroup', number: 2}, path: 'fieldOneOfRepeatingGroup', attribute: 'testAttribute1', equals: 'me'},
      {repeatingGroup: {path: 'thingContainingRepeatingGroups', repeater: 'RepeatingGroup', number: 2}, path: 'fieldTwoOfRepeatingGroup', attribute: 'testAttribute1', equals: 'ben'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.deepEqual(result.checks[2], {
      actual: 'hello',
      description: "Check actual value hello is equal to hello",
      expected: 'hello',
      pass: true,
      path: 'thingContainingRepeatingGroups.RepeatingGroup.fieldOneOfRepeatingGroup number: 1 (attribute: testAttribute1)'
    });

    assert.deepEqual(result.checks[4], {
      actual: 'its',
      description: "Check actual value its is equal to its",
      expected: 'its',
      pass: true,
      path: 'thingContainingRepeatingGroups.RepeatingGroup.fieldTwoOfRepeatingGroup number: 1 (attribute: testAttribute1)'
    });

    assert.deepEqual(result.checks[6], {
      actual: 'me',
      description: "Check actual value me is equal to me",
      expected: 'me',
      pass: true,
      path: 'thingContainingRepeatingGroups.RepeatingGroup.fieldOneOfRepeatingGroup number: 2 (attribute: testAttribute1)'
    });

    assert.deepEqual(result.checks[8], {
      actual: 'ben',
      description: "Check actual value ben is equal to ben",
      expected: 'ben',
      pass: true,
      path: 'thingContainingRepeatingGroups.RepeatingGroup.fieldTwoOfRepeatingGroup number: 2 (attribute: testAttribute1)'
    });
  });
});