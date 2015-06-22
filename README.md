Assert functionality with native js
<html>
<head>
<meta name="description" content="Senior JS Developer Code Challenge" /><html>
<head>
  <title>Coding Challenge</title>
</head>
<body>
  <h1>Terms of the Exercise</h1>
  <ul>
    <li>The purpose is to save both candidates and ourselves from wasting time in interviews - it is therefore not in your interest to cheat.</li>
    <li>You can take as long as you like to complete the exercise, but for an indicative timescale we expect a senior developer can accomplish this in an hour.</li>
    <li>You may use online resources to assist you with specific techniques, syntax etc. but please do not just copy code.</li>
    <li><b>DO NOT</b> share this exercise with any third party - this will undermine the use of the exercise with future candidates.</li>
  </ul>
  <h1>The Challenge</h1>
  <p>
    The aim of the exercise is to demonstrate your problem solving and understanding of JavaScript by implementing something found in every unit testing tool - an "assertEquals" method.</p>
  
  <ul>
    <li>Fill in the "assertEquals" function such that it will correctly compare the passed "expected" vs "actual" parameters.</li>
    <li>You may add more functions.</li>
    <li>Credit will be given for approach, correctly identifying "failed" assertEquals, "clean" code and coding style.</li>
  </ul>

  <h1>Expected Result</h1>
  The following tests should "fail":  <strong>02, 03, 04, 07, 08 and 09</strong> - and the failures should be reported using the provided mechanism.<br/>
  Ideally the failure messages should report further information:
  <ul class="expected">
    <li>Test 02: Expected "abcdef" found "abc"</li>
    <li>Test 03: Expected type Array but found Object</li>
    <li>Test 04: Expected array length 2 but found 3</li>
    <li>Test 07: Expected propB.propA[1].propB "b" but found "c"</li>
    <li>Test 08: Expected propB.propC but was not found</li>
    <li>Test 09: Expected type null but found type Object</li>
    <li>Test 10: Expected propB.propC to be missing but was found</li>
  </ul>

</body>
</html>
