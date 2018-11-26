// FUNCTION RETURNS TEST SCORE

//TAKES TWO ARRAYS
	//FIRST ARRAY: TEST NAMES
	//SECOND ARRAY: RESULTS

	// ASSUMPTION: FIRSTARRAY.LENGTH === SECONDARRAY.LENGTH
	//RESULTS CAN BE "OK", "ERROR", "WRONG"
	//TEST NAMES MUST BEGIN WITH 'TEST' FOLLOWED BY THE GROUP NUMBER TO WHICH IT BELONGS STARTING WITH 1, FOLLOWED
	 //BY LETTERS IN ALPHABETICAL ORDER STARTING WITH A, FOR EACH MEMBER OF THE GROUP TO WHICH THE TEST BELONG
	 //VALID TEST NAME ARRAY: ["test1", 'test2a', 'test2b', 'test3a', 'test3b', 'test3c']
	 //"test1" is in its own group by itself

	 //rules:  
	 // a group receives a point if ALL of its members have a result of "ok" in the corresponding indexes of the results array
	 // The score is equal to the points received * 100 / number of test groups

	 //ideas: merge the arrays in some way, use pattern matching to determine whether there is more than one test in a group+

	 //what if i saved some of the pattern matches?  the character patterns matching 'test' followed by a number followed by a letter ('test2a')?
	 //this should save their indexes as well.  if i pass the global 'g' flag into the RegExp, it will find ALL matches.

	 //let's say i am manually grading a test.  
	 //establish a base case.

	//TESTS: ['test1a', 'test1b']
	//TEST RESULTS: [OK, OK]

	//EXPECTED OUTPUT:  100 (OR 1 * 100 / 1)


//initialize variable grade_counter to 0
//start loop
	//for each test:
		//if the test matches the pattern 'test' followed by just a number
			//check the corresponding index in the results array
				//if the result is OK, add 1 to grade_counter


		//if the test matches the pattern 'test' followed by a number followed by a letter
			//initialize test_counter to 1; 
			//if result in corresponding index of results array is OK
				//initialize ok_counter to 1;
				//start inner loop
					//for each item in the remaining subarray
						//if an test matches the test and number  of the last matched test in the test array with the pattern test + number + letter
							//add 1 to test_counter
							//if the result in the corresponding results array index is OK //then add 1 to ok_counter
							//change the test name at the current index  to a string value that will not be matched later, such as "done"
				//if the value of test_counter is equal to the ok_counter (if all tests in a group have the result of "OK"), then add 1 to grade_counter



tests = ["test1", "test2a", "test3", "test2b"];
results = ["OK", "OK", "OK", "NO"]


function grade_score(T, R){
if(R.length !== T.length){
	throw "Lengths of arrays do not match!"
}
var testNameReg = /test\d$/
var testNameReg2 = /test(\d)([a-z])$/
var grade_counter = 0;
var group_counter = 0;
	T.forEach((element, index) => {
		if(element.match(testNameReg)){
			group_counter += 1;
			if(R[index] == "OK"){
				grade_counter += 1;
			}
		}else if(element.match(testNameReg2)){
			group_counter += 1;
			var test_counter = 0;
			var ok_counter =  0;
			var testToMatch = new RegExp("test" + element.match(testNameReg2)[1]);
			for(var i = index; i < T.length; i++){	
				if(T[i].match(testToMatch)){
					test_counter += 1;
					if(R[i] == "OK"){
						ok_counter += 1;
					}
					T[i] = "checked";
				}
			}
			if(test_counter > 0 && test_counter == ok_counter){
				grade_counter += 1;
			}	
		}
	});
	console.log(grade_counter * 100 / group_counter);
}


